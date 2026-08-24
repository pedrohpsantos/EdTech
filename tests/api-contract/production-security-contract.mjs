import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const apiUrl = (process.env.API_URL || "http://localhost:8080").replace(
  /\/$/,
  "",
);
const reportDirectory = resolve("tests/api-contract/reports");
const reportJsonPath = resolve(
  reportDirectory,
  "production-security-contract.json",
);
const reportHtmlPath = resolve(reportDirectory, "index.html");
const requestId = `ci-api-contract-${Date.now()}`;
const startedAt = new Date();
const maxAttempts = Number(process.env.API_CONTRACT_MAX_ATTEMPTS || 4);
const timeoutMs = Number(process.env.API_CONTRACT_TIMEOUT_MS || 30_000);
const retryDelayMs = Number(process.env.API_CONTRACT_RETRY_DELAY_MS || 8_000);

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const hasValue = (headers, name, expected) =>
  (headers.get(name) || "").toLowerCase().includes(expected.toLowerCase());

const sleep = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

const fetchHealthWithRetry = async () => {
  let lastError;
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      const response = await fetch(`${apiUrl}/actuator/health`, {
        headers: { "X-Request-ID": requestId },
        signal: AbortSignal.timeout(timeoutMs),
      });
      return { response, attempts: attempt };
    } catch (error) {
      lastError = error;
      console.warn(
        `Health check attempt ${attempt}/${maxAttempts} failed: ${error.message}`,
      );
      if (attempt < maxAttempts) await sleep(retryDelayMs * attempt);
    }
  }
  throw new Error(
    `API did not respond after ${maxAttempts} attempts: ${lastError?.message || "unknown error"}`,
  );
};

const renderReport = (report) => {
  const rows = report.checks
    .map(
      (check) =>
        `<tr><td>${escapeHtml(check.name)}</td><td><span class="${check.passed ? "passed" : "failed"}">${check.passed ? "Passed" : "Failed"}</span></td><td>${escapeHtml(check.expected)}</td><td>${escapeHtml(check.actual)}</td></tr>`,
    )
    .join("");
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>EdTech API Security Contract Report</title><style>:root{color-scheme:light dark;font-family:Inter,system-ui,sans-serif}body{margin:0;background:#f6f7fb;color:#172033}main{max-width:980px;margin:48px auto;padding:0 24px}header,section{background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:28px;box-shadow:0 8px 24px rgb(15 23 42 / 6%)}section{margin-top:20px}h1{margin:0 0 8px;color:#4c1d95}p{margin:8px 0;color:#475569}.summary{font-size:1.25rem;font-weight:700;color:${report.passed ? "#15803d" : "#b91c1c"}}table{width:100%;border-collapse:collapse;margin-top:12px}th,td{padding:12px;text-align:left;border-bottom:1px solid #e2e8f0}th{color:#475569;font-size:.8rem;text-transform:uppercase;letter-spacing:.04em}.passed,.failed{border-radius:999px;padding:4px 9px;font-weight:700;font-size:.82rem}.passed{background:#dcfce7;color:#166534}.failed{background:#fee2e2;color:#991b1b}code{word-break:break-word}@media(prefers-color-scheme:dark){body{background:#0f172a;color:#e2e8f0}header,section{background:#111827;border-color:#334155}p,th{color:#cbd5e1}td{border-color:#334155}}</style></head><body><main><header><h1>EdTech API Security Contract</h1><p class="summary">${report.passed ? "All checks passed" : "One or more checks failed"}</p><p>Endpoint: <code>${escapeHtml(report.endpoint)}</code></p><p>Executed at: ${escapeHtml(report.executedAt)}</p></header><section><h2>Read-only edge security checks</h2><table><thead><tr><th>Check</th><th>Result</th><th>Expected</th><th>Observed</th></tr></thead><tbody>${rows}</tbody></table></section></main></body></html>`;
};

const run = async () => {
  const checks = [];
  let response;
  try {
    const result = await fetchHealthWithRetry();
    response = result.response;
    console.log(
      `API health endpoint responded on attempt ${result.attempts}/${maxAttempts}.`,
    );
  } catch (error) {
    checks.push({
      name: "API reachability for security contract inspection",
      passed: false,
      expected: "A response from the published API",
      actual: error.message,
    });
  }

  if (response) {
    const headers = response.headers;
    const headerChecks = [
      [
        "HTTP Strict Transport Security",
        "strict-transport-security",
        "max-age=31536000",
      ],
      [
        "HSTS includes subdomains",
        "strict-transport-security",
        "includesubdomains",
      ],
      ["MIME sniffing protection", "x-content-type-options", "nosniff"],
      ["Clickjacking protection", "x-frame-options", "deny"],
      [
        "Content Security Policy frame boundary",
        "content-security-policy",
        "frame-ancestors 'none'",
      ],
      ["Sensitive response cache protection", "cache-control", "no-store"],
    ];
    for (const [name, header, expected] of headerChecks) {
      const actual = headers.get(header) || "(header missing)";
      checks.push({
        name,
        passed: hasValue(headers, header, expected),
        expected,
        actual,
      });
    }
    const traceId = headers.get("x-request-id") || "(header missing)";
    checks.push({
      name: "Request tracing correlation",
      passed: traceId === requestId,
      expected: requestId,
      actual: traceId,
    });
  }

  const report = {
    suite: "EdTech API Security Contract",
    endpoint: `${apiUrl}/actuator/health`,
    executedAt: startedAt.toISOString(),
    durationMs: Date.now() - startedAt.getTime(),
    passed: checks.length > 0 && checks.every((check) => check.passed),
    checks,
  };
  await mkdir(reportDirectory, { recursive: true });
  await Promise.all([
    writeFile(reportJsonPath, `${JSON.stringify(report, null, 2)}\n`),
    writeFile(reportHtmlPath, renderReport(report)),
  ]);
  for (const check of checks)
    console.log(
      `${check.passed ? "PASS" : "FAIL"} ${check.name}: ${check.actual}`,
    );
  console.log(`Security contract report: ${reportHtmlPath}`);
  if (!report.passed) process.exitCode = 1;
};

await run();

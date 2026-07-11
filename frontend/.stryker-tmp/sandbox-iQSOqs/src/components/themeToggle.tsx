// @ts-nocheck
function stryNS_9fa48() {
  var g = typeof globalThis === 'object' && globalThis && globalThis.Math === Math && globalThis || new Function("return this")();
  var ns = g.__stryker__ || (g.__stryker__ = {});
  if (ns.activeMutant === undefined && g.process && g.process.env && g.process.env.__STRYKER_ACTIVE_MUTANT__) {
    ns.activeMutant = g.process.env.__STRYKER_ACTIVE_MUTANT__;
  }
  function retrieveNS() {
    return ns;
  }
  stryNS_9fa48 = retrieveNS;
  return retrieveNS();
}
stryNS_9fa48();
function stryCov_9fa48() {
  var ns = stryNS_9fa48();
  var cov = ns.mutantCoverage || (ns.mutantCoverage = {
    static: {},
    perTest: {}
  });
  function cover() {
    var c = cov.static;
    if (ns.currentTestId) {
      c = cov.perTest[ns.currentTestId] = cov.perTest[ns.currentTestId] || {};
    }
    var a = arguments;
    for (var i = 0; i < a.length; i++) {
      c[a[i]] = (c[a[i]] || 0) + 1;
    }
  }
  stryCov_9fa48 = cover;
  cover.apply(null, arguments);
}
function stryMutAct_9fa48(id) {
  var ns = stryNS_9fa48();
  function isActive(id) {
    if (ns.activeMutant === id) {
      if (ns.hitCount !== void 0 && ++ns.hitCount > ns.hitLimit) {
        throw new Error('Stryker: Hit count limit reached (' + ns.hitCount + ')');
      }
      return true;
    }
    return false;
  }
  stryMutAct_9fa48 = isActive;
  return isActive(id);
}
import useTheme from '../hooks/useTheme';
import styles from './themeToggle.module.css';
function ThemeToggle() {
  if (stryMutAct_9fa48("640")) {
    {}
  } else {
    stryCov_9fa48("640");
    const {
      tema,
      toggleTheme
    } = useTheme();
    return <button onClick={toggleTheme} className={styles.toggleBtn} aria-label="Alternar Tema" title="Alternar Tema">
      {(stryMutAct_9fa48("643") ? tema !== 'dark' : stryMutAct_9fa48("642") ? false : stryMutAct_9fa48("641") ? true : (stryCov_9fa48("641", "642", "643"), tema === (stryMutAct_9fa48("644") ? "" : (stryCov_9fa48("644"), 'dark')))) ? <i className="bi bi-sun-fill" style={stryMutAct_9fa48("645") ? {} : (stryCov_9fa48("645"), {
        fontSize: stryMutAct_9fa48("646") ? "" : (stryCov_9fa48("646"), '1.25rem')
      })}></i> : <i className="bi bi-moon-stars-fill" style={stryMutAct_9fa48("647") ? {} : (stryCov_9fa48("647"), {
        fontSize: stryMutAct_9fa48("648") ? "" : (stryCov_9fa48("648"), '1.25rem')
      })}></i>}
    </button>;
  }
}
export default ThemeToggle;
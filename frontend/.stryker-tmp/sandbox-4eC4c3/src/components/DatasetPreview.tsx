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
import React, { useState, useEffect } from 'react';
interface DatasetPreviewProps {
  url: string;
  type: string;
}
const DatasetPreview: React.FC<DatasetPreviewProps> = ({
  url,
  type
}) => {
  if (stryMutAct_9fa48("62")) {
    {}
  } else {
    stryCov_9fa48("62");
    const [content, setContent] = useState<string | null>(null);
    const [loading, setLoading] = useState(stryMutAct_9fa48("63") ? false : (stryCov_9fa48("63"), true));
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
      if (stryMutAct_9fa48("64")) {
        {}
      } else {
        stryCov_9fa48("64");
        let isMounted = stryMutAct_9fa48("65") ? false : (stryCov_9fa48("65"), true);
        const fetchContent = async () => {
          if (stryMutAct_9fa48("66")) {
            {}
          } else {
            stryCov_9fa48("66");
            try {
              if (stryMutAct_9fa48("67")) {
                {}
              } else {
                stryCov_9fa48("67");
                setLoading(stryMutAct_9fa48("68") ? false : (stryCov_9fa48("68"), true));
                setError(null);
                const response = await fetch(url);
                if (stryMutAct_9fa48("71") ? false : stryMutAct_9fa48("70") ? true : stryMutAct_9fa48("69") ? response.ok : (stryCov_9fa48("69", "70", "71"), !response.ok)) {
                  if (stryMutAct_9fa48("72")) {
                    {}
                  } else {
                    stryCov_9fa48("72");
                    throw new Error(stryMutAct_9fa48("73") ? `` : (stryCov_9fa48("73"), `Falha no download (Status: ${response.status})`));
                  }
                }
                const text = await response.text();
                if (stryMutAct_9fa48("75") ? false : stryMutAct_9fa48("74") ? true : (stryCov_9fa48("74", "75"), isMounted)) {
                  if (stryMutAct_9fa48("76")) {
                    {}
                  } else {
                    stryCov_9fa48("76");
                    setContent(text);
                  }
                }
              }
            } catch (err: any) {
              if (stryMutAct_9fa48("77")) {
                {}
              } else {
                stryCov_9fa48("77");
                if (stryMutAct_9fa48("79") ? false : stryMutAct_9fa48("78") ? true : (stryCov_9fa48("78", "79"), isMounted)) {
                  if (stryMutAct_9fa48("80")) {
                    {}
                  } else {
                    stryCov_9fa48("80");
                    setError(stryMutAct_9fa48("83") ? err.message && 'Erro ao processar o dataset.' : stryMutAct_9fa48("82") ? false : stryMutAct_9fa48("81") ? true : (stryCov_9fa48("81", "82", "83"), err.message || (stryMutAct_9fa48("84") ? "" : (stryCov_9fa48("84"), 'Erro ao processar o dataset.'))));
                  }
                }
              }
            } finally {
              if (stryMutAct_9fa48("85")) {
                {}
              } else {
                stryCov_9fa48("85");
                if (stryMutAct_9fa48("87") ? false : stryMutAct_9fa48("86") ? true : (stryCov_9fa48("86", "87"), isMounted)) {
                  if (stryMutAct_9fa48("88")) {
                    {}
                  } else {
                    stryCov_9fa48("88");
                    setLoading(stryMutAct_9fa48("89") ? true : (stryCov_9fa48("89"), false));
                  }
                }
              }
            }
          }
        };
        if (stryMutAct_9fa48("91") ? false : stryMutAct_9fa48("90") ? true : (stryCov_9fa48("90", "91"), url)) {
          if (stryMutAct_9fa48("92")) {
            {}
          } else {
            stryCov_9fa48("92");
            fetchContent();
          }
        }
        return () => {
          if (stryMutAct_9fa48("93")) {
            {}
          } else {
            stryCov_9fa48("93");
            isMounted = stryMutAct_9fa48("94") ? true : (stryCov_9fa48("94"), false);
          }
        };
      }
    }, stryMutAct_9fa48("95") ? [] : (stryCov_9fa48("95"), [url]));
    if (stryMutAct_9fa48("97") ? false : stryMutAct_9fa48("96") ? true : (stryCov_9fa48("96", "97"), loading)) {
      if (stryMutAct_9fa48("98")) {
        {}
      } else {
        stryCov_9fa48("98");
        return <div style={stryMutAct_9fa48("99") ? {} : (stryCov_9fa48("99"), {
          padding: stryMutAct_9fa48("100") ? "" : (stryCov_9fa48("100"), '2rem'),
          textAlign: stryMutAct_9fa48("101") ? "" : (stryCov_9fa48("101"), 'center'),
          color: stryMutAct_9fa48("102") ? "" : (stryCov_9fa48("102"), '#64748B'),
          display: stryMutAct_9fa48("103") ? "" : (stryCov_9fa48("103"), 'flex'),
          alignItems: stryMutAct_9fa48("104") ? "" : (stryCov_9fa48("104"), 'center'),
          justifyContent: stryMutAct_9fa48("105") ? "" : (stryCov_9fa48("105"), 'center'),
          height: stryMutAct_9fa48("106") ? "" : (stryCov_9fa48("106"), '100%')
        })}>
        Carregando dados do dataset...
      </div>;
      }
    }
    if (stryMutAct_9fa48("109") ? error && !content : stryMutAct_9fa48("108") ? false : stryMutAct_9fa48("107") ? true : (stryCov_9fa48("107", "108", "109"), error || (stryMutAct_9fa48("110") ? content : (stryCov_9fa48("110"), !content)))) {
      if (stryMutAct_9fa48("111")) {
        {}
      } else {
        stryCov_9fa48("111");
        return <div style={stryMutAct_9fa48("112") ? {} : (stryCov_9fa48("112"), {
          padding: stryMutAct_9fa48("113") ? "" : (stryCov_9fa48("113"), '2rem'),
          textAlign: stryMutAct_9fa48("114") ? "" : (stryCov_9fa48("114"), 'center'),
          color: stryMutAct_9fa48("115") ? "" : (stryCov_9fa48("115"), '#dc3545'),
          display: stryMutAct_9fa48("116") ? "" : (stryCov_9fa48("116"), 'flex'),
          flexDirection: stryMutAct_9fa48("117") ? "" : (stryCov_9fa48("117"), 'column'),
          alignItems: stryMutAct_9fa48("118") ? "" : (stryCov_9fa48("118"), 'center'),
          justifyContent: stryMutAct_9fa48("119") ? "" : (stryCov_9fa48("119"), 'center'),
          height: stryMutAct_9fa48("120") ? "" : (stryCov_9fa48("120"), '100%')
        })}>
        <i className="bi bi-exclamation-triangle" style={stryMutAct_9fa48("121") ? {} : (stryCov_9fa48("121"), {
            fontSize: stryMutAct_9fa48("122") ? "" : (stryCov_9fa48("122"), '2rem'),
            marginBottom: stryMutAct_9fa48("123") ? "" : (stryCov_9fa48("123"), '1rem')
          })}></i>
        <p>{stryMutAct_9fa48("126") ? error && 'Conteúdo vazio' : stryMutAct_9fa48("125") ? false : stryMutAct_9fa48("124") ? true : (stryCov_9fa48("124", "125", "126"), error || (stryMutAct_9fa48("127") ? "" : (stryCov_9fa48("127"), 'Conteúdo vazio')))}</p>
        <a href={url} target="_blank" rel="noopener noreferrer" style={stryMutAct_9fa48("128") ? {} : (stryCov_9fa48("128"), {
            marginTop: stryMutAct_9fa48("129") ? "" : (stryCov_9fa48("129"), '1rem'),
            color: stryMutAct_9fa48("130") ? "" : (stryCov_9fa48("130"), 'var(--ed-purple)')
          })}>
          Baixar Arquivo Diretamente
        </a>
      </div>;
      }
    }
    const renderCsv = () => {
      if (stryMutAct_9fa48("131")) {
        {}
      } else {
        stryCov_9fa48("131");
        // Simple CSV parser for MVP. Splits by newline, then by comma.
        const lines = stryMutAct_9fa48("132") ? content.split('\n') : (stryCov_9fa48("132"), content.split(stryMutAct_9fa48("133") ? "" : (stryCov_9fa48("133"), '\n')).filter(stryMutAct_9fa48("134") ? () => undefined : (stryCov_9fa48("134"), line => stryMutAct_9fa48("138") ? line.trim().length <= 0 : stryMutAct_9fa48("137") ? line.trim().length >= 0 : stryMutAct_9fa48("136") ? false : stryMutAct_9fa48("135") ? true : (stryCov_9fa48("135", "136", "137", "138"), (stryMutAct_9fa48("139") ? line.length : (stryCov_9fa48("139"), line.trim().length)) > 0))));
        if (stryMutAct_9fa48("142") ? lines.length !== 0 : stryMutAct_9fa48("141") ? false : stryMutAct_9fa48("140") ? true : (stryCov_9fa48("140", "141", "142"), lines.length === 0)) {
          if (stryMutAct_9fa48("143")) {
            {}
          } else {
            stryCov_9fa48("143");
            return <div>Dataset CSV vazio.</div>;
          }
        }
        const headers = lines[0].split(stryMutAct_9fa48("144") ? "" : (stryCov_9fa48("144"), ','));
        const rows = stryMutAct_9fa48("145") ? lines.map(line => line.split(',')) : (stryCov_9fa48("145"), lines.slice(1).map(stryMutAct_9fa48("146") ? () => undefined : (stryCov_9fa48("146"), line => line.split(stryMutAct_9fa48("147") ? "" : (stryCov_9fa48("147"), ',')))));

        // Limit to 100 rows to prevent extreme lag on huge files
        const maxRows = 100;
        const displayRows = stryMutAct_9fa48("148") ? rows : (stryCov_9fa48("148"), rows.slice(0, maxRows));
        return <div style={stryMutAct_9fa48("149") ? {} : (stryCov_9fa48("149"), {
          height: stryMutAct_9fa48("150") ? "" : (stryCov_9fa48("150"), '100%'),
          overflow: stryMutAct_9fa48("151") ? "" : (stryCov_9fa48("151"), 'auto'),
          padding: stryMutAct_9fa48("152") ? "" : (stryCov_9fa48("152"), '1rem'),
          background: stryMutAct_9fa48("153") ? "" : (stryCov_9fa48("153"), '#fff')
        })}>
        <p style={stryMutAct_9fa48("154") ? {} : (stryCov_9fa48("154"), {
            fontSize: stryMutAct_9fa48("155") ? "" : (stryCov_9fa48("155"), '0.85rem'),
            color: stryMutAct_9fa48("156") ? "" : (stryCov_9fa48("156"), '#64748B'),
            marginBottom: stryMutAct_9fa48("157") ? "" : (stryCov_9fa48("157"), '1rem')
          })}>
          Exibindo {displayRows.length} de {rows.length} linhas...
        </p>
        <table className="table table-sm table-bordered table-striped" style={stryMutAct_9fa48("158") ? {} : (stryCov_9fa48("158"), {
            fontSize: stryMutAct_9fa48("159") ? "" : (stryCov_9fa48("159"), '0.9rem'),
            width: stryMutAct_9fa48("160") ? "" : (stryCov_9fa48("160"), 'max-content'),
            minWidth: stryMutAct_9fa48("161") ? "" : (stryCov_9fa48("161"), '100%')
          })}>
          <thead style={stryMutAct_9fa48("162") ? {} : (stryCov_9fa48("162"), {
              position: stryMutAct_9fa48("163") ? "" : (stryCov_9fa48("163"), 'sticky'),
              top: 0,
              background: stryMutAct_9fa48("164") ? "" : (stryCov_9fa48("164"), '#f8fafc'),
              zIndex: 1
            })}>
            <tr>
              <th style={stryMutAct_9fa48("165") ? {} : (stryCov_9fa48("165"), {
                  width: stryMutAct_9fa48("166") ? "" : (stryCov_9fa48("166"), '40px'),
                  textAlign: stryMutAct_9fa48("167") ? "" : (stryCov_9fa48("167"), 'center')
                })}>#</th>
              {headers.map(stryMutAct_9fa48("168") ? () => undefined : (stryCov_9fa48("168"), (header, idx) => <th key={idx}>{stryMutAct_9fa48("169") ? header : (stryCov_9fa48("169"), header.trim())}</th>))}
            </tr>
          </thead>
          <tbody>
            {displayRows.map(stryMutAct_9fa48("170") ? () => undefined : (stryCov_9fa48("170"), (row, rowIdx) => <tr key={rowIdx}>
                <td style={stryMutAct_9fa48("171") ? {} : (stryCov_9fa48("171"), {
                  color: stryMutAct_9fa48("172") ? "" : (stryCov_9fa48("172"), '#94a3b8'),
                  textAlign: stryMutAct_9fa48("173") ? "" : (stryCov_9fa48("173"), 'center')
                })}>{stryMutAct_9fa48("174") ? rowIdx - 1 : (stryCov_9fa48("174"), rowIdx + 1)}</td>
                {row.map(stryMutAct_9fa48("175") ? () => undefined : (stryCov_9fa48("175"), (cell, cellIdx) => <td key={cellIdx}>{stryMutAct_9fa48("176") ? cell : (stryCov_9fa48("176"), cell.trim())}</td>))}
              </tr>))}
          </tbody>
        </table>
      </div>;
      }
    };
    const renderJson = () => {
      if (stryMutAct_9fa48("177")) {
        {}
      } else {
        stryCov_9fa48("177");
        let parsedObj;
        try {
          if (stryMutAct_9fa48("178")) {
            {}
          } else {
            stryCov_9fa48("178");
            parsedObj = JSON.parse(content);
          }
        } catch {
          if (stryMutAct_9fa48("179")) {
            {}
          } else {
            stryCov_9fa48("179");
            // If invalid JSON, just show as text
            return <div style={stryMutAct_9fa48("180") ? {} : (stryCov_9fa48("180"), {
              height: stryMutAct_9fa48("181") ? "" : (stryCov_9fa48("181"), '100%'),
              overflow: stryMutAct_9fa48("182") ? "" : (stryCov_9fa48("182"), 'auto'),
              padding: stryMutAct_9fa48("183") ? "" : (stryCov_9fa48("183"), '1rem'),
              background: stryMutAct_9fa48("184") ? "" : (stryCov_9fa48("184"), '#1e293b'),
              color: stryMutAct_9fa48("185") ? "" : (stryCov_9fa48("185"), '#f8fafc')
            })}>
          <p style={stryMutAct_9fa48("186") ? {} : (stryCov_9fa48("186"), {
                color: stryMutAct_9fa48("187") ? "" : (stryCov_9fa48("187"), '#ef4444')
              })}>Aviso: O arquivo não é um JSON válido.</p>
          <pre style={stryMutAct_9fa48("188") ? {} : (stryCov_9fa48("188"), {
                margin: 0
              })}>{content}</pre>
        </div>;
          }
        }
        return <div style={stryMutAct_9fa48("189") ? {} : (stryCov_9fa48("189"), {
          height: stryMutAct_9fa48("190") ? "" : (stryCov_9fa48("190"), '100%'),
          overflow: stryMutAct_9fa48("191") ? "" : (stryCov_9fa48("191"), 'auto'),
          padding: stryMutAct_9fa48("192") ? "" : (stryCov_9fa48("192"), '1rem'),
          background: stryMutAct_9fa48("193") ? "" : (stryCov_9fa48("193"), '#1e293b'),
          color: stryMutAct_9fa48("194") ? "" : (stryCov_9fa48("194"), '#f8fafc')
        })}>
        <pre style={stryMutAct_9fa48("195") ? {} : (stryCov_9fa48("195"), {
            margin: 0,
            fontSize: stryMutAct_9fa48("196") ? "" : (stryCov_9fa48("196"), '0.9rem'),
            fontFamily: stryMutAct_9fa48("197") ? "" : (stryCov_9fa48("197"), 'monospace')
          })}>
          {JSON.stringify(parsedObj, null, 2)}
        </pre>
      </div>;
      }
    };
    const renderTextFallback = stryMutAct_9fa48("198") ? () => undefined : (stryCov_9fa48("198"), (() => {
      const renderTextFallback = () => <div style={stryMutAct_9fa48("199") ? {} : (stryCov_9fa48("199"), {
        height: stryMutAct_9fa48("200") ? "" : (stryCov_9fa48("200"), '100%'),
        overflow: stryMutAct_9fa48("201") ? "" : (stryCov_9fa48("201"), 'auto'),
        padding: stryMutAct_9fa48("202") ? "" : (stryCov_9fa48("202"), '1rem'),
        background: stryMutAct_9fa48("203") ? "" : (stryCov_9fa48("203"), '#fff')
      })}>
      <pre style={stryMutAct_9fa48("204") ? {} : (stryCov_9fa48("204"), {
          margin: 0,
          fontSize: stryMutAct_9fa48("205") ? "" : (stryCov_9fa48("205"), '0.9rem'),
          fontFamily: stryMutAct_9fa48("206") ? "" : (stryCov_9fa48("206"), 'monospace'),
          whiteSpace: stryMutAct_9fa48("207") ? "" : (stryCov_9fa48("207"), 'pre-wrap')
        })}>
        {content}
      </pre>
    </div>;
      return renderTextFallback;
    })());
    return <div style={stryMutAct_9fa48("208") ? {} : (stryCov_9fa48("208"), {
      height: stryMutAct_9fa48("209") ? "" : (stryCov_9fa48("209"), '100%'),
      width: stryMutAct_9fa48("210") ? "" : (stryCov_9fa48("210"), '100%'),
      display: stryMutAct_9fa48("211") ? "" : (stryCov_9fa48("211"), 'flex'),
      flexDirection: stryMutAct_9fa48("212") ? "" : (stryCov_9fa48("212"), 'column')
    })}>
      {(stryMutAct_9fa48("215") ? type !== 'CSV' : stryMutAct_9fa48("214") ? false : stryMutAct_9fa48("213") ? true : (stryCov_9fa48("213", "214", "215"), type === (stryMutAct_9fa48("216") ? "" : (stryCov_9fa48("216"), 'CSV')))) ? renderCsv() : (stryMutAct_9fa48("219") ? type !== 'JSON' : stryMutAct_9fa48("218") ? false : stryMutAct_9fa48("217") ? true : (stryCov_9fa48("217", "218", "219"), type === (stryMutAct_9fa48("220") ? "" : (stryCov_9fa48("220"), 'JSON')))) ? renderJson() : renderTextFallback()}
    </div>;
  }
};
export default DatasetPreview;
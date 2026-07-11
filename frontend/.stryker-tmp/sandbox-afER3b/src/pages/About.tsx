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
export default function About() {
  if (stryMutAct_9fa48("861")) {
    {}
  } else {
    stryCov_9fa48("861");
    return <div style={stryMutAct_9fa48("862") ? {} : (stryCov_9fa48("862"), {
      padding: stryMutAct_9fa48("863") ? "" : (stryCov_9fa48("863"), '40px 20px'),
      maxWidth: stryMutAct_9fa48("864") ? "" : (stryCov_9fa48("864"), '800px'),
      margin: stryMutAct_9fa48("865") ? "" : (stryCov_9fa48("865"), '0 auto'),
      textAlign: stryMutAct_9fa48("866") ? "" : (stryCov_9fa48("866"), 'left'),
      flex: 1
    })}>
      <a href="/" style={stryMutAct_9fa48("867") ? {} : (stryCov_9fa48("867"), {
        display: stryMutAct_9fa48("868") ? "" : (stryCov_9fa48("868"), 'inline-block'),
        marginBottom: stryMutAct_9fa48("869") ? "" : (stryCov_9fa48("869"), '24px'),
        color: stryMutAct_9fa48("870") ? "" : (stryCov_9fa48("870"), 'var(--accent)'),
        textDecoration: stryMutAct_9fa48("871") ? "" : (stryCov_9fa48("871"), 'none'),
        fontWeight: 600
      })}>
        &larr; Voltar
      </a>

      <h1>Sobre o Projeto EdTech</h1>
      <p style={stryMutAct_9fa48("872") ? {} : (stryCov_9fa48("872"), {
        fontSize: stryMutAct_9fa48("873") ? "" : (stryCov_9fa48("873"), '18px'),
        lineHeight: stryMutAct_9fa48("874") ? "" : (stryCov_9fa48("874"), '1.6'),
        marginBottom: stryMutAct_9fa48("875") ? "" : (stryCov_9fa48("875"), '40px')
      })}>
        O EdTech é uma plataforma moderna desenvolvida para simplificar o envio, análise
        e aprovação de documentos acadêmicos entre orientadores e pesquisadores, promovendo um fluxo
        de trabalho ágil e rastreável.
      </p>

      <h2>Equipe AILAB Makers</h2>
      <div style={stryMutAct_9fa48("876") ? {} : (stryCov_9fa48("876"), {
        display: stryMutAct_9fa48("877") ? "" : (stryCov_9fa48("877"), 'flex'),
        flexDirection: stryMutAct_9fa48("878") ? "" : (stryCov_9fa48("878"), 'column'),
        gap: stryMutAct_9fa48("879") ? "" : (stryCov_9fa48("879"), '20px'),
        marginTop: stryMutAct_9fa48("880") ? "" : (stryCov_9fa48("880"), '20px')
      })}>
        <div style={stryMutAct_9fa48("881") ? {} : (stryCov_9fa48("881"), {
          padding: stryMutAct_9fa48("882") ? "" : (stryCov_9fa48("882"), '16px'),
          border: stryMutAct_9fa48("883") ? "" : (stryCov_9fa48("883"), '1px solid var(--border)'),
          borderRadius: stryMutAct_9fa48("884") ? "" : (stryCov_9fa48("884"), '8px'),
          backgroundColor: stryMutAct_9fa48("885") ? "" : (stryCov_9fa48("885"), 'var(--code-bg)')
        })}>
          <h3 style={stryMutAct_9fa48("886") ? {} : (stryCov_9fa48("886"), {
            margin: stryMutAct_9fa48("887") ? "" : (stryCov_9fa48("887"), '0 0 8px 0'),
            color: stryMutAct_9fa48("888") ? "" : (stryCov_9fa48("888"), 'var(--text-h)')
          })}>Pedro Henrique P. Santos</h3>
          <p style={stryMutAct_9fa48("889") ? {} : (stryCov_9fa48("889"), {
            margin: 0,
            fontSize: stryMutAct_9fa48("890") ? "" : (stryCov_9fa48("890"), '14px'),
            color: stryMutAct_9fa48("891") ? "" : (stryCov_9fa48("891"), 'var(--accent)')
          })}>Tech Lead</p>
        </div>

        <div style={stryMutAct_9fa48("892") ? {} : (stryCov_9fa48("892"), {
          padding: stryMutAct_9fa48("893") ? "" : (stryCov_9fa48("893"), '16px'),
          border: stryMutAct_9fa48("894") ? "" : (stryCov_9fa48("894"), '1px solid var(--border)'),
          borderRadius: stryMutAct_9fa48("895") ? "" : (stryCov_9fa48("895"), '8px')
        })}>
          <h3 style={stryMutAct_9fa48("896") ? {} : (stryCov_9fa48("896"), {
            margin: stryMutAct_9fa48("897") ? "" : (stryCov_9fa48("897"), '0 0 8px 0'),
            color: stryMutAct_9fa48("898") ? "" : (stryCov_9fa48("898"), 'var(--text-h)')
          })}>
            Arthur Leite (arthurlleite)
          </h3>
          <p style={stryMutAct_9fa48("899") ? {} : (stryCov_9fa48("899"), {
            margin: 0,
            fontSize: stryMutAct_9fa48("900") ? "" : (stryCov_9fa48("900"), '14px')
          })}>Padawan - FullStack</p>
        </div>

        <div style={stryMutAct_9fa48("901") ? {} : (stryCov_9fa48("901"), {
          padding: stryMutAct_9fa48("902") ? "" : (stryCov_9fa48("902"), '16px'),
          border: stryMutAct_9fa48("903") ? "" : (stryCov_9fa48("903"), '1px solid var(--border)'),
          borderRadius: stryMutAct_9fa48("904") ? "" : (stryCov_9fa48("904"), '8px')
        })}>
          <h3 style={stryMutAct_9fa48("905") ? {} : (stryCov_9fa48("905"), {
            margin: stryMutAct_9fa48("906") ? "" : (stryCov_9fa48("906"), '0 0 8px 0'),
            color: stryMutAct_9fa48("907") ? "" : (stryCov_9fa48("907"), 'var(--text-h)')
          })}>
            Alana Feitosa (alanafeitosa-ui)
          </h3>
          <p style={stryMutAct_9fa48("908") ? {} : (stryCov_9fa48("908"), {
            margin: 0,
            fontSize: stryMutAct_9fa48("909") ? "" : (stryCov_9fa48("909"), '14px')
          })}>Padawan - FullStack</p>
        </div>

        <div style={stryMutAct_9fa48("910") ? {} : (stryCov_9fa48("910"), {
          padding: stryMutAct_9fa48("911") ? "" : (stryCov_9fa48("911"), '16px'),
          border: stryMutAct_9fa48("912") ? "" : (stryCov_9fa48("912"), '1px solid var(--border)'),
          borderRadius: stryMutAct_9fa48("913") ? "" : (stryCov_9fa48("913"), '8px')
        })}>
          <h3 style={stryMutAct_9fa48("914") ? {} : (stryCov_9fa48("914"), {
            margin: stryMutAct_9fa48("915") ? "" : (stryCov_9fa48("915"), '0 0 8px 0'),
            color: stryMutAct_9fa48("916") ? "" : (stryCov_9fa48("916"), 'var(--text-h)')
          })}>
            Mateus Araújo (mateusaraujo2006)
          </h3>
          <p style={stryMutAct_9fa48("917") ? {} : (stryCov_9fa48("917"), {
            margin: 0,
            fontSize: stryMutAct_9fa48("918") ? "" : (stryCov_9fa48("918"), '14px')
          })}>Padawan - FullStack</p>
        </div>

        <div style={stryMutAct_9fa48("919") ? {} : (stryCov_9fa48("919"), {
          padding: stryMutAct_9fa48("920") ? "" : (stryCov_9fa48("920"), '16px'),
          border: stryMutAct_9fa48("921") ? "" : (stryCov_9fa48("921"), '1px solid var(--border)'),
          borderRadius: stryMutAct_9fa48("922") ? "" : (stryCov_9fa48("922"), '8px')
        })}>
          <h3 style={stryMutAct_9fa48("923") ? {} : (stryCov_9fa48("923"), {
            margin: stryMutAct_9fa48("924") ? "" : (stryCov_9fa48("924"), '0 0 8px 0'),
            color: stryMutAct_9fa48("925") ? "" : (stryCov_9fa48("925"), 'var(--text-h)')
          })}>
            Mariana Farias (mariana-farias12)
          </h3>
          <p style={stryMutAct_9fa48("926") ? {} : (stryCov_9fa48("926"), {
            margin: 0,
            fontSize: stryMutAct_9fa48("927") ? "" : (stryCov_9fa48("927"), '14px')
          })}>Padawan - FullStack</p>
        </div>
        
        <div style={stryMutAct_9fa48("928") ? {} : (stryCov_9fa48("928"), {
          padding: stryMutAct_9fa48("929") ? "" : (stryCov_9fa48("929"), '16px'),
          border: stryMutAct_9fa48("930") ? "" : (stryCov_9fa48("930"), '1px solid var(--border)'),
          borderRadius: stryMutAct_9fa48("931") ? "" : (stryCov_9fa48("931"), '8px')
        })}>
          <h3 style={stryMutAct_9fa48("932") ? {} : (stryCov_9fa48("932"), {
            margin: stryMutAct_9fa48("933") ? "" : (stryCov_9fa48("933"), '0 0 8px 0'),
            color: stryMutAct_9fa48("934") ? "" : (stryCov_9fa48("934"), 'var(--text-h)')
          })}>
            Luis G. Ferreira Nunes (LuisGFNunes)
          </h3>
          <p style={stryMutAct_9fa48("935") ? {} : (stryCov_9fa48("935"), {
            margin: 0,
            fontSize: stryMutAct_9fa48("936") ? "" : (stryCov_9fa48("936"), '14px')
          })}>Padawan - FullStack</p>
        </div>

      </div>
    </div>;
  }
}
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
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './locales/en/translation.json';
import translationPT from './locales/pt/translation.json';
const resources = stryMutAct_9fa48("852") ? {} : (stryCov_9fa48("852"), {
  en: stryMutAct_9fa48("853") ? {} : (stryCov_9fa48("853"), {
    translation: translationEN
  }),
  pt: stryMutAct_9fa48("854") ? {} : (stryCov_9fa48("854"), {
    translation: translationPT
  })
});
i18n.use(initReactI18next).init(stryMutAct_9fa48("855") ? {} : (stryCov_9fa48("855"), {
  resources,
  lng: stryMutAct_9fa48("856") ? "" : (stryCov_9fa48("856"), 'pt'),
  // default language
  fallbackLng: stryMutAct_9fa48("857") ? "" : (stryCov_9fa48("857"), 'en'),
  interpolation: stryMutAct_9fa48("858") ? {} : (stryCov_9fa48("858"), {
    escapeValue: stryMutAct_9fa48("859") ? true : (stryCov_9fa48("859"), false)
  })
}));
export default i18n;
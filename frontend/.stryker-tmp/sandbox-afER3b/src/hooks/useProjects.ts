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
import { useQuery } from '@tanstack/react-query';
import { getProjects } from '../services/api';
export const useProjects = () => {
  if (stryMutAct_9fa48("838")) {
    {}
  } else {
    stryCov_9fa48("838");
    return useQuery(stryMutAct_9fa48("839") ? {} : (stryCov_9fa48("839"), {
      queryKey: stryMutAct_9fa48("840") ? [] : (stryCov_9fa48("840"), [stryMutAct_9fa48("841") ? "" : (stryCov_9fa48("841"), 'projects')]),
      queryFn: async () => {
        if (stryMutAct_9fa48("842")) {
          {}
        } else {
          stryCov_9fa48("842");
          const res = await getProjects();
          if (stryMutAct_9fa48("845") ? false : stryMutAct_9fa48("844") ? true : stryMutAct_9fa48("843") ? res.sucesso : (stryCov_9fa48("843", "844", "845"), !res.sucesso)) throw new Error(res.mensagem);
          return stryMutAct_9fa48("848") ? res.dados && [] : stryMutAct_9fa48("847") ? false : stryMutAct_9fa48("846") ? true : (stryCov_9fa48("846", "847", "848"), res.dados || (stryMutAct_9fa48("849") ? ["Stryker was here"] : (stryCov_9fa48("849"), [])));
        }
      },
      staleTime: stryMutAct_9fa48("850") ? 5 * 60 / 1000 : (stryCov_9fa48("850"), (stryMutAct_9fa48("851") ? 5 / 60 : (stryCov_9fa48("851"), 5 * 60)) * 1000) // 5 minutos
    }));
  }
};
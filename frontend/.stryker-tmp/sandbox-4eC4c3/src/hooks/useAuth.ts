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
import { useMutation } from '@tanstack/react-query';
import { requestPasswordRecovery, verifyRecoveryCode, resetPassword } from '../services/api';
export const useRequestRecovery = () => {
  if (stryMutAct_9fa48("692")) {
    {}
  } else {
    stryCov_9fa48("692");
    return useMutation(stryMutAct_9fa48("693") ? {} : (stryCov_9fa48("693"), {
      mutationFn: async (email: string) => {
        if (stryMutAct_9fa48("694")) {
          {}
        } else {
          stryCov_9fa48("694");
          const res = await requestPasswordRecovery(email);
          if (stryMutAct_9fa48("697") ? false : stryMutAct_9fa48("696") ? true : stryMutAct_9fa48("695") ? res.sucesso : (stryCov_9fa48("695", "696", "697"), !res.sucesso)) throw new Error(res.mensagem);
          return res;
        }
      }
    }));
  }
};
export const useVerifyRecovery = () => {
  if (stryMutAct_9fa48("698")) {
    {}
  } else {
    stryCov_9fa48("698");
    return useMutation(stryMutAct_9fa48("699") ? {} : (stryCov_9fa48("699"), {
      mutationFn: async ({
        email,
        code
      }: {
        email: string;
        code: string;
      }) => {
        if (stryMutAct_9fa48("700")) {
          {}
        } else {
          stryCov_9fa48("700");
          const res = await verifyRecoveryCode(email, code);
          if (stryMutAct_9fa48("703") ? false : stryMutAct_9fa48("702") ? true : stryMutAct_9fa48("701") ? res.sucesso : (stryCov_9fa48("701", "702", "703"), !res.sucesso)) throw new Error(res.mensagem);
          return res;
        }
      }
    }));
  }
};
export const useResetPassword = () => {
  if (stryMutAct_9fa48("704")) {
    {}
  } else {
    stryCov_9fa48("704");
    return useMutation(stryMutAct_9fa48("705") ? {} : (stryCov_9fa48("705"), {
      mutationFn: async ({
        email,
        code,
        newPassword
      }: {
        email: string;
        code: string;
        newPassword: string;
      }) => {
        if (stryMutAct_9fa48("706")) {
          {}
        } else {
          stryCov_9fa48("706");
          const res = await resetPassword(email, code, newPassword);
          if (stryMutAct_9fa48("709") ? false : stryMutAct_9fa48("708") ? true : stryMutAct_9fa48("707") ? res.sucesso : (stryCov_9fa48("707", "708", "709"), !res.sucesso)) throw new Error(res.mensagem);
          return res;
        }
      }
    }));
  }
};
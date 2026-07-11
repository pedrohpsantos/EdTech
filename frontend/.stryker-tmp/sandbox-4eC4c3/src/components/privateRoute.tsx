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
import { ReactNode } from 'react';
import { useAuth } from '../context/authContext';
import { Navigate } from 'react-router-dom';
import GlobalLoader from './GlobalLoader';
function PrivateRoute({
  children,
  allowedRoles
}: {
  children: ReactNode;
  allowedRoles?: string[];
}) {
  if (stryMutAct_9fa48("612")) {
    {}
  } else {
    stryCov_9fa48("612");
    const {
      user,
      isAuthenticated,
      isLoading
    } = useAuth();
    if (stryMutAct_9fa48("615") ? isLoading != true : stryMutAct_9fa48("614") ? false : stryMutAct_9fa48("613") ? true : (stryCov_9fa48("613", "614", "615"), isLoading == (stryMutAct_9fa48("616") ? false : (stryCov_9fa48("616"), true)))) {
      if (stryMutAct_9fa48("617")) {
        {}
      } else {
        stryCov_9fa48("617");
        return <GlobalLoader forceShow />;
      }
    }
    if (stryMutAct_9fa48("620") ? false : stryMutAct_9fa48("619") ? true : stryMutAct_9fa48("618") ? isAuthenticated : (stryCov_9fa48("618", "619", "620"), !isAuthenticated)) {
      if (stryMutAct_9fa48("621")) {
        {}
      } else {
        stryCov_9fa48("621");
        return <Navigate to="/login" />;
      }
    }
    if (stryMutAct_9fa48("624") ? allowedRoles && user || !allowedRoles.includes(user.role) : stryMutAct_9fa48("623") ? false : stryMutAct_9fa48("622") ? true : (stryCov_9fa48("622", "623", "624"), (stryMutAct_9fa48("626") ? allowedRoles || user : stryMutAct_9fa48("625") ? true : (stryCov_9fa48("625", "626"), allowedRoles && user)) && (stryMutAct_9fa48("627") ? allowedRoles.includes(user.role) : (stryCov_9fa48("627"), !allowedRoles.includes(user.role))))) {
      if (stryMutAct_9fa48("628")) {
        {}
      } else {
        stryCov_9fa48("628");
        return <Navigate to="/dashboard" />;
      }
    }
    return children;
  }
}
export default PrivateRoute;
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
import React, { Component, ErrorInfo, ReactNode } from 'react';
interface Props {
  children?: ReactNode;
}
interface State {
  hasError: boolean;
}
class ErrorBoundary extends Component<Props, State> {
  public state: State = stryMutAct_9fa48("334") ? {} : (stryCov_9fa48("334"), {
    hasError: stryMutAct_9fa48("335") ? true : (stryCov_9fa48("335"), false)
  });
  public static getDerivedStateFromError(_: Error): State {
    if (stryMutAct_9fa48("336")) {
      {}
    } else {
      stryCov_9fa48("336");
      return stryMutAct_9fa48("337") ? {} : (stryCov_9fa48("337"), {
        hasError: stryMutAct_9fa48("338") ? false : (stryCov_9fa48("338"), true)
      });
    }
  }
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (stryMutAct_9fa48("339")) {
      {}
    } else {
      stryCov_9fa48("339");
      console.error(stryMutAct_9fa48("340") ? "" : (stryCov_9fa48("340"), 'Uncaught error:'), error, errorInfo);
    }
  }
  public render() {
    if (stryMutAct_9fa48("341")) {
      {}
    } else {
      stryCov_9fa48("341");
      if (stryMutAct_9fa48("343") ? false : stryMutAct_9fa48("342") ? true : (stryCov_9fa48("342", "343"), this.state.hasError)) {
        if (stryMutAct_9fa48("344")) {
          {}
        } else {
          stryCov_9fa48("344");
          return <div style={stryMutAct_9fa48("345") ? {} : (stryCov_9fa48("345"), {
            padding: stryMutAct_9fa48("346") ? "" : (stryCov_9fa48("346"), '2rem'),
            textAlign: stryMutAct_9fa48("347") ? "" : (stryCov_9fa48("347"), 'center'),
            fontFamily: stryMutAct_9fa48("348") ? "" : (stryCov_9fa48("348"), 'sans-serif'),
            marginTop: stryMutAct_9fa48("349") ? "" : (stryCov_9fa48("349"), '10%')
          })}>
          <h2>Oops! Algo deu errado.</h2>
          <p className="text-muted">Nossa equipe já foi notificada. Por favor, recarregue a página.</p>
          <button className="btn btn-primary mt-3" onClick={stryMutAct_9fa48("350") ? () => undefined : (stryCov_9fa48("350"), () => window.location.reload())}>
            Recarregar
          </button>
        </div>;
        }
      }
      return this.props.children;
    }
  }
}
export default ErrorBoundary;
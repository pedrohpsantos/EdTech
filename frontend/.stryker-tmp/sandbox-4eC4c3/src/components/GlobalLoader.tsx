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
import React, { useEffect, useState } from 'react';
import './GlobalLoader.css';
interface GlobalLoaderProps {
  forceShow?: boolean;
}
const GlobalLoader: React.FC<GlobalLoaderProps> = ({
  forceShow = stryMutAct_9fa48("351") ? true : (stryCov_9fa48("351"), false)
}) => {
  if (stryMutAct_9fa48("352")) {
    {}
  } else {
    stryCov_9fa48("352");
    const [isLoading, setIsLoading] = useState(stryMutAct_9fa48("353") ? true : (stryCov_9fa48("353"), false));
    useEffect(() => {
      if (stryMutAct_9fa48("354")) {
        {}
      } else {
        stryCov_9fa48("354");
        const handleShow = stryMutAct_9fa48("355") ? () => undefined : (stryCov_9fa48("355"), (() => {
          const handleShow = () => setIsLoading(stryMutAct_9fa48("356") ? false : (stryCov_9fa48("356"), true));
          return handleShow;
        })());
        const handleHide = stryMutAct_9fa48("357") ? () => undefined : (stryCov_9fa48("357"), (() => {
          const handleHide = () => setIsLoading(stryMutAct_9fa48("358") ? true : (stryCov_9fa48("358"), false));
          return handleHide;
        })());
        window.addEventListener(stryMutAct_9fa48("359") ? "" : (stryCov_9fa48("359"), 'showLoader'), handleShow);
        window.addEventListener(stryMutAct_9fa48("360") ? "" : (stryCov_9fa48("360"), 'hideLoader'), handleHide);
        return () => {
          if (stryMutAct_9fa48("361")) {
            {}
          } else {
            stryCov_9fa48("361");
            window.removeEventListener(stryMutAct_9fa48("362") ? "" : (stryCov_9fa48("362"), 'showLoader'), handleShow);
            window.removeEventListener(stryMutAct_9fa48("363") ? "" : (stryCov_9fa48("363"), 'hideLoader'), handleHide);
          }
        };
      }
    }, stryMutAct_9fa48("364") ? ["Stryker was here"] : (stryCov_9fa48("364"), []));
    if (stryMutAct_9fa48("367") ? !isLoading || !forceShow : stryMutAct_9fa48("366") ? false : stryMutAct_9fa48("365") ? true : (stryCov_9fa48("365", "366", "367"), (stryMutAct_9fa48("368") ? isLoading : (stryCov_9fa48("368"), !isLoading)) && (stryMutAct_9fa48("369") ? forceShow : (stryCov_9fa48("369"), !forceShow)))) return null;
    return <div className="global-loader-overlay">
      <div className="global-loader-container">
        <div className="cube-wrapper">
          <div className="cube-folding">
            <span className="leaf1"></span>
            <span className="leaf2"></span>
            <span className="leaf3"></span>
            <span className="leaf4"></span>
          </div>
          <span className="loading-text" data-name="Processando">
            Processando
          </span>
        </div>
      </div>
    </div>;
  }
};
export default GlobalLoader;
/* eslint-disable react-refresh/only-export-components */
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
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { login, logout, register, getMe } from '../services/api';
import { User, ApiResponse } from '../types';
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  handleLogin: (email: string, senha: string) => Promise<ApiResponse<any>>;
  handleRegister: (nome: string, email: string, senha: string, role?: string) => Promise<ApiResponse<any>>;
  handleLogout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export function AuthProvider({
  children
}: {
  children: ReactNode;
}) {
  if (stryMutAct_9fa48("649")) {
    {}
  } else {
    stryCov_9fa48("649");
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(stryMutAct_9fa48("650") ? true : (stryCov_9fa48("650"), false));
    const [isLoading, setIsLoading] = useState<boolean>(stryMutAct_9fa48("651") ? false : (stryCov_9fa48("651"), true));
    const checkAuth = async () => {
      if (stryMutAct_9fa48("652")) {
        {}
      } else {
        stryCov_9fa48("652");
        try {
          if (stryMutAct_9fa48("653")) {
            {}
          } else {
            stryCov_9fa48("653");
            const resultado = await getMe();
            if (stryMutAct_9fa48("656") ? resultado.sucesso || resultado.dados : stryMutAct_9fa48("655") ? false : stryMutAct_9fa48("654") ? true : (stryCov_9fa48("654", "655", "656"), resultado.sucesso && resultado.dados)) {
              if (stryMutAct_9fa48("657")) {
                {}
              } else {
                stryCov_9fa48("657");
                setUser(resultado.dados);
                setIsAuthenticated(stryMutAct_9fa48("658") ? false : (stryCov_9fa48("658"), true));
              }
            } else {
              if (stryMutAct_9fa48("659")) {
                {}
              } else {
                stryCov_9fa48("659");
                setUser(null);
                setIsAuthenticated(stryMutAct_9fa48("660") ? true : (stryCov_9fa48("660"), false));
              }
            }
          }
        } catch {
          if (stryMutAct_9fa48("661")) {
            {}
          } else {
            stryCov_9fa48("661");
            setUser(null);
            setIsAuthenticated(stryMutAct_9fa48("662") ? true : (stryCov_9fa48("662"), false));
          }
        } finally {
          if (stryMutAct_9fa48("663")) {
            {}
          } else {
            stryCov_9fa48("663");
            setIsLoading(stryMutAct_9fa48("664") ? true : (stryCov_9fa48("664"), false));
          }
        }
      }
    };
    const handleLogin = async (email: string, senha: string): Promise<ApiResponse<any>> => {
      if (stryMutAct_9fa48("665")) {
        {}
      } else {
        stryCov_9fa48("665");
        try {
          if (stryMutAct_9fa48("666")) {
            {}
          } else {
            stryCov_9fa48("666");
            const resultado = await login(email, senha);
            if (stryMutAct_9fa48("669") ? resultado.sucesso == true || resultado.dados : stryMutAct_9fa48("668") ? false : stryMutAct_9fa48("667") ? true : (stryCov_9fa48("667", "668", "669"), (stryMutAct_9fa48("671") ? resultado.sucesso != true : stryMutAct_9fa48("670") ? true : (stryCov_9fa48("670", "671"), resultado.sucesso == (stryMutAct_9fa48("672") ? false : (stryCov_9fa48("672"), true)))) && resultado.dados)) {
              if (stryMutAct_9fa48("673")) {
                {}
              } else {
                stryCov_9fa48("673");
                setUser(resultado.dados);
                setIsAuthenticated(stryMutAct_9fa48("674") ? false : (stryCov_9fa48("674"), true));
              }
            }
            return resultado;
          }
        } catch (erro: any) {
          if (stryMutAct_9fa48("675")) {
            {}
          } else {
            stryCov_9fa48("675");
            setUser(null);
            setIsAuthenticated(stryMutAct_9fa48("676") ? true : (stryCov_9fa48("676"), false));
            return stryMutAct_9fa48("677") ? {} : (stryCov_9fa48("677"), {
              sucesso: stryMutAct_9fa48("678") ? true : (stryCov_9fa48("678"), false),
              mensagem: erro.message
            });
          }
        }
      }
    };
    const handleLogout = async (): Promise<void> => {
      if (stryMutAct_9fa48("679")) {
        {}
      } else {
        stryCov_9fa48("679");
        await logout();
        setUser(null);
        setIsAuthenticated(stryMutAct_9fa48("680") ? true : (stryCov_9fa48("680"), false));
      }
    };
    const handleRegister = async (nome: string, email: string, senha: string, role: string = stryMutAct_9fa48("681") ? "" : (stryCov_9fa48("681"), 'RESEARCHER')): Promise<ApiResponse<any>> => {
      if (stryMutAct_9fa48("682")) {
        {}
      } else {
        stryCov_9fa48("682");
        const resultado = await register(nome, email, senha, role);
        return resultado;
      }
    };
    useEffect(() => {
      if (stryMutAct_9fa48("683")) {
        {}
      } else {
        stryCov_9fa48("683");
        // eslint-disable-next-line react-hooks/set-state-in-effect
        checkAuth();
      }
    }, stryMutAct_9fa48("684") ? ["Stryker was here"] : (stryCov_9fa48("684"), []));
    return <AuthContext.Provider value={stryMutAct_9fa48("685") ? {} : (stryCov_9fa48("685"), {
      handleLogin,
      handleLogout,
      handleRegister,
      checkAuth,
      user,
      isAuthenticated,
      isLoading
    })}>
      {children}
    </AuthContext.Provider>;
  }
}
export default AuthProvider;
export const useAuth = () => {
  if (stryMutAct_9fa48("686")) {
    {}
  } else {
    stryCov_9fa48("686");
    const context = useContext(AuthContext);
    if (stryMutAct_9fa48("689") ? context !== undefined : stryMutAct_9fa48("688") ? false : stryMutAct_9fa48("687") ? true : (stryCov_9fa48("687", "688", "689"), context === undefined)) {
      if (stryMutAct_9fa48("690")) {
        {}
      } else {
        stryCov_9fa48("690");
        throw new Error(stryMutAct_9fa48("691") ? "" : (stryCov_9fa48("691"), 'useAuth must be used within an AuthProvider'));
      }
    }
    return context;
  }
};
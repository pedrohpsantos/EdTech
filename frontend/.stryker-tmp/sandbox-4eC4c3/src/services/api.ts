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
import axios, { InternalAxiosRequestConfig } from 'axios';
import { ApiResponse, User, Project, Document } from '../types';
const BASE_URL = stryMutAct_9fa48("3173") ? import.meta.env?.VITE_API_URL && '' : (stryCov_9fa48("3173"), (stryMutAct_9fa48("3174") ? import.meta.env.VITE_API_URL : (stryCov_9fa48("3174"), import.meta.env?.VITE_API_URL)) ?? (stryMutAct_9fa48("3175") ? "Stryker was here!" : (stryCov_9fa48("3175"), '')));
const api = axios.create(stryMutAct_9fa48("3176") ? {} : (stryCov_9fa48("3176"), {
  baseURL: BASE_URL
}));
let activeRequests = 0;
let loaderTimeout: number | null = null;
const showLoader = () => {
  if (stryMutAct_9fa48("3177")) {
    {}
  } else {
    stryCov_9fa48("3177");
    stryMutAct_9fa48("3178") ? activeRequests-- : (stryCov_9fa48("3178"), activeRequests++);
    if (stryMutAct_9fa48("3181") ? activeRequests !== 1 : stryMutAct_9fa48("3180") ? false : stryMutAct_9fa48("3179") ? true : (stryCov_9fa48("3179", "3180", "3181"), activeRequests === 1)) {
      if (stryMutAct_9fa48("3182")) {
        {}
      } else {
        stryCov_9fa48("3182");
        loaderTimeout = window.setTimeout(() => {
          if (stryMutAct_9fa48("3183")) {
            {}
          } else {
            stryCov_9fa48("3183");
            window.dispatchEvent(new Event(stryMutAct_9fa48("3184") ? "" : (stryCov_9fa48("3184"), 'showLoader')));
          }
        }, 500); // Show loader only if request takes more than 500ms
      }
    }
  }
};
const hideLoader = () => {
  if (stryMutAct_9fa48("3185")) {
    {}
  } else {
    stryCov_9fa48("3185");
    activeRequests = stryMutAct_9fa48("3186") ? Math.min(0, activeRequests - 1) : (stryCov_9fa48("3186"), Math.max(0, stryMutAct_9fa48("3187") ? activeRequests + 1 : (stryCov_9fa48("3187"), activeRequests - 1)));
    if (stryMutAct_9fa48("3190") ? activeRequests !== 0 : stryMutAct_9fa48("3189") ? false : stryMutAct_9fa48("3188") ? true : (stryCov_9fa48("3188", "3189", "3190"), activeRequests === 0)) {
      if (stryMutAct_9fa48("3191")) {
        {}
      } else {
        stryCov_9fa48("3191");
        if (stryMutAct_9fa48("3194") ? loaderTimeout === null : stryMutAct_9fa48("3193") ? false : stryMutAct_9fa48("3192") ? true : (stryCov_9fa48("3192", "3193", "3194"), loaderTimeout !== null)) {
          if (stryMutAct_9fa48("3195")) {
            {}
          } else {
            stryCov_9fa48("3195");
            window.clearTimeout(loaderTimeout);
            loaderTimeout = null;
          }
        }
        window.dispatchEvent(new Event(stryMutAct_9fa48("3196") ? "" : (stryCov_9fa48("3196"), 'hideLoader')));
      }
    }
  }
};
const generateRequestId = () => {
  if (stryMutAct_9fa48("3197")) {
    {}
  } else {
    stryCov_9fa48("3197");
    return (stryMutAct_9fa48("3198") ? "" : (stryCov_9fa48("3198"), 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx')).replace(stryMutAct_9fa48("3199") ? /[^xy]/g : (stryCov_9fa48("3199"), /[xy]/g), function (c) {
      if (stryMutAct_9fa48("3200")) {
        {}
      } else {
        stryCov_9fa48("3200");
        const r = (stryMutAct_9fa48("3201") ? Math.random() / 16 : (stryCov_9fa48("3201"), Math.random() * 16)) | 0,
          v = (stryMutAct_9fa48("3204") ? c !== 'x' : stryMutAct_9fa48("3203") ? false : stryMutAct_9fa48("3202") ? true : (stryCov_9fa48("3202", "3203", "3204"), c === (stryMutAct_9fa48("3205") ? "" : (stryCov_9fa48("3205"), 'x')))) ? r : r & 0x3 | 0x8;
        return v.toString(16);
      }
    });
  }
};

// Interceptor para adicionar o token de autorização, X-Request-ID e mostrar o loader
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (stryMutAct_9fa48("3206")) {
    {}
  } else {
    stryCov_9fa48("3206");
    showLoader();
    const token = localStorage.getItem(stryMutAct_9fa48("3207") ? "" : (stryCov_9fa48("3207"), 'token'));
    if (stryMutAct_9fa48("3209") ? false : stryMutAct_9fa48("3208") ? true : (stryCov_9fa48("3208", "3209"), token)) {
      if (stryMutAct_9fa48("3210")) {
        {}
      } else {
        stryCov_9fa48("3210");
        config.headers[stryMutAct_9fa48("3211") ? "" : (stryCov_9fa48("3211"), 'Authorization')] = stryMutAct_9fa48("3212") ? `` : (stryCov_9fa48("3212"), `Bearer ${token}`);
      }
    }
    config.headers[stryMutAct_9fa48("3213") ? "" : (stryCov_9fa48("3213"), 'X-Request-ID')] = generateRequestId();
    return config;
  }
});

// Interceptor para tratamento de sessão expirada (401) e esconder o loader
api.interceptors.response.use(response => {
  if (stryMutAct_9fa48("3214")) {
    {}
  } else {
    stryCov_9fa48("3214");
    hideLoader();
    return response;
  }
}, error => {
  if (stryMutAct_9fa48("3215")) {
    {}
  } else {
    stryCov_9fa48("3215");
    hideLoader();
    if (stryMutAct_9fa48("3218") ? error.response || error.response.status === 401 : stryMutAct_9fa48("3217") ? false : stryMutAct_9fa48("3216") ? true : (stryCov_9fa48("3216", "3217", "3218"), error.response && (stryMutAct_9fa48("3220") ? error.response.status !== 401 : stryMutAct_9fa48("3219") ? true : (stryCov_9fa48("3219", "3220"), error.response.status === 401)))) {
      if (stryMutAct_9fa48("3221")) {
        {}
      } else {
        stryCov_9fa48("3221");
        // Ignorar redirect no próprio login e no endpoint de checagem de sessão
        if (stryMutAct_9fa48("3224") ? !error.config.url.includes('/api/auth/login') || !error.config.url.includes('/api/auth/me') : stryMutAct_9fa48("3223") ? false : stryMutAct_9fa48("3222") ? true : (stryCov_9fa48("3222", "3223", "3224"), (stryMutAct_9fa48("3225") ? error.config.url.includes('/api/auth/login') : (stryCov_9fa48("3225"), !error.config.url.includes(stryMutAct_9fa48("3226") ? "" : (stryCov_9fa48("3226"), '/api/auth/login')))) && (stryMutAct_9fa48("3227") ? error.config.url.includes('/api/auth/me') : (stryCov_9fa48("3227"), !error.config.url.includes(stryMutAct_9fa48("3228") ? "" : (stryCov_9fa48("3228"), '/api/auth/me')))))) {
          if (stryMutAct_9fa48("3229")) {
            {}
          } else {
            stryCov_9fa48("3229");
            window.location.href = stryMutAct_9fa48("3230") ? "" : (stryCov_9fa48("3230"), '/login?session_expired=true');
          }
        }
      }
    }
    return Promise.reject(error);
  }
});

// Utilitário padrão para tratamento de erros
const handleApiError = <T = any,>(error: any, defaultMessage: string): ApiResponse<T> => {
  if (stryMutAct_9fa48("3231")) {
    {}
  } else {
    stryCov_9fa48("3231");
    const message = stryMutAct_9fa48("3234") ? (error.response?.data?.message || error.message) && defaultMessage : stryMutAct_9fa48("3233") ? false : stryMutAct_9fa48("3232") ? true : (stryCov_9fa48("3232", "3233", "3234"), (stryMutAct_9fa48("3236") ? error.response?.data?.message && error.message : stryMutAct_9fa48("3235") ? false : (stryCov_9fa48("3235", "3236"), (stryMutAct_9fa48("3238") ? error.response.data?.message : stryMutAct_9fa48("3237") ? error.response?.data.message : (stryCov_9fa48("3237", "3238"), error.response?.data?.message)) || error.message)) || defaultMessage);
    return stryMutAct_9fa48("3239") ? {} : (stryCov_9fa48("3239"), {
      sucesso: stryMutAct_9fa48("3240") ? true : (stryCov_9fa48("3240"), false),
      mensagem: message
    });
  }
};
export const login = async (email: string, senha: string): Promise<ApiResponse<any>> => {
  if (stryMutAct_9fa48("3241")) {
    {}
  } else {
    stryCov_9fa48("3241");
    try {
      if (stryMutAct_9fa48("3242")) {
        {}
      } else {
        stryCov_9fa48("3242");
        const resposta = await api.post(stryMutAct_9fa48("3243") ? "" : (stryCov_9fa48("3243"), '/api/auth/login'), stryMutAct_9fa48("3244") ? {} : (stryCov_9fa48("3244"), {
          email,
          password: senha
        }));
        if (stryMutAct_9fa48("3247") ? resposta.status === 202 || resposta.data.mfaRequired : stryMutAct_9fa48("3246") ? false : stryMutAct_9fa48("3245") ? true : (stryCov_9fa48("3245", "3246", "3247"), (stryMutAct_9fa48("3249") ? resposta.status !== 202 : stryMutAct_9fa48("3248") ? true : (stryCov_9fa48("3248", "3249"), resposta.status === 202)) && resposta.data.mfaRequired)) {
          if (stryMutAct_9fa48("3250")) {
            {}
          } else {
            stryCov_9fa48("3250");
            return stryMutAct_9fa48("3251") ? {} : (stryCov_9fa48("3251"), {
              sucesso: stryMutAct_9fa48("3252") ? false : (stryCov_9fa48("3252"), true),
              dados: stryMutAct_9fa48("3253") ? {} : (stryCov_9fa48("3253"), {
                mfaRequired: stryMutAct_9fa48("3254") ? false : (stryCov_9fa48("3254"), true),
                email: resposta.data.email
              })
            });
          }
        }
        if (stryMutAct_9fa48("3256") ? false : stryMutAct_9fa48("3255") ? true : (stryCov_9fa48("3255", "3256"), resposta.data.token)) {
          if (stryMutAct_9fa48("3257")) {
            {}
          } else {
            stryCov_9fa48("3257");
            localStorage.setItem(stryMutAct_9fa48("3258") ? "" : (stryCov_9fa48("3258"), 'token'), resposta.data.token);
          }
        }
        return stryMutAct_9fa48("3259") ? {} : (stryCov_9fa48("3259"), {
          sucesso: stryMutAct_9fa48("3260") ? false : (stryCov_9fa48("3260"), true),
          dados: resposta.data.user
        });
      }
    } catch (error) {
      if (stryMutAct_9fa48("3261")) {
        {}
      } else {
        stryCov_9fa48("3261");
        return handleApiError(error, stryMutAct_9fa48("3262") ? "" : (stryCov_9fa48("3262"), 'Erro ao realizar o login. Verifique seus dados e tente novamente'));
      }
    }
  }
};
export const verify2FaLogin = async (email: string, senha: string, code: string): Promise<ApiResponse<any>> => {
  if (stryMutAct_9fa48("3263")) {
    {}
  } else {
    stryCov_9fa48("3263");
    try {
      if (stryMutAct_9fa48("3264")) {
        {}
      } else {
        stryCov_9fa48("3264");
        const resposta = await api.post(stryMutAct_9fa48("3265") ? "" : (stryCov_9fa48("3265"), '/api/auth/login/verify-2fa'), stryMutAct_9fa48("3266") ? {} : (stryCov_9fa48("3266"), {
          email,
          password: senha,
          code
        }));
        if (stryMutAct_9fa48("3268") ? false : stryMutAct_9fa48("3267") ? true : (stryCov_9fa48("3267", "3268"), resposta.data.token)) {
          if (stryMutAct_9fa48("3269")) {
            {}
          } else {
            stryCov_9fa48("3269");
            localStorage.setItem(stryMutAct_9fa48("3270") ? "" : (stryCov_9fa48("3270"), 'token'), resposta.data.token);
          }
        }
        return stryMutAct_9fa48("3271") ? {} : (stryCov_9fa48("3271"), {
          sucesso: stryMutAct_9fa48("3272") ? false : (stryCov_9fa48("3272"), true),
          dados: resposta.data.user
        });
      }
    } catch (error) {
      if (stryMutAct_9fa48("3273")) {
        {}
      } else {
        stryCov_9fa48("3273");
        return handleApiError(error, stryMutAct_9fa48("3274") ? "" : (stryCov_9fa48("3274"), 'Código de verificação 2FA inválido.'));
      }
    }
  }
};
export const setup2Fa = async (): Promise<ApiResponse<{
  secret: string;
  qrCodeUri: string;
}>> => {
  if (stryMutAct_9fa48("3275")) {
    {}
  } else {
    stryCov_9fa48("3275");
    try {
      if (stryMutAct_9fa48("3276")) {
        {}
      } else {
        stryCov_9fa48("3276");
        const resposta = await api.get(stryMutAct_9fa48("3277") ? "" : (stryCov_9fa48("3277"), '/api/auth/2fa/setup'));
        return stryMutAct_9fa48("3278") ? {} : (stryCov_9fa48("3278"), {
          sucesso: stryMutAct_9fa48("3279") ? false : (stryCov_9fa48("3279"), true),
          dados: resposta.data
        });
      }
    } catch (error) {
      if (stryMutAct_9fa48("3280")) {
        {}
      } else {
        stryCov_9fa48("3280");
        return handleApiError(error, stryMutAct_9fa48("3281") ? "" : (stryCov_9fa48("3281"), 'Erro ao configurar 2FA.'));
      }
    }
  }
};
export const enable2Fa = async (code: string): Promise<ApiResponse<any>> => {
  if (stryMutAct_9fa48("3282")) {
    {}
  } else {
    stryCov_9fa48("3282");
    try {
      if (stryMutAct_9fa48("3283")) {
        {}
      } else {
        stryCov_9fa48("3283");
        const resposta = await api.post(stryMutAct_9fa48("3284") ? "" : (stryCov_9fa48("3284"), '/api/auth/2fa/enable'), stryMutAct_9fa48("3285") ? {} : (stryCov_9fa48("3285"), {
          code
        }));
        return stryMutAct_9fa48("3286") ? {} : (stryCov_9fa48("3286"), {
          sucesso: stryMutAct_9fa48("3287") ? false : (stryCov_9fa48("3287"), true),
          dados: resposta.data
        });
      }
    } catch (error) {
      if (stryMutAct_9fa48("3288")) {
        {}
      } else {
        stryCov_9fa48("3288");
        return handleApiError(error, stryMutAct_9fa48("3289") ? "" : (stryCov_9fa48("3289"), 'Código 2FA inválido.'));
      }
    }
  }
};
export const register = async (nome: string, email: string, senha: string, role: string): Promise<ApiResponse<any>> => {
  if (stryMutAct_9fa48("3290")) {
    {}
  } else {
    stryCov_9fa48("3290");
    try {
      if (stryMutAct_9fa48("3291")) {
        {}
      } else {
        stryCov_9fa48("3291");
        const resposta = await api.post(stryMutAct_9fa48("3292") ? "" : (stryCov_9fa48("3292"), '/api/auth/register'), stryMutAct_9fa48("3293") ? {} : (stryCov_9fa48("3293"), {
          name: nome,
          email,
          password: senha,
          role
        }));
        // Token is no longer returned in /register, but /register/verify
        return stryMutAct_9fa48("3294") ? {} : (stryCov_9fa48("3294"), {
          sucesso: stryMutAct_9fa48("3295") ? false : (stryCov_9fa48("3295"), true),
          dados: resposta.data.user
        });
      }
    } catch (error) {
      if (stryMutAct_9fa48("3296")) {
        {}
      } else {
        stryCov_9fa48("3296");
        return handleApiError(error, stryMutAct_9fa48("3297") ? "" : (stryCov_9fa48("3297"), 'Erro ao realizar o cadastro. Por favor verifique os dados e tente novamente.'));
      }
    }
  }
};
export const verifyRegistration = async (email: string, code: string): Promise<ApiResponse<any>> => {
  if (stryMutAct_9fa48("3298")) {
    {}
  } else {
    stryCov_9fa48("3298");
    try {
      if (stryMutAct_9fa48("3299")) {
        {}
      } else {
        stryCov_9fa48("3299");
        const resposta = await api.post(stryMutAct_9fa48("3300") ? "" : (stryCov_9fa48("3300"), '/api/auth/register/verify'), stryMutAct_9fa48("3301") ? {} : (stryCov_9fa48("3301"), {
          email,
          code
        }));
        if (stryMutAct_9fa48("3303") ? false : stryMutAct_9fa48("3302") ? true : (stryCov_9fa48("3302", "3303"), resposta.data.token)) {
          if (stryMutAct_9fa48("3304")) {
            {}
          } else {
            stryCov_9fa48("3304");
            localStorage.setItem(stryMutAct_9fa48("3305") ? "" : (stryCov_9fa48("3305"), 'token'), resposta.data.token);
          }
        }
        return stryMutAct_9fa48("3306") ? {} : (stryCov_9fa48("3306"), {
          sucesso: stryMutAct_9fa48("3307") ? false : (stryCov_9fa48("3307"), true),
          dados: resposta.data.user
        });
      }
    } catch (error) {
      if (stryMutAct_9fa48("3308")) {
        {}
      } else {
        stryCov_9fa48("3308");
        return handleApiError(error, stryMutAct_9fa48("3309") ? "" : (stryCov_9fa48("3309"), 'Código de verificação inválido ou expirado.'));
      }
    }
  }
};
export const logout = async (): Promise<ApiResponse<void>> => {
  if (stryMutAct_9fa48("3310")) {
    {}
  } else {
    stryCov_9fa48("3310");
    try {
      if (stryMutAct_9fa48("3311")) {
        {}
      } else {
        stryCov_9fa48("3311");
        await api.post(stryMutAct_9fa48("3312") ? "" : (stryCov_9fa48("3312"), '/api/auth/logout'));
        localStorage.removeItem(stryMutAct_9fa48("3313") ? "" : (stryCov_9fa48("3313"), 'token'));
        return stryMutAct_9fa48("3314") ? {} : (stryCov_9fa48("3314"), {
          sucesso: stryMutAct_9fa48("3315") ? false : (stryCov_9fa48("3315"), true)
        });
      }
    } catch (error) {
      if (stryMutAct_9fa48("3316")) {
        {}
      } else {
        stryCov_9fa48("3316");
        localStorage.removeItem(stryMutAct_9fa48("3317") ? "" : (stryCov_9fa48("3317"), 'token'));
        return handleApiError(error, stryMutAct_9fa48("3318") ? "" : (stryCov_9fa48("3318"), 'Falha ao encerrar sessão'));
      }
    }
  }
};
export const getMe = async (): Promise<ApiResponse<User>> => {
  if (stryMutAct_9fa48("3319")) {
    {}
  } else {
    stryCov_9fa48("3319");
    try {
      if (stryMutAct_9fa48("3320")) {
        {}
      } else {
        stryCov_9fa48("3320");
        const resposta = await api.get(stryMutAct_9fa48("3321") ? "" : (stryCov_9fa48("3321"), '/api/auth/me'));
        return stryMutAct_9fa48("3322") ? {} : (stryCov_9fa48("3322"), {
          sucesso: stryMutAct_9fa48("3323") ? false : (stryCov_9fa48("3323"), true),
          dados: resposta.data
        });
      }
    } catch (error) {
      if (stryMutAct_9fa48("3324")) {
        {}
      } else {
        stryCov_9fa48("3324");
        return handleApiError(error, stryMutAct_9fa48("3325") ? "" : (stryCov_9fa48("3325"), 'Usuário não logado.'));
      }
    }
  }
};
export const getProjects = async (): Promise<ApiResponse<Project[]>> => {
  if (stryMutAct_9fa48("3326")) {
    {}
  } else {
    stryCov_9fa48("3326");
    try {
      if (stryMutAct_9fa48("3327")) {
        {}
      } else {
        stryCov_9fa48("3327");
        const resposta = await api.get(stryMutAct_9fa48("3328") ? "" : (stryCov_9fa48("3328"), '/api/projects'));
        return stryMutAct_9fa48("3329") ? {} : (stryCov_9fa48("3329"), {
          sucesso: stryMutAct_9fa48("3330") ? false : (stryCov_9fa48("3330"), true),
          dados: resposta.data
        });
      }
    } catch (error) {
      if (stryMutAct_9fa48("3331")) {
        {}
      } else {
        stryCov_9fa48("3331");
        return handleApiError(error, stryMutAct_9fa48("3332") ? "" : (stryCov_9fa48("3332"), 'Erro ao listar projetos.'));
      }
    }
  }
};
export const joinProject = async (projectId: string): Promise<ApiResponse<any>> => {
  if (stryMutAct_9fa48("3333")) {
    {}
  } else {
    stryCov_9fa48("3333");
    try {
      if (stryMutAct_9fa48("3334")) {
        {}
      } else {
        stryCov_9fa48("3334");
        const resposta = await api.post(stryMutAct_9fa48("3335") ? `` : (stryCov_9fa48("3335"), `/api/projects/${projectId}/members`));
        return stryMutAct_9fa48("3336") ? {} : (stryCov_9fa48("3336"), {
          sucesso: stryMutAct_9fa48("3337") ? false : (stryCov_9fa48("3337"), true),
          dados: resposta.data
        });
      }
    } catch (error) {
      if (stryMutAct_9fa48("3338")) {
        {}
      } else {
        stryCov_9fa48("3338");
        return handleApiError(error, stryMutAct_9fa48("3339") ? "" : (stryCov_9fa48("3339"), 'Erro ao associar-se ao projeto.'));
      }
    }
  }
};
export const getDocuments = async (projectId?: string, title?: string, status?: string, page = 0, size = 20): Promise<ApiResponse<any>> => {
  if (stryMutAct_9fa48("3340")) {
    {}
  } else {
    stryCov_9fa48("3340");
    try {
      if (stryMutAct_9fa48("3341")) {
        {}
      } else {
        stryCov_9fa48("3341");
        const resposta = await api.get(stryMutAct_9fa48("3342") ? "" : (stryCov_9fa48("3342"), '/api/documents'), stryMutAct_9fa48("3343") ? {} : (stryCov_9fa48("3343"), {
          params: stryMutAct_9fa48("3344") ? {} : (stryCov_9fa48("3344"), {
            projectId,
            title,
            status,
            page,
            size
          })
        }));
        return stryMutAct_9fa48("3345") ? {} : (stryCov_9fa48("3345"), {
          sucesso: stryMutAct_9fa48("3346") ? false : (stryCov_9fa48("3346"), true),
          dados: resposta.data
        });
      }
    } catch (error) {
      if (stryMutAct_9fa48("3347")) {
        {}
      } else {
        stryCov_9fa48("3347");
        return handleApiError(error, stryMutAct_9fa48("3348") ? "" : (stryCov_9fa48("3348"), 'Erro ao listar documentos.'));
      }
    }
  }
};
export const reviewDocument = async (documentId: string, status: 'APPROVED' | 'REJECTED', feedback?: string): Promise<ApiResponse<any>> => {
  if (stryMutAct_9fa48("3349")) {
    {}
  } else {
    stryCov_9fa48("3349");
    try {
      if (stryMutAct_9fa48("3350")) {
        {}
      } else {
        stryCov_9fa48("3350");
        const resposta = await api.patch(stryMutAct_9fa48("3351") ? `` : (stryCov_9fa48("3351"), `/api/documents/${documentId}/status`), stryMutAct_9fa48("3352") ? {} : (stryCov_9fa48("3352"), {
          status,
          feedback
        }));
        return stryMutAct_9fa48("3353") ? {} : (stryCov_9fa48("3353"), {
          sucesso: stryMutAct_9fa48("3354") ? false : (stryCov_9fa48("3354"), true),
          dados: resposta.data
        });
      }
    } catch (error) {
      if (stryMutAct_9fa48("3355")) {
        {}
      } else {
        stryCov_9fa48("3355");
        return handleApiError(error, stryMutAct_9fa48("3356") ? "" : (stryCov_9fa48("3356"), 'Erro ao atualizar o status do documento.'));
      }
    }
  }
};
export const getDownloadUrl = async (documentId: string): Promise<ApiResponse<any>> => {
  if (stryMutAct_9fa48("3357")) {
    {}
  } else {
    stryCov_9fa48("3357");
    try {
      if (stryMutAct_9fa48("3358")) {
        {}
      } else {
        stryCov_9fa48("3358");
        const resposta = await api.get(stryMutAct_9fa48("3359") ? `` : (stryCov_9fa48("3359"), `/api/documents/${documentId}/download`));
        return stryMutAct_9fa48("3360") ? {} : (stryCov_9fa48("3360"), {
          sucesso: stryMutAct_9fa48("3361") ? false : (stryCov_9fa48("3361"), true),
          dados: resposta.data
        });
      }
    } catch (error) {
      if (stryMutAct_9fa48("3362")) {
        {}
      } else {
        stryCov_9fa48("3362");
        return handleApiError(error, stryMutAct_9fa48("3363") ? "" : (stryCov_9fa48("3363"), 'Erro ao gerar link de download seguro.'));
      }
    }
  }
};
export const toggleStar = async (documentId: string): Promise<ApiResponse<any>> => {
  if (stryMutAct_9fa48("3364")) {
    {}
  } else {
    stryCov_9fa48("3364");
    try {
      if (stryMutAct_9fa48("3365")) {
        {}
      } else {
        stryCov_9fa48("3365");
        const resposta = await api.patch(stryMutAct_9fa48("3366") ? `` : (stryCov_9fa48("3366"), `/api/documents/${documentId}/star`));
        return stryMutAct_9fa48("3367") ? {} : (stryCov_9fa48("3367"), {
          sucesso: stryMutAct_9fa48("3368") ? false : (stryCov_9fa48("3368"), true),
          dados: resposta.data
        });
      }
    } catch (error) {
      if (stryMutAct_9fa48("3369")) {
        {}
      } else {
        stryCov_9fa48("3369");
        return handleApiError(error, stryMutAct_9fa48("3370") ? "" : (stryCov_9fa48("3370"), 'Erro ao favoritar o documento.'));
      }
    }
  }
};
export const getComments = async (documentId: string): Promise<ApiResponse<any>> => {
  if (stryMutAct_9fa48("3371")) {
    {}
  } else {
    stryCov_9fa48("3371");
    try {
      if (stryMutAct_9fa48("3372")) {
        {}
      } else {
        stryCov_9fa48("3372");
        const resposta = await api.get(stryMutAct_9fa48("3373") ? `` : (stryCov_9fa48("3373"), `/api/documents/${documentId}/comments`));
        return stryMutAct_9fa48("3374") ? {} : (stryCov_9fa48("3374"), {
          sucesso: stryMutAct_9fa48("3375") ? false : (stryCov_9fa48("3375"), true),
          dados: resposta.data
        });
      }
    } catch (error) {
      if (stryMutAct_9fa48("3376")) {
        {}
      } else {
        stryCov_9fa48("3376");
        return handleApiError(error, stryMutAct_9fa48("3377") ? "" : (stryCov_9fa48("3377"), 'Erro ao carregar comentários.'));
      }
    }
  }
};
export const addComment = async (documentId: string, content: string): Promise<ApiResponse<any>> => {
  if (stryMutAct_9fa48("3378")) {
    {}
  } else {
    stryCov_9fa48("3378");
    try {
      if (stryMutAct_9fa48("3379")) {
        {}
      } else {
        stryCov_9fa48("3379");
        const resposta = await api.post(stryMutAct_9fa48("3380") ? `` : (stryCov_9fa48("3380"), `/api/documents/${documentId}/comments`), stryMutAct_9fa48("3381") ? {} : (stryCov_9fa48("3381"), {
          content
        }));
        return stryMutAct_9fa48("3382") ? {} : (stryCov_9fa48("3382"), {
          sucesso: stryMutAct_9fa48("3383") ? false : (stryCov_9fa48("3383"), true),
          dados: resposta.data
        });
      }
    } catch (error) {
      if (stryMutAct_9fa48("3384")) {
        {}
      } else {
        stryCov_9fa48("3384");
        return handleApiError(error, stryMutAct_9fa48("3385") ? "" : (stryCov_9fa48("3385"), 'Erro ao adicionar comentário.'));
      }
    }
  }
};
export const getDashboardStats = async (): Promise<any> => {
  if (stryMutAct_9fa48("3386")) {
    {}
  } else {
    stryCov_9fa48("3386");
    const response = await api.get(stryMutAct_9fa48("3387") ? "" : (stryCov_9fa48("3387"), '/api/dashboard/stats'));
    return response.data;
  }
};
export const uploadDocument = async (file: File, title: string, projectId: string, onUploadProgress?: (progressEvent: any) => void): Promise<ApiResponse<Document>> => {
  if (stryMutAct_9fa48("3388")) {
    {}
  } else {
    stryCov_9fa48("3388");
    try {
      if (stryMutAct_9fa48("3389")) {
        {}
      } else {
        stryCov_9fa48("3389");
        const formData = new FormData();
        formData.append(stryMutAct_9fa48("3390") ? "" : (stryCov_9fa48("3390"), 'file'), file);
        formData.append(stryMutAct_9fa48("3391") ? "" : (stryCov_9fa48("3391"), 'title'), title);
        formData.append(stryMutAct_9fa48("3392") ? "" : (stryCov_9fa48("3392"), 'projectId'), projectId);

        // O axios já configura automaticamente o Content-Type para multipart/form-data quando recebe um FormData
        const resposta = await api.post(stryMutAct_9fa48("3393") ? "" : (stryCov_9fa48("3393"), '/api/documents'), formData, stryMutAct_9fa48("3394") ? {} : (stryCov_9fa48("3394"), {
          onUploadProgress: onUploadProgress
        }));
        return stryMutAct_9fa48("3395") ? {} : (stryCov_9fa48("3395"), {
          sucesso: stryMutAct_9fa48("3396") ? false : (stryCov_9fa48("3396"), true),
          dados: resposta.data
        });
      }
    } catch (error) {
      if (stryMutAct_9fa48("3397")) {
        {}
      } else {
        stryCov_9fa48("3397");
        return handleApiError(error, stryMutAct_9fa48("3398") ? "" : (stryCov_9fa48("3398"), 'Erro ao fazer upload do documento.'));
      }
    }
  }
};
export const requestPasswordRecovery = async (email: string): Promise<ApiResponse<any>> => {
  if (stryMutAct_9fa48("3399")) {
    {}
  } else {
    stryCov_9fa48("3399");
    try {
      if (stryMutAct_9fa48("3400")) {
        {}
      } else {
        stryCov_9fa48("3400");
        await api.post(stryMutAct_9fa48("3401") ? "" : (stryCov_9fa48("3401"), '/api/auth/recovery/request'), stryMutAct_9fa48("3402") ? {} : (stryCov_9fa48("3402"), {
          email
        }));
        return stryMutAct_9fa48("3403") ? {} : (stryCov_9fa48("3403"), {
          sucesso: stryMutAct_9fa48("3404") ? false : (stryCov_9fa48("3404"), true),
          mensagem: stryMutAct_9fa48("3405") ? "" : (stryCov_9fa48("3405"), 'Código enviado para o seu e-mail (se cadastrado).')
        });
      }
    } catch (error) {
      if (stryMutAct_9fa48("3406")) {
        {}
      } else {
        stryCov_9fa48("3406");
        return handleApiError(error, stryMutAct_9fa48("3407") ? "" : (stryCov_9fa48("3407"), 'Erro ao solicitar código de recuperação.'));
      }
    }
  }
};
export const verifyRecoveryCode = async (email: string, code: string): Promise<ApiResponse<any>> => {
  if (stryMutAct_9fa48("3408")) {
    {}
  } else {
    stryCov_9fa48("3408");
    try {
      if (stryMutAct_9fa48("3409")) {
        {}
      } else {
        stryCov_9fa48("3409");
        await api.post(stryMutAct_9fa48("3410") ? "" : (stryCov_9fa48("3410"), '/api/auth/recovery/verify'), stryMutAct_9fa48("3411") ? {} : (stryCov_9fa48("3411"), {
          email,
          code
        }));
        return stryMutAct_9fa48("3412") ? {} : (stryCov_9fa48("3412"), {
          sucesso: stryMutAct_9fa48("3413") ? false : (stryCov_9fa48("3413"), true),
          mensagem: stryMutAct_9fa48("3414") ? "" : (stryCov_9fa48("3414"), 'Código verificado com sucesso.')
        });
      }
    } catch (error) {
      if (stryMutAct_9fa48("3415")) {
        {}
      } else {
        stryCov_9fa48("3415");
        return handleApiError(error, stryMutAct_9fa48("3416") ? "" : (stryCov_9fa48("3416"), 'Código inválido ou expirado.'));
      }
    }
  }
};
export const resetPassword = async (email: string, code: string, newPassword: string): Promise<ApiResponse<any>> => {
  if (stryMutAct_9fa48("3417")) {
    {}
  } else {
    stryCov_9fa48("3417");
    try {
      if (stryMutAct_9fa48("3418")) {
        {}
      } else {
        stryCov_9fa48("3418");
        await api.post(stryMutAct_9fa48("3419") ? "" : (stryCov_9fa48("3419"), '/api/auth/recovery/reset'), stryMutAct_9fa48("3420") ? {} : (stryCov_9fa48("3420"), {
          email,
          code,
          newPassword
        }));
        return stryMutAct_9fa48("3421") ? {} : (stryCov_9fa48("3421"), {
          sucesso: stryMutAct_9fa48("3422") ? false : (stryCov_9fa48("3422"), true),
          mensagem: stryMutAct_9fa48("3423") ? "" : (stryCov_9fa48("3423"), 'Senha alterada com sucesso.')
        });
      }
    } catch (error) {
      if (stryMutAct_9fa48("3424")) {
        {}
      } else {
        stryCov_9fa48("3424");
        return handleApiError(error, stryMutAct_9fa48("3425") ? "" : (stryCov_9fa48("3425"), 'Erro ao redefinir senha.'));
      }
    }
  }
};
export const getAuditLogs = async (search?: string, action?: string): Promise<any[]> => {
  if (stryMutAct_9fa48("3426")) {
    {}
  } else {
    stryCov_9fa48("3426");
    try {
      if (stryMutAct_9fa48("3427")) {
        {}
      } else {
        stryCov_9fa48("3427");
        const params: any = {};
        if (stryMutAct_9fa48("3429") ? false : stryMutAct_9fa48("3428") ? true : (stryCov_9fa48("3428", "3429"), search)) params.search = search;
        if (stryMutAct_9fa48("3431") ? false : stryMutAct_9fa48("3430") ? true : (stryCov_9fa48("3430", "3431"), action)) params.action = action;
        const response = await api.get(stryMutAct_9fa48("3432") ? "" : (stryCov_9fa48("3432"), '/api/audit-logs'), stryMutAct_9fa48("3433") ? {} : (stryCov_9fa48("3433"), {
          params
        }));
        return response.data;
      }
    } catch (error) {
      if (stryMutAct_9fa48("3434")) {
        {}
      } else {
        stryCov_9fa48("3434");
        console.error(stryMutAct_9fa48("3435") ? "" : (stryCov_9fa48("3435"), 'Erro ao buscar logs de auditoria:'), error);
        return stryMutAct_9fa48("3436") ? ["Stryker was here"] : (stryCov_9fa48("3436"), []);
      }
    }
  }
};
export const exportAuditLogsCSV = async (search?: string, action?: string): Promise<void> => {
  if (stryMutAct_9fa48("3437")) {
    {}
  } else {
    stryCov_9fa48("3437");
    try {
      if (stryMutAct_9fa48("3438")) {
        {}
      } else {
        stryCov_9fa48("3438");
        const params: any = {};
        if (stryMutAct_9fa48("3440") ? false : stryMutAct_9fa48("3439") ? true : (stryCov_9fa48("3439", "3440"), search)) params.search = search;
        if (stryMutAct_9fa48("3442") ? false : stryMutAct_9fa48("3441") ? true : (stryCov_9fa48("3441", "3442"), action)) params.action = action;
        const response = await api.get(stryMutAct_9fa48("3443") ? "" : (stryCov_9fa48("3443"), '/api/audit-logs/export'), stryMutAct_9fa48("3444") ? {} : (stryCov_9fa48("3444"), {
          params,
          responseType: stryMutAct_9fa48("3445") ? "" : (stryCov_9fa48("3445"), 'blob')
        }));
        const blob = new Blob(stryMutAct_9fa48("3446") ? [] : (stryCov_9fa48("3446"), [response.data]), stryMutAct_9fa48("3447") ? {} : (stryCov_9fa48("3447"), {
          type: stryMutAct_9fa48("3448") ? "" : (stryCov_9fa48("3448"), 'text/csv')
        }));
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement(stryMutAct_9fa48("3449") ? "" : (stryCov_9fa48("3449"), 'a'));
        a.href = url;
        a.download = stryMutAct_9fa48("3450") ? "" : (stryCov_9fa48("3450"), 'audit_logs.csv');
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      if (stryMutAct_9fa48("3451")) {
        {}
      } else {
        stryCov_9fa48("3451");
        console.error(stryMutAct_9fa48("3452") ? "" : (stryCov_9fa48("3452"), 'Erro ao exportar logs de auditoria:'), error);
      }
    }
  }
};
export const getComplianceStats = async (): Promise<any> => {
  if (stryMutAct_9fa48("3453")) {
    {}
  } else {
    stryCov_9fa48("3453");
    try {
      if (stryMutAct_9fa48("3454")) {
        {}
      } else {
        stryCov_9fa48("3454");
        const response = await api.get(stryMutAct_9fa48("3455") ? "" : (stryCov_9fa48("3455"), '/api/dashboard/compliance'));
        return response.data;
      }
    } catch (error) {
      if (stryMutAct_9fa48("3456")) {
        {}
      } else {
        stryCov_9fa48("3456");
        console.error(stryMutAct_9fa48("3457") ? "" : (stryCov_9fa48("3457"), 'Erro ao buscar estatísticas de compliance:'), error);
        return null;
      }
    }
  }
};
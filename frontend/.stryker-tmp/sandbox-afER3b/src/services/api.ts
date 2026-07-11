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
const BASE_URL = stryMutAct_9fa48("3174") ? import.meta.env?.VITE_API_URL && '' : (stryCov_9fa48("3174"), (stryMutAct_9fa48("3175") ? import.meta.env.VITE_API_URL : (stryCov_9fa48("3175"), import.meta.env?.VITE_API_URL)) ?? (stryMutAct_9fa48("3176") ? "Stryker was here!" : (stryCov_9fa48("3176"), '')));
const api = axios.create(stryMutAct_9fa48("3177") ? {} : (stryCov_9fa48("3177"), {
  baseURL: BASE_URL
}));
let activeRequests = 0;
let loaderTimeout: number | null = null;
const showLoader = () => {
  if (stryMutAct_9fa48("3178")) {
    {}
  } else {
    stryCov_9fa48("3178");
    stryMutAct_9fa48("3179") ? activeRequests-- : (stryCov_9fa48("3179"), activeRequests++);
    if (stryMutAct_9fa48("3182") ? activeRequests !== 1 : stryMutAct_9fa48("3181") ? false : stryMutAct_9fa48("3180") ? true : (stryCov_9fa48("3180", "3181", "3182"), activeRequests === 1)) {
      if (stryMutAct_9fa48("3183")) {
        {}
      } else {
        stryCov_9fa48("3183");
        loaderTimeout = window.setTimeout(() => {
          if (stryMutAct_9fa48("3184")) {
            {}
          } else {
            stryCov_9fa48("3184");
            window.dispatchEvent(new Event(stryMutAct_9fa48("3185") ? "" : (stryCov_9fa48("3185"), 'showLoader')));
          }
        }, 500); // Show loader only if request takes more than 500ms
      }
    }
  }
};
const hideLoader = () => {
  if (stryMutAct_9fa48("3186")) {
    {}
  } else {
    stryCov_9fa48("3186");
    activeRequests = stryMutAct_9fa48("3187") ? Math.min(0, activeRequests - 1) : (stryCov_9fa48("3187"), Math.max(0, stryMutAct_9fa48("3188") ? activeRequests + 1 : (stryCov_9fa48("3188"), activeRequests - 1)));
    if (stryMutAct_9fa48("3191") ? activeRequests !== 0 : stryMutAct_9fa48("3190") ? false : stryMutAct_9fa48("3189") ? true : (stryCov_9fa48("3189", "3190", "3191"), activeRequests === 0)) {
      if (stryMutAct_9fa48("3192")) {
        {}
      } else {
        stryCov_9fa48("3192");
        if (stryMutAct_9fa48("3195") ? loaderTimeout === null : stryMutAct_9fa48("3194") ? false : stryMutAct_9fa48("3193") ? true : (stryCov_9fa48("3193", "3194", "3195"), loaderTimeout !== null)) {
          if (stryMutAct_9fa48("3196")) {
            {}
          } else {
            stryCov_9fa48("3196");
            window.clearTimeout(loaderTimeout);
            loaderTimeout = null;
          }
        }
        window.dispatchEvent(new Event(stryMutAct_9fa48("3197") ? "" : (stryCov_9fa48("3197"), 'hideLoader')));
      }
    }
  }
};
const generateRequestId = () => {
  if (stryMutAct_9fa48("3198")) {
    {}
  } else {
    stryCov_9fa48("3198");
    return (stryMutAct_9fa48("3199") ? "" : (stryCov_9fa48("3199"), 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx')).replace(stryMutAct_9fa48("3200") ? /[^xy]/g : (stryCov_9fa48("3200"), /[xy]/g), function (c) {
      if (stryMutAct_9fa48("3201")) {
        {}
      } else {
        stryCov_9fa48("3201");
        const r = (stryMutAct_9fa48("3202") ? Math.random() / 16 : (stryCov_9fa48("3202"), Math.random() * 16)) | 0,
          v = (stryMutAct_9fa48("3205") ? c !== 'x' : stryMutAct_9fa48("3204") ? false : stryMutAct_9fa48("3203") ? true : (stryCov_9fa48("3203", "3204", "3205"), c === (stryMutAct_9fa48("3206") ? "" : (stryCov_9fa48("3206"), 'x')))) ? r : r & 0x3 | 0x8;
        return v.toString(16);
      }
    });
  }
};

// Interceptor para adicionar o token de autorização, X-Request-ID e mostrar o loader
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (stryMutAct_9fa48("3207")) {
    {}
  } else {
    stryCov_9fa48("3207");
    showLoader();
    const token = localStorage.getItem(stryMutAct_9fa48("3208") ? "" : (stryCov_9fa48("3208"), 'token'));
    if (stryMutAct_9fa48("3210") ? false : stryMutAct_9fa48("3209") ? true : (stryCov_9fa48("3209", "3210"), token)) {
      if (stryMutAct_9fa48("3211")) {
        {}
      } else {
        stryCov_9fa48("3211");
        config.headers[stryMutAct_9fa48("3212") ? "" : (stryCov_9fa48("3212"), 'Authorization')] = stryMutAct_9fa48("3213") ? `` : (stryCov_9fa48("3213"), `Bearer ${token}`);
      }
    }
    config.headers[stryMutAct_9fa48("3214") ? "" : (stryCov_9fa48("3214"), 'X-Request-ID')] = generateRequestId();
    return config;
  }
});

// Interceptor para tratamento de sessão expirada (401) e esconder o loader
api.interceptors.response.use(response => {
  if (stryMutAct_9fa48("3215")) {
    {}
  } else {
    stryCov_9fa48("3215");
    hideLoader();
    return response;
  }
}, error => {
  if (stryMutAct_9fa48("3216")) {
    {}
  } else {
    stryCov_9fa48("3216");
    hideLoader();
    if (stryMutAct_9fa48("3219") ? error.response || error.response.status === 401 : stryMutAct_9fa48("3218") ? false : stryMutAct_9fa48("3217") ? true : (stryCov_9fa48("3217", "3218", "3219"), error.response && (stryMutAct_9fa48("3221") ? error.response.status !== 401 : stryMutAct_9fa48("3220") ? true : (stryCov_9fa48("3220", "3221"), error.response.status === 401)))) {
      if (stryMutAct_9fa48("3222")) {
        {}
      } else {
        stryCov_9fa48("3222");
        // Ignorar redirect no próprio login e no endpoint de checagem de sessão
        if (stryMutAct_9fa48("3225") ? !error.config.url.includes('/api/auth/login') || !error.config.url.includes('/api/auth/me') : stryMutAct_9fa48("3224") ? false : stryMutAct_9fa48("3223") ? true : (stryCov_9fa48("3223", "3224", "3225"), (stryMutAct_9fa48("3226") ? error.config.url.includes('/api/auth/login') : (stryCov_9fa48("3226"), !error.config.url.includes(stryMutAct_9fa48("3227") ? "" : (stryCov_9fa48("3227"), '/api/auth/login')))) && (stryMutAct_9fa48("3228") ? error.config.url.includes('/api/auth/me') : (stryCov_9fa48("3228"), !error.config.url.includes(stryMutAct_9fa48("3229") ? "" : (stryCov_9fa48("3229"), '/api/auth/me')))))) {
          if (stryMutAct_9fa48("3230")) {
            {}
          } else {
            stryCov_9fa48("3230");
            window.location.href = stryMutAct_9fa48("3231") ? "" : (stryCov_9fa48("3231"), '/login?session_expired=true');
          }
        }
      }
    }
    return Promise.reject(error);
  }
});

// Utilitário padrão para tratamento de erros
const handleApiError = <T = any,>(error: any, defaultMessage: string): ApiResponse<T> => {
  if (stryMutAct_9fa48("3232")) {
    {}
  } else {
    stryCov_9fa48("3232");
    const message = stryMutAct_9fa48("3235") ? (error.response?.data?.message || error.message) && defaultMessage : stryMutAct_9fa48("3234") ? false : stryMutAct_9fa48("3233") ? true : (stryCov_9fa48("3233", "3234", "3235"), (stryMutAct_9fa48("3237") ? error.response?.data?.message && error.message : stryMutAct_9fa48("3236") ? false : (stryCov_9fa48("3236", "3237"), (stryMutAct_9fa48("3239") ? error.response.data?.message : stryMutAct_9fa48("3238") ? error.response?.data.message : (stryCov_9fa48("3238", "3239"), error.response?.data?.message)) || error.message)) || defaultMessage);
    return stryMutAct_9fa48("3240") ? {} : (stryCov_9fa48("3240"), {
      sucesso: stryMutAct_9fa48("3241") ? true : (stryCov_9fa48("3241"), false),
      mensagem: message
    });
  }
};
export const login = async (email: string, senha: string): Promise<ApiResponse<any>> => {
  if (stryMutAct_9fa48("3242")) {
    {}
  } else {
    stryCov_9fa48("3242");
    try {
      if (stryMutAct_9fa48("3243")) {
        {}
      } else {
        stryCov_9fa48("3243");
        const resposta = await api.post(stryMutAct_9fa48("3244") ? "" : (stryCov_9fa48("3244"), '/api/auth/login'), stryMutAct_9fa48("3245") ? {} : (stryCov_9fa48("3245"), {
          email,
          password: senha
        }));
        if (stryMutAct_9fa48("3248") ? resposta.status === 202 || resposta.data.mfaRequired : stryMutAct_9fa48("3247") ? false : stryMutAct_9fa48("3246") ? true : (stryCov_9fa48("3246", "3247", "3248"), (stryMutAct_9fa48("3250") ? resposta.status !== 202 : stryMutAct_9fa48("3249") ? true : (stryCov_9fa48("3249", "3250"), resposta.status === 202)) && resposta.data.mfaRequired)) {
          if (stryMutAct_9fa48("3251")) {
            {}
          } else {
            stryCov_9fa48("3251");
            return stryMutAct_9fa48("3252") ? {} : (stryCov_9fa48("3252"), {
              sucesso: stryMutAct_9fa48("3253") ? false : (stryCov_9fa48("3253"), true),
              dados: stryMutAct_9fa48("3254") ? {} : (stryCov_9fa48("3254"), {
                mfaRequired: stryMutAct_9fa48("3255") ? false : (stryCov_9fa48("3255"), true),
                email: resposta.data.email
              })
            });
          }
        }
        if (stryMutAct_9fa48("3257") ? false : stryMutAct_9fa48("3256") ? true : (stryCov_9fa48("3256", "3257"), resposta.data.token)) {
          if (stryMutAct_9fa48("3258")) {
            {}
          } else {
            stryCov_9fa48("3258");
            localStorage.setItem(stryMutAct_9fa48("3259") ? "" : (stryCov_9fa48("3259"), 'token'), resposta.data.token);
          }
        }
        return stryMutAct_9fa48("3260") ? {} : (stryCov_9fa48("3260"), {
          sucesso: stryMutAct_9fa48("3261") ? false : (stryCov_9fa48("3261"), true),
          dados: resposta.data.user
        });
      }
    } catch (error) {
      if (stryMutAct_9fa48("3262")) {
        {}
      } else {
        stryCov_9fa48("3262");
        return handleApiError(error, stryMutAct_9fa48("3263") ? "" : (stryCov_9fa48("3263"), 'Erro ao realizar o login. Verifique seus dados e tente novamente'));
      }
    }
  }
};
export const verify2FaLogin = async (email: string, senha: string, code: string): Promise<ApiResponse<any>> => {
  if (stryMutAct_9fa48("3264")) {
    {}
  } else {
    stryCov_9fa48("3264");
    try {
      if (stryMutAct_9fa48("3265")) {
        {}
      } else {
        stryCov_9fa48("3265");
        const resposta = await api.post(stryMutAct_9fa48("3266") ? "" : (stryCov_9fa48("3266"), '/api/auth/login/verify-2fa'), stryMutAct_9fa48("3267") ? {} : (stryCov_9fa48("3267"), {
          email,
          password: senha,
          code
        }));
        if (stryMutAct_9fa48("3269") ? false : stryMutAct_9fa48("3268") ? true : (stryCov_9fa48("3268", "3269"), resposta.data.token)) {
          if (stryMutAct_9fa48("3270")) {
            {}
          } else {
            stryCov_9fa48("3270");
            localStorage.setItem(stryMutAct_9fa48("3271") ? "" : (stryCov_9fa48("3271"), 'token'), resposta.data.token);
          }
        }
        return stryMutAct_9fa48("3272") ? {} : (stryCov_9fa48("3272"), {
          sucesso: stryMutAct_9fa48("3273") ? false : (stryCov_9fa48("3273"), true),
          dados: resposta.data.user
        });
      }
    } catch (error) {
      if (stryMutAct_9fa48("3274")) {
        {}
      } else {
        stryCov_9fa48("3274");
        return handleApiError(error, stryMutAct_9fa48("3275") ? "" : (stryCov_9fa48("3275"), 'Código de verificação 2FA inválido.'));
      }
    }
  }
};
export const setup2Fa = async (): Promise<ApiResponse<{
  secret: string;
  qrCodeUri: string;
}>> => {
  if (stryMutAct_9fa48("3276")) {
    {}
  } else {
    stryCov_9fa48("3276");
    try {
      if (stryMutAct_9fa48("3277")) {
        {}
      } else {
        stryCov_9fa48("3277");
        const resposta = await api.get(stryMutAct_9fa48("3278") ? "" : (stryCov_9fa48("3278"), '/api/auth/2fa/setup'));
        return stryMutAct_9fa48("3279") ? {} : (stryCov_9fa48("3279"), {
          sucesso: stryMutAct_9fa48("3280") ? false : (stryCov_9fa48("3280"), true),
          dados: resposta.data
        });
      }
    } catch (error) {
      if (stryMutAct_9fa48("3281")) {
        {}
      } else {
        stryCov_9fa48("3281");
        return handleApiError(error, stryMutAct_9fa48("3282") ? "" : (stryCov_9fa48("3282"), 'Erro ao configurar 2FA.'));
      }
    }
  }
};
export const enable2Fa = async (code: string): Promise<ApiResponse<any>> => {
  if (stryMutAct_9fa48("3283")) {
    {}
  } else {
    stryCov_9fa48("3283");
    try {
      if (stryMutAct_9fa48("3284")) {
        {}
      } else {
        stryCov_9fa48("3284");
        const resposta = await api.post(stryMutAct_9fa48("3285") ? "" : (stryCov_9fa48("3285"), '/api/auth/2fa/enable'), stryMutAct_9fa48("3286") ? {} : (stryCov_9fa48("3286"), {
          code
        }));
        return stryMutAct_9fa48("3287") ? {} : (stryCov_9fa48("3287"), {
          sucesso: stryMutAct_9fa48("3288") ? false : (stryCov_9fa48("3288"), true),
          dados: resposta.data
        });
      }
    } catch (error) {
      if (stryMutAct_9fa48("3289")) {
        {}
      } else {
        stryCov_9fa48("3289");
        return handleApiError(error, stryMutAct_9fa48("3290") ? "" : (stryCov_9fa48("3290"), 'Código 2FA inválido.'));
      }
    }
  }
};
export const register = async (nome: string, email: string, senha: string, role: string): Promise<ApiResponse<any>> => {
  if (stryMutAct_9fa48("3291")) {
    {}
  } else {
    stryCov_9fa48("3291");
    try {
      if (stryMutAct_9fa48("3292")) {
        {}
      } else {
        stryCov_9fa48("3292");
        const resposta = await api.post(stryMutAct_9fa48("3293") ? "" : (stryCov_9fa48("3293"), '/api/auth/register'), stryMutAct_9fa48("3294") ? {} : (stryCov_9fa48("3294"), {
          name: nome,
          email,
          password: senha,
          role
        }));
        // Token is no longer returned in /register, but /register/verify
        return stryMutAct_9fa48("3295") ? {} : (stryCov_9fa48("3295"), {
          sucesso: stryMutAct_9fa48("3296") ? false : (stryCov_9fa48("3296"), true),
          dados: resposta.data.user
        });
      }
    } catch (error) {
      if (stryMutAct_9fa48("3297")) {
        {}
      } else {
        stryCov_9fa48("3297");
        return handleApiError(error, stryMutAct_9fa48("3298") ? "" : (stryCov_9fa48("3298"), 'Erro ao realizar o cadastro. Por favor verifique os dados e tente novamente.'));
      }
    }
  }
};
export const verifyRegistration = async (email: string, code: string): Promise<ApiResponse<any>> => {
  if (stryMutAct_9fa48("3299")) {
    {}
  } else {
    stryCov_9fa48("3299");
    try {
      if (stryMutAct_9fa48("3300")) {
        {}
      } else {
        stryCov_9fa48("3300");
        const resposta = await api.post(stryMutAct_9fa48("3301") ? "" : (stryCov_9fa48("3301"), '/api/auth/register/verify'), stryMutAct_9fa48("3302") ? {} : (stryCov_9fa48("3302"), {
          email,
          code
        }));
        if (stryMutAct_9fa48("3304") ? false : stryMutAct_9fa48("3303") ? true : (stryCov_9fa48("3303", "3304"), resposta.data.token)) {
          if (stryMutAct_9fa48("3305")) {
            {}
          } else {
            stryCov_9fa48("3305");
            localStorage.setItem(stryMutAct_9fa48("3306") ? "" : (stryCov_9fa48("3306"), 'token'), resposta.data.token);
          }
        }
        return stryMutAct_9fa48("3307") ? {} : (stryCov_9fa48("3307"), {
          sucesso: stryMutAct_9fa48("3308") ? false : (stryCov_9fa48("3308"), true),
          dados: resposta.data.user
        });
      }
    } catch (error) {
      if (stryMutAct_9fa48("3309")) {
        {}
      } else {
        stryCov_9fa48("3309");
        return handleApiError(error, stryMutAct_9fa48("3310") ? "" : (stryCov_9fa48("3310"), 'Código de verificação inválido ou expirado.'));
      }
    }
  }
};
export const logout = async (): Promise<ApiResponse<void>> => {
  if (stryMutAct_9fa48("3311")) {
    {}
  } else {
    stryCov_9fa48("3311");
    try {
      if (stryMutAct_9fa48("3312")) {
        {}
      } else {
        stryCov_9fa48("3312");
        await api.post(stryMutAct_9fa48("3313") ? "" : (stryCov_9fa48("3313"), '/api/auth/logout'));
        localStorage.removeItem(stryMutAct_9fa48("3314") ? "" : (stryCov_9fa48("3314"), 'token'));
        return stryMutAct_9fa48("3315") ? {} : (stryCov_9fa48("3315"), {
          sucesso: stryMutAct_9fa48("3316") ? false : (stryCov_9fa48("3316"), true)
        });
      }
    } catch (error) {
      if (stryMutAct_9fa48("3317")) {
        {}
      } else {
        stryCov_9fa48("3317");
        localStorage.removeItem(stryMutAct_9fa48("3318") ? "" : (stryCov_9fa48("3318"), 'token'));
        return handleApiError(error, stryMutAct_9fa48("3319") ? "" : (stryCov_9fa48("3319"), 'Falha ao encerrar sessão'));
      }
    }
  }
};
export const getMe = async (): Promise<ApiResponse<User>> => {
  if (stryMutAct_9fa48("3320")) {
    {}
  } else {
    stryCov_9fa48("3320");
    try {
      if (stryMutAct_9fa48("3321")) {
        {}
      } else {
        stryCov_9fa48("3321");
        const resposta = await api.get(stryMutAct_9fa48("3322") ? "" : (stryCov_9fa48("3322"), '/api/auth/me'));
        return stryMutAct_9fa48("3323") ? {} : (stryCov_9fa48("3323"), {
          sucesso: stryMutAct_9fa48("3324") ? false : (stryCov_9fa48("3324"), true),
          dados: resposta.data
        });
      }
    } catch (error) {
      if (stryMutAct_9fa48("3325")) {
        {}
      } else {
        stryCov_9fa48("3325");
        return handleApiError(error, stryMutAct_9fa48("3326") ? "" : (stryCov_9fa48("3326"), 'Usuário não logado.'));
      }
    }
  }
};
export const getProjects = async (): Promise<ApiResponse<Project[]>> => {
  if (stryMutAct_9fa48("3327")) {
    {}
  } else {
    stryCov_9fa48("3327");
    try {
      if (stryMutAct_9fa48("3328")) {
        {}
      } else {
        stryCov_9fa48("3328");
        const resposta = await api.get(stryMutAct_9fa48("3329") ? "" : (stryCov_9fa48("3329"), '/api/projects'));
        return stryMutAct_9fa48("3330") ? {} : (stryCov_9fa48("3330"), {
          sucesso: stryMutAct_9fa48("3331") ? false : (stryCov_9fa48("3331"), true),
          dados: resposta.data
        });
      }
    } catch (error) {
      if (stryMutAct_9fa48("3332")) {
        {}
      } else {
        stryCov_9fa48("3332");
        return handleApiError(error, stryMutAct_9fa48("3333") ? "" : (stryCov_9fa48("3333"), 'Erro ao listar projetos.'));
      }
    }
  }
};
export const joinProject = async (projectId: string): Promise<ApiResponse<any>> => {
  if (stryMutAct_9fa48("3334")) {
    {}
  } else {
    stryCov_9fa48("3334");
    try {
      if (stryMutAct_9fa48("3335")) {
        {}
      } else {
        stryCov_9fa48("3335");
        const resposta = await api.post(stryMutAct_9fa48("3336") ? `` : (stryCov_9fa48("3336"), `/api/projects/${projectId}/members`));
        return stryMutAct_9fa48("3337") ? {} : (stryCov_9fa48("3337"), {
          sucesso: stryMutAct_9fa48("3338") ? false : (stryCov_9fa48("3338"), true),
          dados: resposta.data
        });
      }
    } catch (error) {
      if (stryMutAct_9fa48("3339")) {
        {}
      } else {
        stryCov_9fa48("3339");
        return handleApiError(error, stryMutAct_9fa48("3340") ? "" : (stryCov_9fa48("3340"), 'Erro ao associar-se ao projeto.'));
      }
    }
  }
};
export const getDocuments = async (projectId?: string, title?: string, status?: string, page = 0, size = 20): Promise<ApiResponse<any>> => {
  if (stryMutAct_9fa48("3341")) {
    {}
  } else {
    stryCov_9fa48("3341");
    try {
      if (stryMutAct_9fa48("3342")) {
        {}
      } else {
        stryCov_9fa48("3342");
        const resposta = await api.get(stryMutAct_9fa48("3343") ? "" : (stryCov_9fa48("3343"), '/api/documents'), stryMutAct_9fa48("3344") ? {} : (stryCov_9fa48("3344"), {
          params: stryMutAct_9fa48("3345") ? {} : (stryCov_9fa48("3345"), {
            projectId,
            title,
            status,
            page,
            size
          })
        }));
        return stryMutAct_9fa48("3346") ? {} : (stryCov_9fa48("3346"), {
          sucesso: stryMutAct_9fa48("3347") ? false : (stryCov_9fa48("3347"), true),
          dados: resposta.data
        });
      }
    } catch (error) {
      if (stryMutAct_9fa48("3348")) {
        {}
      } else {
        stryCov_9fa48("3348");
        return handleApiError(error, stryMutAct_9fa48("3349") ? "" : (stryCov_9fa48("3349"), 'Erro ao listar documentos.'));
      }
    }
  }
};
export const reviewDocument = async (documentId: string, status: 'APPROVED' | 'REJECTED', feedback?: string): Promise<ApiResponse<any>> => {
  if (stryMutAct_9fa48("3350")) {
    {}
  } else {
    stryCov_9fa48("3350");
    try {
      if (stryMutAct_9fa48("3351")) {
        {}
      } else {
        stryCov_9fa48("3351");
        const resposta = await api.patch(stryMutAct_9fa48("3352") ? `` : (stryCov_9fa48("3352"), `/api/documents/${documentId}/status`), stryMutAct_9fa48("3353") ? {} : (stryCov_9fa48("3353"), {
          status,
          feedback
        }));
        return stryMutAct_9fa48("3354") ? {} : (stryCov_9fa48("3354"), {
          sucesso: stryMutAct_9fa48("3355") ? false : (stryCov_9fa48("3355"), true),
          dados: resposta.data
        });
      }
    } catch (error) {
      if (stryMutAct_9fa48("3356")) {
        {}
      } else {
        stryCov_9fa48("3356");
        return handleApiError(error, stryMutAct_9fa48("3357") ? "" : (stryCov_9fa48("3357"), 'Erro ao atualizar o status do documento.'));
      }
    }
  }
};
export const getDownloadUrl = async (documentId: string): Promise<ApiResponse<any>> => {
  if (stryMutAct_9fa48("3358")) {
    {}
  } else {
    stryCov_9fa48("3358");
    try {
      if (stryMutAct_9fa48("3359")) {
        {}
      } else {
        stryCov_9fa48("3359");
        const resposta = await api.get(stryMutAct_9fa48("3360") ? `` : (stryCov_9fa48("3360"), `/api/documents/${documentId}/download`));
        return stryMutAct_9fa48("3361") ? {} : (stryCov_9fa48("3361"), {
          sucesso: stryMutAct_9fa48("3362") ? false : (stryCov_9fa48("3362"), true),
          dados: resposta.data
        });
      }
    } catch (error) {
      if (stryMutAct_9fa48("3363")) {
        {}
      } else {
        stryCov_9fa48("3363");
        return handleApiError(error, stryMutAct_9fa48("3364") ? "" : (stryCov_9fa48("3364"), 'Erro ao gerar link de download seguro.'));
      }
    }
  }
};
export const toggleStar = async (documentId: string): Promise<ApiResponse<any>> => {
  if (stryMutAct_9fa48("3365")) {
    {}
  } else {
    stryCov_9fa48("3365");
    try {
      if (stryMutAct_9fa48("3366")) {
        {}
      } else {
        stryCov_9fa48("3366");
        const resposta = await api.patch(stryMutAct_9fa48("3367") ? `` : (stryCov_9fa48("3367"), `/api/documents/${documentId}/star`));
        return stryMutAct_9fa48("3368") ? {} : (stryCov_9fa48("3368"), {
          sucesso: stryMutAct_9fa48("3369") ? false : (stryCov_9fa48("3369"), true),
          dados: resposta.data
        });
      }
    } catch (error) {
      if (stryMutAct_9fa48("3370")) {
        {}
      } else {
        stryCov_9fa48("3370");
        return handleApiError(error, stryMutAct_9fa48("3371") ? "" : (stryCov_9fa48("3371"), 'Erro ao favoritar o documento.'));
      }
    }
  }
};
export const getComments = async (documentId: string): Promise<ApiResponse<any>> => {
  if (stryMutAct_9fa48("3372")) {
    {}
  } else {
    stryCov_9fa48("3372");
    try {
      if (stryMutAct_9fa48("3373")) {
        {}
      } else {
        stryCov_9fa48("3373");
        const resposta = await api.get(stryMutAct_9fa48("3374") ? `` : (stryCov_9fa48("3374"), `/api/documents/${documentId}/comments`));
        return stryMutAct_9fa48("3375") ? {} : (stryCov_9fa48("3375"), {
          sucesso: stryMutAct_9fa48("3376") ? false : (stryCov_9fa48("3376"), true),
          dados: resposta.data
        });
      }
    } catch (error) {
      if (stryMutAct_9fa48("3377")) {
        {}
      } else {
        stryCov_9fa48("3377");
        return handleApiError(error, stryMutAct_9fa48("3378") ? "" : (stryCov_9fa48("3378"), 'Erro ao carregar comentários.'));
      }
    }
  }
};
export const addComment = async (documentId: string, content: string): Promise<ApiResponse<any>> => {
  if (stryMutAct_9fa48("3379")) {
    {}
  } else {
    stryCov_9fa48("3379");
    try {
      if (stryMutAct_9fa48("3380")) {
        {}
      } else {
        stryCov_9fa48("3380");
        const resposta = await api.post(stryMutAct_9fa48("3381") ? `` : (stryCov_9fa48("3381"), `/api/documents/${documentId}/comments`), stryMutAct_9fa48("3382") ? {} : (stryCov_9fa48("3382"), {
          content
        }));
        return stryMutAct_9fa48("3383") ? {} : (stryCov_9fa48("3383"), {
          sucesso: stryMutAct_9fa48("3384") ? false : (stryCov_9fa48("3384"), true),
          dados: resposta.data
        });
      }
    } catch (error) {
      if (stryMutAct_9fa48("3385")) {
        {}
      } else {
        stryCov_9fa48("3385");
        return handleApiError(error, stryMutAct_9fa48("3386") ? "" : (stryCov_9fa48("3386"), 'Erro ao adicionar comentário.'));
      }
    }
  }
};
export const getDashboardStats = async (): Promise<any> => {
  if (stryMutAct_9fa48("3387")) {
    {}
  } else {
    stryCov_9fa48("3387");
    const response = await api.get(stryMutAct_9fa48("3388") ? "" : (stryCov_9fa48("3388"), '/api/dashboard/stats'));
    return response.data;
  }
};
export const uploadDocument = async (file: File, title: string, projectId: string, onUploadProgress?: (progressEvent: any) => void): Promise<ApiResponse<Document>> => {
  if (stryMutAct_9fa48("3389")) {
    {}
  } else {
    stryCov_9fa48("3389");
    try {
      if (stryMutAct_9fa48("3390")) {
        {}
      } else {
        stryCov_9fa48("3390");
        const formData = new FormData();
        formData.append(stryMutAct_9fa48("3391") ? "" : (stryCov_9fa48("3391"), 'file'), file);
        formData.append(stryMutAct_9fa48("3392") ? "" : (stryCov_9fa48("3392"), 'title'), title);
        formData.append(stryMutAct_9fa48("3393") ? "" : (stryCov_9fa48("3393"), 'projectId'), projectId);

        // O axios já configura automaticamente o Content-Type para multipart/form-data quando recebe um FormData
        const resposta = await api.post(stryMutAct_9fa48("3394") ? "" : (stryCov_9fa48("3394"), '/api/documents'), formData, stryMutAct_9fa48("3395") ? {} : (stryCov_9fa48("3395"), {
          onUploadProgress: onUploadProgress
        }));
        return stryMutAct_9fa48("3396") ? {} : (stryCov_9fa48("3396"), {
          sucesso: stryMutAct_9fa48("3397") ? false : (stryCov_9fa48("3397"), true),
          dados: resposta.data
        });
      }
    } catch (error) {
      if (stryMutAct_9fa48("3398")) {
        {}
      } else {
        stryCov_9fa48("3398");
        return handleApiError(error, stryMutAct_9fa48("3399") ? "" : (stryCov_9fa48("3399"), 'Erro ao fazer upload do documento.'));
      }
    }
  }
};
export const requestPasswordRecovery = async (email: string): Promise<ApiResponse<any>> => {
  if (stryMutAct_9fa48("3400")) {
    {}
  } else {
    stryCov_9fa48("3400");
    try {
      if (stryMutAct_9fa48("3401")) {
        {}
      } else {
        stryCov_9fa48("3401");
        await api.post(stryMutAct_9fa48("3402") ? "" : (stryCov_9fa48("3402"), '/api/auth/recovery/request'), stryMutAct_9fa48("3403") ? {} : (stryCov_9fa48("3403"), {
          email
        }));
        return stryMutAct_9fa48("3404") ? {} : (stryCov_9fa48("3404"), {
          sucesso: stryMutAct_9fa48("3405") ? false : (stryCov_9fa48("3405"), true),
          mensagem: stryMutAct_9fa48("3406") ? "" : (stryCov_9fa48("3406"), 'Código enviado para o seu e-mail (se cadastrado).')
        });
      }
    } catch (error) {
      if (stryMutAct_9fa48("3407")) {
        {}
      } else {
        stryCov_9fa48("3407");
        return handleApiError(error, stryMutAct_9fa48("3408") ? "" : (stryCov_9fa48("3408"), 'Erro ao solicitar código de recuperação.'));
      }
    }
  }
};
export const verifyRecoveryCode = async (email: string, code: string): Promise<ApiResponse<any>> => {
  if (stryMutAct_9fa48("3409")) {
    {}
  } else {
    stryCov_9fa48("3409");
    try {
      if (stryMutAct_9fa48("3410")) {
        {}
      } else {
        stryCov_9fa48("3410");
        await api.post(stryMutAct_9fa48("3411") ? "" : (stryCov_9fa48("3411"), '/api/auth/recovery/verify'), stryMutAct_9fa48("3412") ? {} : (stryCov_9fa48("3412"), {
          email,
          code
        }));
        return stryMutAct_9fa48("3413") ? {} : (stryCov_9fa48("3413"), {
          sucesso: stryMutAct_9fa48("3414") ? false : (stryCov_9fa48("3414"), true),
          mensagem: stryMutAct_9fa48("3415") ? "" : (stryCov_9fa48("3415"), 'Código verificado com sucesso.')
        });
      }
    } catch (error) {
      if (stryMutAct_9fa48("3416")) {
        {}
      } else {
        stryCov_9fa48("3416");
        return handleApiError(error, stryMutAct_9fa48("3417") ? "" : (stryCov_9fa48("3417"), 'Código inválido ou expirado.'));
      }
    }
  }
};
export const resetPassword = async (email: string, code: string, newPassword: string): Promise<ApiResponse<any>> => {
  if (stryMutAct_9fa48("3418")) {
    {}
  } else {
    stryCov_9fa48("3418");
    try {
      if (stryMutAct_9fa48("3419")) {
        {}
      } else {
        stryCov_9fa48("3419");
        await api.post(stryMutAct_9fa48("3420") ? "" : (stryCov_9fa48("3420"), '/api/auth/recovery/reset'), stryMutAct_9fa48("3421") ? {} : (stryCov_9fa48("3421"), {
          email,
          code,
          newPassword
        }));
        return stryMutAct_9fa48("3422") ? {} : (stryCov_9fa48("3422"), {
          sucesso: stryMutAct_9fa48("3423") ? false : (stryCov_9fa48("3423"), true),
          mensagem: stryMutAct_9fa48("3424") ? "" : (stryCov_9fa48("3424"), 'Senha alterada com sucesso.')
        });
      }
    } catch (error) {
      if (stryMutAct_9fa48("3425")) {
        {}
      } else {
        stryCov_9fa48("3425");
        return handleApiError(error, stryMutAct_9fa48("3426") ? "" : (stryCov_9fa48("3426"), 'Erro ao redefinir senha.'));
      }
    }
  }
};
export const getAuditLogs = async (search?: string, action?: string): Promise<any[]> => {
  if (stryMutAct_9fa48("3427")) {
    {}
  } else {
    stryCov_9fa48("3427");
    try {
      if (stryMutAct_9fa48("3428")) {
        {}
      } else {
        stryCov_9fa48("3428");
        const params: any = {};
        if (stryMutAct_9fa48("3430") ? false : stryMutAct_9fa48("3429") ? true : (stryCov_9fa48("3429", "3430"), search)) params.search = search;
        if (stryMutAct_9fa48("3432") ? false : stryMutAct_9fa48("3431") ? true : (stryCov_9fa48("3431", "3432"), action)) params.action = action;
        const response = await api.get(stryMutAct_9fa48("3433") ? "" : (stryCov_9fa48("3433"), '/api/audit-logs'), stryMutAct_9fa48("3434") ? {} : (stryCov_9fa48("3434"), {
          params
        }));
        return response.data;
      }
    } catch (error) {
      if (stryMutAct_9fa48("3435")) {
        {}
      } else {
        stryCov_9fa48("3435");
        console.error(stryMutAct_9fa48("3436") ? "" : (stryCov_9fa48("3436"), 'Erro ao buscar logs de auditoria:'), error);
        return stryMutAct_9fa48("3437") ? ["Stryker was here"] : (stryCov_9fa48("3437"), []);
      }
    }
  }
};
export const exportAuditLogsCSV = async (search?: string, action?: string): Promise<void> => {
  if (stryMutAct_9fa48("3438")) {
    {}
  } else {
    stryCov_9fa48("3438");
    try {
      if (stryMutAct_9fa48("3439")) {
        {}
      } else {
        stryCov_9fa48("3439");
        const params: any = {};
        if (stryMutAct_9fa48("3441") ? false : stryMutAct_9fa48("3440") ? true : (stryCov_9fa48("3440", "3441"), search)) params.search = search;
        if (stryMutAct_9fa48("3443") ? false : stryMutAct_9fa48("3442") ? true : (stryCov_9fa48("3442", "3443"), action)) params.action = action;
        const response = await api.get(stryMutAct_9fa48("3444") ? "" : (stryCov_9fa48("3444"), '/api/audit-logs/export'), stryMutAct_9fa48("3445") ? {} : (stryCov_9fa48("3445"), {
          params,
          responseType: stryMutAct_9fa48("3446") ? "" : (stryCov_9fa48("3446"), 'blob')
        }));
        const blob = new Blob(stryMutAct_9fa48("3447") ? [] : (stryCov_9fa48("3447"), [response.data]), stryMutAct_9fa48("3448") ? {} : (stryCov_9fa48("3448"), {
          type: stryMutAct_9fa48("3449") ? "" : (stryCov_9fa48("3449"), 'text/csv')
        }));
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement(stryMutAct_9fa48("3450") ? "" : (stryCov_9fa48("3450"), 'a'));
        a.href = url;
        a.download = stryMutAct_9fa48("3451") ? "" : (stryCov_9fa48("3451"), 'audit_logs.csv');
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      if (stryMutAct_9fa48("3452")) {
        {}
      } else {
        stryCov_9fa48("3452");
        console.error(stryMutAct_9fa48("3453") ? "" : (stryCov_9fa48("3453"), 'Erro ao exportar logs de auditoria:'), error);
      }
    }
  }
};
export const getComplianceStats = async (): Promise<any> => {
  if (stryMutAct_9fa48("3454")) {
    {}
  } else {
    stryCov_9fa48("3454");
    try {
      if (stryMutAct_9fa48("3455")) {
        {}
      } else {
        stryCov_9fa48("3455");
        const response = await api.get(stryMutAct_9fa48("3456") ? "" : (stryCov_9fa48("3456"), '/api/dashboard/compliance'));
        return response.data;
      }
    } catch (error) {
      if (stryMutAct_9fa48("3457")) {
        {}
      } else {
        stryCov_9fa48("3457");
        console.error(stryMutAct_9fa48("3458") ? "" : (stryCov_9fa48("3458"), 'Erro ao buscar estatísticas de compliance:'), error);
        return null;
      }
    }
  }
};
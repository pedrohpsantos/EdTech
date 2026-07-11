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
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useProjects } from '../hooks/useProjects';
import { useUploadDocument } from '../hooks/useDocuments';
import { Project } from '../types';
import { useAuth } from '../context/authContext';
const ALLOWED_FILE_TYPES = stryMutAct_9fa48("2896") ? [] : (stryCov_9fa48("2896"), [stryMutAct_9fa48("2897") ? "" : (stryCov_9fa48("2897"), 'application/pdf'), stryMutAct_9fa48("2898") ? "" : (stryCov_9fa48("2898"), 'text/csv'), stryMutAct_9fa48("2899") ? "" : (stryCov_9fa48("2899"), 'application/json')]);
const ALLOWED_FILE_EXTENSIONS = stryMutAct_9fa48("2900") ? [] : (stryCov_9fa48("2900"), [stryMutAct_9fa48("2901") ? "" : (stryCov_9fa48("2901"), '.pdf'), stryMutAct_9fa48("2902") ? "" : (stryCov_9fa48("2902"), '.csv'), stryMutAct_9fa48("2903") ? "" : (stryCov_9fa48("2903"), '.json')]);
const getFileExtension = (filename: string) => {
  if (stryMutAct_9fa48("2904")) {
    {}
  } else {
    stryCov_9fa48("2904");
    const lastDotIndex = filename.lastIndexOf(stryMutAct_9fa48("2905") ? "" : (stryCov_9fa48("2905"), '.'));
    return (stryMutAct_9fa48("2909") ? lastDotIndex < 0 : stryMutAct_9fa48("2908") ? lastDotIndex > 0 : stryMutAct_9fa48("2907") ? false : stryMutAct_9fa48("2906") ? true : (stryCov_9fa48("2906", "2907", "2908", "2909"), lastDotIndex >= 0)) ? stryMutAct_9fa48("2911") ? filename.toLowerCase() : stryMutAct_9fa48("2910") ? filename.substring(lastDotIndex).toUpperCase() : (stryCov_9fa48("2910", "2911"), filename.substring(lastDotIndex).toLowerCase()) : stryMutAct_9fa48("2912") ? "Stryker was here!" : (stryCov_9fa48("2912"), '');
  }
};
const isAllowedFile = (file: File) => {
  if (stryMutAct_9fa48("2913")) {
    {}
  } else {
    stryCov_9fa48("2913");
    const extension = getFileExtension(file.name);
    const hasAllowedExtension = ALLOWED_FILE_EXTENSIONS.includes(extension);
    const hasAllowedMimeType = stryMutAct_9fa48("2916") ? !file.type && ALLOWED_FILE_TYPES.includes(file.type) : stryMutAct_9fa48("2915") ? false : stryMutAct_9fa48("2914") ? true : (stryCov_9fa48("2914", "2915", "2916"), (stryMutAct_9fa48("2917") ? file.type : (stryCov_9fa48("2917"), !file.type)) || ALLOWED_FILE_TYPES.includes(file.type));
    return stryMutAct_9fa48("2920") ? hasAllowedExtension || hasAllowedMimeType : stryMutAct_9fa48("2919") ? false : stryMutAct_9fa48("2918") ? true : (stryCov_9fa48("2918", "2919", "2920"), hasAllowedExtension && hasAllowedMimeType);
  }
};
const Upload: React.FC = () => {
  if (stryMutAct_9fa48("2921")) {
    {}
  } else {
    stryCov_9fa48("2921");
    const navigate = useNavigate();
    const {
      user
    } = useAuth();
    const firstName = stryMutAct_9fa48("2924") ? user?.name?.split(' ')[0] && 'Usuário' : stryMutAct_9fa48("2923") ? false : stryMutAct_9fa48("2922") ? true : (stryCov_9fa48("2922", "2923", "2924"), (stryMutAct_9fa48("2926") ? user.name?.split(' ')[0] : stryMutAct_9fa48("2925") ? user?.name.split(' ')[0] : (stryCov_9fa48("2925", "2926"), user?.name?.split(stryMutAct_9fa48("2927") ? "" : (stryCov_9fa48("2927"), ' '))[0])) || (stryMutAct_9fa48("2928") ? "" : (stryCov_9fa48("2928"), 'Usuário')));
    const {
      data: projects = stryMutAct_9fa48("2929") ? ["Stryker was here"] : (stryCov_9fa48("2929"), [])
    } = useProjects();
    const {
      mutateAsync: uploadDoc
    } = useUploadDocument();
    const [uploadTitle, setUploadTitle] = useState(stryMutAct_9fa48("2930") ? "Stryker was here!" : (stryCov_9fa48("2930"), ''));
    const [uploadProjectId, setUploadProjectId] = useState(stryMutAct_9fa48("2931") ? "Stryker was here!" : (stryCov_9fa48("2931"), ''));
    const [uploadTags, setUploadTags] = useState(stryMutAct_9fa48("2932") ? "Stryker was here!" : (stryCov_9fa48("2932"), ''));
    const [uploadCategory, setUploadCategory] = useState(stryMutAct_9fa48("2933") ? "Stryker was here!" : (stryCov_9fa48("2933"), ''));
    const [uploadFile, setUploadFile] = useState<File | null>(null);
    const [uploadError, setUploadError] = useState(stryMutAct_9fa48("2934") ? "Stryker was here!" : (stryCov_9fa48("2934"), ''));
    const [uploadSuccess, setUploadSuccess] = useState(stryMutAct_9fa48("2935") ? "Stryker was here!" : (stryCov_9fa48("2935"), ''));
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isDragging, setIsDragging] = useState(stryMutAct_9fa48("2936") ? true : (stryCov_9fa48("2936"), false));
    const handleDragOver = (e: React.DragEvent) => {
      if (stryMutAct_9fa48("2937")) {
        {}
      } else {
        stryCov_9fa48("2937");
        e.preventDefault();
        setIsDragging(stryMutAct_9fa48("2938") ? false : (stryCov_9fa48("2938"), true));
      }
    };
    const handleDragLeave = (e: React.DragEvent) => {
      if (stryMutAct_9fa48("2939")) {
        {}
      } else {
        stryCov_9fa48("2939");
        e.preventDefault();
        setIsDragging(stryMutAct_9fa48("2940") ? true : (stryCov_9fa48("2940"), false));
      }
    };
    const selectUploadFile = (file: File) => {
      if (stryMutAct_9fa48("2941")) {
        {}
      } else {
        stryCov_9fa48("2941");
        setUploadError(stryMutAct_9fa48("2942") ? "Stryker was here!" : (stryCov_9fa48("2942"), ''));
        if (stryMutAct_9fa48("2945") ? false : stryMutAct_9fa48("2944") ? true : stryMutAct_9fa48("2943") ? isAllowedFile(file) : (stryCov_9fa48("2943", "2944", "2945"), !isAllowedFile(file))) {
          if (stryMutAct_9fa48("2946")) {
            {}
          } else {
            stryCov_9fa48("2946");
            setUploadFile(null);
            setUploadError(stryMutAct_9fa48("2947") ? "" : (stryCov_9fa48("2947"), 'Formato inválido. Envie apenas arquivos PDF, CSV ou JSON.'));
            return;
          }
        }
        setUploadFile(file);
      }
    };
    const handleDrop = (e: React.DragEvent) => {
      if (stryMutAct_9fa48("2948")) {
        {}
      } else {
        stryCov_9fa48("2948");
        e.preventDefault();
        setIsDragging(stryMutAct_9fa48("2949") ? true : (stryCov_9fa48("2949"), false));
        if (stryMutAct_9fa48("2952") ? e.dataTransfer.files || e.dataTransfer.files[0] : stryMutAct_9fa48("2951") ? false : stryMutAct_9fa48("2950") ? true : (stryCov_9fa48("2950", "2951", "2952"), e.dataTransfer.files && e.dataTransfer.files[0])) {
          if (stryMutAct_9fa48("2953")) {
            {}
          } else {
            stryCov_9fa48("2953");
            selectUploadFile(e.dataTransfer.files[0]);
          }
        }
      }
    };
    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (stryMutAct_9fa48("2954")) {
        {}
      } else {
        stryCov_9fa48("2954");
        if (stryMutAct_9fa48("2957") ? e.target.files || e.target.files.length > 0 : stryMutAct_9fa48("2956") ? false : stryMutAct_9fa48("2955") ? true : (stryCov_9fa48("2955", "2956", "2957"), e.target.files && (stryMutAct_9fa48("2960") ? e.target.files.length <= 0 : stryMutAct_9fa48("2959") ? e.target.files.length >= 0 : stryMutAct_9fa48("2958") ? true : (stryCov_9fa48("2958", "2959", "2960"), e.target.files.length > 0)))) {
          if (stryMutAct_9fa48("2961")) {
            {}
          } else {
            stryCov_9fa48("2961");
            selectUploadFile(e.target.files[0]);
          }
        }
      }
    };
    const handleUpload = async (e: React.FormEvent) => {
      if (stryMutAct_9fa48("2962")) {
        {}
      } else {
        stryCov_9fa48("2962");
        e.preventDefault();
        setUploadError(stryMutAct_9fa48("2963") ? "Stryker was here!" : (stryCov_9fa48("2963"), ''));
        setUploadSuccess(stryMutAct_9fa48("2964") ? "Stryker was here!" : (stryCov_9fa48("2964"), ''));
        setUploadProgress(0);
        if (stryMutAct_9fa48("2967") ? (!uploadFile || !uploadTitle) && !uploadProjectId : stryMutAct_9fa48("2966") ? false : stryMutAct_9fa48("2965") ? true : (stryCov_9fa48("2965", "2966", "2967"), (stryMutAct_9fa48("2969") ? !uploadFile && !uploadTitle : stryMutAct_9fa48("2968") ? false : (stryCov_9fa48("2968", "2969"), (stryMutAct_9fa48("2970") ? uploadFile : (stryCov_9fa48("2970"), !uploadFile)) || (stryMutAct_9fa48("2971") ? uploadTitle : (stryCov_9fa48("2971"), !uploadTitle)))) || (stryMutAct_9fa48("2972") ? uploadProjectId : (stryCov_9fa48("2972"), !uploadProjectId)))) {
          if (stryMutAct_9fa48("2973")) {
            {}
          } else {
            stryCov_9fa48("2973");
            setUploadError(stryMutAct_9fa48("2974") ? "" : (stryCov_9fa48("2974"), 'Por favor, preencha todos os campos obrigatórios (Título, Projeto e Arquivo).'));
            return;
          }
        }
        if (stryMutAct_9fa48("2977") ? false : stryMutAct_9fa48("2976") ? true : stryMutAct_9fa48("2975") ? isAllowedFile(uploadFile) : (stryCov_9fa48("2975", "2976", "2977"), !isAllowedFile(uploadFile))) {
          if (stryMutAct_9fa48("2978")) {
            {}
          } else {
            stryCov_9fa48("2978");
            setUploadError(stryMutAct_9fa48("2979") ? "" : (stryCov_9fa48("2979"), 'Formato inválido. Envie apenas arquivos PDF, CSV ou JSON.'));
            return;
          }
        }
        try {
          if (stryMutAct_9fa48("2980")) {
            {}
          } else {
            stryCov_9fa48("2980");
            await uploadDoc(stryMutAct_9fa48("2981") ? {} : (stryCov_9fa48("2981"), {
              file: uploadFile,
              title: uploadTitle,
              projectId: uploadProjectId,
              onProgress: progressEvent => {
                if (stryMutAct_9fa48("2982")) {
                  {}
                } else {
                  stryCov_9fa48("2982");
                  const percentCompleted = Math.round(stryMutAct_9fa48("2983") ? progressEvent.loaded * 100 * progressEvent.total : (stryCov_9fa48("2983"), (stryMutAct_9fa48("2984") ? progressEvent.loaded / 100 : (stryCov_9fa48("2984"), progressEvent.loaded * 100)) / progressEvent.total));
                  setUploadProgress(percentCompleted);
                }
              }
            }));
            setUploadSuccess(stryMutAct_9fa48("2985") ? "" : (stryCov_9fa48("2985"), 'Documento enviado com sucesso! Redirecionando para o Workspace...'));
            setTimeout(() => {
              if (stryMutAct_9fa48("2986")) {
                {}
              } else {
                stryCov_9fa48("2986");
                navigate(stryMutAct_9fa48("2987") ? "" : (stryCov_9fa48("2987"), '/documentos'));
              }
            }, 2000);
          }
        } catch (error: any) {
          if (stryMutAct_9fa48("2988")) {
            {}
          } else {
            stryCov_9fa48("2988");
            setUploadError(error.message);
            setUploadProgress(0);
          }
        }
      }
    };
    return <DashboardLayout title={stryMutAct_9fa48("2989") ? `` : (stryCov_9fa48("2989"), `Bom dia, ${firstName}`)} subtitle="Adicione novos metadados e envie arquivos para os seus projetos" breadcrumbs={stryMutAct_9fa48("2990") ? [] : (stryCov_9fa48("2990"), [stryMutAct_9fa48("2991") ? "" : (stryCov_9fa48("2991"), 'EdTech'), stryMutAct_9fa48("2992") ? "" : (stryCov_9fa48("2992"), 'Enviar Documento')])}>
      <div className="dashboard-card" style={stryMutAct_9fa48("2993") ? {} : (stryCov_9fa48("2993"), {
        padding: stryMutAct_9fa48("2994") ? "" : (stryCov_9fa48("2994"), '32px'),
        backgroundColor: stryMutAct_9fa48("2995") ? "" : (stryCov_9fa48("2995"), 'var(--bg)'),
        border: stryMutAct_9fa48("2996") ? "" : (stryCov_9fa48("2996"), '1px solid var(--border)')
      })}>
        {stryMutAct_9fa48("2999") ? uploadError || <div className="governance-alert" style={{
          background: 'var(--ed-status-danger)',
          marginBottom: '24px'
        }}>
            <div className="alert-content">
              <div className="alert-icon">
                <i className="bi bi-exclamation-triangle"></i>
              </div>
              <div className="alert-text-container">
                <span className="alert-title">ERRO NO UPLOAD</span>
                <span className="alert-desc">{uploadError}</span>
              </div>
            </div>
          </div> : stryMutAct_9fa48("2998") ? false : stryMutAct_9fa48("2997") ? true : (stryCov_9fa48("2997", "2998", "2999"), uploadError && <div className="governance-alert" style={stryMutAct_9fa48("3000") ? {} : (stryCov_9fa48("3000"), {
          background: stryMutAct_9fa48("3001") ? "" : (stryCov_9fa48("3001"), 'var(--ed-status-danger)'),
          marginBottom: stryMutAct_9fa48("3002") ? "" : (stryCov_9fa48("3002"), '24px')
        })}>
            <div className="alert-content">
              <div className="alert-icon">
                <i className="bi bi-exclamation-triangle"></i>
              </div>
              <div className="alert-text-container">
                <span className="alert-title">ERRO NO UPLOAD</span>
                <span className="alert-desc">{uploadError}</span>
              </div>
            </div>
          </div>)}

        {stryMutAct_9fa48("3005") ? uploadSuccess || <div className="governance-alert" style={{
          background: 'var(--ed-status-success)',
          marginBottom: '24px'
        }}>
            <div className="alert-content">
              <div className="alert-icon">
                <i className="bi bi-check-circle"></i>
              </div>
              <div className="alert-text-container">
                <span className="alert-title">SUCESSO</span>
                <span className="alert-desc">{uploadSuccess}</span>
              </div>
            </div>
          </div> : stryMutAct_9fa48("3004") ? false : stryMutAct_9fa48("3003") ? true : (stryCov_9fa48("3003", "3004", "3005"), uploadSuccess && <div className="governance-alert" style={stryMutAct_9fa48("3006") ? {} : (stryCov_9fa48("3006"), {
          background: stryMutAct_9fa48("3007") ? "" : (stryCov_9fa48("3007"), 'var(--ed-status-success)'),
          marginBottom: stryMutAct_9fa48("3008") ? "" : (stryCov_9fa48("3008"), '24px')
        })}>
            <div className="alert-content">
              <div className="alert-icon">
                <i className="bi bi-check-circle"></i>
              </div>
              <div className="alert-text-container">
                <span className="alert-title">SUCESSO</span>
                <span className="alert-desc">{uploadSuccess}</span>
              </div>
            </div>
          </div>)}

        <form onSubmit={handleUpload} className="upload-advanced-form">
          <div className="upload-grid">
            {/* Coluna 1: Metadados */}
            <div style={stryMutAct_9fa48("3009") ? {} : (stryCov_9fa48("3009"), {
              display: stryMutAct_9fa48("3010") ? "" : (stryCov_9fa48("3010"), 'flex'),
              flexDirection: stryMutAct_9fa48("3011") ? "" : (stryCov_9fa48("3011"), 'column'),
              gap: stryMutAct_9fa48("3012") ? "" : (stryCov_9fa48("3012"), '24px')
            })}>
              <h4 style={stryMutAct_9fa48("3013") ? {} : (stryCov_9fa48("3013"), {
                fontSize: stryMutAct_9fa48("3014") ? "" : (stryCov_9fa48("3014"), '15px'),
                fontWeight: 600,
                color: stryMutAct_9fa48("3015") ? "" : (stryCov_9fa48("3015"), 'var(--ed-purple-light)'),
                opacity: 0.9,
                marginBottom: stryMutAct_9fa48("3016") ? "" : (stryCov_9fa48("3016"), '4px')
              })}>
                1. Metadados do Documento
              </h4>

              <div className="form-group">
                <label style={stryMutAct_9fa48("3017") ? {} : (stryCov_9fa48("3017"), {
                  display: stryMutAct_9fa48("3018") ? "" : (stryCov_9fa48("3018"), 'block'),
                  fontSize: stryMutAct_9fa48("3019") ? "" : (stryCov_9fa48("3019"), '13px'),
                  fontWeight: 600,
                  marginBottom: stryMutAct_9fa48("3020") ? "" : (stryCov_9fa48("3020"), '8px'),
                  color: stryMutAct_9fa48("3021") ? "" : (stryCov_9fa48("3021"), 'var(--ed-text-dark)')
                })}>
                  Título do Documento *
                </label>
                <input type="text" placeholder="Ex: Metodologia Qualitativa v3" value={uploadTitle} onChange={stryMutAct_9fa48("3022") ? () => undefined : (stryCov_9fa48("3022"), e => setUploadTitle(e.target.value))} style={stryMutAct_9fa48("3023") ? {} : (stryCov_9fa48("3023"), {
                  width: stryMutAct_9fa48("3024") ? "" : (stryCov_9fa48("3024"), '100%'),
                  padding: stryMutAct_9fa48("3025") ? "" : (stryCov_9fa48("3025"), '12px 14px'),
                  borderRadius: stryMutAct_9fa48("3026") ? "" : (stryCov_9fa48("3026"), '6px'),
                  border: stryMutAct_9fa48("3027") ? "" : (stryCov_9fa48("3027"), '1px solid var(--border)'),
                  background: stryMutAct_9fa48("3028") ? "" : (stryCov_9fa48("3028"), 'rgba(0,0,0,0.1)'),
                  color: stryMutAct_9fa48("3029") ? "" : (stryCov_9fa48("3029"), 'var(--ed-text-dark)'),
                  fontSize: stryMutAct_9fa48("3030") ? "" : (stryCov_9fa48("3030"), '14px'),
                  outline: stryMutAct_9fa48("3031") ? "" : (stryCov_9fa48("3031"), 'none')
                })} />
              </div>

              <div className="form-group">
                <label style={stryMutAct_9fa48("3032") ? {} : (stryCov_9fa48("3032"), {
                  display: stryMutAct_9fa48("3033") ? "" : (stryCov_9fa48("3033"), 'block'),
                  fontSize: stryMutAct_9fa48("3034") ? "" : (stryCov_9fa48("3034"), '13px'),
                  fontWeight: 600,
                  marginBottom: stryMutAct_9fa48("3035") ? "" : (stryCov_9fa48("3035"), '8px'),
                  color: stryMutAct_9fa48("3036") ? "" : (stryCov_9fa48("3036"), 'var(--ed-text-dark)')
                })}>
                  Projeto de Pesquisa *
                </label>
                <select value={uploadProjectId} onChange={stryMutAct_9fa48("3037") ? () => undefined : (stryCov_9fa48("3037"), e => setUploadProjectId(e.target.value))} style={stryMutAct_9fa48("3038") ? {} : (stryCov_9fa48("3038"), {
                  width: stryMutAct_9fa48("3039") ? "" : (stryCov_9fa48("3039"), '100%'),
                  padding: stryMutAct_9fa48("3040") ? "" : (stryCov_9fa48("3040"), '12px 14px'),
                  borderRadius: stryMutAct_9fa48("3041") ? "" : (stryCov_9fa48("3041"), '6px'),
                  border: stryMutAct_9fa48("3042") ? "" : (stryCov_9fa48("3042"), '1px solid var(--border)'),
                  background: stryMutAct_9fa48("3043") ? "" : (stryCov_9fa48("3043"), 'rgba(0,0,0,0.1)'),
                  color: stryMutAct_9fa48("3044") ? "" : (stryCov_9fa48("3044"), 'var(--ed-text-dark)'),
                  fontSize: stryMutAct_9fa48("3045") ? "" : (stryCov_9fa48("3045"), '14px'),
                  outline: stryMutAct_9fa48("3046") ? "" : (stryCov_9fa48("3046"), 'none')
                })}>
                  <option value="">Selecione o Projeto...</option>
                  {projects.map(stryMutAct_9fa48("3047") ? () => undefined : (stryCov_9fa48("3047"), (p: Project) => <option key={p.id} value={p.id}>
                      {p.name}
                    </option>))}
                </select>
              </div>

              <div className="form-group">
                <label style={stryMutAct_9fa48("3048") ? {} : (stryCov_9fa48("3048"), {
                  display: stryMutAct_9fa48("3049") ? "" : (stryCov_9fa48("3049"), 'block'),
                  fontSize: stryMutAct_9fa48("3050") ? "" : (stryCov_9fa48("3050"), '13px'),
                  fontWeight: 600,
                  marginBottom: stryMutAct_9fa48("3051") ? "" : (stryCov_9fa48("3051"), '8px'),
                  color: stryMutAct_9fa48("3052") ? "" : (stryCov_9fa48("3052"), 'var(--ed-text-dark)')
                })}>
                  Categoria
                </label>
                <select value={uploadCategory} onChange={stryMutAct_9fa48("3053") ? () => undefined : (stryCov_9fa48("3053"), e => setUploadCategory(e.target.value))} style={stryMutAct_9fa48("3054") ? {} : (stryCov_9fa48("3054"), {
                  width: stryMutAct_9fa48("3055") ? "" : (stryCov_9fa48("3055"), '100%'),
                  padding: stryMutAct_9fa48("3056") ? "" : (stryCov_9fa48("3056"), '12px 14px'),
                  borderRadius: stryMutAct_9fa48("3057") ? "" : (stryCov_9fa48("3057"), '6px'),
                  border: stryMutAct_9fa48("3058") ? "" : (stryCov_9fa48("3058"), '1px solid var(--border)'),
                  background: stryMutAct_9fa48("3059") ? "" : (stryCov_9fa48("3059"), 'rgba(0,0,0,0.1)'),
                  color: stryMutAct_9fa48("3060") ? "" : (stryCov_9fa48("3060"), 'var(--ed-text-dark)'),
                  fontSize: stryMutAct_9fa48("3061") ? "" : (stryCov_9fa48("3061"), '14px'),
                  outline: stryMutAct_9fa48("3062") ? "" : (stryCov_9fa48("3062"), 'none')
                })}>
                  <option value="">Selecione...</option>
                  <option value="Metodologia">Metodologia</option>
                  <option value="Dataset">Dataset (Conjunto de Dados)</option>
                  <option value="Referencial Teórico">Referencial Teórico</option>
                  <option value="Resultados">Resultados</option>
                  <option value="Configuração/Modelo">Configuração de Modelo</option>
                </select>
              </div>

              <div className="form-group">
                <label style={stryMutAct_9fa48("3063") ? {} : (stryCov_9fa48("3063"), {
                  display: stryMutAct_9fa48("3064") ? "" : (stryCov_9fa48("3064"), 'block'),
                  fontSize: stryMutAct_9fa48("3065") ? "" : (stryCov_9fa48("3065"), '13px'),
                  fontWeight: 600,
                  marginBottom: stryMutAct_9fa48("3066") ? "" : (stryCov_9fa48("3066"), '8px'),
                  color: stryMutAct_9fa48("3067") ? "" : (stryCov_9fa48("3067"), 'var(--ed-text-dark)')
                })}>
                  Tags (separadas por vírgula)
                </label>
                <input type="text" placeholder="Ex: LGPD, IA, Dados Sensíveis" value={uploadTags} onChange={stryMutAct_9fa48("3068") ? () => undefined : (stryCov_9fa48("3068"), e => setUploadTags(e.target.value))} style={stryMutAct_9fa48("3069") ? {} : (stryCov_9fa48("3069"), {
                  width: stryMutAct_9fa48("3070") ? "" : (stryCov_9fa48("3070"), '100%'),
                  padding: stryMutAct_9fa48("3071") ? "" : (stryCov_9fa48("3071"), '12px 14px'),
                  borderRadius: stryMutAct_9fa48("3072") ? "" : (stryCov_9fa48("3072"), '6px'),
                  border: stryMutAct_9fa48("3073") ? "" : (stryCov_9fa48("3073"), '1px solid var(--border)'),
                  background: stryMutAct_9fa48("3074") ? "" : (stryCov_9fa48("3074"), 'rgba(0,0,0,0.1)'),
                  color: stryMutAct_9fa48("3075") ? "" : (stryCov_9fa48("3075"), 'var(--ed-text-dark)'),
                  fontSize: stryMutAct_9fa48("3076") ? "" : (stryCov_9fa48("3076"), '14px'),
                  outline: stryMutAct_9fa48("3077") ? "" : (stryCov_9fa48("3077"), 'none')
                })} />
              </div>
            </div>

            {/* Coluna 2: Arquivo */}
            <div style={stryMutAct_9fa48("3078") ? {} : (stryCov_9fa48("3078"), {
              display: stryMutAct_9fa48("3079") ? "" : (stryCov_9fa48("3079"), 'flex'),
              flexDirection: stryMutAct_9fa48("3080") ? "" : (stryCov_9fa48("3080"), 'column'),
              gap: stryMutAct_9fa48("3081") ? "" : (stryCov_9fa48("3081"), '24px')
            })}>
              <h4 style={stryMutAct_9fa48("3082") ? {} : (stryCov_9fa48("3082"), {
                fontSize: stryMutAct_9fa48("3083") ? "" : (stryCov_9fa48("3083"), '15px'),
                fontWeight: 600,
                color: stryMutAct_9fa48("3084") ? "" : (stryCov_9fa48("3084"), 'var(--ed-purple-light)'),
                opacity: 0.9,
                marginBottom: stryMutAct_9fa48("3085") ? "" : (stryCov_9fa48("3085"), '4px')
              })}>
                2. Arquivo do Documento
              </h4>

              <div onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} onClick={stryMutAct_9fa48("3086") ? () => undefined : (stryCov_9fa48("3086"), () => stryMutAct_9fa48("3087") ? document.getElementById('advancedFileInput').click() : (stryCov_9fa48("3087"), document.getElementById(stryMutAct_9fa48("3088") ? "" : (stryCov_9fa48("3088"), 'advancedFileInput'))?.click()))} style={stryMutAct_9fa48("3089") ? {} : (stryCov_9fa48("3089"), {
                flex: 1,
                minHeight: stryMutAct_9fa48("3090") ? "" : (stryCov_9fa48("3090"), '250px'),
                display: stryMutAct_9fa48("3091") ? "" : (stryCov_9fa48("3091"), 'flex'),
                flexDirection: stryMutAct_9fa48("3092") ? "" : (stryCov_9fa48("3092"), 'column'),
                alignItems: stryMutAct_9fa48("3093") ? "" : (stryCov_9fa48("3093"), 'flex-start'),
                justifyContent: stryMutAct_9fa48("3094") ? "" : (stryCov_9fa48("3094"), 'flex-start'),
                backgroundColor: stryMutAct_9fa48("3095") ? "" : (stryCov_9fa48("3095"), 'transparent'),
                cursor: stryMutAct_9fa48("3096") ? "" : (stryCov_9fa48("3096"), 'pointer'),
                opacity: isDragging ? 0.7 : 1,
                transition: stryMutAct_9fa48("3097") ? "" : (stryCov_9fa48("3097"), 'opacity 0.2s')
              })}>
                <div style={stryMutAct_9fa48("3098") ? {} : (stryCov_9fa48("3098"), {
                  fontSize: stryMutAct_9fa48("3099") ? "" : (stryCov_9fa48("3099"), '24px'),
                  color: stryMutAct_9fa48("3100") ? "" : (stryCov_9fa48("3100"), 'var(--ed-text-dark)'),
                  marginBottom: stryMutAct_9fa48("3101") ? "" : (stryCov_9fa48("3101"), '16px')
                })}>
                  {uploadFile ? <i className="bi bi-file-earmark-check"></i> : <i className="bi bi-cloud-arrow-up"></i>}
                </div>
                <p style={stryMutAct_9fa48("3102") ? {} : (stryCov_9fa48("3102"), {
                  fontSize: stryMutAct_9fa48("3103") ? "" : (stryCov_9fa48("3103"), '15px'),
                  color: stryMutAct_9fa48("3104") ? "" : (stryCov_9fa48("3104"), 'var(--ed-text-dark)'),
                  fontWeight: 600,
                  margin: stryMutAct_9fa48("3105") ? "" : (stryCov_9fa48("3105"), '0 0 8px 0')
                })}>
                  {uploadFile ? uploadFile.name : stryMutAct_9fa48("3106") ? "" : (stryCov_9fa48("3106"), 'Arraste e solte seu arquivo aqui')}
                </p>
                <p style={stryMutAct_9fa48("3107") ? {} : (stryCov_9fa48("3107"), {
                  fontSize: stryMutAct_9fa48("3108") ? "" : (stryCov_9fa48("3108"), '13px'),
                  color: stryMutAct_9fa48("3109") ? "" : (stryCov_9fa48("3109"), 'var(--ed-text-muted)'),
                  margin: 0
                })}>
                  ou clique para procurar no seu computador
                </p>
                <p style={stryMutAct_9fa48("3110") ? {} : (stryCov_9fa48("3110"), {
                  fontSize: stryMutAct_9fa48("3111") ? "" : (stryCov_9fa48("3111"), '12px'),
                  marginTop: stryMutAct_9fa48("3112") ? "" : (stryCov_9fa48("3112"), '24px'),
                  color: stryMutAct_9fa48("3113") ? "" : (stryCov_9fa48("3113"), 'var(--ed-text-muted)'),
                  margin: stryMutAct_9fa48("3114") ? "" : (stryCov_9fa48("3114"), '24px 0 0 0')
                })}>
                  Formatos suportados: .pdf, .csv, .json (Máx. 50MB)
                </p>
                <input id="advancedFileInput" type="file" className="d-none" onChange={handleFileInput} accept=".pdf,.csv,.json,application/pdf,text/csv,application/json" />
              </div>

              {stryMutAct_9fa48("3117") ? uploadProgress > 0 || <div className="progress-item mt-2">
                  <div className="progress-header">
                    <span>Enviando {uploadFile?.name}...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="progress-bar-bg">
                    <div className="progress-bar-fill fill-purple" style={{
                    width: `${uploadProgress}%`,
                    transition: 'width 0.3s'
                  }}></div>
                  </div>
                </div> : stryMutAct_9fa48("3116") ? false : stryMutAct_9fa48("3115") ? true : (stryCov_9fa48("3115", "3116", "3117"), (stryMutAct_9fa48("3120") ? uploadProgress <= 0 : stryMutAct_9fa48("3119") ? uploadProgress >= 0 : stryMutAct_9fa48("3118") ? true : (stryCov_9fa48("3118", "3119", "3120"), uploadProgress > 0)) && <div className="progress-item mt-2">
                  <div className="progress-header">
                    <span>Enviando {stryMutAct_9fa48("3121") ? uploadFile.name : (stryCov_9fa48("3121"), uploadFile?.name)}...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="progress-bar-bg">
                    <div className="progress-bar-fill fill-purple" style={stryMutAct_9fa48("3122") ? {} : (stryCov_9fa48("3122"), {
                    width: stryMutAct_9fa48("3123") ? `` : (stryCov_9fa48("3123"), `${uploadProgress}%`),
                    transition: stryMutAct_9fa48("3124") ? "" : (stryCov_9fa48("3124"), 'width 0.3s')
                  })}></div>
                  </div>
                </div>)}
            </div>
          </div>

          <div style={stryMutAct_9fa48("3125") ? {} : (stryCov_9fa48("3125"), {
            display: stryMutAct_9fa48("3126") ? "" : (stryCov_9fa48("3126"), 'flex'),
            justifyContent: stryMutAct_9fa48("3127") ? "" : (stryCov_9fa48("3127"), 'flex-end'),
            gap: stryMutAct_9fa48("3128") ? "" : (stryCov_9fa48("3128"), '16px'),
            marginTop: stryMutAct_9fa48("3129") ? "" : (stryCov_9fa48("3129"), '48px'),
            paddingTop: stryMutAct_9fa48("3130") ? "" : (stryCov_9fa48("3130"), '32px'),
            borderTop: stryMutAct_9fa48("3131") ? "" : (stryCov_9fa48("3131"), '1px solid var(--border)')
          })}>
            <button type="button" onClick={stryMutAct_9fa48("3132") ? () => undefined : (stryCov_9fa48("3132"), () => navigate(stryMutAct_9fa48("3133") ? +1 : (stryCov_9fa48("3133"), -1)))} style={stryMutAct_9fa48("3134") ? {} : (stryCov_9fa48("3134"), {
              padding: stryMutAct_9fa48("3135") ? "" : (stryCov_9fa48("3135"), '12px 32px'),
              background: stryMutAct_9fa48("3136") ? "" : (stryCov_9fa48("3136"), 'transparent'),
              border: stryMutAct_9fa48("3137") ? "" : (stryCov_9fa48("3137"), '1px solid var(--ed-text-muted)'),
              color: stryMutAct_9fa48("3138") ? "" : (stryCov_9fa48("3138"), 'var(--ed-text-dark)'),
              borderRadius: stryMutAct_9fa48("3139") ? "" : (stryCov_9fa48("3139"), '6px'),
              fontSize: stryMutAct_9fa48("3140") ? "" : (stryCov_9fa48("3140"), '14px'),
              fontWeight: 500,
              cursor: stryMutAct_9fa48("3141") ? "" : (stryCov_9fa48("3141"), 'pointer'),
              transition: stryMutAct_9fa48("3142") ? "" : (stryCov_9fa48("3142"), 'all 0.2s')
            })}>
              Cancelar
            </button>
            <button type="submit" disabled={stryMutAct_9fa48("3145") ? !uploadFile && uploadProgress > 0 : stryMutAct_9fa48("3144") ? false : stryMutAct_9fa48("3143") ? true : (stryCov_9fa48("3143", "3144", "3145"), (stryMutAct_9fa48("3146") ? uploadFile : (stryCov_9fa48("3146"), !uploadFile)) || (stryMutAct_9fa48("3149") ? uploadProgress <= 0 : stryMutAct_9fa48("3148") ? uploadProgress >= 0 : stryMutAct_9fa48("3147") ? false : (stryCov_9fa48("3147", "3148", "3149"), uploadProgress > 0)))} style={stryMutAct_9fa48("3150") ? {} : (stryCov_9fa48("3150"), {
              padding: stryMutAct_9fa48("3151") ? "" : (stryCov_9fa48("3151"), '12px 48px'),
              backgroundColor: uploadFile ? stryMutAct_9fa48("3152") ? "" : (stryCov_9fa48("3152"), 'var(--ed-purple-main)') : stryMutAct_9fa48("3153") ? "" : (stryCov_9fa48("3153"), 'rgba(255,255,255,0.03)'),
              color: uploadFile ? stryMutAct_9fa48("3154") ? "" : (stryCov_9fa48("3154"), 'white') : stryMutAct_9fa48("3155") ? "" : (stryCov_9fa48("3155"), 'rgba(255,255,255,0.3)'),
              border: stryMutAct_9fa48("3156") ? "" : (stryCov_9fa48("3156"), 'none'),
              borderRadius: stryMutAct_9fa48("3157") ? "" : (stryCov_9fa48("3157"), '6px'),
              fontSize: stryMutAct_9fa48("3158") ? "" : (stryCov_9fa48("3158"), '14px'),
              fontWeight: 500,
              cursor: uploadFile ? stryMutAct_9fa48("3159") ? "" : (stryCov_9fa48("3159"), 'pointer') : stryMutAct_9fa48("3160") ? "" : (stryCov_9fa48("3160"), 'not-allowed'),
              transition: stryMutAct_9fa48("3161") ? "" : (stryCov_9fa48("3161"), 'all 0.2s')
            })}>
              {(stryMutAct_9fa48("3164") ? uploadProgress > 0 || uploadProgress < 100 : stryMutAct_9fa48("3163") ? false : stryMutAct_9fa48("3162") ? true : (stryCov_9fa48("3162", "3163", "3164"), (stryMutAct_9fa48("3167") ? uploadProgress <= 0 : stryMutAct_9fa48("3166") ? uploadProgress >= 0 : stryMutAct_9fa48("3165") ? true : (stryCov_9fa48("3165", "3166", "3167"), uploadProgress > 0)) && (stryMutAct_9fa48("3170") ? uploadProgress >= 100 : stryMutAct_9fa48("3169") ? uploadProgress <= 100 : stryMutAct_9fa48("3168") ? true : (stryCov_9fa48("3168", "3169", "3170"), uploadProgress < 100)))) ? stryMutAct_9fa48("3171") ? "" : (stryCov_9fa48("3171"), 'Enviando...') : stryMutAct_9fa48("3172") ? "" : (stryCov_9fa48("3172"), 'Confirmar Envio')}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>;
  }
};
export default Upload;
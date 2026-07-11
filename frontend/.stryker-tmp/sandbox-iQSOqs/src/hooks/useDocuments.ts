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
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getDocuments, uploadDocument, getDownloadUrl, toggleStar, getComments, addComment } from '../services/api';
export const useDocuments = (projectId?: string, title?: string, page = 0, size = 20) => {
  if (stryMutAct_9fa48("710")) {
    {}
  } else {
    stryCov_9fa48("710");
    return useQuery(stryMutAct_9fa48("711") ? {} : (stryCov_9fa48("711"), {
      queryKey: stryMutAct_9fa48("712") ? [] : (stryCov_9fa48("712"), [stryMutAct_9fa48("713") ? "" : (stryCov_9fa48("713"), 'documents'), projectId, title, page, size]),
      queryFn: async () => {
        if (stryMutAct_9fa48("714")) {
          {}
        } else {
          stryCov_9fa48("714");
          const res = await getDocuments(projectId, title, undefined, page, size);
          if (stryMutAct_9fa48("717") ? false : stryMutAct_9fa48("716") ? true : stryMutAct_9fa48("715") ? res.sucesso : (stryCov_9fa48("715", "716", "717"), !res.sucesso)) throw new Error(res.mensagem);
          return stryMutAct_9fa48("720") ? (res.dados?.content || res.dados) && [] : stryMutAct_9fa48("719") ? false : stryMutAct_9fa48("718") ? true : (stryCov_9fa48("718", "719", "720"), (stryMutAct_9fa48("722") ? res.dados?.content && res.dados : stryMutAct_9fa48("721") ? false : (stryCov_9fa48("721", "722"), (stryMutAct_9fa48("723") ? res.dados.content : (stryCov_9fa48("723"), res.dados?.content)) || res.dados)) || (stryMutAct_9fa48("724") ? ["Stryker was here"] : (stryCov_9fa48("724"), [])));
        }
      }
    }));
  }
};
export const useUploadDocument = () => {
  if (stryMutAct_9fa48("725")) {
    {}
  } else {
    stryCov_9fa48("725");
    const queryClient = useQueryClient();
    return useMutation(stryMutAct_9fa48("726") ? {} : (stryCov_9fa48("726"), {
      mutationFn: async ({
        file,
        title,
        projectId,
        onProgress
      }: {
        file: File;
        title: string;
        projectId: string;
        onProgress?: (p: any) => void;
      }) => {
        if (stryMutAct_9fa48("727")) {
          {}
        } else {
          stryCov_9fa48("727");
          const res = await uploadDocument(file, title, projectId, onProgress);
          if (stryMutAct_9fa48("730") ? false : stryMutAct_9fa48("729") ? true : stryMutAct_9fa48("728") ? res.sucesso : (stryCov_9fa48("728", "729", "730"), !res.sucesso)) throw new Error(res.mensagem);
          return res.dados;
        }
      },
      onSuccess: () => {
        if (stryMutAct_9fa48("731")) {
          {}
        } else {
          stryCov_9fa48("731");
          queryClient.invalidateQueries(stryMutAct_9fa48("732") ? {} : (stryCov_9fa48("732"), {
            queryKey: stryMutAct_9fa48("733") ? [] : (stryCov_9fa48("733"), [stryMutAct_9fa48("734") ? "" : (stryCov_9fa48("734"), 'documents')])
          }));
        }
      }
    }));
  }
};
export const useDownloadUrl = () => {
  if (stryMutAct_9fa48("735")) {
    {}
  } else {
    stryCov_9fa48("735");
    return useMutation(stryMutAct_9fa48("736") ? {} : (stryCov_9fa48("736"), {
      mutationFn: async (documentId: string) => {
        if (stryMutAct_9fa48("737")) {
          {}
        } else {
          stryCov_9fa48("737");
          const res = await getDownloadUrl(documentId);
          if (stryMutAct_9fa48("740") ? false : stryMutAct_9fa48("739") ? true : stryMutAct_9fa48("738") ? res.sucesso : (stryCov_9fa48("738", "739", "740"), !res.sucesso)) throw new Error(res.mensagem);
          return (stryMutAct_9fa48("743") ? typeof res.dados !== 'string' : stryMutAct_9fa48("742") ? false : stryMutAct_9fa48("741") ? true : (stryCov_9fa48("741", "742", "743"), typeof res.dados === (stryMutAct_9fa48("744") ? "" : (stryCov_9fa48("744"), 'string')))) ? res.dados : stryMutAct_9fa48("747") ? (res.dados?.url || res.dados?.downloadUrl) && res.dados?.fileUrl : stryMutAct_9fa48("746") ? false : stryMutAct_9fa48("745") ? true : (stryCov_9fa48("745", "746", "747"), (stryMutAct_9fa48("749") ? res.dados?.url && res.dados?.downloadUrl : stryMutAct_9fa48("748") ? false : (stryCov_9fa48("748", "749"), (stryMutAct_9fa48("750") ? res.dados.url : (stryCov_9fa48("750"), res.dados?.url)) || (stryMutAct_9fa48("751") ? res.dados.downloadUrl : (stryCov_9fa48("751"), res.dados?.downloadUrl)))) || (stryMutAct_9fa48("752") ? res.dados.fileUrl : (stryCov_9fa48("752"), res.dados?.fileUrl)));
        }
      }
    }));
  }
};
export const useToggleStar = () => {
  if (stryMutAct_9fa48("753")) {
    {}
  } else {
    stryCov_9fa48("753");
    const queryClient = useQueryClient();
    return useMutation(stryMutAct_9fa48("754") ? {} : (stryCov_9fa48("754"), {
      mutationFn: async (documentId: string) => {
        if (stryMutAct_9fa48("755")) {
          {}
        } else {
          stryCov_9fa48("755");
          const res = await toggleStar(documentId);
          if (stryMutAct_9fa48("758") ? false : stryMutAct_9fa48("757") ? true : stryMutAct_9fa48("756") ? res.sucesso : (stryCov_9fa48("756", "757", "758"), !res.sucesso)) throw new Error(res.mensagem);
          return res.dados;
        }
      },
      // Optimistic UI Update
      onMutate: async documentId => {
        if (stryMutAct_9fa48("759")) {
          {}
        } else {
          stryCov_9fa48("759");
          await queryClient.cancelQueries(stryMutAct_9fa48("760") ? {} : (stryCov_9fa48("760"), {
            queryKey: stryMutAct_9fa48("761") ? [] : (stryCov_9fa48("761"), [stryMutAct_9fa48("762") ? "" : (stryCov_9fa48("762"), 'documents')])
          }));
          const previousQueries = queryClient.getQueriesData(stryMutAct_9fa48("763") ? {} : (stryCov_9fa48("763"), {
            queryKey: stryMutAct_9fa48("764") ? [] : (stryCov_9fa48("764"), [stryMutAct_9fa48("765") ? "" : (stryCov_9fa48("765"), 'documents')])
          }));
          queryClient.setQueriesData(stryMutAct_9fa48("766") ? {} : (stryCov_9fa48("766"), {
            queryKey: stryMutAct_9fa48("767") ? [] : (stryCov_9fa48("767"), [stryMutAct_9fa48("768") ? "" : (stryCov_9fa48("768"), 'documents')])
          }), (oldData: any) => {
            if (stryMutAct_9fa48("769")) {
              {}
            } else {
              stryCov_9fa48("769");
              if (stryMutAct_9fa48("772") ? false : stryMutAct_9fa48("771") ? true : stryMutAct_9fa48("770") ? oldData : (stryCov_9fa48("770", "771", "772"), !oldData)) return oldData;
              return oldData.map(stryMutAct_9fa48("773") ? () => undefined : (stryCov_9fa48("773"), (doc: any) => (stryMutAct_9fa48("776") ? doc.id !== documentId : stryMutAct_9fa48("775") ? false : stryMutAct_9fa48("774") ? true : (stryCov_9fa48("774", "775", "776"), doc.id === documentId)) ? stryMutAct_9fa48("777") ? {} : (stryCov_9fa48("777"), {
                ...doc,
                starred: stryMutAct_9fa48("778") ? doc.starred : (stryCov_9fa48("778"), !doc.starred)
              }) : doc));
            }
          });
          return stryMutAct_9fa48("779") ? {} : (stryCov_9fa48("779"), {
            previousQueries
          });
        }
      },
      onError: (err, documentId, context) => {
        if (stryMutAct_9fa48("780")) {
          {}
        } else {
          stryCov_9fa48("780");
          if (stryMutAct_9fa48("783") ? context.previousQueries : stryMutAct_9fa48("782") ? false : stryMutAct_9fa48("781") ? true : (stryCov_9fa48("781", "782", "783"), context?.previousQueries)) {
            if (stryMutAct_9fa48("784")) {
              {}
            } else {
              stryCov_9fa48("784");
              context.previousQueries.forEach(([queryKey, data]) => {
                if (stryMutAct_9fa48("785")) {
                  {}
                } else {
                  stryCov_9fa48("785");
                  queryClient.setQueryData(queryKey, data);
                }
              });
            }
          }
        }
      },
      onSettled: () => {
        if (stryMutAct_9fa48("786")) {
          {}
        } else {
          stryCov_9fa48("786");
          queryClient.invalidateQueries(stryMutAct_9fa48("787") ? {} : (stryCov_9fa48("787"), {
            queryKey: stryMutAct_9fa48("788") ? [] : (stryCov_9fa48("788"), [stryMutAct_9fa48("789") ? "" : (stryCov_9fa48("789"), 'documents')])
          }));
        }
      }
    }));
  }
};
export const useComments = (documentId?: string) => {
  if (stryMutAct_9fa48("790")) {
    {}
  } else {
    stryCov_9fa48("790");
    return useQuery(stryMutAct_9fa48("791") ? {} : (stryCov_9fa48("791"), {
      queryKey: stryMutAct_9fa48("792") ? [] : (stryCov_9fa48("792"), [stryMutAct_9fa48("793") ? "" : (stryCov_9fa48("793"), 'comments'), documentId]),
      queryFn: async () => {
        if (stryMutAct_9fa48("794")) {
          {}
        } else {
          stryCov_9fa48("794");
          if (stryMutAct_9fa48("797") ? false : stryMutAct_9fa48("796") ? true : stryMutAct_9fa48("795") ? documentId : (stryCov_9fa48("795", "796", "797"), !documentId)) return stryMutAct_9fa48("798") ? ["Stryker was here"] : (stryCov_9fa48("798"), []);
          const res = await getComments(documentId);
          if (stryMutAct_9fa48("801") ? false : stryMutAct_9fa48("800") ? true : stryMutAct_9fa48("799") ? res.sucesso : (stryCov_9fa48("799", "800", "801"), !res.sucesso)) throw new Error(res.mensagem);
          return res.dados;
        }
      },
      enabled: stryMutAct_9fa48("802") ? !documentId : (stryCov_9fa48("802"), !(stryMutAct_9fa48("803") ? documentId : (stryCov_9fa48("803"), !documentId)))
    }));
  }
};
export const useAddComment = (documentId: string) => {
  if (stryMutAct_9fa48("804")) {
    {}
  } else {
    stryCov_9fa48("804");
    const queryClient = useQueryClient();
    return useMutation(stryMutAct_9fa48("805") ? {} : (stryCov_9fa48("805"), {
      mutationFn: async (content: string) => {
        if (stryMutAct_9fa48("806")) {
          {}
        } else {
          stryCov_9fa48("806");
          const res = await addComment(documentId, content);
          if (stryMutAct_9fa48("809") ? false : stryMutAct_9fa48("808") ? true : stryMutAct_9fa48("807") ? res.sucesso : (stryCov_9fa48("807", "808", "809"), !res.sucesso)) throw new Error(res.mensagem);
          return res.dados;
        }
      },
      onMutate: async newContent => {
        if (stryMutAct_9fa48("810")) {
          {}
        } else {
          stryCov_9fa48("810");
          await queryClient.cancelQueries(stryMutAct_9fa48("811") ? {} : (stryCov_9fa48("811"), {
            queryKey: stryMutAct_9fa48("812") ? [] : (stryCov_9fa48("812"), [stryMutAct_9fa48("813") ? "" : (stryCov_9fa48("813"), 'comments'), documentId])
          }));
          const previousComments = queryClient.getQueryData(stryMutAct_9fa48("814") ? [] : (stryCov_9fa48("814"), [stryMutAct_9fa48("815") ? "" : (stryCov_9fa48("815"), 'comments'), documentId]));
          queryClient.setQueryData(stryMutAct_9fa48("816") ? [] : (stryCov_9fa48("816"), [stryMutAct_9fa48("817") ? "" : (stryCov_9fa48("817"), 'comments'), documentId]), stryMutAct_9fa48("818") ? () => undefined : (stryCov_9fa48("818"), (old: any) => stryMutAct_9fa48("819") ? [] : (stryCov_9fa48("819"), [...(stryMutAct_9fa48("822") ? old && [] : stryMutAct_9fa48("821") ? false : stryMutAct_9fa48("820") ? true : (stryCov_9fa48("820", "821", "822"), old || (stryMutAct_9fa48("823") ? ["Stryker was here"] : (stryCov_9fa48("823"), [])))), stryMutAct_9fa48("824") ? {} : (stryCov_9fa48("824"), {
            id: Math.random().toString(),
            // fake id for optimistic UI
            content: newContent,
            createdAt: new Date().toISOString(),
            authorName: stryMutAct_9fa48("825") ? "" : (stryCov_9fa48("825"), 'Você') // optimistically assumed
          })])));
          return stryMutAct_9fa48("826") ? {} : (stryCov_9fa48("826"), {
            previousComments
          });
        }
      },
      onError: (err, newContent, context) => {
        if (stryMutAct_9fa48("827")) {
          {}
        } else {
          stryCov_9fa48("827");
          if (stryMutAct_9fa48("830") ? context.previousComments : stryMutAct_9fa48("829") ? false : stryMutAct_9fa48("828") ? true : (stryCov_9fa48("828", "829", "830"), context?.previousComments)) {
            if (stryMutAct_9fa48("831")) {
              {}
            } else {
              stryCov_9fa48("831");
              queryClient.setQueryData(stryMutAct_9fa48("832") ? [] : (stryCov_9fa48("832"), [stryMutAct_9fa48("833") ? "" : (stryCov_9fa48("833"), 'comments'), documentId]), context.previousComments);
            }
          }
        }
      },
      onSettled: () => {
        if (stryMutAct_9fa48("834")) {
          {}
        } else {
          stryCov_9fa48("834");
          queryClient.invalidateQueries(stryMutAct_9fa48("835") ? {} : (stryCov_9fa48("835"), {
            queryKey: stryMutAct_9fa48("836") ? [] : (stryCov_9fa48("836"), [stryMutAct_9fa48("837") ? "" : (stryCov_9fa48("837"), 'comments'), documentId])
          }));
        }
      }
    }));
  }
};
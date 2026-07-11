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
import React, { useState, useEffect, useRef } from 'react';
import { useComments, useAddComment } from '../hooks/useDocuments';
interface DocumentCommentsProps {
  documentId: string;
}
const DocumentComments: React.FC<DocumentCommentsProps> = ({
  documentId
}) => {
  if (stryMutAct_9fa48("221")) {
    {}
  } else {
    stryCov_9fa48("221");
    const [content, setContent] = useState(stryMutAct_9fa48("222") ? "Stryker was here!" : (stryCov_9fa48("222"), ''));
    const {
      data: comments = stryMutAct_9fa48("223") ? ["Stryker was here"] : (stryCov_9fa48("223"), []),
      isLoading
    } = useComments(documentId);
    const {
      mutateAsync: addComment,
      isPending
    } = useAddComment(documentId);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
      if (stryMutAct_9fa48("224")) {
        {}
      } else {
        stryCov_9fa48("224");
        stryMutAct_9fa48("225") ? messagesEndRef.current.scrollIntoView({
          behavior: 'smooth'
        }) : (stryCov_9fa48("225"), messagesEndRef.current?.scrollIntoView(stryMutAct_9fa48("226") ? {} : (stryCov_9fa48("226"), {
          behavior: stryMutAct_9fa48("227") ? "" : (stryCov_9fa48("227"), 'smooth')
        })));
      }
    }, stryMutAct_9fa48("228") ? [] : (stryCov_9fa48("228"), [comments]));
    const handleSubmit = async (e: React.FormEvent) => {
      if (stryMutAct_9fa48("229")) {
        {}
      } else {
        stryCov_9fa48("229");
        e.preventDefault();
        if (stryMutAct_9fa48("232") ? false : stryMutAct_9fa48("231") ? true : stryMutAct_9fa48("230") ? content.trim() : (stryCov_9fa48("230", "231", "232"), !(stryMutAct_9fa48("233") ? content : (stryCov_9fa48("233"), content.trim())))) return;
        try {
          if (stryMutAct_9fa48("234")) {
            {}
          } else {
            stryCov_9fa48("234");
            await addComment(content);
            setContent(stryMutAct_9fa48("235") ? "Stryker was here!" : (stryCov_9fa48("235"), ''));
          }
        } catch (err) {
          if (stryMutAct_9fa48("236")) {
            {}
          } else {
            stryCov_9fa48("236");
            console.error(stryMutAct_9fa48("237") ? "" : (stryCov_9fa48("237"), 'Failed to post comment'), err);
          }
        }
      }
    };
    return <div style={stryMutAct_9fa48("238") ? {} : (stryCov_9fa48("238"), {
      display: stryMutAct_9fa48("239") ? "" : (stryCov_9fa48("239"), 'flex'),
      flexDirection: stryMutAct_9fa48("240") ? "" : (stryCov_9fa48("240"), 'column'),
      height: stryMutAct_9fa48("241") ? "" : (stryCov_9fa48("241"), '100%'),
      background: stryMutAct_9fa48("242") ? "" : (stryCov_9fa48("242"), '#f8fafc'),
      borderLeft: stryMutAct_9fa48("243") ? "" : (stryCov_9fa48("243"), '1px solid #e2e8f0')
    })}>
      <div style={stryMutAct_9fa48("244") ? {} : (stryCov_9fa48("244"), {
        padding: stryMutAct_9fa48("245") ? "" : (stryCov_9fa48("245"), '16px'),
        borderBottom: stryMutAct_9fa48("246") ? "" : (stryCov_9fa48("246"), '1px solid #e2e8f0'),
        background: stryMutAct_9fa48("247") ? "" : (stryCov_9fa48("247"), 'white')
      })}>
        <h4 style={stryMutAct_9fa48("248") ? {} : (stryCov_9fa48("248"), {
          margin: 0,
          fontSize: stryMutAct_9fa48("249") ? "" : (stryCov_9fa48("249"), '15px'),
          fontWeight: 600,
          color: stryMutAct_9fa48("250") ? "" : (stryCov_9fa48("250"), '#1e293b')
        })}>
          <i className="bi bi-chat-dots me-2"></i> Discussão
        </h4>
      </div>

      <div style={stryMutAct_9fa48("251") ? {} : (stryCov_9fa48("251"), {
        flex: 1,
        overflowY: stryMutAct_9fa48("252") ? "" : (stryCov_9fa48("252"), 'auto'),
        padding: stryMutAct_9fa48("253") ? "" : (stryCov_9fa48("253"), '16px'),
        display: stryMutAct_9fa48("254") ? "" : (stryCov_9fa48("254"), 'flex'),
        flexDirection: stryMutAct_9fa48("255") ? "" : (stryCov_9fa48("255"), 'column'),
        gap: stryMutAct_9fa48("256") ? "" : (stryCov_9fa48("256"), '16px')
      })}>
        {isLoading ? <div style={stryMutAct_9fa48("257") ? {} : (stryCov_9fa48("257"), {
          textAlign: stryMutAct_9fa48("258") ? "" : (stryCov_9fa48("258"), 'center'),
          color: stryMutAct_9fa48("259") ? "" : (stryCov_9fa48("259"), '#64748B'),
          fontSize: stryMutAct_9fa48("260") ? "" : (stryCov_9fa48("260"), '13px')
        })}>Carregando...</div> : (stryMutAct_9fa48("263") ? comments.length !== 0 : stryMutAct_9fa48("262") ? false : stryMutAct_9fa48("261") ? true : (stryCov_9fa48("261", "262", "263"), comments.length === 0)) ? <div style={stryMutAct_9fa48("264") ? {} : (stryCov_9fa48("264"), {
          textAlign: stryMutAct_9fa48("265") ? "" : (stryCov_9fa48("265"), 'center'),
          color: stryMutAct_9fa48("266") ? "" : (stryCov_9fa48("266"), '#64748B'),
          fontSize: stryMutAct_9fa48("267") ? "" : (stryCov_9fa48("267"), '13px'),
          marginTop: stryMutAct_9fa48("268") ? "" : (stryCov_9fa48("268"), '20px')
        })}>
            Nenhum comentário ainda. Inicie a conversa!
          </div> : comments.map(stryMutAct_9fa48("269") ? () => undefined : (stryCov_9fa48("269"), (comment: any) => <div key={comment.id} style={stryMutAct_9fa48("270") ? {} : (stryCov_9fa48("270"), {
          display: stryMutAct_9fa48("271") ? "" : (stryCov_9fa48("271"), 'flex'),
          flexDirection: stryMutAct_9fa48("272") ? "" : (stryCov_9fa48("272"), 'column'),
          gap: stryMutAct_9fa48("273") ? "" : (stryCov_9fa48("273"), '4px')
        })}>
              <div style={stryMutAct_9fa48("274") ? {} : (stryCov_9fa48("274"), {
            display: stryMutAct_9fa48("275") ? "" : (stryCov_9fa48("275"), 'flex'),
            alignItems: stryMutAct_9fa48("276") ? "" : (stryCov_9fa48("276"), 'center'),
            justifyContent: stryMutAct_9fa48("277") ? "" : (stryCov_9fa48("277"), 'space-between')
          })}>
                <span style={stryMutAct_9fa48("278") ? {} : (stryCov_9fa48("278"), {
              fontWeight: 600,
              fontSize: stryMutAct_9fa48("279") ? "" : (stryCov_9fa48("279"), '13px'),
              color: stryMutAct_9fa48("280") ? "" : (stryCov_9fa48("280"), '#334155')
            })}>{comment.authorName}</span>
                <span style={stryMutAct_9fa48("281") ? {} : (stryCov_9fa48("281"), {
              fontSize: stryMutAct_9fa48("282") ? "" : (stryCov_9fa48("282"), '11px'),
              color: stryMutAct_9fa48("283") ? "" : (stryCov_9fa48("283"), '#94a3b8')
            })}>
                  {new Date(comment.createdAt).toLocaleDateString()} {new Date(comment.createdAt).toLocaleTimeString(stryMutAct_9fa48("284") ? ["Stryker was here"] : (stryCov_9fa48("284"), []), stryMutAct_9fa48("285") ? {} : (stryCov_9fa48("285"), {
                hour: stryMutAct_9fa48("286") ? "" : (stryCov_9fa48("286"), '2-digit'),
                minute: stryMutAct_9fa48("287") ? "" : (stryCov_9fa48("287"), '2-digit')
              }))}
                </span>
              </div>
              <div style={stryMutAct_9fa48("288") ? {} : (stryCov_9fa48("288"), {
            background: stryMutAct_9fa48("289") ? "" : (stryCov_9fa48("289"), 'white'),
            padding: stryMutAct_9fa48("290") ? "" : (stryCov_9fa48("290"), '10px 12px'),
            borderRadius: stryMutAct_9fa48("291") ? "" : (stryCov_9fa48("291"), '8px'),
            border: stryMutAct_9fa48("292") ? "" : (stryCov_9fa48("292"), '1px solid #e2e8f0'),
            fontSize: stryMutAct_9fa48("293") ? "" : (stryCov_9fa48("293"), '13px'),
            color: stryMutAct_9fa48("294") ? "" : (stryCov_9fa48("294"), '#475569'),
            boxShadow: stryMutAct_9fa48("295") ? "" : (stryCov_9fa48("295"), '0 1px 2px rgba(0,0,0,0.02)'),
            wordBreak: stryMutAct_9fa48("296") ? "" : (stryCov_9fa48("296"), 'break-word')
          })}>
                {comment.content}
              </div>
            </div>))}
        <div ref={messagesEndRef} />
      </div>

      <div style={stryMutAct_9fa48("297") ? {} : (stryCov_9fa48("297"), {
        padding: stryMutAct_9fa48("298") ? "" : (stryCov_9fa48("298"), '16px'),
        background: stryMutAct_9fa48("299") ? "" : (stryCov_9fa48("299"), 'white'),
        borderTop: stryMutAct_9fa48("300") ? "" : (stryCov_9fa48("300"), '1px solid #e2e8f0')
      })}>
        <form onSubmit={handleSubmit} style={stryMutAct_9fa48("301") ? {} : (stryCov_9fa48("301"), {
          display: stryMutAct_9fa48("302") ? "" : (stryCov_9fa48("302"), 'flex'),
          gap: stryMutAct_9fa48("303") ? "" : (stryCov_9fa48("303"), '8px')
        })}>
          <input type="text" value={content} onChange={stryMutAct_9fa48("304") ? () => undefined : (stryCov_9fa48("304"), e => setContent(e.target.value))} placeholder="Adicionar comentário..." style={stryMutAct_9fa48("305") ? {} : (stryCov_9fa48("305"), {
            flex: 1,
            padding: stryMutAct_9fa48("306") ? "" : (stryCov_9fa48("306"), '8px 12px'),
            border: stryMutAct_9fa48("307") ? "" : (stryCov_9fa48("307"), '1px solid #cbd5e1'),
            borderRadius: stryMutAct_9fa48("308") ? "" : (stryCov_9fa48("308"), '6px'),
            fontSize: stryMutAct_9fa48("309") ? "" : (stryCov_9fa48("309"), '13px'),
            outline: stryMutAct_9fa48("310") ? "" : (stryCov_9fa48("310"), 'none')
          })} disabled={isPending} />
          <button type="submit" disabled={stryMutAct_9fa48("313") ? !content.trim() && isPending : stryMutAct_9fa48("312") ? false : stryMutAct_9fa48("311") ? true : (stryCov_9fa48("311", "312", "313"), (stryMutAct_9fa48("314") ? content.trim() : (stryCov_9fa48("314"), !(stryMutAct_9fa48("315") ? content : (stryCov_9fa48("315"), content.trim())))) || isPending)} style={stryMutAct_9fa48("316") ? {} : (stryCov_9fa48("316"), {
            background: stryMutAct_9fa48("317") ? "" : (stryCov_9fa48("317"), 'var(--ed-purple)'),
            color: stryMutAct_9fa48("318") ? "" : (stryCov_9fa48("318"), 'white'),
            border: stryMutAct_9fa48("319") ? "" : (stryCov_9fa48("319"), 'none'),
            borderRadius: stryMutAct_9fa48("320") ? "" : (stryCov_9fa48("320"), '6px'),
            padding: stryMutAct_9fa48("321") ? "" : (stryCov_9fa48("321"), '0 16px'),
            cursor: (stryMutAct_9fa48("324") ? !content.trim() && isPending : stryMutAct_9fa48("323") ? false : stryMutAct_9fa48("322") ? true : (stryCov_9fa48("322", "323", "324"), (stryMutAct_9fa48("325") ? content.trim() : (stryCov_9fa48("325"), !(stryMutAct_9fa48("326") ? content : (stryCov_9fa48("326"), content.trim())))) || isPending)) ? stryMutAct_9fa48("327") ? "" : (stryCov_9fa48("327"), 'not-allowed') : stryMutAct_9fa48("328") ? "" : (stryCov_9fa48("328"), 'pointer'),
            opacity: (stryMutAct_9fa48("331") ? !content.trim() && isPending : stryMutAct_9fa48("330") ? false : stryMutAct_9fa48("329") ? true : (stryCov_9fa48("329", "330", "331"), (stryMutAct_9fa48("332") ? content.trim() : (stryCov_9fa48("332"), !(stryMutAct_9fa48("333") ? content : (stryCov_9fa48("333"), content.trim())))) || isPending)) ? 0.6 : 1
          })}>
            <i className="bi bi-send-fill"></i>
          </button>
        </form>
      </div>
    </div>;
  }
};
export default DocumentComments;
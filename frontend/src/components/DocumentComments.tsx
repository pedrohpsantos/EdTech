import React, { useState, useEffect, useRef } from 'react';
import { useComments, useAddComment } from '../hooks/useDocuments';

interface DocumentCommentsProps {
  documentId: string;
}

const DocumentComments: React.FC<DocumentCommentsProps> = ({ documentId }) => {
  const [content, setContent] = useState('');
  const { data: comments = [], isLoading } = useComments(documentId);
  const { mutateAsync: addComment, isPending } = useAddComment(documentId);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [comments]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    try {
      await addComment(content);
      setContent('');
    } catch (err) {
      console.error('Failed to post comment', err);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        background: '#f8fafc',
        borderLeft: '1px solid #e2e8f0',
      }}
    >
      <div style={{ padding: '16px', borderBottom: '1px solid #e2e8f0', background: 'white' }}>
        <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: '#1e293b' }}>
          <i className="bi bi-chat-dots me-2"></i> Discussão
        </h4>
      </div>

      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        {isLoading ? (
          <div style={{ textAlign: 'center', color: '#64748B', fontSize: '13px' }}>
            Carregando...
          </div>
        ) : comments.length === 0 ? (
          <div
            style={{ textAlign: 'center', color: '#64748B', fontSize: '13px', marginTop: '20px' }}
          >
            Nenhum comentário ainda. Inicie a conversa!
          </div>
        ) : (
          comments.map((comment: any) => (
            <div key={comment.id} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
              >
                <span style={{ fontWeight: 600, fontSize: '13px', color: '#334155' }}>
                  {comment.authorName}
                </span>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                  {new Date(comment.createdAt).toLocaleDateString()}{' '}
                  {new Date(comment.createdAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
              <div
                style={{
                  background: 'white',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  fontSize: '13px',
                  color: '#475569',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
                  wordBreak: 'break-word',
                }}
              >
                {comment.content}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div style={{ padding: '16px', background: 'white', borderTop: '1px solid #e2e8f0' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Adicionar comentário..."
            style={{
              flex: 1,
              padding: '8px 12px',
              border: '1px solid #cbd5e1',
              borderRadius: '6px',
              fontSize: '13px',
              outline: 'none',
            }}
            disabled={isPending}
          />
          <button
            type="submit"
            disabled={!content.trim() || isPending}
            style={{
              background: 'var(--ed-purple)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              padding: '0 16px',
              cursor: !content.trim() || isPending ? 'not-allowed' : 'pointer',
              opacity: !content.trim() || isPending ? 0.6 : 1,
            }}
          >
            <i className="bi bi-send-fill"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default DocumentComments;

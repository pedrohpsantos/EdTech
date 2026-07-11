import React, { useState, useEffect } from 'react';

interface DatasetPreviewProps {
  url: string;
  type: string;
}

const DatasetPreview: React.FC<DatasetPreviewProps> = ({ url, type }) => {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    const fetchContent = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`Falha no download (Status: ${response.status})`);
        }
        
        const text = await response.text();
        if (isMounted) {
          setContent(text);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || 'Erro ao processar o dataset.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (url) {
      fetchContent();
    }

    return () => {
      isMounted = false;
    };
  }, [url]);

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: '#64748B', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        Carregando dados do dataset...
      </div>
    );
  }

  if (error || !content) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: '#dc3545', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <i className="bi bi-exclamation-triangle" style={{ fontSize: '2rem', marginBottom: '1rem' }}></i>
        <p>{error || 'Conteúdo vazio'}</p>
        <a href={url} target="_blank" rel="noopener noreferrer" style={{ marginTop: '1rem', color: 'var(--ed-purple)' }}>
          Baixar Arquivo Diretamente
        </a>
      </div>
    );
  }

  const renderCsv = () => {
    // Simple CSV parser for MVP. Splits by newline, then by comma.
    const lines = content.split('\n').filter(line => line.trim().length > 0);
    
    if (lines.length === 0) {
      return <div>Dataset CSV vazio.</div>;
    }

    const headers = lines[0].split(',');
    const rows = lines.slice(1).map(line => line.split(','));

    // Limit to 100 rows to prevent extreme lag on huge files
    const maxRows = 100;
    const displayRows = rows.slice(0, maxRows);

    return (
      <div style={{ height: '100%', overflow: 'auto', padding: '1rem', background: '#fff' }}>
        <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1rem' }}>
          Exibindo {displayRows.length} de {rows.length} linhas...
        </p>
        <table className="table table-sm table-bordered table-striped" style={{ fontSize: '0.9rem', width: 'max-content', minWidth: '100%' }}>
          <thead style={{ position: 'sticky', top: 0, background: '#f8fafc', zIndex: 1 }}>
            <tr>
              <th style={{ width: '40px', textAlign: 'center' }}>#</th>
              {headers.map((header, idx) => (
                <th key={idx}>{header.trim()}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayRows.map((row, rowIdx) => (
              <tr key={rowIdx}>
                <td style={{ color: '#94a3b8', textAlign: 'center' }}>{rowIdx + 1}</td>
                {row.map((cell, cellIdx) => (
                  <td key={cellIdx}>{cell.trim()}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderJson = () => {
    let parsedObj;
    try {
      parsedObj = JSON.parse(content);
    } catch {
      // If invalid JSON, just show as text
      return (
        <div style={{ height: '100%', overflow: 'auto', padding: '1rem', background: '#1e293b', color: '#f8fafc' }}>
          <p style={{ color: '#ef4444' }}>Aviso: O arquivo não é um JSON válido.</p>
          <pre style={{ margin: 0 }}>{content}</pre>
        </div>
      );
    }

    return (
      <div style={{ height: '100%', overflow: 'auto', padding: '1rem', background: '#1e293b', color: '#f8fafc' }}>
        <pre style={{ margin: 0, fontSize: '0.9rem', fontFamily: 'monospace' }}>
          {JSON.stringify(parsedObj, null, 2)}
        </pre>
      </div>
    );
  };

  const renderTextFallback = () => (
    <div style={{ height: '100%', overflow: 'auto', padding: '1rem', background: '#fff' }}>
      <pre style={{ margin: 0, fontSize: '0.9rem', fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
        {content}
      </pre>
    </div>
  );

  return (
    <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
      {type === 'CSV' ? renderCsv() : type === 'JSON' ? renderJson() : renderTextFallback()}
    </div>
  );
};

export default DatasetPreview;

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
import { useDocuments, useUploadDocument, useDownloadUrl, useToggleStar } from '../hooks/useDocuments';
import { Document } from '../types';
import DocumentComments from '../components/DocumentComments';
import DatasetPreview from '../components/DatasetPreview';
import '../assets/documentos.css';
const Documentos: React.FC = () => {
  if (stryMutAct_9fa48("1729")) {
    {}
  } else {
    stryCov_9fa48("1729");
    const _navigate = useNavigate();

    // Filtros
    const [filterTitle, setFilterTitle] = useState(stryMutAct_9fa48("1730") ? "Stryker was here!" : (stryCov_9fa48("1730"), ''));
    const [filterStatus, setFilterStatus] = useState(stryMutAct_9fa48("1731") ? "Stryker was here!" : (stryCov_9fa48("1731"), ''));

    // Modal State
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(stryMutAct_9fa48("1732") ? true : (stryCov_9fa48("1732"), false));
    const [previewDoc, setPreviewDoc] = useState<Document | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>(stryMutAct_9fa48("1733") ? "Stryker was here!" : (stryCov_9fa48("1733"), ''));
    const [isPreviewLoading, setIsPreviewLoading] = useState(stryMutAct_9fa48("1734") ? true : (stryCov_9fa48("1734"), false));
    const [isDragging, setIsDragging] = useState(stryMutAct_9fa48("1735") ? true : (stryCov_9fa48("1735"), false));
    const [uploadFile, setUploadFile] = useState<File | null>(null);
    const [toastMessage, setToastMessage] = useState(stryMutAct_9fa48("1736") ? "Stryker was here!" : (stryCov_9fa48("1736"), ''));

    // React Query Hooks
    const {
      data: documents = stryMutAct_9fa48("1737") ? ["Stryker was here"] : (stryCov_9fa48("1737"), []),
      isLoading: loadingDocs
    } = useDocuments(stryMutAct_9fa48("1738") ? "Stryker was here!" : (stryCov_9fa48("1738"), ''), filterTitle);
    const {
      mutateAsync: getUrl
    } = useDownloadUrl();
    const {
      mutateAsync: _uploadDoc
    } = useUploadDocument();
    const {
      mutateAsync: toggleStar
    } = useToggleStar();
    const showToast = (message: string) => {
      if (stryMutAct_9fa48("1739")) {
        {}
      } else {
        stryCov_9fa48("1739");
        setToastMessage(message);
        setTimeout(stryMutAct_9fa48("1740") ? () => undefined : (stryCov_9fa48("1740"), () => setToastMessage(stryMutAct_9fa48("1741") ? "Stryker was here!" : (stryCov_9fa48("1741"), ''))), 3000);
      }
    };
    const handleDownload = async (docId: string) => {
      if (stryMutAct_9fa48("1742")) {
        {}
      } else {
        stryCov_9fa48("1742");
        showToast(stryMutAct_9fa48("1743") ? "" : (stryCov_9fa48("1743"), 'Iniciando download seguro...'));
        try {
          if (stryMutAct_9fa48("1744")) {
            {}
          } else {
            stryCov_9fa48("1744");
            const url = await getUrl(docId);
            if (stryMutAct_9fa48("1746") ? false : stryMutAct_9fa48("1745") ? true : (stryCov_9fa48("1745", "1746"), url)) {
              if (stryMutAct_9fa48("1747")) {
                {}
              } else {
                stryCov_9fa48("1747");
                window.open(url, stryMutAct_9fa48("1748") ? "" : (stryCov_9fa48("1748"), '_blank'), stryMutAct_9fa48("1749") ? "" : (stryCov_9fa48("1749"), 'noopener,noreferrer'));
                showToast(stryMutAct_9fa48("1750") ? "" : (stryCov_9fa48("1750"), 'Download finalizado com sucesso!'));
              }
            }
          }
        } catch (error: any) {
          if (stryMutAct_9fa48("1751")) {
            {}
          } else {
            stryCov_9fa48("1751");
            showToast((stryMutAct_9fa48("1752") ? "" : (stryCov_9fa48("1752"), 'Aviso: Falha ao baixar documento. ')) + (stryMutAct_9fa48("1755") ? error.message && 'Erro ao obter link.' : stryMutAct_9fa48("1754") ? false : stryMutAct_9fa48("1753") ? true : (stryCov_9fa48("1753", "1754", "1755"), error.message || (stryMutAct_9fa48("1756") ? "" : (stryCov_9fa48("1756"), 'Erro ao obter link.')))));
          }
        }
      }
    };
    const handleView = async (doc: Document) => {
      if (stryMutAct_9fa48("1757")) {
        {}
      } else {
        stryCov_9fa48("1757");
        setPreviewDoc(doc);
        setIsPreviewLoading(stryMutAct_9fa48("1758") ? false : (stryCov_9fa48("1758"), true));
        setPreviewUrl(stryMutAct_9fa48("1759") ? "Stryker was here!" : (stryCov_9fa48("1759"), ''));
        try {
          if (stryMutAct_9fa48("1760")) {
            {}
          } else {
            stryCov_9fa48("1760");
            const url = await getUrl(doc.id);
            if (stryMutAct_9fa48("1762") ? false : stryMutAct_9fa48("1761") ? true : (stryCov_9fa48("1761", "1762"), url)) {
              if (stryMutAct_9fa48("1763")) {
                {}
              } else {
                stryCov_9fa48("1763");
                setPreviewUrl(url);
              }
            }
          }
        } catch {
          if (stryMutAct_9fa48("1764")) {
            {}
          } else {
            stryCov_9fa48("1764");
            showToast(stryMutAct_9fa48("1765") ? "" : (stryCov_9fa48("1765"), 'Erro ao carregar preview do documento'));
          }
        } finally {
          if (stryMutAct_9fa48("1766")) {
            {}
          } else {
            stryCov_9fa48("1766");
            setIsPreviewLoading(stryMutAct_9fa48("1767") ? true : (stryCov_9fa48("1767"), false));
          }
        }
      }
    };
    const closePreviewModal = () => {
      if (stryMutAct_9fa48("1768")) {
        {}
      } else {
        stryCov_9fa48("1768");
        setPreviewDoc(null);
      }
    };
    const handleOptions = (docName: string) => {
      if (stryMutAct_9fa48("1769")) {
        {}
      } else {
        stryCov_9fa48("1769");
        showToast(stryMutAct_9fa48("1770") ? `` : (stryCov_9fa48("1770"), `Carregando opções para: ${docName}`));
      }
    };
    const handleToggleStar = async (docId: string) => {
      if (stryMutAct_9fa48("1771")) {
        {}
      } else {
        stryCov_9fa48("1771");
        try {
          if (stryMutAct_9fa48("1772")) {
            {}
          } else {
            stryCov_9fa48("1772");
            await toggleStar(docId);
            showToast(stryMutAct_9fa48("1773") ? "" : (stryCov_9fa48("1773"), 'Favorito atualizado!'));
          }
        } catch {
          if (stryMutAct_9fa48("1774")) {
            {}
          } else {
            stryCov_9fa48("1774");
            showToast(stryMutAct_9fa48("1775") ? "" : (stryCov_9fa48("1775"), 'Erro ao atualizar favorito.'));
          }
        }
      }
    };

    // Modal Handlers
    const openUploadModal = stryMutAct_9fa48("1776") ? () => undefined : (stryCov_9fa48("1776"), (() => {
      const openUploadModal = () => setIsUploadModalOpen(stryMutAct_9fa48("1777") ? false : (stryCov_9fa48("1777"), true));
      return openUploadModal;
    })());
    const closeUploadModal = () => {
      if (stryMutAct_9fa48("1778")) {
        {}
      } else {
        stryCov_9fa48("1778");
        setIsUploadModalOpen(stryMutAct_9fa48("1779") ? true : (stryCov_9fa48("1779"), false));
        setUploadFile(null);
        setIsDragging(stryMutAct_9fa48("1780") ? true : (stryCov_9fa48("1780"), false));
      }
    };
    const handleDragOver = (e: React.DragEvent) => {
      if (stryMutAct_9fa48("1781")) {
        {}
      } else {
        stryCov_9fa48("1781");
        e.preventDefault();
        setIsDragging(stryMutAct_9fa48("1782") ? false : (stryCov_9fa48("1782"), true));
      }
    };
    const handleDragLeave = (e: React.DragEvent) => {
      if (stryMutAct_9fa48("1783")) {
        {}
      } else {
        stryCov_9fa48("1783");
        e.preventDefault();
        setIsDragging(stryMutAct_9fa48("1784") ? true : (stryCov_9fa48("1784"), false));
      }
    };
    const handleDrop = (e: React.DragEvent) => {
      if (stryMutAct_9fa48("1785")) {
        {}
      } else {
        stryCov_9fa48("1785");
        e.preventDefault();
        setIsDragging(stryMutAct_9fa48("1786") ? true : (stryCov_9fa48("1786"), false));
        if (stryMutAct_9fa48("1789") ? e.dataTransfer.files || e.dataTransfer.files[0] : stryMutAct_9fa48("1788") ? false : stryMutAct_9fa48("1787") ? true : (stryCov_9fa48("1787", "1788", "1789"), e.dataTransfer.files && e.dataTransfer.files[0])) {
          if (stryMutAct_9fa48("1790")) {
            {}
          } else {
            stryCov_9fa48("1790");
            setUploadFile(e.dataTransfer.files[0]);
          }
        }
      }
    };
    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (stryMutAct_9fa48("1791")) {
        {}
      } else {
        stryCov_9fa48("1791");
        if (stryMutAct_9fa48("1794") ? e.target.files || e.target.files.length > 0 : stryMutAct_9fa48("1793") ? false : stryMutAct_9fa48("1792") ? true : (stryCov_9fa48("1792", "1793", "1794"), e.target.files && (stryMutAct_9fa48("1797") ? e.target.files.length <= 0 : stryMutAct_9fa48("1796") ? e.target.files.length >= 0 : stryMutAct_9fa48("1795") ? true : (stryCov_9fa48("1795", "1796", "1797"), e.target.files.length > 0)))) {
          if (stryMutAct_9fa48("1798")) {
            {}
          } else {
            stryCov_9fa48("1798");
            setUploadFile(e.target.files[0]);
          }
        }
      }
    };

    // Using real data from React Query
    const displayDocuments = (stryMutAct_9fa48("1802") ? documents.length <= 0 : stryMutAct_9fa48("1801") ? documents.length >= 0 : stryMutAct_9fa48("1800") ? false : stryMutAct_9fa48("1799") ? true : (stryCov_9fa48("1799", "1800", "1801", "1802"), documents.length > 0)) ? documents : stryMutAct_9fa48("1803") ? ["Stryker was here"] : (stryCov_9fa48("1803"), []);
    const getStatusClass = (status: string) => {
      if (stryMutAct_9fa48("1804")) {
        {}
      } else {
        stryCov_9fa48("1804");
        switch (status) {
          case stryMutAct_9fa48("1806") ? "" : (stryCov_9fa48("1806"), 'Em Revisão'):
            if (stryMutAct_9fa48("1805")) {} else {
              stryCov_9fa48("1805");
              return stryMutAct_9fa48("1807") ? "" : (stryCov_9fa48("1807"), 'status-review');
            }
          case stryMutAct_9fa48("1809") ? "" : (stryCov_9fa48("1809"), 'Aprovado'):
            if (stryMutAct_9fa48("1808")) {} else {
              stryCov_9fa48("1808");
              return stryMutAct_9fa48("1810") ? "" : (stryCov_9fa48("1810"), 'status-approved');
            }
          case stryMutAct_9fa48("1812") ? "" : (stryCov_9fa48("1812"), 'Submetido'):
            if (stryMutAct_9fa48("1811")) {} else {
              stryCov_9fa48("1811");
              return stryMutAct_9fa48("1813") ? "" : (stryCov_9fa48("1813"), 'status-submitted');
            }
          case stryMutAct_9fa48("1815") ? "" : (stryCov_9fa48("1815"), 'Rascunho'):
            if (stryMutAct_9fa48("1814")) {} else {
              stryCov_9fa48("1814");
              return stryMutAct_9fa48("1816") ? "" : (stryCov_9fa48("1816"), 'status-draft');
            }
          default:
            if (stryMutAct_9fa48("1817")) {} else {
              stryCov_9fa48("1817");
              return stryMutAct_9fa48("1818") ? "" : (stryCov_9fa48("1818"), 'status-draft');
            }
        }
      }
    };
    const getTypeColor = (type: string) => {
      if (stryMutAct_9fa48("1819")) {
        {}
      } else {
        stryCov_9fa48("1819");
        switch (type) {
          case stryMutAct_9fa48("1821") ? "" : (stryCov_9fa48("1821"), 'PDF'):
            if (stryMutAct_9fa48("1820")) {} else {
              stryCov_9fa48("1820");
              return stryMutAct_9fa48("1822") ? "" : (stryCov_9fa48("1822"), 'type-pdf');
            }
          case stryMutAct_9fa48("1824") ? "" : (stryCov_9fa48("1824"), 'CSV'):
            if (stryMutAct_9fa48("1823")) {} else {
              stryCov_9fa48("1823");
              return stryMutAct_9fa48("1825") ? "" : (stryCov_9fa48("1825"), 'type-csv');
            }
          case stryMutAct_9fa48("1827") ? "" : (stryCov_9fa48("1827"), 'JSON'):
            if (stryMutAct_9fa48("1826")) {} else {
              stryCov_9fa48("1826");
              return stryMutAct_9fa48("1828") ? "" : (stryCov_9fa48("1828"), 'type-json');
            }
          default:
            if (stryMutAct_9fa48("1829")) {} else {
              stryCov_9fa48("1829");
              return stryMutAct_9fa48("1830") ? "" : (stryCov_9fa48("1830"), 'type-default');
            }
        }
      }
    };
    return <DashboardLayout title="Meus Documentos" subtitle="Gerencie seus arquivos de pesquisa e acompanhe submissões" breadcrumbs={stryMutAct_9fa48("1831") ? [] : (stryCov_9fa48("1831"), [stryMutAct_9fa48("1832") ? "" : (stryCov_9fa48("1832"), 'EdTech'), stryMutAct_9fa48("1833") ? "" : (stryCov_9fa48("1833"), 'Área de Pesquisa')])}>
      {/* Top Stats Cards */}
      <div className="stats-row docs-stats-row mb-4">
        <div className="stat-card">
          <div className="stat-header">
            Total de Documentos
            <div className="dot-indicator dot-purple"></div>
          </div>
          <div className="stat-body">
            <span className="stat-value">7</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-header">
            Em Revisão
            <div className="dot-indicator dot-orange"></div>
          </div>
          <div className="stat-body">
            <span className="stat-value">1</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-header">
            Aprovados
            <div className="dot-indicator dot-green"></div>
          </div>
          <div className="stat-body">
            <span className="stat-value">2</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-header">
            Submetidos
            <div className="dot-indicator dot-blue"></div>
          </div>
          <div className="stat-body">
            <span className="stat-value">2</span>
          </div>
        </div>
      </div>

      {/* Banner Upload */}
      <div className="docs-banner-upload">
        <div className="banner-info">
          <span className="banner-subtitle">
            <i className="bi bi-folder2-open me-2"></i> PROJETO ATIVO: ANÁLISE LGPD
          </span>
          <h2 className="banner-title">Adicionar documento ao projeto</h2>
        </div>
        <button className="btn-upload-banner" onClick={openUploadModal}>
          <i className="bi bi-upload"></i> Novo Upload (PDF / CSV / JSON)
        </button>
      </div>

      {/* Document List Header */}
      <div className="docs-list-container dashboard-card mt-4">
        <div className="docs-list-header">
          <div className="d-flex align-items-center gap-2">
            <h3 className="docs-list-title m-0">Meus Documentos</h3>
            <span className="docs-count-badge">{displayDocuments.length}</span>
          </div>
          <div className="docs-filters">
            <div className="search-input-wrapper">
              <i className="bi bi-search search-icon"></i>
              <input type="text" className="docs-search-input" placeholder="Buscar documento..." value={filterTitle} onChange={stryMutAct_9fa48("1834") ? () => undefined : (stryCov_9fa48("1834"), e => setFilterTitle(e.target.value))} />
            </div>
            <select className="docs-status-select" value={filterStatus} onChange={stryMutAct_9fa48("1835") ? () => undefined : (stryCov_9fa48("1835"), e => setFilterStatus(e.target.value))}>
              <option value="">Todos os status</option>
              <option value="Aprovado">Aprovado</option>
              <option value="Em Revisão">Em Revisão</option>
              <option value="Submetido">Submetido</option>
              <option value="Rascunho">Rascunho</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="docs-table-wrapper">
          <table className="docs-table">
            <thead>
              <tr>
                <th>DOCUMENTO</th>
                <th>PROJETO</th>
                <th>TIPO</th>
                <th>TAMANHO</th>
                <th>MODIFICADO</th>
                <th>STATUS</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {loadingDocs ? <tr>
                  <td colSpan={7} className="text-center py-4 text-muted">
                    Carregando documentos...
                  </td>
                </tr> : (stryMutAct_9fa48("1838") ? displayDocuments.length !== 0 : stryMutAct_9fa48("1837") ? false : stryMutAct_9fa48("1836") ? true : (stryCov_9fa48("1836", "1837", "1838"), displayDocuments.length === 0)) ? <tr>
                  <td colSpan={7} className="text-center py-4 text-muted">
                    Nenhum documento encontrado.
                  </td>
                </tr> : displayDocuments.map(stryMutAct_9fa48("1839") ? () => undefined : (stryCov_9fa48("1839"), (doc: any) => <tr key={doc.id}>
                  <td>
                    <div className="d-flex align-items-center gap-3">
                      <button className="btn-icon-action" onClick={stryMutAct_9fa48("1840") ? () => undefined : (stryCov_9fa48("1840"), () => handleToggleStar(doc.id))} style={stryMutAct_9fa48("1841") ? {} : (stryCov_9fa48("1841"), {
                      color: doc.starred ? stryMutAct_9fa48("1842") ? "" : (stryCov_9fa48("1842"), '#f59e0b') : stryMutAct_9fa48("1843") ? "" : (stryCov_9fa48("1843"), '#cbd5e1'),
                      padding: 0
                    })}>
                        <i className={stryMutAct_9fa48("1844") ? `` : (stryCov_9fa48("1844"), `bi ${doc.starred ? stryMutAct_9fa48("1845") ? "" : (stryCov_9fa48("1845"), 'bi-star-fill') : stryMutAct_9fa48("1846") ? "" : (stryCov_9fa48("1846"), 'bi-star')}`)}></i>
                      </button>
                      <div className={stryMutAct_9fa48("1847") ? `` : (stryCov_9fa48("1847"), `doc-type-icon ${getTypeColor(stryMutAct_9fa48("1850") ? doc.type && 'PDF' : stryMutAct_9fa48("1849") ? false : stryMutAct_9fa48("1848") ? true : (stryCov_9fa48("1848", "1849", "1850"), doc.type || (stryMutAct_9fa48("1851") ? "" : (stryCov_9fa48("1851"), 'PDF'))))}-bg`)}>
                        <i className={stryMutAct_9fa48("1852") ? `` : (stryCov_9fa48("1852"), `bi bi-file-earmark-text ${getTypeColor(stryMutAct_9fa48("1855") ? doc.type && 'PDF' : stryMutAct_9fa48("1854") ? false : stryMutAct_9fa48("1853") ? true : (stryCov_9fa48("1853", "1854", "1855"), doc.type || (stryMutAct_9fa48("1856") ? "" : (stryCov_9fa48("1856"), 'PDF'))))}-text`)}></i>
                      </div>
                      <span className="doc-title-cell">{doc.title}</span>
                    </div>
                  </td>
                  <td className="text-muted">{stryMutAct_9fa48("1859") ? doc.project && 'Projeto' : stryMutAct_9fa48("1858") ? false : stryMutAct_9fa48("1857") ? true : (stryCov_9fa48("1857", "1858", "1859"), doc.project || (stryMutAct_9fa48("1860") ? "" : (stryCov_9fa48("1860"), 'Projeto')))}</td>
                  <td>
                    <span className={stryMutAct_9fa48("1861") ? `` : (stryCov_9fa48("1861"), `type-badge ${getTypeColor(stryMutAct_9fa48("1864") ? doc.type && 'PDF' : stryMutAct_9fa48("1863") ? false : stryMutAct_9fa48("1862") ? true : (stryCov_9fa48("1862", "1863", "1864"), doc.type || (stryMutAct_9fa48("1865") ? "" : (stryCov_9fa48("1865"), 'PDF'))))}-text`)}>{stryMutAct_9fa48("1868") ? doc.type && 'PDF' : stryMutAct_9fa48("1867") ? false : stryMutAct_9fa48("1866") ? true : (stryCov_9fa48("1866", "1867", "1868"), doc.type || (stryMutAct_9fa48("1869") ? "" : (stryCov_9fa48("1869"), 'PDF')))}</span>
                  </td>
                  <td className="text-muted">{doc.size}</td>
                  <td className="text-muted">
                    <i className="bi bi-clock me-1"></i> {doc.modified}
                  </td>
                  <td>
                    <span className={stryMutAct_9fa48("1870") ? `` : (stryCov_9fa48("1870"), `doc-status ${getStatusClass(doc.status)}`)}>{doc.status}</span>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button className="btn-icon-action" title="Visualizar" onClick={stryMutAct_9fa48("1871") ? () => undefined : (stryCov_9fa48("1871"), () => handleView(doc as Document))}>
                        <i className="bi bi-eye"></i>
                      </button>
                      <button className="btn-icon-action" title="Download" onClick={stryMutAct_9fa48("1872") ? () => undefined : (stryCov_9fa48("1872"), () => handleDownload(doc.id))}>
                        <i className="bi bi-download"></i>
                      </button>
                      <button className="btn-icon-action" title="Opções" onClick={stryMutAct_9fa48("1873") ? () => undefined : (stryCov_9fa48("1873"), () => handleOptions(doc.title))}>
                        <i className="bi bi-three-dots"></i>
                      </button>
                    </div>
                  </td>
                </tr>))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload Modal Overlay */}
      {stryMutAct_9fa48("1876") ? isUploadModalOpen || <div className="modal-overlay" onClick={closeUploadModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-group">
                <h3 className="modal-title">Novo Upload</h3>
                <p className="modal-subtitle">PDF, CSV ou JSON - máx. 50 MB</p>
              </div>
              <button className="btn-close-modal" onClick={closeUploadModal}>
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            <div className="modal-body">
              <div className={`upload-area ${isDragging ? 'dragging' : ''}`} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} onClick={() => document.getElementById('modalFileInput')?.click()}>
                <div className="upload-icon-circle">
                  <i className="bi bi-upload"></i>
                </div>
                <p className="upload-main-text">
                  {uploadFile ? uploadFile.name : 'Arraste e solte ou clique para selecionar'}
                </p>
                <p className="upload-sub-text">Formatos: .pdf, .csv, .json</p>
                <input id="modalFileInput" type="file" className="d-none" onChange={handleFileInput} accept=".pdf,.json,.csv" />
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-modal-cancel" onClick={closeUploadModal}>
                Cancelar
              </button>
              <button className="btn-modal-submit" disabled={!uploadFile}>
                Enviar Arquivo
              </button>
            </div>
          </div>
        </div> : stryMutAct_9fa48("1875") ? false : stryMutAct_9fa48("1874") ? true : (stryCov_9fa48("1874", "1875", "1876"), isUploadModalOpen && <div className="modal-overlay" onClick={closeUploadModal}>
          <div className="modal-content" onClick={stryMutAct_9fa48("1877") ? () => undefined : (stryCov_9fa48("1877"), e => e.stopPropagation())}>
            <div className="modal-header">
              <div className="modal-title-group">
                <h3 className="modal-title">Novo Upload</h3>
                <p className="modal-subtitle">PDF, CSV ou JSON - máx. 50 MB</p>
              </div>
              <button className="btn-close-modal" onClick={closeUploadModal}>
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            <div className="modal-body">
              <div className={stryMutAct_9fa48("1878") ? `` : (stryCov_9fa48("1878"), `upload-area ${isDragging ? stryMutAct_9fa48("1879") ? "" : (stryCov_9fa48("1879"), 'dragging') : stryMutAct_9fa48("1880") ? "Stryker was here!" : (stryCov_9fa48("1880"), '')}`)} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} onClick={stryMutAct_9fa48("1881") ? () => undefined : (stryCov_9fa48("1881"), () => stryMutAct_9fa48("1882") ? document.getElementById('modalFileInput').click() : (stryCov_9fa48("1882"), document.getElementById(stryMutAct_9fa48("1883") ? "" : (stryCov_9fa48("1883"), 'modalFileInput'))?.click()))}>
                <div className="upload-icon-circle">
                  <i className="bi bi-upload"></i>
                </div>
                <p className="upload-main-text">
                  {uploadFile ? uploadFile.name : stryMutAct_9fa48("1884") ? "" : (stryCov_9fa48("1884"), 'Arraste e solte ou clique para selecionar')}
                </p>
                <p className="upload-sub-text">Formatos: .pdf, .csv, .json</p>
                <input id="modalFileInput" type="file" className="d-none" onChange={handleFileInput} accept=".pdf,.json,.csv" />
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-modal-cancel" onClick={closeUploadModal}>
                Cancelar
              </button>
              <button className="btn-modal-submit" disabled={stryMutAct_9fa48("1885") ? uploadFile : (stryCov_9fa48("1885"), !uploadFile)}>
                Enviar Arquivo
              </button>
            </div>
          </div>
        </div>)}

      {/* Document Preview Modal */}
      {stryMutAct_9fa48("1888") ? previewDoc || <div className="modal-overlay" onClick={closePreviewModal} style={{
        zIndex: 1050
      }}>
          <div className="preview-modal-content" style={{
          maxWidth: '1200px',
          width: '90%'
        }} onClick={e => e.stopPropagation()}>
            <div className="preview-modal-header">
              <div className="d-flex align-items-center gap-3">
                <span className={`type-badge ${getTypeColor(previewDoc.type)}-text`}>
                  {previewDoc.type}
                </span>
                <div>
                  <h3 className="m-0" style={{
                  fontSize: '18px',
                  color: 'var(--ed-text-light)'
                }}>
                    {previewDoc.title}
                  </h3>
                  <span style={{
                  fontSize: '12px',
                  color: 'var(--ed-text-muted)'
                }}>
                    {previewDoc.size} • {previewDoc.project}
                  </span>
                </div>
              </div>
              <div className="d-flex gap-2">
                <button className="btn-icon-action" onClick={() => handleDownload(previewDoc.id)}>
                  <i className="bi bi-download"></i>
                </button>
                <button className="btn-icon-action" onClick={closePreviewModal}>
                  <i className="bi bi-x-lg"></i>
                </button>
              </div>
            </div>

            <div className="preview-modal-body" style={{
            padding: '0',
            height: '75vh',
            display: 'flex',
            flexDirection: 'row',
            background: '#e2e8f0'
          }}>
              
              {/* PDF Viewer Area */}
              <div style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column'
            }}>
                {isPreviewLoading ? <div style={{
                padding: '2rem',
                textAlign: 'center',
                color: '#64748B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%'
              }}>
                    Carregando visualização do documento...
                  </div> : previewUrl ? previewDoc.type === 'CSV' || previewDoc.type === 'JSON' ? <DatasetPreview url={previewUrl} type={previewDoc.type} /> : <object data={previewUrl} type="application/pdf" width="100%" height="100%" style={{
                border: 'none',
                flex: 1
              }}>
                      <div style={{
                  padding: '2rem',
                  textAlign: 'center'
                }}>
                        Seu navegador não suporta a visualização nativa de PDFs. <br /><br />
                        <a href={previewUrl} target="_blank" rel="noopener noreferrer" style={{
                    color: 'var(--ed-purple)'
                  }}>Clique aqui para baixar</a>
                      </div>
                    </object> : <div style={{
                padding: '2rem',
                textAlign: 'center',
                color: '#64748B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%'
              }}>
                    Nenhum preview disponível.
                  </div>}
              </div>

              {/* Chat / Comments Drawer */}
              <div style={{
              width: '350px',
              flexShrink: 0,
              height: '100%'
            }}>
                <DocumentComments documentId={previewDoc.id} />
              </div>

            </div>
          </div>
        </div> : stryMutAct_9fa48("1887") ? false : stryMutAct_9fa48("1886") ? true : (stryCov_9fa48("1886", "1887", "1888"), previewDoc && <div className="modal-overlay" onClick={closePreviewModal} style={stryMutAct_9fa48("1889") ? {} : (stryCov_9fa48("1889"), {
        zIndex: 1050
      })}>
          <div className="preview-modal-content" style={stryMutAct_9fa48("1890") ? {} : (stryCov_9fa48("1890"), {
          maxWidth: stryMutAct_9fa48("1891") ? "" : (stryCov_9fa48("1891"), '1200px'),
          width: stryMutAct_9fa48("1892") ? "" : (stryCov_9fa48("1892"), '90%')
        })} onClick={stryMutAct_9fa48("1893") ? () => undefined : (stryCov_9fa48("1893"), e => e.stopPropagation())}>
            <div className="preview-modal-header">
              <div className="d-flex align-items-center gap-3">
                <span className={stryMutAct_9fa48("1894") ? `` : (stryCov_9fa48("1894"), `type-badge ${getTypeColor(previewDoc.type)}-text`)}>
                  {previewDoc.type}
                </span>
                <div>
                  <h3 className="m-0" style={stryMutAct_9fa48("1895") ? {} : (stryCov_9fa48("1895"), {
                  fontSize: stryMutAct_9fa48("1896") ? "" : (stryCov_9fa48("1896"), '18px'),
                  color: stryMutAct_9fa48("1897") ? "" : (stryCov_9fa48("1897"), 'var(--ed-text-light)')
                })}>
                    {previewDoc.title}
                  </h3>
                  <span style={stryMutAct_9fa48("1898") ? {} : (stryCov_9fa48("1898"), {
                  fontSize: stryMutAct_9fa48("1899") ? "" : (stryCov_9fa48("1899"), '12px'),
                  color: stryMutAct_9fa48("1900") ? "" : (stryCov_9fa48("1900"), 'var(--ed-text-muted)')
                })}>
                    {previewDoc.size} • {previewDoc.project}
                  </span>
                </div>
              </div>
              <div className="d-flex gap-2">
                <button className="btn-icon-action" onClick={stryMutAct_9fa48("1901") ? () => undefined : (stryCov_9fa48("1901"), () => handleDownload(previewDoc.id))}>
                  <i className="bi bi-download"></i>
                </button>
                <button className="btn-icon-action" onClick={closePreviewModal}>
                  <i className="bi bi-x-lg"></i>
                </button>
              </div>
            </div>

            <div className="preview-modal-body" style={stryMutAct_9fa48("1902") ? {} : (stryCov_9fa48("1902"), {
            padding: stryMutAct_9fa48("1903") ? "" : (stryCov_9fa48("1903"), '0'),
            height: stryMutAct_9fa48("1904") ? "" : (stryCov_9fa48("1904"), '75vh'),
            display: stryMutAct_9fa48("1905") ? "" : (stryCov_9fa48("1905"), 'flex'),
            flexDirection: stryMutAct_9fa48("1906") ? "" : (stryCov_9fa48("1906"), 'row'),
            background: stryMutAct_9fa48("1907") ? "" : (stryCov_9fa48("1907"), '#e2e8f0')
          })}>
              
              {/* PDF Viewer Area */}
              <div style={stryMutAct_9fa48("1908") ? {} : (stryCov_9fa48("1908"), {
              flex: 1,
              display: stryMutAct_9fa48("1909") ? "" : (stryCov_9fa48("1909"), 'flex'),
              flexDirection: stryMutAct_9fa48("1910") ? "" : (stryCov_9fa48("1910"), 'column')
            })}>
                {isPreviewLoading ? <div style={stryMutAct_9fa48("1911") ? {} : (stryCov_9fa48("1911"), {
                padding: stryMutAct_9fa48("1912") ? "" : (stryCov_9fa48("1912"), '2rem'),
                textAlign: stryMutAct_9fa48("1913") ? "" : (stryCov_9fa48("1913"), 'center'),
                color: stryMutAct_9fa48("1914") ? "" : (stryCov_9fa48("1914"), '#64748B'),
                display: stryMutAct_9fa48("1915") ? "" : (stryCov_9fa48("1915"), 'flex'),
                alignItems: stryMutAct_9fa48("1916") ? "" : (stryCov_9fa48("1916"), 'center'),
                justifyContent: stryMutAct_9fa48("1917") ? "" : (stryCov_9fa48("1917"), 'center'),
                height: stryMutAct_9fa48("1918") ? "" : (stryCov_9fa48("1918"), '100%')
              })}>
                    Carregando visualização do documento...
                  </div> : previewUrl ? (stryMutAct_9fa48("1921") ? previewDoc.type === 'CSV' && previewDoc.type === 'JSON' : stryMutAct_9fa48("1920") ? false : stryMutAct_9fa48("1919") ? true : (stryCov_9fa48("1919", "1920", "1921"), (stryMutAct_9fa48("1923") ? previewDoc.type !== 'CSV' : stryMutAct_9fa48("1922") ? false : (stryCov_9fa48("1922", "1923"), previewDoc.type === (stryMutAct_9fa48("1924") ? "" : (stryCov_9fa48("1924"), 'CSV')))) || (stryMutAct_9fa48("1926") ? previewDoc.type !== 'JSON' : stryMutAct_9fa48("1925") ? false : (stryCov_9fa48("1925", "1926"), previewDoc.type === (stryMutAct_9fa48("1927") ? "" : (stryCov_9fa48("1927"), 'JSON')))))) ? <DatasetPreview url={previewUrl} type={previewDoc.type} /> : <object data={previewUrl} type="application/pdf" width="100%" height="100%" style={stryMutAct_9fa48("1928") ? {} : (stryCov_9fa48("1928"), {
                border: stryMutAct_9fa48("1929") ? "" : (stryCov_9fa48("1929"), 'none'),
                flex: 1
              })}>
                      <div style={stryMutAct_9fa48("1930") ? {} : (stryCov_9fa48("1930"), {
                  padding: stryMutAct_9fa48("1931") ? "" : (stryCov_9fa48("1931"), '2rem'),
                  textAlign: stryMutAct_9fa48("1932") ? "" : (stryCov_9fa48("1932"), 'center')
                })}>
                        Seu navegador não suporta a visualização nativa de PDFs. <br /><br />
                        <a href={previewUrl} target="_blank" rel="noopener noreferrer" style={stryMutAct_9fa48("1933") ? {} : (stryCov_9fa48("1933"), {
                    color: stryMutAct_9fa48("1934") ? "" : (stryCov_9fa48("1934"), 'var(--ed-purple)')
                  })}>Clique aqui para baixar</a>
                      </div>
                    </object> : <div style={stryMutAct_9fa48("1935") ? {} : (stryCov_9fa48("1935"), {
                padding: stryMutAct_9fa48("1936") ? "" : (stryCov_9fa48("1936"), '2rem'),
                textAlign: stryMutAct_9fa48("1937") ? "" : (stryCov_9fa48("1937"), 'center'),
                color: stryMutAct_9fa48("1938") ? "" : (stryCov_9fa48("1938"), '#64748B'),
                display: stryMutAct_9fa48("1939") ? "" : (stryCov_9fa48("1939"), 'flex'),
                alignItems: stryMutAct_9fa48("1940") ? "" : (stryCov_9fa48("1940"), 'center'),
                justifyContent: stryMutAct_9fa48("1941") ? "" : (stryCov_9fa48("1941"), 'center'),
                height: stryMutAct_9fa48("1942") ? "" : (stryCov_9fa48("1942"), '100%')
              })}>
                    Nenhum preview disponível.
                  </div>}
              </div>

              {/* Chat / Comments Drawer */}
              <div style={stryMutAct_9fa48("1943") ? {} : (stryCov_9fa48("1943"), {
              width: stryMutAct_9fa48("1944") ? "" : (stryCov_9fa48("1944"), '350px'),
              flexShrink: 0,
              height: stryMutAct_9fa48("1945") ? "" : (stryCov_9fa48("1945"), '100%')
            })}>
                <DocumentComments documentId={previewDoc.id} />
              </div>

            </div>
          </div>
        </div>)}

      {/* Premium Toast Notification */}
      {stryMutAct_9fa48("1948") ? toastMessage || <div className="premium-toast">
          <i className="bi bi-info-circle"></i>
          <span>{toastMessage}</span>
        </div> : stryMutAct_9fa48("1947") ? false : stryMutAct_9fa48("1946") ? true : (stryCov_9fa48("1946", "1947", "1948"), toastMessage && <div className="premium-toast">
          <i className="bi bi-info-circle"></i>
          <span>{toastMessage}</span>
        </div>)}
    </DashboardLayout>;
  }
};
export default Documentos;
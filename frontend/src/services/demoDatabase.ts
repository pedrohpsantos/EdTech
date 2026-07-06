import { Document } from '../types';

export interface AuditLog {
  id: string;
  timestamp: string;
  action: string;
  actionClass: string;
  userId: string;
  userName: string;
  ip: string;
  details: string;
  eventId: string;
  severity: string;
}

export interface ComplianceStats {
  score: number;
  scoreTrend: number;
  compliantPolicies: number;
  totalPolicies: number;
  pendingItems: number;
  totalEvents: number;
  policies: {
    name: string;
    status: 'conforme' | 'parcial' | 'pendente';
    percentage: number;
    text: string;
  }[];
}

const STORAGE_KEY_DOCS = 'demo_docs';
const STORAGE_KEY_LOGS = 'demo_logs';

const getInitialDocs = (): Document[] => [
  {
    id: 'd1',
    title: 'Metodologia_Qualitativa_v3.pdf',
    projectId: 'p1',
    projectName: 'Projeto IA na Saúde',
    uploadedBy: 'Renata Silva',
    uploadedAt: '2026-06-12T14:32:07Z',
    status: 'PENDING_REVIEW',
    size: 2516582,
    type: 'application/pdf',
  },
  {
    id: 'd2',
    title: 'Dataset_Experimento_A.csv',
    projectId: 'p2',
    projectName: 'Pesquisa Clima',
    uploadedBy: 'Carlos Mendes',
    uploadedAt: '2026-06-12T13:55:14Z',
    status: 'APPROVED',
    size: 154000,
    type: 'text/csv',
  },
];

const getInitialLogs = (): AuditLog[] => [
  {
    id: '1',
    timestamp: '2026-06-12 14:32:07.341',
    action: 'UPLOAD_DOCUMENT',
    actionClass: 'blue',
    userId: 'usr-4f2a8c91',
    userName: 'Renata Silva',
    ip: '143.107.42.88',
    details: 'Metodologia_Qualitativa_v3.pdf · 2.4 MB',
    eventId: 'e001',
    severity: 'INFO',
  },
  {
    id: '2',
    timestamp: '2026-06-12 14:18:55.029',
    action: 'LOGIN_SUCCESS',
    actionClass: 'green',
    userId: 'usr-4f2a8c91',
    userName: 'Renata Silva',
    ip: '143.107.42.88',
    details: 'UA: Chrome/126 · 2FA: TOTP_OK',
    eventId: 'e002',
    severity: 'INFO',
  },
  {
    id: '3',
    timestamp: '2026-06-12 13:55:14.782',
    action: 'SUBMISSION_APPROVED',
    actionClass: 'green',
    userId: 'usr-9d7c3f21',
    userName: 'Carlos Mendes',
    ip: '200.130.11.220',
    details: 'Dataset_Experimento_A.csv',
    eventId: 'e003',
    severity: 'INFO',
  },
];

const getDocsFromStorage = (): Document[] => {
  const data = localStorage.getItem(STORAGE_KEY_DOCS);
  if (!data) {
    localStorage.setItem(STORAGE_KEY_DOCS, JSON.stringify(getInitialDocs()));
    return getInitialDocs();
  }
  return JSON.parse(data);
};

const getLogsFromStorage = (): AuditLog[] => {
  const data = localStorage.getItem(STORAGE_KEY_LOGS);
  if (!data) {
    localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify(getInitialLogs()));
    return getInitialLogs();
  }
  return JSON.parse(data);
};

const saveDocs = (docs: Document[]) => localStorage.setItem(STORAGE_KEY_DOCS, JSON.stringify(docs));
const saveLogs = (logs: AuditLog[]) => localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify(logs));

export const mockGetDocuments = (projectId?: string, title?: string, status?: string) => {
  let docs = getDocsFromStorage();
  
  if (projectId) docs = docs.filter(d => d.projectId === projectId);
  if (status) docs = docs.filter(d => d.status === status);
  if (title) docs = docs.filter(d => d.title.toLowerCase().includes(title.toLowerCase()));

  return { content: docs, totalElements: docs.length, totalPages: 1, number: 0 };
};

export const mockUploadDocument = (title: string, projectId: string, userName: string, userId: string) => {
  const docs = getDocsFromStorage();
  const newDoc: Document = {
    id: `doc_${Date.now()}`,
    title,
    projectId,
    projectName: 'Projeto Demo',
    uploadedBy: userName,
    uploadedAt: new Date().toISOString(),
    status: 'PENDING_REVIEW',
    size: 1024 * 1024 * Math.random(),
    type: 'application/pdf',
  };
  docs.push(newDoc);
  saveDocs(docs);

  const logs = getLogsFromStorage();
  logs.unshift({
    id: `${Date.now()}`,
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 23),
    action: 'UPLOAD_DOCUMENT',
    actionClass: 'blue',
    userId,
    userName,
    ip: '127.0.0.1',
    details: `${title} · ${(newDoc.size / 1024 / 1024).toFixed(2)} MB`,
    eventId: `e${Date.now()}`,
    severity: 'INFO',
  });
  saveLogs(logs);

  return newDoc;
};

export const mockReviewDocument = (documentId: string, status: 'APPROVED' | 'REJECTED', userName: string, userId: string) => {
  const docs = getDocsFromStorage();
  const doc = docs.find(d => d.id === documentId);
  if (doc) {
    doc.status = status;
    saveDocs(docs);

    const logs = getLogsFromStorage();
    logs.unshift({
      id: `${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 23),
      action: status === 'APPROVED' ? 'SUBMISSION_APPROVED' : 'SUBMISSION_REJECTED',
      actionClass: status === 'APPROVED' ? 'green' : 'orange',
      userId,
      userName,
      ip: '127.0.0.1',
      details: `${doc.title}`,
      eventId: `e${Date.now()}`,
      severity: status === 'APPROVED' ? 'INFO' : 'WARNING',
    });
    saveLogs(logs);
  }
  return doc;
};

export const mockGetAuditLogs = (filters?: { search?: string; action?: string; date?: string; userId?: string }): AuditLog[] => {
  let logs = getLogsFromStorage();

  if (filters?.search) {
    const s = filters.search.toLowerCase();
    logs = logs.filter(
      log =>
        log.action.toLowerCase().includes(s) ||
        log.details.toLowerCase().includes(s) ||
        log.userName.toLowerCase().includes(s) ||
        log.ip.includes(s)
    );
  }

  if (filters?.action && filters.action !== 'Todas as Ações') {
    logs = logs.filter(log => log.action === filters.action);
  }

  return logs;
};

export const mockGetComplianceStats = (): ComplianceStats => {
  const logs = getLogsFromStorage();
  const docs = getDocsFromStorage();
  
  const pendingDocs = docs.filter(d => d.status === 'PENDING_REVIEW').length;
  const approvedDocs = docs.filter(d => d.status === 'APPROVED').length;
  const totalDocs = docs.length;
  
  const completionPercentage = totalDocs === 0 ? 100 : Math.round((approvedDocs / totalDocs) * 100);

  return {
    score: completionPercentage,
    scoreTrend: +2,
    compliantPolicies: 3,
    totalPolicies: 5,
    pendingItems: pendingDocs,
    totalEvents: logs.length,
    policies: [
      {
        name: 'Anonimização de dados pessoais',
        status: 'conforme',
        percentage: 100,
        text: 'Auditoria LGPD automatizada',
      },
      {
        name: 'Aprovação por Orientador',
        status: completionPercentage === 100 ? 'conforme' : (completionPercentage > 50 ? 'parcial' : 'pendente'),
        percentage: completionPercentage,
        text: `${approvedDocs}/${totalDocs} aprovados`,
      },
      {
        name: 'Versionamento Seguro',
        status: 'conforme',
        percentage: 100,
        text: 'Histórico preservado',
      },
      {
        name: 'Descarte e Retenção',
        status: 'pendente',
        percentage: 45,
        text: 'Aguardando revisão',
      },
      {
        name: 'Aprovação Ética (CEP)',
        status: 'conforme',
        percentage: 100,
        text: 'Todos OK',
      },
    ],
  };
};

import { User } from '../types';

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

const isDemoAccount = (user: User | null): boolean => {
  return !!user?.email?.toLowerCase().includes('demo');
};

const mockLogs: AuditLog[] = [
  {
    id: '1',
    timestamp: '2026-06-12 14:32:07.341',
    action: 'UPLOAD_DOCUMENT',
    actionClass: 'blue',
    userId: 'usr-4f2a8c91-b3e1-4d09',
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
    userId: 'usr-4f2a8c91-b3e1-4d09',
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
    userId: 'usr-9d7c3f21-e8a4-7b11',
    userName: 'Carlos Mendes',
    ip: '200.130.11.220',
    details: 'Dataset_Experimento_A.csv · proj:ia-02',
    eventId: 'e003',
    severity: 'INFO',
  },
  {
    id: '4',
    timestamp: '2026-06-12 12:41:33.108',
    action: 'LOGIN_FAILED',
    actionClass: 'orange',
    userId: 'usr-7b1e5d80-a2c6-5e33',
    userName: 'Carlos Mendes',
    ip: '177.82.94.12',
    details: 'Attempt 3/5 · wrong_password',
    eventId: 'e004',
    severity: 'WARNING',
  },
  {
    id: '5',
    timestamp: '2026-06-12 11:05:22.500',
    action: 'DOCUMENT_VIEWED',
    actionClass: 'blue',
    userId: 'usr-9d7c3f21-e8a4-7b11',
    userName: 'Carlos Mendes',
    ip: '200.130.11.220',
    details: 'Referencial_Teorico_Final.pdf · dur:00:04:12',
    eventId: 'e005',
    severity: 'INFO',
  },
  {
    id: '6',
    timestamp: '2026-06-12 10:30:48.201',
    action: 'PERMISSION_CHANGED',
    actionClass: 'orange',
    userId: 'usr-0a3c9e15-f7b2-root',
    userName: 'Admin System',
    ip: '10.0.0.1',
    details: 'target:usr-7b1e5d80 · ROLE researcher>reviewer',
    eventId: 'e006',
    severity: 'WARNING',
  },
  {
    id: '7',
    timestamp: '2026-06-11 17:22:09.944',
    action: 'DOCUMENT_DELETED',
    actionClass: 'red',
    userId: 'usr-4f2a8c91-b3e1-4d09',
    userName: 'Renata Silva',
    ip: '143.107.42.88',
    details: 'rascunho_inicial_v1.pdf · PERMANENT',
    eventId: 'e007',
    severity: 'CRITICAL',
  },
  {
    id: '8',
    timestamp: '2026-06-11 15:10:05.113',
    action: 'DOCUMENT_EDITED',
    actionClass: 'blue',
    userId: 'usr-7b1e5d80-a2c6-5e33',
    userName: 'Carlos Mendes',
    ip: '177.82.94.12',
    details: 'Referencial_Teorico_Final.pdf · v1>v2',
    eventId: 'e008',
    severity: 'INFO',
  },
  {
    id: '9',
    timestamp: '2026-06-11 09:00:00.000',
    action: 'LOGIN_SUCCESS',
    actionClass: 'green',
    userId: 'usr-2e8b4d63-c1f9-aud',
    userName: 'Auditor Externo',
    ip: '189.102.55.74',
    details: 'Audit session initiated',
    eventId: 'e009',
    severity: 'INFO',
  },
  {
    id: '10',
    timestamp: '2026-06-10 18:44:21.882',
    action: 'PASSWORD_RESET',
    actionClass: 'blue',
    userId: 'usr-5c6f1a70-d4e8-7g22',
    userName: 'João Almeida',
    ip: '192.168.1.42',
    details: 'Email link · completed_ok',
    eventId: 'e010',
    severity: 'INFO',
  },
  {
    id: '11',
    timestamp: '2026-06-10 14:22:17.559',
    action: 'UPLOAD_DOCUMENT',
    actionClass: 'blue',
    userId: 'usr-5c6f1a70-d4e8-7g22',
    userName: 'João Almeida',
    ip: '192.168.1.42',
    details: 'Dataset_Experimento_B.csv · 23.1 MB',
    eventId: 'e011',
    severity: 'INFO',
  },
  {
    id: '12',
    timestamp: '2026-06-10 11:03:44.001',
    action: 'LOGIN_FAILED',
    actionClass: 'orange',
    userId: 'usr-9d7c3f21-e8a4-7b11',
    userName: 'Carlos Mendes',
    ip: '200.130.11.220',
    details: 'Attempt 1/5 · wrong_password',
    eventId: 'e012',
    severity: 'WARNING',
  },
  {
    id: '13',
    timestamp: '2026-06-09 20:15:30.628',
    action: 'DOCUMENT_VIEWED',
    actionClass: 'blue',
    userId: 'usr-5c6f1a70-d4e8-7g22',
    userName: 'João Almeida',
    ip: '192.168.1.42',
    details: 'Metodologia_Qualitativa_v3.pdf · dur:00:12:05',
    eventId: 'e013',
    severity: 'INFO',
  },
  {
    id: '14',
    timestamp: '2026-06-09 16:30:11.114',
    action: 'SUBMISSION_REJECTED',
    actionClass: 'orange',
    userId: 'usr-9d7c3f21-e8a4-7b11',
    userName: 'Carlos Mendes',
    ip: '200.130.11.220',
    details: 'analise_estatistica_v1.json · reason: incomplete',
    eventId: 'e014',
    severity: 'WARNING',
  },
];

export const getAuditLogs = (
  user: User | null,
  filters?: { search?: string; action?: string; date?: string; userId?: string }
): AuditLog[] => {
  if (!isDemoAccount(user)) {
    return [];
  }

  let filtered = [...mockLogs];

  if (filters?.search) {
    const s = filters.search.toLowerCase();
    filtered = filtered.filter(
      log =>
        log.action.toLowerCase().includes(s) ||
        log.details.toLowerCase().includes(s) ||
        log.userName.toLowerCase().includes(s) ||
        log.ip.includes(s) ||
        log.userId.toLowerCase().includes(s)
    );
  }

  if (filters?.action && filters.action !== 'Todas as Ações') {
    filtered = filtered.filter(log => log.action === filters.action);
  }

  return filtered;
};

export const getComplianceStats = (user: User | null): ComplianceStats => {
  if (!isDemoAccount(user)) {
    return {
      score: 0,
      scoreTrend: 0,
      compliantPolicies: 0,
      totalPolicies: 5,
      pendingItems: 0,
      totalEvents: 0,
      policies: [],
    };
  }

  return {
    score: 92,
    scoreTrend: 4,
    compliantPolicies: 3,
    totalPolicies: 5,
    pendingItems: 14,
    totalEvents: mockLogs.length,
    policies: [
      {
        name: 'Anonimização de dados pessoais (LGPD)',
        status: 'conforme',
        percentage: 100,
        text: '24/24 documentos',
      },
      {
        name: 'Termo de consentimento informado',
        status: 'parcial',
        percentage: 83,
        text: '20/24 documentos',
      },
      {
        name: 'Versionamento e cadeia de custódia',
        status: 'conforme',
        percentage: 96,
        text: '23/24 documentos',
      },
      {
        name: 'Retenção e descarte de dados',
        status: 'pendente',
        percentage: 58,
        text: '14/24 documentos',
      },
      {
        name: 'Aprovação do comitê de ética',
        status: 'conforme',
        percentage: 100,
        text: 'Todos os projetos',
      },
    ],
  };
};

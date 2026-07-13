import { describe, expect, it } from 'vitest';
import { getAuditLogs, getComplianceStats } from '../auditorService';

const demoUser = { email: 'auditor.demo@unb.br' } as any;
const regularUser = { email: 'auditor@unb.br' } as any;

describe('auditorService', () => {
  it('does not expose demonstration audit data to regular accounts', () => {
    expect(getAuditLogs(regularUser)).toEqual([]);
    expect(getAuditLogs(null)).toEqual([]);
    expect(getAuditLogs({} as any)).toEqual([]);
    expect(getComplianceStats(regularUser)).toMatchObject({
      score: 0,
      compliantPolicies: 0,
      totalPolicies: 5,
      pendingItems: 0,
      policies: [],
    });
  });

  it('returns the complete audit dataset and demonstration compliance indicators', () => {
    const logs = getAuditLogs(demoUser);
    const stats = getComplianceStats(demoUser);

    expect(logs).toHaveLength(14);
    expect(logs).toEqual(expect.arrayContaining([
      expect.objectContaining({ action: 'UPLOAD_DOCUMENT', severity: 'INFO' }),
      expect.objectContaining({ action: 'DOCUMENT_DELETED', severity: 'CRITICAL' }),
    ]));
    expect(stats).toMatchObject({
      score: 92,
      scoreTrend: 4,
      compliantPolicies: 3,
      totalPolicies: 5,
      pendingItems: 14,
      totalEvents: 14,
    });
    expect(stats.policies).toEqual([
      expect.objectContaining({ name: 'Anonimização de dados pessoais (LGPD)', status: 'conforme', percentage: 100 }),
      expect.objectContaining({ name: 'Termo de consentimento informado', status: 'parcial', percentage: 83 }),
      expect.objectContaining({ name: 'Versionamento e cadeia de custódia', status: 'conforme', percentage: 96 }),
      expect.objectContaining({ name: 'Retenção e descarte de dados', status: 'pendente', percentage: 58 }),
      expect.objectContaining({ name: 'Aprovação do comitê de ética', status: 'conforme', percentage: 100 }),
    ]);
  });

  it('filters demonstration logs by every supported search field and action', () => {
    expect(getAuditLogs(demoUser, { search: 'renata silva' })).toHaveLength(3);
    expect(getAuditLogs(demoUser, { search: '143.107.42.88' })).toHaveLength(3);
    expect(getAuditLogs(demoUser, { search: 'usr-9d7c3f21' })).toHaveLength(4);
    expect(getAuditLogs(demoUser, { search: 'qualitativa_v3' })).toHaveLength(2);
    expect(getAuditLogs(demoUser, { action: 'LOGIN_FAILED' })).toHaveLength(2);
    expect(getAuditLogs(demoUser, { search: 'login_failed' })).toHaveLength(2);
    expect(getAuditLogs(demoUser, { action: 'Todas as Ações' })).toHaveLength(14);
    expect(getAuditLogs(demoUser, { search: 'inexistente' })).toEqual([]);
  });
});

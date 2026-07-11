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
  if (stryMutAct_9fa48("3458")) {
    {}
  } else {
    stryCov_9fa48("3458");
    return stryMutAct_9fa48("3459") ? !user?.email?.toLowerCase().includes('demo') : (stryCov_9fa48("3459"), !(stryMutAct_9fa48("3460") ? user?.email?.toLowerCase().includes('demo') : (stryCov_9fa48("3460"), !(stryMutAct_9fa48("3463") ? user.email?.toLowerCase().includes('demo') : stryMutAct_9fa48("3462") ? user?.email.toLowerCase().includes('demo') : stryMutAct_9fa48("3461") ? user?.email?.toUpperCase().includes('demo') : (stryCov_9fa48("3461", "3462", "3463"), user?.email?.toLowerCase().includes(stryMutAct_9fa48("3464") ? "" : (stryCov_9fa48("3464"), 'demo')))))));
  }
};
const mockLogs: AuditLog[] = stryMutAct_9fa48("3465") ? [] : (stryCov_9fa48("3465"), [stryMutAct_9fa48("3466") ? {} : (stryCov_9fa48("3466"), {
  id: stryMutAct_9fa48("3467") ? "" : (stryCov_9fa48("3467"), '1'),
  timestamp: stryMutAct_9fa48("3468") ? "" : (stryCov_9fa48("3468"), '2026-06-12 14:32:07.341'),
  action: stryMutAct_9fa48("3469") ? "" : (stryCov_9fa48("3469"), 'UPLOAD_DOCUMENT'),
  actionClass: stryMutAct_9fa48("3470") ? "" : (stryCov_9fa48("3470"), 'blue'),
  userId: stryMutAct_9fa48("3471") ? "" : (stryCov_9fa48("3471"), 'usr-4f2a8c91-b3e1-4d09'),
  userName: stryMutAct_9fa48("3472") ? "" : (stryCov_9fa48("3472"), 'Renata Silva'),
  ip: stryMutAct_9fa48("3473") ? "" : (stryCov_9fa48("3473"), '143.107.42.88'),
  details: stryMutAct_9fa48("3474") ? "" : (stryCov_9fa48("3474"), 'Metodologia_Qualitativa_v3.pdf · 2.4 MB'),
  eventId: stryMutAct_9fa48("3475") ? "" : (stryCov_9fa48("3475"), 'e001'),
  severity: stryMutAct_9fa48("3476") ? "" : (stryCov_9fa48("3476"), 'INFO')
}), stryMutAct_9fa48("3477") ? {} : (stryCov_9fa48("3477"), {
  id: stryMutAct_9fa48("3478") ? "" : (stryCov_9fa48("3478"), '2'),
  timestamp: stryMutAct_9fa48("3479") ? "" : (stryCov_9fa48("3479"), '2026-06-12 14:18:55.029'),
  action: stryMutAct_9fa48("3480") ? "" : (stryCov_9fa48("3480"), 'LOGIN_SUCCESS'),
  actionClass: stryMutAct_9fa48("3481") ? "" : (stryCov_9fa48("3481"), 'green'),
  userId: stryMutAct_9fa48("3482") ? "" : (stryCov_9fa48("3482"), 'usr-4f2a8c91-b3e1-4d09'),
  userName: stryMutAct_9fa48("3483") ? "" : (stryCov_9fa48("3483"), 'Renata Silva'),
  ip: stryMutAct_9fa48("3484") ? "" : (stryCov_9fa48("3484"), '143.107.42.88'),
  details: stryMutAct_9fa48("3485") ? "" : (stryCov_9fa48("3485"), 'UA: Chrome/126 · 2FA: TOTP_OK'),
  eventId: stryMutAct_9fa48("3486") ? "" : (stryCov_9fa48("3486"), 'e002'),
  severity: stryMutAct_9fa48("3487") ? "" : (stryCov_9fa48("3487"), 'INFO')
}), stryMutAct_9fa48("3488") ? {} : (stryCov_9fa48("3488"), {
  id: stryMutAct_9fa48("3489") ? "" : (stryCov_9fa48("3489"), '3'),
  timestamp: stryMutAct_9fa48("3490") ? "" : (stryCov_9fa48("3490"), '2026-06-12 13:55:14.782'),
  action: stryMutAct_9fa48("3491") ? "" : (stryCov_9fa48("3491"), 'SUBMISSION_APPROVED'),
  actionClass: stryMutAct_9fa48("3492") ? "" : (stryCov_9fa48("3492"), 'green'),
  userId: stryMutAct_9fa48("3493") ? "" : (stryCov_9fa48("3493"), 'usr-9d7c3f21-e8a4-7b11'),
  userName: stryMutAct_9fa48("3494") ? "" : (stryCov_9fa48("3494"), 'Carlos Mendes'),
  ip: stryMutAct_9fa48("3495") ? "" : (stryCov_9fa48("3495"), '200.130.11.220'),
  details: stryMutAct_9fa48("3496") ? "" : (stryCov_9fa48("3496"), 'Dataset_Experimento_A.csv · proj:ia-02'),
  eventId: stryMutAct_9fa48("3497") ? "" : (stryCov_9fa48("3497"), 'e003'),
  severity: stryMutAct_9fa48("3498") ? "" : (stryCov_9fa48("3498"), 'INFO')
}), stryMutAct_9fa48("3499") ? {} : (stryCov_9fa48("3499"), {
  id: stryMutAct_9fa48("3500") ? "" : (stryCov_9fa48("3500"), '4'),
  timestamp: stryMutAct_9fa48("3501") ? "" : (stryCov_9fa48("3501"), '2026-06-12 12:41:33.108'),
  action: stryMutAct_9fa48("3502") ? "" : (stryCov_9fa48("3502"), 'LOGIN_FAILED'),
  actionClass: stryMutAct_9fa48("3503") ? "" : (stryCov_9fa48("3503"), 'orange'),
  userId: stryMutAct_9fa48("3504") ? "" : (stryCov_9fa48("3504"), 'usr-7b1e5d80-a2c6-5e33'),
  userName: stryMutAct_9fa48("3505") ? "" : (stryCov_9fa48("3505"), 'Carlos Mendes'),
  ip: stryMutAct_9fa48("3506") ? "" : (stryCov_9fa48("3506"), '177.82.94.12'),
  details: stryMutAct_9fa48("3507") ? "" : (stryCov_9fa48("3507"), 'Attempt 3/5 · wrong_password'),
  eventId: stryMutAct_9fa48("3508") ? "" : (stryCov_9fa48("3508"), 'e004'),
  severity: stryMutAct_9fa48("3509") ? "" : (stryCov_9fa48("3509"), 'WARNING')
}), stryMutAct_9fa48("3510") ? {} : (stryCov_9fa48("3510"), {
  id: stryMutAct_9fa48("3511") ? "" : (stryCov_9fa48("3511"), '5'),
  timestamp: stryMutAct_9fa48("3512") ? "" : (stryCov_9fa48("3512"), '2026-06-12 11:05:22.500'),
  action: stryMutAct_9fa48("3513") ? "" : (stryCov_9fa48("3513"), 'DOCUMENT_VIEWED'),
  actionClass: stryMutAct_9fa48("3514") ? "" : (stryCov_9fa48("3514"), 'blue'),
  userId: stryMutAct_9fa48("3515") ? "" : (stryCov_9fa48("3515"), 'usr-9d7c3f21-e8a4-7b11'),
  userName: stryMutAct_9fa48("3516") ? "" : (stryCov_9fa48("3516"), 'Carlos Mendes'),
  ip: stryMutAct_9fa48("3517") ? "" : (stryCov_9fa48("3517"), '200.130.11.220'),
  details: stryMutAct_9fa48("3518") ? "" : (stryCov_9fa48("3518"), 'Referencial_Teorico_Final.pdf · dur:00:04:12'),
  eventId: stryMutAct_9fa48("3519") ? "" : (stryCov_9fa48("3519"), 'e005'),
  severity: stryMutAct_9fa48("3520") ? "" : (stryCov_9fa48("3520"), 'INFO')
}), stryMutAct_9fa48("3521") ? {} : (stryCov_9fa48("3521"), {
  id: stryMutAct_9fa48("3522") ? "" : (stryCov_9fa48("3522"), '6'),
  timestamp: stryMutAct_9fa48("3523") ? "" : (stryCov_9fa48("3523"), '2026-06-12 10:30:48.201'),
  action: stryMutAct_9fa48("3524") ? "" : (stryCov_9fa48("3524"), 'PERMISSION_CHANGED'),
  actionClass: stryMutAct_9fa48("3525") ? "" : (stryCov_9fa48("3525"), 'orange'),
  userId: stryMutAct_9fa48("3526") ? "" : (stryCov_9fa48("3526"), 'usr-0a3c9e15-f7b2-root'),
  userName: stryMutAct_9fa48("3527") ? "" : (stryCov_9fa48("3527"), 'Admin System'),
  ip: stryMutAct_9fa48("3528") ? "" : (stryCov_9fa48("3528"), '10.0.0.1'),
  details: stryMutAct_9fa48("3529") ? "" : (stryCov_9fa48("3529"), 'target:usr-7b1e5d80 · ROLE researcher>reviewer'),
  eventId: stryMutAct_9fa48("3530") ? "" : (stryCov_9fa48("3530"), 'e006'),
  severity: stryMutAct_9fa48("3531") ? "" : (stryCov_9fa48("3531"), 'WARNING')
}), stryMutAct_9fa48("3532") ? {} : (stryCov_9fa48("3532"), {
  id: stryMutAct_9fa48("3533") ? "" : (stryCov_9fa48("3533"), '7'),
  timestamp: stryMutAct_9fa48("3534") ? "" : (stryCov_9fa48("3534"), '2026-06-11 17:22:09.944'),
  action: stryMutAct_9fa48("3535") ? "" : (stryCov_9fa48("3535"), 'DOCUMENT_DELETED'),
  actionClass: stryMutAct_9fa48("3536") ? "" : (stryCov_9fa48("3536"), 'red'),
  userId: stryMutAct_9fa48("3537") ? "" : (stryCov_9fa48("3537"), 'usr-4f2a8c91-b3e1-4d09'),
  userName: stryMutAct_9fa48("3538") ? "" : (stryCov_9fa48("3538"), 'Renata Silva'),
  ip: stryMutAct_9fa48("3539") ? "" : (stryCov_9fa48("3539"), '143.107.42.88'),
  details: stryMutAct_9fa48("3540") ? "" : (stryCov_9fa48("3540"), 'rascunho_inicial_v1.pdf · PERMANENT'),
  eventId: stryMutAct_9fa48("3541") ? "" : (stryCov_9fa48("3541"), 'e007'),
  severity: stryMutAct_9fa48("3542") ? "" : (stryCov_9fa48("3542"), 'CRITICAL')
}), stryMutAct_9fa48("3543") ? {} : (stryCov_9fa48("3543"), {
  id: stryMutAct_9fa48("3544") ? "" : (stryCov_9fa48("3544"), '8'),
  timestamp: stryMutAct_9fa48("3545") ? "" : (stryCov_9fa48("3545"), '2026-06-11 15:10:05.113'),
  action: stryMutAct_9fa48("3546") ? "" : (stryCov_9fa48("3546"), 'DOCUMENT_EDITED'),
  actionClass: stryMutAct_9fa48("3547") ? "" : (stryCov_9fa48("3547"), 'blue'),
  userId: stryMutAct_9fa48("3548") ? "" : (stryCov_9fa48("3548"), 'usr-7b1e5d80-a2c6-5e33'),
  userName: stryMutAct_9fa48("3549") ? "" : (stryCov_9fa48("3549"), 'Carlos Mendes'),
  ip: stryMutAct_9fa48("3550") ? "" : (stryCov_9fa48("3550"), '177.82.94.12'),
  details: stryMutAct_9fa48("3551") ? "" : (stryCov_9fa48("3551"), 'Referencial_Teorico_Final.pdf · v1>v2'),
  eventId: stryMutAct_9fa48("3552") ? "" : (stryCov_9fa48("3552"), 'e008'),
  severity: stryMutAct_9fa48("3553") ? "" : (stryCov_9fa48("3553"), 'INFO')
}), stryMutAct_9fa48("3554") ? {} : (stryCov_9fa48("3554"), {
  id: stryMutAct_9fa48("3555") ? "" : (stryCov_9fa48("3555"), '9'),
  timestamp: stryMutAct_9fa48("3556") ? "" : (stryCov_9fa48("3556"), '2026-06-11 09:00:00.000'),
  action: stryMutAct_9fa48("3557") ? "" : (stryCov_9fa48("3557"), 'LOGIN_SUCCESS'),
  actionClass: stryMutAct_9fa48("3558") ? "" : (stryCov_9fa48("3558"), 'green'),
  userId: stryMutAct_9fa48("3559") ? "" : (stryCov_9fa48("3559"), 'usr-2e8b4d63-c1f9-aud'),
  userName: stryMutAct_9fa48("3560") ? "" : (stryCov_9fa48("3560"), 'Auditor Externo'),
  ip: stryMutAct_9fa48("3561") ? "" : (stryCov_9fa48("3561"), '189.102.55.74'),
  details: stryMutAct_9fa48("3562") ? "" : (stryCov_9fa48("3562"), 'Audit session initiated'),
  eventId: stryMutAct_9fa48("3563") ? "" : (stryCov_9fa48("3563"), 'e009'),
  severity: stryMutAct_9fa48("3564") ? "" : (stryCov_9fa48("3564"), 'INFO')
}), stryMutAct_9fa48("3565") ? {} : (stryCov_9fa48("3565"), {
  id: stryMutAct_9fa48("3566") ? "" : (stryCov_9fa48("3566"), '10'),
  timestamp: stryMutAct_9fa48("3567") ? "" : (stryCov_9fa48("3567"), '2026-06-10 18:44:21.882'),
  action: stryMutAct_9fa48("3568") ? "" : (stryCov_9fa48("3568"), 'PASSWORD_RESET'),
  actionClass: stryMutAct_9fa48("3569") ? "" : (stryCov_9fa48("3569"), 'blue'),
  userId: stryMutAct_9fa48("3570") ? "" : (stryCov_9fa48("3570"), 'usr-5c6f1a70-d4e8-7g22'),
  userName: stryMutAct_9fa48("3571") ? "" : (stryCov_9fa48("3571"), 'João Almeida'),
  ip: stryMutAct_9fa48("3572") ? "" : (stryCov_9fa48("3572"), '192.168.1.42'),
  details: stryMutAct_9fa48("3573") ? "" : (stryCov_9fa48("3573"), 'Email link · completed_ok'),
  eventId: stryMutAct_9fa48("3574") ? "" : (stryCov_9fa48("3574"), 'e010'),
  severity: stryMutAct_9fa48("3575") ? "" : (stryCov_9fa48("3575"), 'INFO')
}), stryMutAct_9fa48("3576") ? {} : (stryCov_9fa48("3576"), {
  id: stryMutAct_9fa48("3577") ? "" : (stryCov_9fa48("3577"), '11'),
  timestamp: stryMutAct_9fa48("3578") ? "" : (stryCov_9fa48("3578"), '2026-06-10 14:22:17.559'),
  action: stryMutAct_9fa48("3579") ? "" : (stryCov_9fa48("3579"), 'UPLOAD_DOCUMENT'),
  actionClass: stryMutAct_9fa48("3580") ? "" : (stryCov_9fa48("3580"), 'blue'),
  userId: stryMutAct_9fa48("3581") ? "" : (stryCov_9fa48("3581"), 'usr-5c6f1a70-d4e8-7g22'),
  userName: stryMutAct_9fa48("3582") ? "" : (stryCov_9fa48("3582"), 'João Almeida'),
  ip: stryMutAct_9fa48("3583") ? "" : (stryCov_9fa48("3583"), '192.168.1.42'),
  details: stryMutAct_9fa48("3584") ? "" : (stryCov_9fa48("3584"), 'Dataset_Experimento_B.csv · 23.1 MB'),
  eventId: stryMutAct_9fa48("3585") ? "" : (stryCov_9fa48("3585"), 'e011'),
  severity: stryMutAct_9fa48("3586") ? "" : (stryCov_9fa48("3586"), 'INFO')
}), stryMutAct_9fa48("3587") ? {} : (stryCov_9fa48("3587"), {
  id: stryMutAct_9fa48("3588") ? "" : (stryCov_9fa48("3588"), '12'),
  timestamp: stryMutAct_9fa48("3589") ? "" : (stryCov_9fa48("3589"), '2026-06-10 11:03:44.001'),
  action: stryMutAct_9fa48("3590") ? "" : (stryCov_9fa48("3590"), 'LOGIN_FAILED'),
  actionClass: stryMutAct_9fa48("3591") ? "" : (stryCov_9fa48("3591"), 'orange'),
  userId: stryMutAct_9fa48("3592") ? "" : (stryCov_9fa48("3592"), 'usr-9d7c3f21-e8a4-7b11'),
  userName: stryMutAct_9fa48("3593") ? "" : (stryCov_9fa48("3593"), 'Carlos Mendes'),
  ip: stryMutAct_9fa48("3594") ? "" : (stryCov_9fa48("3594"), '200.130.11.220'),
  details: stryMutAct_9fa48("3595") ? "" : (stryCov_9fa48("3595"), 'Attempt 1/5 · wrong_password'),
  eventId: stryMutAct_9fa48("3596") ? "" : (stryCov_9fa48("3596"), 'e012'),
  severity: stryMutAct_9fa48("3597") ? "" : (stryCov_9fa48("3597"), 'WARNING')
}), stryMutAct_9fa48("3598") ? {} : (stryCov_9fa48("3598"), {
  id: stryMutAct_9fa48("3599") ? "" : (stryCov_9fa48("3599"), '13'),
  timestamp: stryMutAct_9fa48("3600") ? "" : (stryCov_9fa48("3600"), '2026-06-09 20:15:30.628'),
  action: stryMutAct_9fa48("3601") ? "" : (stryCov_9fa48("3601"), 'DOCUMENT_VIEWED'),
  actionClass: stryMutAct_9fa48("3602") ? "" : (stryCov_9fa48("3602"), 'blue'),
  userId: stryMutAct_9fa48("3603") ? "" : (stryCov_9fa48("3603"), 'usr-5c6f1a70-d4e8-7g22'),
  userName: stryMutAct_9fa48("3604") ? "" : (stryCov_9fa48("3604"), 'João Almeida'),
  ip: stryMutAct_9fa48("3605") ? "" : (stryCov_9fa48("3605"), '192.168.1.42'),
  details: stryMutAct_9fa48("3606") ? "" : (stryCov_9fa48("3606"), 'Metodologia_Qualitativa_v3.pdf · dur:00:12:05'),
  eventId: stryMutAct_9fa48("3607") ? "" : (stryCov_9fa48("3607"), 'e013'),
  severity: stryMutAct_9fa48("3608") ? "" : (stryCov_9fa48("3608"), 'INFO')
}), stryMutAct_9fa48("3609") ? {} : (stryCov_9fa48("3609"), {
  id: stryMutAct_9fa48("3610") ? "" : (stryCov_9fa48("3610"), '14'),
  timestamp: stryMutAct_9fa48("3611") ? "" : (stryCov_9fa48("3611"), '2026-06-09 16:30:11.114'),
  action: stryMutAct_9fa48("3612") ? "" : (stryCov_9fa48("3612"), 'SUBMISSION_REJECTED'),
  actionClass: stryMutAct_9fa48("3613") ? "" : (stryCov_9fa48("3613"), 'orange'),
  userId: stryMutAct_9fa48("3614") ? "" : (stryCov_9fa48("3614"), 'usr-9d7c3f21-e8a4-7b11'),
  userName: stryMutAct_9fa48("3615") ? "" : (stryCov_9fa48("3615"), 'Carlos Mendes'),
  ip: stryMutAct_9fa48("3616") ? "" : (stryCov_9fa48("3616"), '200.130.11.220'),
  details: stryMutAct_9fa48("3617") ? "" : (stryCov_9fa48("3617"), 'analise_estatistica_v1.json · reason: incomplete'),
  eventId: stryMutAct_9fa48("3618") ? "" : (stryCov_9fa48("3618"), 'e014'),
  severity: stryMutAct_9fa48("3619") ? "" : (stryCov_9fa48("3619"), 'WARNING')
})]);
export const getAuditLogs = (user: User | null, filters?: {
  search?: string;
  action?: string;
  date?: string;
  userId?: string;
}): AuditLog[] => {
  if (stryMutAct_9fa48("3620")) {
    {}
  } else {
    stryCov_9fa48("3620");
    if (stryMutAct_9fa48("3623") ? false : stryMutAct_9fa48("3622") ? true : stryMutAct_9fa48("3621") ? isDemoAccount(user) : (stryCov_9fa48("3621", "3622", "3623"), !isDemoAccount(user))) {
      if (stryMutAct_9fa48("3624")) {
        {}
      } else {
        stryCov_9fa48("3624");
        return stryMutAct_9fa48("3625") ? ["Stryker was here"] : (stryCov_9fa48("3625"), []);
      }
    }
    let filtered = stryMutAct_9fa48("3626") ? [] : (stryCov_9fa48("3626"), [...mockLogs]);
    if (stryMutAct_9fa48("3629") ? filters.search : stryMutAct_9fa48("3628") ? false : stryMutAct_9fa48("3627") ? true : (stryCov_9fa48("3627", "3628", "3629"), filters?.search)) {
      if (stryMutAct_9fa48("3630")) {
        {}
      } else {
        stryCov_9fa48("3630");
        const s = stryMutAct_9fa48("3631") ? filters.search.toUpperCase() : (stryCov_9fa48("3631"), filters.search.toLowerCase());
        filtered = stryMutAct_9fa48("3632") ? filtered : (stryCov_9fa48("3632"), filtered.filter(stryMutAct_9fa48("3633") ? () => undefined : (stryCov_9fa48("3633"), log => stryMutAct_9fa48("3636") ? (log.action.toLowerCase().includes(s) || log.details.toLowerCase().includes(s) || log.userName.toLowerCase().includes(s) || log.ip.includes(s)) && log.userId.toLowerCase().includes(s) : stryMutAct_9fa48("3635") ? false : stryMutAct_9fa48("3634") ? true : (stryCov_9fa48("3634", "3635", "3636"), (stryMutAct_9fa48("3638") ? (log.action.toLowerCase().includes(s) || log.details.toLowerCase().includes(s) || log.userName.toLowerCase().includes(s)) && log.ip.includes(s) : stryMutAct_9fa48("3637") ? false : (stryCov_9fa48("3637", "3638"), (stryMutAct_9fa48("3640") ? (log.action.toLowerCase().includes(s) || log.details.toLowerCase().includes(s)) && log.userName.toLowerCase().includes(s) : stryMutAct_9fa48("3639") ? false : (stryCov_9fa48("3639", "3640"), (stryMutAct_9fa48("3642") ? log.action.toLowerCase().includes(s) && log.details.toLowerCase().includes(s) : stryMutAct_9fa48("3641") ? false : (stryCov_9fa48("3641", "3642"), (stryMutAct_9fa48("3643") ? log.action.toUpperCase().includes(s) : (stryCov_9fa48("3643"), log.action.toLowerCase().includes(s))) || (stryMutAct_9fa48("3644") ? log.details.toUpperCase().includes(s) : (stryCov_9fa48("3644"), log.details.toLowerCase().includes(s))))) || (stryMutAct_9fa48("3645") ? log.userName.toUpperCase().includes(s) : (stryCov_9fa48("3645"), log.userName.toLowerCase().includes(s))))) || log.ip.includes(s))) || (stryMutAct_9fa48("3646") ? log.userId.toUpperCase().includes(s) : (stryCov_9fa48("3646"), log.userId.toLowerCase().includes(s)))))));
      }
    }
    if (stryMutAct_9fa48("3649") ? filters?.action || filters.action !== 'Todas as Ações' : stryMutAct_9fa48("3648") ? false : stryMutAct_9fa48("3647") ? true : (stryCov_9fa48("3647", "3648", "3649"), (stryMutAct_9fa48("3650") ? filters.action : (stryCov_9fa48("3650"), filters?.action)) && (stryMutAct_9fa48("3652") ? filters.action === 'Todas as Ações' : stryMutAct_9fa48("3651") ? true : (stryCov_9fa48("3651", "3652"), filters.action !== (stryMutAct_9fa48("3653") ? "" : (stryCov_9fa48("3653"), 'Todas as Ações')))))) {
      if (stryMutAct_9fa48("3654")) {
        {}
      } else {
        stryCov_9fa48("3654");
        filtered = stryMutAct_9fa48("3655") ? filtered : (stryCov_9fa48("3655"), filtered.filter(stryMutAct_9fa48("3656") ? () => undefined : (stryCov_9fa48("3656"), log => stryMutAct_9fa48("3659") ? log.action !== filters.action : stryMutAct_9fa48("3658") ? false : stryMutAct_9fa48("3657") ? true : (stryCov_9fa48("3657", "3658", "3659"), log.action === filters.action))));
      }
    }
    return filtered;
  }
};
export const getComplianceStats = (user: User | null): ComplianceStats => {
  if (stryMutAct_9fa48("3660")) {
    {}
  } else {
    stryCov_9fa48("3660");
    if (stryMutAct_9fa48("3663") ? false : stryMutAct_9fa48("3662") ? true : stryMutAct_9fa48("3661") ? isDemoAccount(user) : (stryCov_9fa48("3661", "3662", "3663"), !isDemoAccount(user))) {
      if (stryMutAct_9fa48("3664")) {
        {}
      } else {
        stryCov_9fa48("3664");
        return stryMutAct_9fa48("3665") ? {} : (stryCov_9fa48("3665"), {
          score: 0,
          scoreTrend: 0,
          compliantPolicies: 0,
          totalPolicies: 5,
          pendingItems: 0,
          totalEvents: 0,
          policies: stryMutAct_9fa48("3666") ? ["Stryker was here"] : (stryCov_9fa48("3666"), [])
        });
      }
    }
    return stryMutAct_9fa48("3667") ? {} : (stryCov_9fa48("3667"), {
      score: 92,
      scoreTrend: 4,
      compliantPolicies: 3,
      totalPolicies: 5,
      pendingItems: 14,
      totalEvents: mockLogs.length,
      policies: stryMutAct_9fa48("3668") ? [] : (stryCov_9fa48("3668"), [stryMutAct_9fa48("3669") ? {} : (stryCov_9fa48("3669"), {
        name: stryMutAct_9fa48("3670") ? "" : (stryCov_9fa48("3670"), 'Anonimização de dados pessoais (LGPD)'),
        status: stryMutAct_9fa48("3671") ? "" : (stryCov_9fa48("3671"), 'conforme'),
        percentage: 100,
        text: stryMutAct_9fa48("3672") ? "" : (stryCov_9fa48("3672"), '24/24 documentos')
      }), stryMutAct_9fa48("3673") ? {} : (stryCov_9fa48("3673"), {
        name: stryMutAct_9fa48("3674") ? "" : (stryCov_9fa48("3674"), 'Termo de consentimento informado'),
        status: stryMutAct_9fa48("3675") ? "" : (stryCov_9fa48("3675"), 'parcial'),
        percentage: 83,
        text: stryMutAct_9fa48("3676") ? "" : (stryCov_9fa48("3676"), '20/24 documentos')
      }), stryMutAct_9fa48("3677") ? {} : (stryCov_9fa48("3677"), {
        name: stryMutAct_9fa48("3678") ? "" : (stryCov_9fa48("3678"), 'Versionamento e cadeia de custódia'),
        status: stryMutAct_9fa48("3679") ? "" : (stryCov_9fa48("3679"), 'conforme'),
        percentage: 96,
        text: stryMutAct_9fa48("3680") ? "" : (stryCov_9fa48("3680"), '23/24 documentos')
      }), stryMutAct_9fa48("3681") ? {} : (stryCov_9fa48("3681"), {
        name: stryMutAct_9fa48("3682") ? "" : (stryCov_9fa48("3682"), 'Retenção e descarte de dados'),
        status: stryMutAct_9fa48("3683") ? "" : (stryCov_9fa48("3683"), 'pendente'),
        percentage: 58,
        text: stryMutAct_9fa48("3684") ? "" : (stryCov_9fa48("3684"), '14/24 documentos')
      }), stryMutAct_9fa48("3685") ? {} : (stryCov_9fa48("3685"), {
        name: stryMutAct_9fa48("3686") ? "" : (stryCov_9fa48("3686"), 'Aprovação do comitê de ética'),
        status: stryMutAct_9fa48("3687") ? "" : (stryCov_9fa48("3687"), 'conforme'),
        percentage: 100,
        text: stryMutAct_9fa48("3688") ? "" : (stryCov_9fa48("3688"), 'Todos os projetos')
      })])
    });
  }
};
import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import '../assets/settings.css';
import { useAuth } from '../context/authContext';
import { setup2Fa, enable2Fa } from '../services/api';

const Settings: React.FC = () => {
  const { user } = useAuth();
  const [reviewEmails, setReviewEmails] = useState(true);
  const [strictLgpd, setStrictLgpd] = useState(true);
  
  const [qrCodeUri, setQrCodeUri] = useState<string | null>(null);
  const [totpCode, setTotpCode] = useState('');
  const [is2FaEnabled, setIs2FaEnabled] = useState(user?.mfaEnabled || false);
  const [setupError, setSetupError] = useState('');

  const userName = user?.name || 'Usuário';
  const userEmail = user?.email || 'usuario@edtech.com';
  const userInitials = userName
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  const handleSetup2Fa = async () => {
    setSetupError('');
    const res = await setup2Fa();
    if (res.sucesso && res.dados) {
      setQrCodeUri(res.dados.qrCodeUri);
    } else {
      setSetupError(res.mensagem || 'Erro ao gerar QR Code');
    }
  };

  const handleEnable2Fa = async () => {
    setSetupError('');
    const res = await enable2Fa(totpCode);
    if (res.sucesso) {
      setIs2FaEnabled(true);
      setQrCodeUri(null);
      setTotpCode('');
    } else {
      setSetupError(res.mensagem || 'Código inválido');
    }
  };

  return (
    <DashboardLayout
      title="Configurações"
      subtitle="Perfil, preferências de IA e governança"
      breadcrumbs={['EdTech', 'Configurações']}
    >
      <div className="settings-container">
        {/* Perfil */}
        <div className="settings-card">
          <h3 className="settings-section-title">Perfil</h3>
          <div className="settings-profile-row">
            <div className="settings-avatar">{userInitials}</div>
            <div className="settings-profile-info">
              <span className="profile-name">{userName}</span>
              <span className="profile-email">{userEmail}</span>
            </div>
            <div className="settings-profile-actions">
              <span className="settings-badge-role">Pesquisador</span>
              <button className="btn-outline">Editar perfil</button>
            </div>
          </div>
        </div>

        {/* Notificações */}
        <div className="settings-card">
          <h3 className="settings-section-title">Notificações</h3>

          <div className="settings-item">
            <div className="settings-item-icon bg-purple-light">
              <i className="bi bi-bell"></i>
            </div>
            <div className="settings-item-content">
              <span className="settings-item-title">E-mails de revisão</span>
              <span className="settings-item-desc">
                Receber e-mail quando documentos forem revisados ou comentados
              </span>
            </div>
            <div className="settings-item-action">
              <label className="ed-switch">
                <input
                  type="checkbox"
                  checked={reviewEmails}
                  onChange={(e) => setReviewEmails(e.target.checked)}
                />
                <span className="ed-slider"></span>
              </label>
            </div>
          </div>

          <div className="settings-item no-border">
            <div className="settings-item-icon bg-purple-light">
              <i className="bi bi-person"></i>
            </div>
            <div className="settings-item-content">
              <span className="settings-item-title">Menções e atribuições</span>
              <span className="settings-item-desc">
                Notificar quando você for mencionado em uma trilha
              </span>
            </div>
            <div className="settings-item-action">
              <span className="settings-badge-active">Ativo</span>
            </div>
          </div>
        </div>

        {/* Segurança e 2FA */}
        <div className="settings-card">
          <h3 className="settings-section-title">Segurança</h3>
          
          <div className="settings-item">
            <div className="settings-item-icon bg-purple-light">
              <i className="bi bi-shield-lock"></i>
            </div>
            <div className="settings-item-content">
              <span className="settings-item-title">Autenticação de Dois Fatores (2FA)</span>
              <span className="settings-item-desc">
                {is2FaEnabled 
                  ? "Sua conta está protegida com 2FA." 
                  : "Adicione uma camada extra de segurança com o Google Authenticator."}
              </span>
            </div>
            <div className="settings-item-action">
              {is2FaEnabled ? (
                <span className="settings-badge-active">Ativado</span>
              ) : (
                <button className="btn-primary" onClick={handleSetup2Fa} disabled={qrCodeUri !== null}>
                  Configurar 2FA
                </button>
              )}
            </div>
          </div>

          {qrCodeUri && !is2FaEnabled && (
            <div className="settings-item no-border" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <div style={{ marginTop: '1rem', padding: '1rem', border: '1px solid #ddd', borderRadius: '8px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <p style={{ marginBottom: '1rem', fontWeight: 500 }}>
                  1. Escaneie este QR Code no seu aplicativo Autenticador
                </p>
                <img src={qrCodeUri} alt="QR Code 2FA" style={{ width: '200px', height: '200px', marginBottom: '1rem' }} />
                
                <p style={{ marginBottom: '1rem', fontWeight: 500 }}>
                  2. Insira o código de 6 dígitos gerado
                </p>
                <div style={{ display: 'flex', gap: '0.5rem', width: '100%', maxWidth: '300px' }}>
                  <input
                    type="text"
                    className="ed-input"
                    placeholder="000000"
                    maxLength={6}
                    value={totpCode}
                    onChange={(e) => setTotpCode(e.target.value.replace(/\D/g, ''))}
                  />
                  <button className="btn-primary" onClick={handleEnable2Fa} disabled={totpCode.length !== 6}>
                    Ativar
                  </button>
                </div>
                {setupError && <p style={{ color: '#d32f2f', marginTop: '0.5rem', fontSize: '0.875rem' }}>{setupError}</p>}
              </div>
            </div>
          )}
        </div>

        {/* Governança */}
        <div className="settings-card">
          <h3 className="settings-section-title">Governança</h3>

          <div className="settings-item no-border">
            <div className="settings-item-icon bg-purple-light">
              <i className="bi bi-shield-check"></i>
            </div>
            <div className="settings-item-content">
              <span className="settings-item-title">Modo LGPD estrito</span>
              <span className="settings-item-desc">
                Bloquear submissões com dados pessoais não anonimizados
              </span>
            </div>
            <div className="settings-item-action">
              <label className="ed-switch">
                <input
                  type="checkbox"
                  checked={strictLgpd}
                  onChange={(e) => setStrictLgpd(e.target.checked)}
                />
                <span className="ed-slider"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;

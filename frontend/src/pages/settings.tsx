import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import '../assets/settings.css';
import { useAuth } from '../context/authContext';
import {
  setup2Fa,
  enable2Fa,
  getLaboratoryTokens,
  joinLaboratory,
  updateProfile,
} from '../services/api';

const Settings: React.FC = () => {
  const { user, checkAuth } = useAuth();
  const [reviewEmails, setReviewEmails] = useState(true);
  const [strictLgpd, setStrictLgpd] = useState(true);

  const [qrCodeUri, setQrCodeUri] = useState<string | null>(null);
  const [totpCode, setTotpCode] = useState('');
  const [is2FaEnabled, setIs2FaEnabled] = useState(user?.mfaEnabled || false);
  const [setupError, setSetupError] = useState('');

  const [advisorCode, setAdvisorCode] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  const [joinMessage, setJoinMessage] = useState('');
  const [labTokens, setLabTokens] = useState<{ researcher: string; auditor: string } | null>(null);
  const [isLoadingLabTokens, setIsLoadingLabTokens] = useState(false);
  const [labTokensError, setLabTokensError] = useState('');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileName, setProfileName] = useState(user?.name || '');
  const [avatarPreview, setAvatarPreview] = useState<string | null>(user?.avatarUrl || null);
  const [profileMessage, setProfileMessage] = useState('');

  const loadLaboratoryTokens = async () => {
    setIsLoadingLabTokens(true);
    setLabTokensError('');
    const response = await getLaboratoryTokens();
    if (response.sucesso && response.dados) {
      setLabTokens({
        researcher: response.dados.researcher_token,
        auditor: response.dados.auditor_token,
      });
    } else {
      setLabTokens(null);
      setLabTokensError(response.mensagem || 'Não foi possível carregar os códigos de associação.');
    }
    setIsLoadingLabTokens(false);
  };

  React.useEffect(() => {
    if (user?.role === 'ADVISOR') {
      void loadLaboratoryTokens();
    }
  }, [user?.role]);

  const userName = user?.name || 'Usuário';
  const userEmail = user?.email || 'usuario@edtech.com';
  const roleLabel: Record<string, string> = {
    RESEARCHER: 'Pesquisador',
    ADVISOR: 'Orientador',
    AUDITOR: 'Auditor',
  };
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

  const handleJoinLaboratory = async () => {
    setJoinMessage('');
    setIsJoining(true);
    const res = await joinLaboratory(advisorCode);
    if (res.sucesso) {
      setJoinMessage('Vinculado ao laboratório com sucesso!');
      setAdvisorCode('');
    } else {
      setJoinMessage(res.mensagem || 'Erro ao vincular');
    }
    setIsJoining(false);
  };

  const handleAvatarChange = (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setProfileMessage('Escolha uma imagem PNG, JPEG, WebP ou GIF.');
      return;
    }
    if (file.size > 1_500_000) {
      setProfileMessage('A imagem deve ter no máximo 1,5 MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setAvatarPreview(String(reader.result));
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = async () => {
    const response = await updateProfile(profileName.trim(), avatarPreview);
    if (response.sucesso) {
      setProfileMessage('Perfil atualizado com sucesso.');
      setIsEditingProfile(false);
      await checkAuth?.();
    } else {
      setProfileMessage(response.mensagem || 'Não foi possível atualizar o perfil.');
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
            <div className="settings-avatar">
              {user?.avatarUrl ? <img src={user.avatarUrl} alt="Foto do perfil" /> : userInitials}
            </div>
            <div className="settings-profile-info">
              <span className="profile-name">{userName}</span>
              <span className="profile-email">{userEmail}</span>
            </div>
            <div className="settings-profile-actions">
              <span className="settings-badge-role">{roleLabel[user?.role || ''] || 'Conta'}</span>
              <button
                className="btn-outline"
                onClick={() => {
                  setProfileName(userName);
                  setAvatarPreview(user?.avatarUrl || null);
                  setProfileMessage('');
                  setIsEditingProfile(true);
                }}
              >
                Editar perfil
              </button>
            </div>
          </div>
        </div>

        {isEditingProfile && (
          <div
            className="profile-editor"
            role="dialog"
            aria-modal="true"
            aria-label="Editar perfil"
          >
            <div className="profile-editor-card">
              <div className="profile-editor-header">
                <h3>Editar perfil</h3>
                <button
                  className="profile-close"
                  aria-label="Fechar"
                  onClick={() => setIsEditingProfile(false)}
                >
                  ×
                </button>
              </div>
              <label htmlFor="profile-name">Nome exibido</label>
              <input
                id="profile-name"
                className="ed-input"
                value={profileName}
                maxLength={120}
                onChange={(e) => setProfileName(e.target.value)}
              />
              <label htmlFor="profile-avatar">Foto do perfil</label>
              <div className="profile-avatar-picker">
                <div className="settings-avatar">
                  {avatarPreview ? <img src={avatarPreview} alt="Prévia da foto" /> : userInitials}
                </div>
                <input
                  id="profile-avatar"
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/gif"
                  onChange={(e) => handleAvatarChange(e.target.files?.[0])}
                />
              </div>
              {profileMessage && <p className="profile-message">{profileMessage}</p>}
              <div className="profile-editor-actions">
                <button className="btn-outline" onClick={() => setIsEditingProfile(false)}>
                  Cancelar
                </button>
                <button
                  className="btn-primary"
                  disabled={!profileName.trim()}
                  onClick={handleSaveProfile}
                >
                  Salvar alterações
                </button>
              </div>
            </div>
          </div>
        )}

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
                  ? 'Sua conta está protegida com 2FA.'
                  : 'Adicione uma camada extra de segurança com o Google Authenticator.'}
              </span>
            </div>
            <div className="settings-item-action">
              {is2FaEnabled ? (
                <span className="settings-badge-active">Ativado</span>
              ) : (
                <button
                  className="btn-primary"
                  onClick={handleSetup2Fa}
                  disabled={qrCodeUri !== null}
                >
                  Configurar 2FA
                </button>
              )}
            </div>
          </div>

          {setupError && !qrCodeUri && <p className="settings-error">{setupError}</p>}
          {qrCodeUri && !is2FaEnabled && (
            <div
              className="settings-item no-border"
              style={{ flexDirection: 'column', alignItems: 'flex-start' }}
            >
              <div
                style={{
                  marginTop: '1rem',
                  padding: '1rem',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <p style={{ marginBottom: '1rem', fontWeight: 500 }}>
                  1. Escaneie este QR Code no seu aplicativo Autenticador (Google Authenticator,
                  Authy, etc.)
                </p>
                <img
                  src={qrCodeUri}
                  alt="QR Code 2FA"
                  style={{ width: '200px', height: '200px', marginBottom: '1rem' }}
                />

                <p style={{ marginBottom: '1rem', fontWeight: 500 }}>
                  2. Insira o código de 6 dígitos gerado (ele muda a cada 30 segundos)
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
                  <button
                    className="btn-primary"
                    onClick={handleEnable2Fa}
                    disabled={totpCode.length !== 6}
                  >
                    Ativar
                  </button>
                </div>
                {setupError && (
                  <p style={{ color: '#d32f2f', marginTop: '0.5rem', fontSize: '0.875rem' }}>
                    {setupError}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Vínculo por código: cada perfil só aceita o código emitido para seu papel. */}
        {(user?.role === 'RESEARCHER' || user?.role === 'AUDITOR') && (
          <div className="settings-card">
            <h3 className="settings-section-title">Laboratório e Vínculo Institucional</h3>

            {user?.institutionId &&
            user.institutionId !== '00000000-0000-0000-0000-000000000001' ? (
              <div className="settings-item no-border">
                <div className="settings-item-icon bg-purple-light">
                  <i
                    className="bi bi-check-circle-fill"
                    style={{ color: 'var(--ed-status-success)' }}
                  ></i>
                </div>
                <div className="settings-item-content">
                  <span className="settings-item-title">Vínculo Ativo</span>
                  <span className="settings-item-desc">
                    Você está vinculado permanentemente a um laboratório. Este vínculo permanece até
                    que o orientador o remova ou a auditoria seja encerrada.
                  </span>
                </div>
              </div>
            ) : (
              <>
                <div className="settings-item no-border">
                  <div className="settings-item-icon bg-purple-light">
                    <i className="bi bi-diagram-3"></i>
                  </div>
                  <div className="settings-item-content">
                    <span className="settings-item-title">Vincular ao orientador</span>
                    <span className="settings-item-desc">
                      {user?.role === 'RESEARCHER'
                        ? 'Use o código de pesquisador emitido pelo orientador.'
                        : 'Use o código de auditor emitido pelo orientador.'}{' '}
                      Os códigos expiram ao fim da semana.
                    </span>
                  </div>
                </div>

                <div className="settings-item no-border" style={{ paddingTop: 0 }}>
                  <div className="settings-code-form">
                    <input
                      type="text"
                      className="ed-input"
                      placeholder="Código de 6 dígitos"
                      value={advisorCode}
                      maxLength={6}
                      inputMode="numeric"
                      onChange={(e) => setAdvisorCode(e.target.value.replace(/\D/g, ''))}
                    />
                    <button
                      className="btn-primary"
                      onClick={handleJoinLaboratory}
                      disabled={!advisorCode.trim() || isJoining}
                    >
                      {isJoining ? 'Vinculando...' : 'Vincular'}
                    </button>
                  </div>
                </div>
                {joinMessage && (
                  <div
                    style={{
                      marginLeft: '56px',
                      marginTop: '0.5rem',
                      fontSize: '0.875rem',
                      color: joinMessage.includes('sucesso')
                        ? 'var(--ed-status-success)'
                        : '#d32f2f',
                    }}
                  >
                    {joinMessage}
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Painel do Orientador (Apenas para Orientadores) */}
        {user?.role === 'ADVISOR' && (
          <div className="settings-card">
            <h3 className="settings-section-title">Códigos de Acesso do Laboratório</h3>
            <p style={{ color: 'var(--ed-text-muted)', fontSize: '13px', marginBottom: '16px' }}>
              Compartilhe os códigos abaixo com sua equipe. Por motivos de segurança, os códigos
              para pesquisadores e auditores são diferentes.
            </p>
            {isLoadingLabTokens && (
              <p className="settings-item-desc">Gerando códigos de associação...</p>
            )}
            {labTokensError && (
              <div className="settings-code-status" role="alert">
                <span>{labTokensError}</span>
                <button className="btn-outline" onClick={() => void loadLaboratoryTokens()}>
                  Tentar novamente
                </button>
              </div>
            )}
            {labTokens && (
              <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
                <div className="settings-access-code">
                  <div
                    style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      color: 'var(--ed-text-muted)',
                      textTransform: 'uppercase',
                    }}
                  >
                    Token para Pesquisadores
                  </div>
                  <div
                    style={{
                      fontSize: '20px',
                      fontWeight: 'bold',
                      letterSpacing: '2px',
                      color: 'var(--ed-purple-main)',
                      marginTop: '4px',
                    }}
                  >
                    {labTokens.researcher}
                  </div>
                </div>
                <div className="settings-access-code">
                  <div
                    style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      color: 'var(--ed-text-muted)',
                      textTransform: 'uppercase',
                    }}
                  >
                    Token para Auditores
                  </div>
                  <div
                    style={{
                      fontSize: '20px',
                      fontWeight: 'bold',
                      letterSpacing: '2px',
                      color: 'var(--ed-purple-main)',
                      marginTop: '4px',
                    }}
                  >
                    {labTokens.auditor}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

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

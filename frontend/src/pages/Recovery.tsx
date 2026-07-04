import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { requestPasswordRecovery, verifyRecoveryCode, resetPassword } from '../services/api';
import { motion } from 'framer-motion';
import AuthLayout from '../components/AuthLayout';
import styles from './auth.module.css';

function Recovery() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [loading, setLoading] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const navigate = useNavigate();
  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  const handleRequestCode = async (e: React.FormEvent) => {
    if (e) e.preventDefault();
    setErro('');
    setLoading(true);

    try {
      const res = await requestPasswordRecovery(email);
      if (res.sucesso) {
        setSucesso(res.mensagem);
        setStep(2);
        setTimeout(() => setSucesso(''), 3000);
      } else {
        setErro(res.mensagem || 'Erro ao solicitar código');
        triggerShake();
      }
    } catch {
      setErro('Erro no servidor');
      triggerShake();
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    if (e) e.preventDefault();
    setErro('');
    setLoading(true);

    try {
      const res = await verifyRecoveryCode(email, code);
      if (res.sucesso) {
        setSucesso(res.mensagem);
        setStep(3);
        setTimeout(() => setSucesso(''), 3000);
      } else {
        setErro(res.mensagem || 'Código inválido');
        triggerShake();
      }
    } catch {
      setErro('Erro no servidor');
      triggerShake();
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    if (e) e.preventDefault();
    setErro('');

    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem.');
      triggerShake();
      return;
    }

    setLoading(true);
    try {
      const res = await resetPassword(email, code, senha);
      if (res.sucesso) {
        setSucesso('Senha redefinida com sucesso! Redirecionando...');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setErro(res.mensagem || 'Erro ao redefinir senha');
        triggerShake();
      }
    } catch {
      setErro('Erro no servidor');
      triggerShake();
    } finally {
      setLoading(false);
    }
  };



  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
  };

  const shakeVariants = {
    shake: { x: [-10, 10, -10, 10, -5, 5, 0], transition: { duration: 0.4 } },
  };

  const title =
    step === 1 ? 'Esqueceu a senha?' : step === 2 ? 'Verificação de Código' : 'Nova Senha';
  const subtitle =
    step === 1
      ? 'Informe seu e-mail para receber um código de segurança.'
      : step === 2
        ? `Enviamos um código de 6 dígitos para ${email}`
        : 'Crie uma nova senha forte para sua conta.';

  return (
    <AuthLayout title={title} subtitle={subtitle}>
      <div style={{ width: '100%' }} key={step}>
        <form
          onSubmit={
            step === 1 ? handleRequestCode : step === 2 ? handleVerifyCode : handleResetPassword
          }
          onInvalid={(e) => {
            e.preventDefault();
            triggerShake();
          }}
        >
          {erro && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className={styles.errorAlert}
            >
              <span style={{ marginRight: '8px' }}>⚠️</span> {erro}
            </motion.div>
          )}
          {sucesso && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className={styles.successAlert}
              style={{
                background: 'rgba(0,255,0,0.1)',
                color: '#00cc00',
                padding: '1rem',
                borderRadius: '8px',
                marginBottom: '1.5rem',
                border: '1px solid rgba(0,255,0,0.2)',
              }}
            >
              <span style={{ marginRight: '8px' }}>✅</span> {sucesso}
            </motion.div>
          )}

          {step === 1 && (
            <motion.div variants={itemVariants} className={styles.inputGroup}>
              <div className={styles.labelRow}>
                <label className={styles.inputLabel}>E-mail Institucional</label>
              </div>
              <div className={styles.inputWrapper}>
                <input
                  className={styles.inputField}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu.nome@universidade.br"
                  required
                />
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div variants={itemVariants} className={styles.inputGroup}>
              <div className={styles.labelRow}>
                <label className={styles.inputLabel}>Código OTP</label>
                <button
                  type="button"
                  className={styles.forgotLink}
                  onClick={() => setStep(1)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                >
                  Alterar e-mail
                </button>
              </div>
              <div className={styles.inputWrapper}>
                <input
                  className={styles.inputField}
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="123456"
                  maxLength={6}
                  required
                />
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <>
              <motion.div variants={itemVariants} className={styles.inputGroup}>
                <div className={styles.labelRow}>
                  <label className={styles.inputLabel}>Nova Senha</label>
                </div>
                <div className={styles.inputWrapper}>
                  <input
                    className={styles.inputField}
                    type={showPassword ? 'text' : 'password'}
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    className={styles.passwordToggle}
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Mostrar senha"
                  >
                    {showPassword ? (
                      <svg
                        className={styles.eyeIcon}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                        <line x1="1" y1="1" x2="23" y2="23"></line>
                      </svg>
                    ) : (
                      <svg
                        className={styles.eyeIcon}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    )}
                  </button>
                </div>
              </motion.div>
              <motion.div variants={itemVariants} className={styles.inputGroup}>
                <div className={styles.labelRow}>
                  <label className={styles.inputLabel}>Confirmar Nova Senha</label>
                </div>
                <div className={styles.inputWrapper}>
                  <input
                    className={styles.inputField}
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmarSenha}
                    onChange={(e) => setConfirmarSenha(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    className={styles.passwordToggle}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label="Mostrar confirmação de senha"
                  >
                    {showConfirmPassword ? (
                      <svg
                        className={styles.eyeIcon}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                        <line x1="1" y1="1" x2="23" y2="23"></line>
                      </svg>
                    ) : (
                      <svg
                        className={styles.eyeIcon}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    )}
                  </button>
                </div>
              </motion.div>
            </>
          )}

          <motion.button
            variants={Object.assign({}, itemVariants, shakeVariants)}
            animate={isShaking ? 'shake' : 'visible'}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className={styles.submitBtn}
            disabled={loading}
          >
            {loading ? 'Processando...' : step === 3 ? 'Redefinir Senha' : 'Continuar'}{' '}
            <span>→</span>
          </motion.button>
        </form>

        <motion.p
          variants={itemVariants}
          style={{ textAlign: 'center', margin: '1.5rem 0 0 0', fontSize: '0.875rem' }}
        >
          Lembrou a senha?{' '}
          <Link to="/login" className={styles.forgotLink}>
            Voltar para o Login
          </Link>
        </motion.p>
      </div>
    </AuthLayout>
  );
}

export default Recovery;

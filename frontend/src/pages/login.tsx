import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import AuthLayout from '../components/AuthLayout';
import styles from './auth.module.css';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('session_expired') === 'true'
      ? 'Sua sessão expirou. Por favor, faça login novamente.'
      : '';
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { handleLogin } = useAuth();
  const [isShaking, setIsShaking] = useState(false);
  const [step, setStep] = useState<'credentials' | '2fa'>('credentials');
  const [totpCode, setTotpCode] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    try {
      if (step === 'credentials') {
        const resultado = await handleLogin(email, senha);
        if (resultado.sucesso === true) {
          if (resultado.dados?.mfaRequired) {
            setStep('2fa');
          } else {
            navigate('/dashboard');
          }
        } else {
          if (resultado.mensagem?.includes('Conta ainda não verificada')) {
            navigate(`/register?email=${encodeURIComponent(email)}&verify=true`);
          } else {
            setErro(resultado.mensagem);
          }
        }
      } else {
        const { verify2FaLogin } = await import('../services/api');
        const resultado = await verify2FaLogin(email, senha, totpCode);
        if (resultado.sucesso) {
          navigate('/dashboard');
          // Reload to update AuthContext if needed, or update it manually.
          window.location.reload();
        } else {
          setErro(resultado.mensagem);
        }
      }
    } catch (erro: any) {
      setErro(erro.message || 'Erro ao realizar login');
    }
  };

  return (
    <AuthLayout title="Bem-vindo de volta" subtitle="Entre com suas credenciais institucionais">
      <form
        onSubmit={handleSubmit}
        onInvalid={(e) => {
          e.preventDefault(); // Prevent default browser tooltip if we want custom shake, or let it stay
          setIsShaking(true);
          setTimeout(() => setIsShaking(false), 500);
        }}
      >
        {erro && (
          <div className={styles.errorAlert} role="alert">
            <span style={{ marginRight: '8px' }}>⚠️</span>
            {erro}
          </div>
        )}

        <div className={styles.inputGroup}>
          <div className={styles.labelRow}>
            <label className={styles.inputLabel} htmlFor="login-email">
              E-mail Institucional
            </label>
          </div>
          <div className={styles.inputWrapper}>
            <input
              className={styles.inputField}
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu.nome@universidade.br"
              aria-label="E-mail institucional"
              required
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <div className={styles.labelRow}>
            <label className={styles.inputLabel} htmlFor="login-password">
              Senha
            </label>
            <Link to="/recover-password" className={styles.forgotLink}>
              Recuperar senha
            </Link>
          </div>
          <div className={styles.inputWrapper}>
            <input
              className={styles.inputField}
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="••••••••"
              aria-label="Senha"
              required
            />
            <button
              type="button"
              className={styles.passwordToggle}
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
              aria-pressed={showPassword}
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
        </div>

        {step === '2fa' && (
          <div className={styles.inputGroup} style={{ marginTop: '1rem' }}>
            <div className={styles.labelRow}>
              <label className={styles.inputLabel} htmlFor="login-totp">
                Código 2FA (Authenticator)
              </label>
            </div>
            <div className={styles.inputWrapper}>
              <input
                className={styles.inputField}
                id="login-totp"
                type="text"
                value={totpCode}
                onChange={(e) => setTotpCode(e.target.value.replace(/\D/g, ''))}
                placeholder="000000"
                maxLength={6}
                aria-label="Código de autenticação em dois fatores"
                required
              />
            </div>
          </div>
        )}

        <button className={`${styles.submitBtn} ${isShaking ? styles.shake : ''}`} type="submit">
          {step === 'credentials' ? 'Continuar' : 'Verificar e Entrar'} <span>→</span>
        </button>
      </form>

      <p style={{ textAlign: 'center', margin: '1rem 0 0 0', fontSize: '0.875rem' }}>
        Não tem conta?{' '}
        <Link to="/register" className={styles.forgotLink}>
          Cadastre-se
        </Link>
      </p>
    </AuthLayout>
  );
}

export default Login;

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { motion } from 'framer-motion';
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    try {
      const resultado = await handleLogin(email, senha);
      if (resultado.sucesso === true) {
        navigate('/dashboard');
      } else {
        setErro(resultado.mensagem);
      }
    } catch (erro) {
      setErro(erro.message);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
  };

  const shakeVariants = {
    shake: { x: [-10, 10, -10, 10, -5, 5, 0], transition: { duration: 0.4 } },
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
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className={styles.errorAlert}
          >
            <span style={{ marginRight: '8px' }}>⚠️</span>
            {erro}
          </motion.div>
        )}

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
              aria-label="email"
              required
            />
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className={styles.inputGroup}>
          <div className={styles.labelRow}>
            <label className={styles.inputLabel}>Senha</label>
            <Link to="/recover-password" className={styles.forgotLink}>
              Recuperar senha
            </Link>
          </div>
          <div className={styles.inputWrapper}>
            <input
              className={styles.inputField}
              type={showPassword ? 'text' : 'password'}
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="••••••••"
              aria-label="senha"
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

        <motion.button
          variants={Object.assign({}, itemVariants, shakeVariants)}
          animate={isShaking ? 'shake' : 'visible'}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={styles.submitBtn}
          type="submit"
        >
          Entrar <span>→</span>
        </motion.button>
      </form>

      <motion.p
        variants={itemVariants}
        style={{ textAlign: 'center', margin: '1rem 0 0 0', fontSize: '0.875rem' }}
      >
        Não tem conta?{' '}
        <Link to="/register" className={styles.forgotLink}>
          Cadastre-se
        </Link>
      </motion.p>
    </AuthLayout>
  );
}

export default Login;

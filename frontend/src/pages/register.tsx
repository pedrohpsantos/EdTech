import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register, verifyRegistration } from '../services/api';
import { motion } from 'framer-motion';
import AuthLayout from '../components/AuthLayout';
import styles from './auth.module.css';

function Register() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [role, setRole] = useState('RESEARCHER');
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    if (e) e.preventDefault();
    setErro('');
    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem. Por favor tente novamente');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }
    try {
      const resultado = await register(nome, email, senha, role);
      if (resultado.sucesso === true) {
        setStep(2);
      } else {
        setErro(resultado.mensagem);
      }
    } catch (erro) {
      setErro(erro.message);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    if (e) e.preventDefault();
    setErro('');
    if (otp.length < 6) {
      setErro('Por favor, insira o código de 6 dígitos.');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }
    try {
      const resultado = await verifyRegistration(email, otp);
      if (resultado.sucesso === true) {
        navigate('/login');
      } else {
        setErro(resultado.mensagem);
      }
    } catch (erro) {
      setErro(erro.message);
    }
  };


  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
  };

  const shakeVariants = {
    shake: { x: [-10, 10, -10, 10, -5, 5, 0], transition: { duration: 0.4 } },
  };

  return (
    <AuthLayout
      title="Crie sua conta"
      subtitle="Junte-se à principal plataforma de governança acadêmica."
    >
      <form
        onSubmit={step === 1 ? handleSubmit : handleVerify}
        onInvalid={(e) => {
          e.preventDefault();
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

        {step === 1 ? (
          <>
            <motion.div variants={itemVariants} className={styles.inputGroup}>
              <div className={styles.labelRow}>
                <label className={styles.inputLabel}>Perfil de Usuário</label>
              </div>
              <div className={styles.inputWrapper}>
                <select
                  className={styles.inputField}
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  aria-label="perfil"
                  required
                >
                  <option value="RESEARCHER">Pesquisador</option>
                  <option value="ADVISOR">Orientador</option>
                  <option value="AUDITOR">Auditor</option>
                </select>
              </div>
            </motion.div>

        <motion.div variants={itemVariants} className={styles.inputGroup}>
          <div className={styles.labelRow}>
            <label className={styles.inputLabel}>Nome Completo</label>
          </div>
          <div className={styles.inputWrapper}>
            <input
              className={styles.inputField}
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="ex: Chiquinha Silva"
              aria-label="nome"
              required
            />
          </div>
        </motion.div>

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

        <div className={styles.rowInputs}>
          <motion.div variants={itemVariants} className={styles.inputGroup}>
            <div className={styles.labelRow}>
              <label className={styles.inputLabel}>Senha</label>
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

          <motion.div variants={itemVariants} className={styles.inputGroup}>
            <div className={styles.labelRow}>
              <label className={styles.inputLabel}>Confirmar Senha</label>
            </div>
            <div className={styles.inputWrapper}>
              <input
                className={styles.inputField}
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                placeholder="••••••••"
                aria-label="confirmar senha"
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
        </div>

        <motion.p
          variants={itemVariants}
          style={{
            fontSize: '0.7rem',
            color: 'var(--text)',
            marginTop: '-0.5rem',
            marginBottom: '1rem',
          }}
        >
          Sua senha deve ter de 8-10 caracteres, contendo pelo menos um carácter especial, letra
          maiúscula e número.
        </motion.p>

        <motion.button
          variants={Object.assign({}, itemVariants, shakeVariants)}
          animate={isShaking ? 'shake' : 'visible'}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className={styles.submitBtn}
        >
          Avançar <span>→</span>
        </motion.button>
          </>
        ) : (
          <>
            <motion.div variants={itemVariants} className={styles.inputGroup}>
              <div className={styles.labelRow}>
                <label className={styles.inputLabel}>Código de Verificação</label>
              </div>
              <motion.p
                style={{
                  fontSize: '0.85rem',
                  color: 'var(--text)',
                  marginBottom: '1rem',
                }}
              >
                Enviamos um código de 6 dígitos para <strong>{email}</strong>.
              </motion.p>
              <div className={styles.inputWrapper}>
                <input
                  className={styles.inputField}
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Ex: 123456"
                  aria-label="código de verificação"
                  maxLength={6}
                  required
                />
              </div>
            </motion.div>

            <motion.button
              variants={Object.assign({}, itemVariants, shakeVariants)}
              animate={isShaking ? 'shake' : 'visible'}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className={styles.submitBtn}
            >
              Verificar Conta <span>→</span>
            </motion.button>
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => setStep(1)}
              className={styles.submitBtn}
              style={{
                marginTop: '1rem',
                backgroundColor: 'transparent',
                border: '1px solid var(--border)',
                color: 'var(--text)'
              }}
            >
              Voltar
            </motion.button>
          </>
        )}
      </form>

      <motion.p
        variants={itemVariants}
        style={{ textAlign: 'center', margin: '1.5rem 0 0 0', fontSize: '0.875rem' }}
      >
        Já tem uma conta?{' '}
        <Link to="/login" className={styles.forgotLink}>
          Faça login
        </Link>
      </motion.p>
    </AuthLayout>
  );
}

export default Register;

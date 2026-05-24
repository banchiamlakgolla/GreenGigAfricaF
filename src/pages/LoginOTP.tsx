import { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
<<<<<<< HEAD
import { RecaptchaVerifier, signInWithPhoneNumber, type ConfirmationResult } from 'firebase/auth';
import { auth } from '../firebase';
import { api } from '../api';
=======
>>>>>>> origin/main
import AuthLayout from '../components/AuthLayout';
import styles from './LoginOTP.module.css';

const OTP_LENGTH = 6;
const RESEND_COOLDOWN = 30;

export default function LoginOTP() {
  const navigate = useNavigate();
  const location = useLocation();
  const phone: string = location.state?.phone ?? '';
<<<<<<< HEAD
  const fullPhone: string = location.state?.fullPhone ?? '';
  const devOtpInitial: string = location.state?.devOtp ?? '';
=======
>>>>>>> origin/main
  const backPath = location.pathname.includes('signin') ? '/signin' : '/login';

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [hasError, setHasError] = useState(false);
<<<<<<< HEAD
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(RESEND_COOLDOWN);
  const [devOtp, setDevOtp] = useState<string>(devOtpInitial);
  const [confirmation, setConfirmation] = useState<ConfirmationResult | null>(
    location.state?.confirmation ?? null,
  );
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const isFilled = otp.every(d => d !== '');

  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  function focusBox(index: number) { inputRefs.current[index]?.focus(); }

  function fillDevOtp() {
    setOtp(devOtp.split(''));
    focusBox(OTP_LENGTH - 1);
=======
  const [countdown, setCountdown] = useState(RESEND_COOLDOWN);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const isFilled = otp.every((d) => d !== '');

  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  function focusBox(index: number) {
    inputRefs.current[index]?.focus();
>>>>>>> origin/main
  }

  function handleChange(index: number, e: React.ChangeEvent<HTMLInputElement>) {
    const digit = e.target.value.replace(/\D/g, '').slice(-1);
    const next = [...otp];
    next[index] = digit;
    setOtp(next);
    setHasError(false);
<<<<<<< HEAD
    setErrorMsg('');
=======
>>>>>>> origin/main
    if (digit && index < OTP_LENGTH - 1) focusBox(index + 1);
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
<<<<<<< HEAD
    if (e.key === 'Backspace' && !otp[index] && index > 0) focusBox(index - 1);
=======
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      focusBox(index - 1);
    }
>>>>>>> origin/main
  }

  function handlePaste(e: React.ClipboardEvent) {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
    if (!pasted) return;
    e.preventDefault();
    const next = [...otp];
<<<<<<< HEAD
    for (let i = 0; i < OTP_LENGTH; i++) next[i] = pasted[i] ?? '';
=======
    for (let i = 0; i < OTP_LENGTH; i++) {
      next[i] = pasted[i] ?? '';
    }
>>>>>>> origin/main
    setOtp(next);
    focusBox(Math.min(pasted.length, OTP_LENGTH - 1));
  }

<<<<<<< HEAD
  async function handleVerify(e: React.SyntheticEvent) {
    e.preventDefault();
    if (!isFilled || loading) return;

    setLoading(true);
    setHasError(false);
    setErrorMsg('');

    try {
      const code = otp.join('');

      if (confirmation) {
        // Firebase path
        const result = await confirmation.confirm(code);
        const idToken = await result.user.getIdToken();
        const data = await api.firebaseLogin(idToken);
        localStorage.setItem('gg_access', data.tokens.access);
        localStorage.setItem('gg_refresh', data.tokens.refresh);
        if (data.profile_complete) {
          navigate('/find-tasks');
        } else {
          navigate('/onboarding/path', { state: { phone } });
        }
      } else {
        // Dev fallback
        const data = await api.verifyOTP(fullPhone, code);
        localStorage.setItem('gg_access', data.tokens.access);
        localStorage.setItem('gg_refresh', data.tokens.refresh);
        navigate('/find-tasks');
      }
    } catch {
      setHasError(true);
      setErrorMsg('Incorrect code. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    if (countdown > 0) return;
    setOtp(Array(OTP_LENGTH).fill(''));
    setHasError(false);
    setErrorMsg('');
    setCountdown(RESEND_COOLDOWN);
    setTimeout(() => focusBox(0), 0);

    try {
      if (confirmation && fullPhone) {
        const recaptcha = new RecaptchaVerifier(auth, 'recaptcha-resend-login', { size: 'invisible' });
        const result = await signInWithPhoneNumber(auth, fullPhone, recaptcha);
        setConfirmation(result);
      } else {
        const res = await api.requestOTP(fullPhone);
        setDevOtp(res.dev_otp || '');
      }
    } catch {
      // silently ignore
    }
  }

  const formattedPhone = phone?.replace(/(\d{3})(\d{3})(\d{3,4})/, '$1 $2 $3') || '';
=======
  function handleVerify(e: React.SyntheticEvent) {
    e.preventDefault();
    if (!isFilled) return;
    navigate('/find-tasks');
  }

  function handleResend() {
    if (countdown > 0) return;
    setOtp(Array(OTP_LENGTH).fill(''));
    setHasError(false);
    setCountdown(RESEND_COOLDOWN);
    setTimeout(() => focusBox(0), 0);
  }

  const formattedPhone = phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
>>>>>>> origin/main

  return (
    <AuthLayout>
      <div className={styles.backRow}>
        <button className={styles.back} onClick={() => navigate(backPath)} type="button">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M15 9H3M8 4L3 9L8 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>
      </div>
      <div className={styles.body}>
        <h2 className={styles.heading}>Enter your code</h2>
<<<<<<< HEAD
        <p className={styles.sub}>Code sent to +{formattedPhone}</p>

        {devOtp && (
          <div style={{ background: '#fefce8', border: '1px solid #fde68a', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13 }}>
            <strong style={{ color: '#92400e' }}>🧪 Dev mode</strong>
            <span style={{ color: '#78350f' }}> — Your code is: </span>
            <button type="button" onClick={fillDevOtp}
              style={{ fontWeight: 900, fontSize: 16, letterSpacing: 3, color: '#451a03', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
              {devOtp}
            </button>
            <span style={{ color: '#92400e', fontSize: 11, marginLeft: 6 }}>(click to fill)</span>
          </div>
        )}

        <form onSubmit={handleVerify} noValidate>
          <div className={styles.boxes} onPaste={handlePaste}>
            {otp.map((digit, i) => (
              <input key={i} ref={(el) => { inputRefs.current[i] = el; }}
                type="text" inputMode="numeric" maxLength={1} value={digit}
                onChange={(e) => handleChange(i, e)} onKeyDown={(e) => handleKeyDown(i, e)}
                className={[styles.box, hasError ? styles.boxError : digit ? styles.boxFilled : ''].filter(Boolean).join(' ')}
                aria-label={`Digit ${i + 1}`} />
            ))}
          </div>
          {hasError && <p className={styles.errorText}>{errorMsg}</p>}
          <div className={styles.resendRow}>
            {countdown > 0
              ? <span className={styles.resendCooldown}>Resend OTP in {countdown}s</span>
              : <button type="button" className={styles.resendBtn} onClick={handleResend}>Resend OTP</button>
            }
          </div>
          <div id="recaptcha-resend-login" />
          <button type="submit" disabled={loading}
            className={`${styles.btn} ${isFilled && !loading ? styles.btnActive : styles.btnMuted}`}>
            {loading ? 'Verifying…' : 'Verify'}
=======
        <p className={styles.sub}>Code sent to +234 {formattedPhone}</p>
        <form onSubmit={handleVerify} noValidate>
          <div className={styles.boxes} onPaste={handlePaste}>
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => {
                  inputRefs.current[i] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className={[
                  styles.box,
                  hasError ? styles.boxError : digit ? styles.boxFilled : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                aria-label={`Digit ${i + 1}`}
              />
            ))}
          </div>
          {hasError && (
            <p className={styles.errorText}>Incorrect code. Please try again.</p>
          )}
          <div className={styles.resendRow}>
            {countdown > 0 ? (
              <span className={styles.resendCooldown}>Resend OTP in {countdown}s</span>
            ) : (
              <button type="button" className={styles.resendBtn} onClick={handleResend}>
                Resend OTP
              </button>
            )}
          </div>
          <button
            type="submit"
            className={`${styles.btn} ${isFilled ? styles.btnActive : styles.btnMuted}`}
          >
            Verify
>>>>>>> origin/main
          </button>
        </form>
      </div>
    </AuthLayout>
  );
}

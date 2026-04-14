'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import styles from '../login/page.module.css';

export default function SignupPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors(prev => ({ ...prev, [e.target.name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = 'Full name is required';
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Valid email is required';
    if (!form.password || form.password.length < 6) errs.password = 'Password must be at least 6 characters';
    if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match';
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      router.push('/');
    } catch (err) {
      setErrors({ general: err.message || 'Registration failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logo}>
          <span className={styles.logoText}>amazon</span>
          <span className={styles.logoIn}>.in</span>
        </div>

        <h1 className={styles.title}>Create account</h1>

        {errors.general && <div className="alert alert-error">{errors.general}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="name">Your name</label>
            <input id="name" name="name" type="text" className="form-control" value={form.name}
              onChange={handleChange} placeholder="First and last name" autoComplete="name" />
            {errors.name && <p className="form-error">{errors.name}</p>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="email">Email address</label>
            <input id="email" name="email" type="email" className="form-control" value={form.email}
              onChange={handleChange} placeholder="Enter your email" autoComplete="email" />
            {errors.email && <p className="form-error">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <input id="password" name="password" type="password" className="form-control" value={form.password}
              onChange={handleChange} placeholder="At least 6 characters" autoComplete="new-password" />
            {errors.password && <p className="form-error">{errors.password}</p>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="confirmPassword">Re-enter password</label>
            <input id="confirmPassword" name="confirmPassword" type="password" className="form-control"
              value={form.confirmPassword} onChange={handleChange} placeholder="Repeat your password"
              autoComplete="new-password" />
            {errors.confirmPassword && <p className="form-error">{errors.confirmPassword}</p>}
          </div>

          <button id="signup-submit" type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? 'Creating account...' : 'Create your Amazon account'}
          </button>
        </form>

        <p className={styles.terms}>
          By creating an account, you agree to Amazon's{' '}
          <a href="#">Conditions of Use</a> and <a href="#">Privacy Notice</a>.
        </p>
      </div>

      <div className={styles.signInRow}>
        Already have an account?{' '}
        <Link href="/login" className={styles.signInLink}>Sign in</Link>
      </div>
    </div>
  );
}

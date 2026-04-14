import { SignIn } from '@clerk/nextjs';
import styles from './page.module.css';

export const metadata = { title: 'Sign In' };

export default function LoginPage() {
  return (
    <div className={styles.container} style={{display: 'flex', justifyContent: 'center', padding: '40px 0'}}>
      <SignIn routing='hash' />
    </div>
  );
}

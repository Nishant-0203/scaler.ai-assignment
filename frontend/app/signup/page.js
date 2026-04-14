import { SignUp } from '@clerk/nextjs';
import styles from '../login/page.module.css';

export const metadata = { title: 'Sign Up' };

export default function SignupPage() {
  return (
    <div className={styles.container} style={{display: 'flex', justifyContent: 'center', padding: '40px 0'}}>
      <SignUp routing='hash' />
    </div>
  );
}

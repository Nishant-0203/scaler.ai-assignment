import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Back to top */}
      <div className={styles.backToTop} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        Back to top
      </div>

      {/* Main Footer Links */}
      <div className={styles.footerMain}>
        <div className={styles.footerGrid}>
          <div className={styles.footerCol}>
            <h4 className={styles.colTitle}>Get to Know Us</h4>
            <Link href="#" className={styles.footerLink}>About Amazon</Link>
            <Link href="#" className={styles.footerLink}>Careers</Link>
            <Link href="#" className={styles.footerLink}>Press Releases</Link>
            <Link href="#" className={styles.footerLink}>Amazon Cares</Link>
            <Link href="#" className={styles.footerLink}>Gift a Smile</Link>
          </div>
          <div className={styles.footerCol}>
            <h4 className={styles.colTitle}>Connect with Us</h4>
            <Link href="#" className={styles.footerLink}>Facebook</Link>
            <Link href="#" className={styles.footerLink}>Twitter</Link>
            <Link href="#" className={styles.footerLink}>Instagram</Link>
          </div>
          <div className={styles.footerCol}>
            <h4 className={styles.colTitle}>Make Money with Us</h4>
            <Link href="#" className={styles.footerLink}>Sell on Amazon</Link>
            <Link href="#" className={styles.footerLink}>Amazon Associates</Link>
            <Link href="#" className={styles.footerLink}>Fulfillment by Amazon</Link>
            <Link href="#" className={styles.footerLink}>Advertise Your Products</Link>
          </div>
          <div className={styles.footerCol}>
            <h4 className={styles.colTitle}>Let Us Help You</h4>
            <Link href="#" className={styles.footerLink}>COVID-19 and Amazon</Link>
            <Link href="/orders" className={styles.footerLink}>Your Account</Link>
            <Link href="/orders" className={styles.footerLink}>Returns Centre</Link>
            <Link href="#" className={styles.footerLink}>100% Purchase Protection</Link>
            <Link href="#" className={styles.footerLink}>Amazon App Download</Link>
            <Link href="#" className={styles.footerLink}>Help</Link>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className={styles.footerBottom}>
        <div className={styles.footerLogo}>
          <span className={styles.logoText}>amazon</span>
          <span className={styles.logoIn}>.in</span>
        </div>
        <div className={styles.footerLinks}>
          <Link href="#" className={styles.bottomLink}>Conditions of Use & Sale</Link>
          <Link href="#" className={styles.bottomLink}>Privacy Notice</Link>
          <Link href="#" className={styles.bottomLink}>Interest-Based Ads</Link>
        </div>
        <p className={styles.copyright}>© 1996-2024, Amazon.com, Inc. or its affiliates</p>
      </div>
    </footer>
  );
}

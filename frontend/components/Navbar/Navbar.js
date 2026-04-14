'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import styles from './Navbar.module.css';

const categories = [
  'Electronics', 'Books', 'Clothing', 'Home & Kitchen', 'Sports', 'Beauty'
];

export default function Navbar() {
  const [search, setSearch] = useState('');
  const [accountOpen, setAccountOpen] = useState(false);
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const router = useRouter();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setAccountOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/products?search=${encodeURIComponent(search.trim())}`);
    } else {
      router.push('/products');
    }
  };

  const handleLogout = () => {
    logout();
    setAccountOpen(false);
    router.push('/');
  };

  return (
    <header className={styles.header}>
      {/* Top Nav */}
      <nav className={styles.topNav}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <span className={styles.logoText}>amazon</span>
          <span className={styles.logoIn}>.in</span>
        </Link>

        {/* Deliver to */}
        <div className={styles.deliverTo}>
          <span className={styles.deliverIcon}>📍</span>
          <div>
            <div className={styles.deliverLabel}>Deliver to</div>
            <div className={styles.deliverLocation}>India</div>
          </div>
        </div>

        {/* Search Bar */}
        <form className={styles.searchForm} onSubmit={handleSearch}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search Amazon.in"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            id="main-search"
          />
          <button type="submit" className={styles.searchBtn} aria-label="Search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
          </button>
        </form>

        {/* Right Icons */}
        <div className={styles.navRight}>
          {/* Language */}
          <div className={styles.navItem}>
            <span className={styles.flag}>🇮🇳</span>
            <span className={styles.navLabel}>EN</span>
          </div>

          {/* Account */}
          <div className={styles.navItem} ref={dropdownRef} style={{ position: 'relative' }}>
            <div
              className={styles.accountBtn}
              onClick={() => setAccountOpen(!accountOpen)}
            >
              <div className={styles.navLabel}>
                Hello, {user ? user.name.split(' ')[0] : 'Sign in'}
              </div>
              <div className={styles.navBold}>
                Account & Lists <span className={styles.caret}>▾</span>
              </div>
            </div>
            {accountOpen && (
              <div className={styles.dropdown}>
                {user ? (
                  <>
                    <div className={styles.dropdownUser}>Welcome, {user.name}!</div>
                    <Link href="/orders" className={styles.dropdownItem} onClick={() => setAccountOpen(false)}>
                      Your Orders
                    </Link>
                    <button className={styles.dropdownItem} onClick={handleLogout}>
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className={styles.dropdownSignIn} onClick={() => setAccountOpen(false)}>
                      Sign in
                    </Link>
                    <p className={styles.dropdownNew}>
                      New customer?{' '}
                      <Link href="/signup" onClick={() => setAccountOpen(false)}>Start here</Link>
                    </p>
                    <hr className={styles.dropdownDivider}/>
                    <Link href="/orders" className={styles.dropdownItem} onClick={() => setAccountOpen(false)}>
                      Your Orders
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Orders */}
          <Link href="/orders" className={styles.navItem}>
            <div className={styles.navLabel}>Returns</div>
            <div className={styles.navBold}>& Orders</div>
          </Link>

          {/* Cart */}
          <Link href="/cart" className={styles.cartBtn}>
            <div className={styles.cartIcon}>
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
                <line x1="3" x2="21" y1="6" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              <span className={styles.cartCount}>{cartCount}</span>
            </div>
            <span className={styles.navBold}>Cart</span>
          </Link>
        </div>
      </nav>

      {/* Sub Nav */}
      <nav className={styles.subNav}>
        <div className={styles.subNavContent}>
          <Link href="/products" className={styles.subNavItem}>
            ☰ All
          </Link>
          {categories.map(cat => (
            <Link
              key={cat}
              href={`/products?category=${cat.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
              className={styles.subNavItem}
            >
              {cat}
            </Link>
          ))}
          <span className={styles.subNavItem}>Today's Deals</span>
          <span className={styles.subNavItem}>Customer Service</span>
        </div>
      </nav>
    </header>
  );
}

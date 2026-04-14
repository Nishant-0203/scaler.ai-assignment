'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { productAPI, categoryAPI } from '@/lib/api';
import ProductCard from '@/components/ProductCard/ProductCard';
import styles from './page.module.css';

const heroSlides = [
  {
    id: 1,
    title: 'Great Indian Festival',
    subtitle: 'Up to 75% off on Electronics',
    cta: 'Shop Now',
    link: '/products?category=electronics',
    bg: 'linear-gradient(135deg, #131921 0%, #232F3E 50%, #37475A 100%)',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&q=80',
    accent: '#FF9900',
  },
  {
    id: 2,
    title: 'Bestselling Books',
    subtitle: 'Discover your next great read',
    cta: 'Explore Books',
    link: '/products?category=books',
    bg: 'linear-gradient(135deg, #1a0533 0%, #4B0082 50%, #6A0DAD 100%)',
    image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&q=80',
    accent: '#FFD814',
  },
  {
    id: 3,
    title: 'Fashion Forward',
    subtitle: 'New arrivals in Clothing & Accessories',
    cta: 'Shop Fashion',
    link: '/products?category=clothing',
    bg: 'linear-gradient(135deg, #003d26 0%, #006241 50%, #00a067 100%)',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80',
    accent: '#7dffb3',
  },
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cats, prods] = await Promise.all([
          categoryAPI.getAll(),
          productAPI.getAll({ featured: 'true', limit: 8 })
        ]);
        setCategories(cats);
        setFeaturedProducts(prods.products);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const goToSlide = (i) => {
    setCurrentSlide(i);
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 5000);
  };

  const slide = heroSlides[currentSlide];

  return (
    <div className={styles.page}>
      {/* Hero Banner */}
      <section className={styles.hero} style={{ background: slide.bg }}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <span className={styles.heroTag} style={{ color: slide.accent }}>Amazon Sale</span>
            <h1 className={styles.heroTitle}>{slide.title}</h1>
            <p className={styles.heroSubtitle}>{slide.subtitle}</p>
            <Link href={slide.link} className={styles.heroCta} style={{ background: slide.accent }}>
              {slide.cta} →
            </Link>
          </div>
          <div className={styles.heroImage}>
            <img src={slide.image} alt={slide.title} />
          </div>
        </div>
        {/* Slide indicators */}
        <div className={styles.heroDots}>
          {heroSlides.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === currentSlide ? styles.dotActive : ''}`}
              onClick={() => goToSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
        {/* Arrows */}
        <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={() => goToSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length)}>‹</button>
        <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={() => goToSlide((currentSlide + 1) % heroSlides.length)}>›</button>
      </section>

      <div className={styles.mainContent}>
        {/* Shop by Category */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Shop by Category</h2>
            <Link href="/products" className={styles.seeAll}>See all categories</Link>
          </div>
          <div className={styles.categoryGrid}>
            {categories.map(cat => (
              <Link key={cat.id} href={`/products?category=${cat.slug}`} className={styles.categoryCard}>
                <div className={styles.categoryImageWrapper}>
                  <img src={cat.imageUrl} alt={cat.name} className={styles.categoryImage} />
                </div>
                <div className={styles.categoryName}>{cat.name}</div>
                <div className={styles.categoryCount}>{cat._count?.products} items</div>
              </Link>
            ))}
          </div>
        </section>

        {/* Deal of the Day Banner */}
        <section className={styles.dealBanner}>
          <div className={styles.dealLeft}>
            <span className={styles.dealTag}>⚡ Deal of the Day</span>
            <h2 className={styles.dealTitle}>Up to 60% off on Top Electronics</h2>
            <p className={styles.dealSubtitle}>Limited time offer. While stocks last.</p>
            <Link href="/products?category=electronics&sort=price_asc" className="btn btn-primary">
              Shop Deals
            </Link>
          </div>
          <div className={styles.dealImages}>
            <img src="https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=300&q=80" alt="Deal" className={styles.dealImg} />
            <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80" alt="Deal 2" className={styles.dealImg} />
          </div>
        </section>

        {/* Featured Products */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Best Sellers</h2>
            <Link href="/products?sort=rating" className={styles.seeAll}>See all →</Link>
          </div>
          {loading ? (
            <div className="loading-overlay"><div className="spinner" /></div>
          ) : (
            <div className={styles.productGrid}>
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>

        {/* Feature Strips */}
        <section className={styles.featureStrip}>
          {[
            { icon: '🚚', title: 'Free Delivery', desc: 'On orders over ₹499' },
            { icon: '↩️', title: 'Easy Returns', desc: '30-day hassle-free returns' },
            { icon: '🔒', title: '100% Secure', desc: 'Safe & encrypted payments' },
            { icon: '🎧', title: '24/7 Support', desc: 'Always here to help' },
          ].map(f => (
            <div key={f.title} className={styles.featureItem}>
              <span className={styles.featureIcon}>{f.icon}</span>
              <div>
                <div className={styles.featureTitle}>{f.title}</div>
                <div className={styles.featureDesc}>{f.desc}</div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

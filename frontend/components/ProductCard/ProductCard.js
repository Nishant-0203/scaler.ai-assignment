'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import StarRating from '@/components/StarRating/StarRating';
import styles from './ProductCard.module.css';

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(price);
};

const getDiscount = (price, comparePrice) => {
  if (!comparePrice || comparePrice <= price) return null;
  return Math.round(((comparePrice - price) / comparePrice) * 100);
};

export default function ProductCard({ product }) {
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  const primaryImage = product.images?.[0];
  const discount = getDiscount(product.price, product.comparePrice);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setAdding(true);
    const success = await addToCart(product.id, 1);
    setAdding(false);
    if (success) {
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  return (
    <Link href={`/products/${product.id}`} className={styles.cardLink}>
      <div className={styles.card}>
        {/* Image */}
        <div className={styles.imageWrapper}>
          {primaryImage ? (
            <Image
              src={primaryImage.url}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={styles.image}
              loading="lazy"
            />
          ) : (
            <div className={styles.imagePlaceholder}>📦</div>
          )}
          {discount && <span className={styles.discountBadge}>-{discount}%</span>}
          {product.isFeatured && <span className={styles.featuredBadge}>Best Seller</span>}
        </div>

        {/* Info */}
        <div className={styles.info}>
          <p className={styles.name}>{product.name}</p>
          <p className={styles.brand}>{product.brand}</p>

          <StarRating rating={parseFloat(product.rating)} reviewCount={product.reviewCount} />

          <div className={styles.priceRow}>
            <span className={styles.priceSymbol}>₹</span>
            <span className={styles.price}>{formatPrice(product.price)}</span>
            {product.comparePrice && (
              <span className={styles.comparePrice}>₹{formatPrice(product.comparePrice)}</span>
            )}
          </div>

          {discount && (
            <p className={styles.savings}>Save {discount}%</p>
          )}

          <p className={styles.delivery}>FREE Delivery by <strong>Tomorrow</strong></p>

          <button
            className={`${styles.addBtn} ${added ? styles.addedBtn : ''}`}
            onClick={handleAddToCart}
            disabled={adding || added || product.stock === 0}
            id={`add-to-cart-${product.id}`}
          >
            {product.stock === 0
              ? 'Out of Stock'
              : adding
              ? 'Adding...'
              : added
              ? '✓ Added to Cart'
              : 'Add to Cart'}
          </button>
        </div>
      </div>
    </Link>
  );
}

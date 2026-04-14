'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { productAPI } from '@/lib/api';
import { useCart } from '@/context/CartContext';
import StarRating from '@/components/StarRating/StarRating';
import styles from './page.module.css';

const formatPrice = (price) =>
  new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(price);

const getDiscount = (price, comparePrice) => {
  if (!comparePrice || comparePrice <= price) return null;
  return Math.round(((comparePrice - price) / comparePrice) * 100);
};

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    productAPI.getById(id)
      .then(data => { setProduct(data); setLoading(false); })
      .catch(err => { setError(err.message); setLoading(false); });
  }, [id]);

  const handleAddToCart = async () => {
    setAdding(true);
    const success = await addToCart(product.id, quantity);
    setAdding(false);
    if (success) {
      setAdded(true);
      setTimeout(() => setAdded(false), 3000);
    }
  };

  const handleBuyNow = async () => {
    setAdding(true);
    await addToCart(product.id, quantity);
    setAdding(false);
    router.push('/cart');
  };

  if (loading) return <div className="loading-overlay"><div className="spinner"/></div>;
  if (error || !product) return (
    <div className={styles.errorPage}>
      <h2>Product not found</h2>
      <Link href="/products" className="btn btn-primary">Back to Products</Link>
    </div>
  );

  const discount = getDiscount(product.price, product.comparePrice);
  const images = product.images?.length ? product.images : [{ url: '', isPrimary: true }];

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <span>›</span>
          <Link href="/products">Products</Link>
          <span>›</span>
          <Link href={`/products?category=${product.category?.slug}`}>{product.category?.name}</Link>
          <span>›</span>
          <span className={styles.breadcrumbCurrent}>{product.name}</span>
        </nav>

        <div className={styles.layout}>
          {/* Image Carousel */}
          <div className={styles.imageSection}>
            {/* Thumbnails */}
            <div className={styles.thumbnails}>
              {images.map((img, i) => (
                <button
                  key={i}
                  className={`${styles.thumbnail} ${i === selectedImage ? styles.thumbnailActive : ''}`}
                  onClick={() => setSelectedImage(i)}
                >
                  <img src={img.url} alt={`${product.name} ${i + 1}`} />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className={styles.mainImageWrapper}>
              <img
                src={images[selectedImage]?.url}
                alt={product.name}
                className={styles.mainImage}
              />
              {discount && <div className={styles.discountLabel}>-{discount}%</div>}
            </div>
          </div>

          {/* Product Info */}
          <div className={styles.infoSection}>
            <span className={styles.brand}>{product.brand}</span>
            <h1 className={styles.productName}>{product.name}</h1>

            <div className={styles.ratingRow}>
              <StarRating rating={parseFloat(product.rating)} reviewCount={product.reviewCount} size="md" />
            </div>

            <div className={styles.divider} />

            {/* Price */}
            <div className={styles.priceSection}>
              <div className={styles.dealLabel}>Deal of the Day</div>
              <div className={styles.priceRow}>
                <span className={styles.priceSymbol}>-{discount || 0}%</span>
                <div>
                  <div className={styles.currentPrice}>
                    <span className={styles.psmall}>₹</span>
                    {formatPrice(product.price)}
                  </div>
                  {product.comparePrice && (
                    <div className={styles.mrp}>
                      M.R.P.: <span className={styles.crossed}>₹{formatPrice(product.comparePrice)}</span>
                    </div>
                  )}
                  {discount && (
                    <div className={styles.savings}>
                      You save: ₹{formatPrice(product.comparePrice - product.price)} ({discount}%)
                    </div>
                  )}
                </div>
              </div>
              <p className={styles.taxNote}>Inclusive of all taxes</p>
            </div>

            {/* Features from description */}
            <div className={styles.description}>
              <h3 className={styles.descTitle}>About this item</h3>
              <p className={styles.descText}>{product.description}</p>
            </div>

            <div className={styles.divider} />

            {/* Specifications */}
            {product.specifications?.length > 0 && (
              <div className={styles.specs}>
                <h3 className={styles.specsTitle}>Technical Details</h3>
                <table className={styles.specsTable}>
                  <tbody>
                    {product.specifications.map(spec => (
                      <tr key={spec.id}>
                        <td className={styles.specKey}>{spec.key}</td>
                        <td className={styles.specValue}>{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Buy Box */}
          <div className={styles.buyBox}>
            <div className={styles.buyBoxPrice}>
              <span className={styles.buyPriceSmall}>₹</span>
              <span className={styles.buyPrice}>{formatPrice(product.price)}</span>
            </div>

            {product.comparePrice && (
              <p className={styles.buyMrp}>
                M.R.P.: <span className={styles.buyCrossed}>₹{formatPrice(product.comparePrice)}</span>
              </p>
            )}

            <p className={styles.freeDelivery}>
              <strong>FREE Delivery</strong> by <strong>Tomorrow</strong>
            </p>

            <div className={styles.stockStatus}>
              {product.stock > 0 ? (
                <span className={styles.inStock}>In stock</span>
              ) : (
                <span className={styles.outOfStock}>Currently unavailable</span>
              )}
            </div>

            {product.stock > 0 && (
              <div className={styles.quantityRow}>
                <label className={styles.qtyLabel}>Qty:</label>
                <select
                  className={styles.qtySelect}
                  value={quantity}
                  onChange={e => setQuantity(parseInt(e.target.value))}
                  id="quantity-select"
                >
                  {Array.from({ length: Math.min(product.stock, 10) }, (_, i) => i + 1).map(n => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
            )}

            <button
              id="add-to-cart-btn"
              className={`${styles.addToCartBtn} ${added ? styles.addedBtn : ''}`}
              onClick={handleAddToCart}
              disabled={adding || product.stock === 0}
            >
              {adding ? 'Adding...' : added ? '✓ Added to Cart' : 'Add to Cart'}
            </button>

            <button
              id="buy-now-btn"
              className={styles.buyNowBtn}
              onClick={handleBuyNow}
              disabled={adding || product.stock === 0}
            >
              Buy Now
            </button>

            <div className={styles.secureNote}>
              🔒 Secure transaction
            </div>

            <div className={styles.soldBy}>
              <span>Ships from</span> <strong>Amazon.in</strong>
              <br />
              <span>Sold by</span> <strong>{product.brand}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

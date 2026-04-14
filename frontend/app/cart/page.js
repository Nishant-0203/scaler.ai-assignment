'use client';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import styles from './page.module.css';

const formatPrice = (n) =>
  new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(n);

export default function CartPage() {
  const { items, loading, cartSubtotal, cartCount, updateQuantity, removeItem } = useCart();

  const shipping = cartSubtotal > 499 ? 0 : 40;
  const total = cartSubtotal + shipping;

  if (loading) return <div className="loading-overlay"><div className="spinner"/></div>;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.layout}>
          {/* Cart Items */}
          <div className={styles.cartMain}>
            <div className={styles.cartHeader}>
              <h1 className={styles.title}>Shopping Cart</h1>
              <span className={styles.priceHeader}>Price</span>
            </div>

            {items.length === 0 ? (
              <div className={styles.emptyCart}>
                <div className={styles.emptyIcon}>🛒</div>
                <h2>Your Amazon Cart is empty</h2>
                <p>Your shopping cart is waiting. Give it purpose — fill it with groceries, food, clothing, electronics, and more.</p>
                <Link href="/products" className="btn btn-primary btn-lg">
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <div className={styles.itemList}>
                {items.map(item => (
                  <div key={item.id} className={styles.cartItem}>
                    {/* Image */}
                    <Link href={`/products/${item.product.id}`} className={styles.itemImageLink}>
                      <img
                        src={item.product.images?.[0]?.url}
                        alt={item.product.name}
                        className={styles.itemImage}
                      />
                    </Link>

                    {/* Details */}
                    <div className={styles.itemDetails}>
                      <Link href={`/products/${item.product.id}`} className={styles.itemName}>
                        {item.product.name}
                      </Link>
                      <p className={styles.itemBrand}>{item.product.brand}</p>

                      {item.product.stock > 0 ? (
                        <p className={styles.inStock}>In Stock</p>
                      ) : (
                        <p className={styles.outOfStock}>Out of Stock</p>
                      )}

                      <div className={styles.itemActions}>
                        <div className={styles.qtyRow}>
                          <label className={styles.qtyLabel}>Qty:</label>
                          <select
                            className={styles.qtySelect}
                            value={item.quantity}
                            onChange={e => updateQuantity(item.id, parseInt(e.target.value))}
                            id={`cart-qty-${item.id}`}
                          >
                            {Array.from({ length: Math.min(item.product.stock, 10) || 1 }, (_, i) => i + 1).map(n => (
                              <option key={n} value={n}>{n}</option>
                            ))}
                          </select>
                        </div>
                        <span className={styles.actionDivider}>|</span>
                        <button
                          className={styles.deleteBtn}
                          onClick={() => removeItem(item.id)}
                          id={`remove-cart-${item.id}`}
                        >
                          Delete
                        </button>
                        <span className={styles.actionDivider}>|</span>
                        <Link href={`/products/${item.product.id}`} className={styles.actionLink}>
                          See more like this
                        </Link>
                      </div>
                    </div>

                    {/* Price */}
                    <div className={styles.itemPrice}>
                      ₹{formatPrice(parseFloat(item.product.price) * item.quantity)}
                    </div>
                  </div>
                ))}

                <div className={styles.subtotalRow}>
                  Subtotal ({cartCount} {cartCount === 1 ? 'item' : 'items'}):&nbsp;
                  <strong className={styles.subtotalAmount}>₹{formatPrice(cartSubtotal)}</strong>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          {items.length > 0 && (
            <div className={styles.summary}>
              <div className={styles.summaryBox}>
                <p className={styles.summaryTitle}>
                  Subtotal ({cartCount} {cartCount === 1 ? 'item' : 'items'}):{' '}
                  <strong className={styles.summaryTotal}>₹{formatPrice(cartSubtotal)}</strong>
                </p>

                <div className={styles.summaryDetails}>
                  <div className={styles.summaryRow}>
                    <span>Items ({cartCount}):</span>
                    <span>₹{formatPrice(cartSubtotal)}</span>
                  </div>
                  <div className={styles.summaryRow}>
                    <span>Delivery:</span>
                    <span className={shipping === 0 ? styles.freeShip : ''}>
                      {shipping === 0 ? 'FREE' : `₹${shipping}`}
                    </span>
                  </div>
                  {shipping === 0 && (
                    <p className={styles.freeShipNote}>
                      Your order qualifies for FREE Delivery.
                    </p>
                  )}
                  <hr className={styles.summaryDivider} />
                  <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                    <span>Order Total:</span>
                    <span className={styles.orderTotal}>₹{formatPrice(total)}</span>
                  </div>
                </div>

                <Link href="/checkout" id="proceed-to-checkout" className={styles.checkoutBtn}>
                  Proceed to Buy ({cartCount} {cartCount === 1 ? 'item' : 'items'})
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { orderAPI } from '@/lib/api';
import { useAuth } from '@clerk/nextjs';
import styles from './page.module.css';

const formatPrice = (n) =>
  new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(n);

export default function OrderConfirmationPage() {
  const { id } = useParams();
  const { isLoaded, getToken } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id || !isLoaded) return;
    const fetchOrder = async () => {
      try {
        const token = await getToken();
        const data = await orderAPI.getById(id, token);
        setOrder(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id, isLoaded, getToken]);

  if (loading) return <div className="loading-overlay"><div className="spinner"/></div>;
  if (!order) return (
    <div className={styles.errorPage}>
      <h2>Order not found</h2>
      <Link href="/" className="btn btn-primary">Go Home</Link>
    </div>
  );

  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 3);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Success Header */}
        <div className={styles.successHeader}>
          <div className={styles.successIcon}>✓</div>
          <div className={styles.successText}>
            <h1 className={styles.successTitle}>Order Placed, Thank you!</h1>
            <p className={styles.successMsg}>
              Your order has been placed and will be delivered to you by{' '}
              <strong>{estimatedDelivery.toLocaleDateString('en-IN', {
                weekday: 'long', month: 'long', day: 'numeric'
              })}</strong>.
            </p>
          </div>
        </div>

        <div className={styles.layout}>
          {/* Order Details */}
          <div className={styles.mainSection}>
            {/* Order Info */}
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Your Order Details</h2>
              <div className={styles.orderInfo}>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Order Number</span>
                  <span className={styles.infoValue} style={{ color: '#007185', fontWeight: 700, fontSize: '1.1rem' }}>
                    {order.orderNumber}
                  </span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Order Date</span>
                  <span className={styles.infoValue}>
                    {new Date(order.createdAt).toLocaleDateString('en-IN', {
                      year: 'numeric', month: 'long', day: 'numeric'
                    })}
                  </span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Order Status</span>
                  <span className={`${styles.statusBadge} ${styles[order.status]}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Estimated Delivery</span>
                  <span className={styles.infoValue} style={{ color: '#007558' }}>
                    {estimatedDelivery.toLocaleDateString('en-IN', {
                      weekday: 'long', month: 'long', day: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* Items */}
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>
                Items in your order ({order.orderItems.length})
              </h2>
              {order.orderItems.map(item => (
                <div key={item.id} className={styles.orderItem}>
                  <img
                    src={item.product?.images?.[0]?.url}
                    alt={item.name}
                    className={styles.itemImg}
                  />
                  <div className={styles.itemDetails}>
                    <p className={styles.itemName}>{item.name}</p>
                    <p className={styles.itemMeta}>Quantity: {item.quantity}</p>
                    <p className={styles.itemMeta}>Price: ₹{formatPrice(item.price)} each</p>
                  </div>
                  <div className={styles.itemTotal}>
                    ₹{formatPrice(parseFloat(item.price) * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            {/* Shipping Address */}
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Shipping Address</h2>
              <address className={styles.address}>
                <strong>{order.shippingName}</strong><br />
                {order.shippingAddress}<br />
                {order.shippingCity}, {order.shippingState} – {order.shippingZip}<br />
                {order.shippingCountry}<br />
                📱 {order.shippingPhone}
              </address>
            </div>
          </div>

          {/* Summary Box */}
          <div className={styles.sidebar}>
            <div className={styles.summaryBox}>
              <h2 className={styles.summaryTitle}>Order Summary</h2>
              <div className={styles.summaryRow}>
                <span>Items subtotal:</span>
                <span>₹{formatPrice(order.subtotal)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Delivery:</span>
                <span className={parseFloat(order.shipping) === 0 ? styles.free : ''}>
                  {parseFloat(order.shipping) === 0 ? 'FREE' : `₹${formatPrice(order.shipping)}`}
                </span>
              </div>
              <hr />
              <div className={`${styles.summaryRow} ${styles.grandTotal}`}>
                <span>Grand Total:</span>
                <span>₹{formatPrice(order.total)}</span>
              </div>

              <div className={styles.actions}>
                <Link href="/orders" className="btn btn-primary btn-full">
                  View All Orders
                </Link>
                <Link href="/products" className="btn btn-outline btn-full">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

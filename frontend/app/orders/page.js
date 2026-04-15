'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { orderAPI } from '@/lib/api';
import { getSessionId } from '@/lib/session';
import { useUser, useAuth } from '@clerk/nextjs';
import styles from './page.module.css';

const formatPrice = (n) =>
  new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(n);

const STATUS_COLORS = {
  pending: '#FF9900',
  processing: '#007185',
  shipped: '#232F3E',
  delivered: '#28a745',
  cancelled: '#CC0C39',
};

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [displayedCount, setDisplayedCount] = useState(5);
  const [loading, setLoading] = useState(true);
  const { isLoaded, isSignedIn, user } = useUser();
  const { getToken } = useAuth();

  useEffect(() => {
    if (!isLoaded) return;
    const loadOrders = async () => {
      try {
        const sessionId = getSessionId();
        let data = [];
        if (isSignedIn && user) {
          const token = await getToken();
          data = await orderAPI.getMyOrders(sessionId, token);
        }
        setOrders(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadOrders();
  }, [user, isLoaded, isSignedIn, getToken]);

  if (loading) return <div className="loading-overlay"><div className="spinner"/></div>;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Your Orders</h1>

        {orders.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>📦</div>
            <h2>No orders yet</h2>
            <p>You haven't placed any orders. Start shopping!</p>
            <Link href="/products" className="btn btn-primary btn-lg">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className={styles.orderList}>
            {orders.slice(0, displayedCount).map(order => (
              <div key={order.id} className={styles.orderCard}>
                {/* Order Header */}
                <div className={styles.orderHeader}>
                  <div className={styles.headerLeft}>
                    <div className={styles.headerItem}>
                      <span className={styles.headerLabel}>ORDER PLACED</span>
                      <span className={styles.headerValue}>
                        {new Date(order.createdAt).toLocaleDateString('en-IN', {
                          year: 'numeric', month: 'short', day: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className={styles.headerItem}>
                      <span className={styles.headerLabel}>TOTAL</span>
                      <span className={styles.headerValue}>₹{formatPrice(order.total)}</span>
                    </div>
                    <div className={styles.headerItem}>
                      <span className={styles.headerLabel}>STATUS</span>
                      <span className={styles.statusBadge} style={{ background: STATUS_COLORS[order.status] || '#FF9900' }}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div className={styles.headerRight}>
                    <span className={styles.orderId}>ORDER # {order.orderNumber}</span>
                    <Link href={`/order-confirmation/${order.id}`} className={styles.detailLink}>
                      View order details
                    </Link>
                  </div>
                </div>

                {/* Order Items */}
                <div className={styles.orderItems}>
                  {order.orderItems.map(item => (
                    <div key={item.id} className={styles.itemRow}>
                      <img
                        src={item.product?.images?.[0]?.url}
                        alt={item.name}
                        className={styles.itemImg}
                      />
                      <div className={styles.itemInfo}>
                        <Link
                          href={`/products/${item.productId}`}
                          className={styles.itemName}
                        >
                          {item.name}
                        </Link>
                        <p className={styles.itemMeta}>
                          Qty: {item.quantity} × ₹{formatPrice(item.price)}
                        </p>
                      </div>
                      <div className={styles.itemActions}>
                        <Link href={`/products/${item.productId}`} className="btn btn-outline">
                          Buy it again
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Address */}
                <div className={styles.orderFooter}>
                  <p className={styles.shipTo}>
                    Ship to: <strong>{order.shippingName}</strong> · {order.shippingCity}, {order.shippingState}
                  </p>
                </div>
              </div>
            ))}
            
            {orders.length > displayedCount && (
              <div className={styles.showMoreContainer}>
                <button 
                  onClick={() => setDisplayedCount(prev => prev + 5)}
                  className={styles.showMoreButton}
                >
                  Show More Orders
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

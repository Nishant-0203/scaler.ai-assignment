'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useUser, useAuth } from '@clerk/nextjs';
import { orderAPI } from '@/lib/api';
import { getSessionId } from '@/lib/session';
import styles from './page.module.css';

const formatPrice = (n) =>
  new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(n);

const INDIAN_STATES = [
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh',
  'Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka',
  'Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram',
  'Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana',
  'Tripura','Uttar Pradesh','Uttarakhand','West Bengal','Delhi','Chandigarh'
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, cartSubtotal, cartCount, clearCart } = useCart();
  const { isLoaded, isSignedIn, user } = useUser();
  const { getToken } = useAuth();

  const [formData, setFormData] = useState({
    shippingName: user?.fullName || '',
    shippingEmail: user?.primaryEmailAddress?.emailAddress || '',
    shippingPhone: '',
    shippingAddress: '',
    shippingCity: '',
    shippingState: '',
    shippingZip: '',
    shippingCountry: 'India',
  });
  const [errors, setErrors] = useState({});
  const [placing, setPlacing] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData(prev => ({ ...prev, shippingName: user.fullName || '', shippingEmail: user.primaryEmailAddress?.emailAddress || '' }));
    }
  }, [user]);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/login');
    }
  }, [isLoaded, isSignedIn, router]);

  const shipping = cartSubtotal > 499 ? 0 : 40;
  const total = cartSubtotal + shipping;

  const validate = () => {
    const e = {};
    if (!formData.shippingName.trim()) e.shippingName = 'Full name is required';
    if (!formData.shippingEmail.trim() || !/\S+@\S+\.\S+/.test(formData.shippingEmail))
      e.shippingEmail = 'Valid email is required';
    if (!formData.shippingPhone.trim() || formData.shippingPhone.length < 10)
      e.shippingPhone = 'Valid phone number is required';
    if (!formData.shippingAddress.trim()) e.shippingAddress = 'Address is required';
    if (!formData.shippingCity.trim()) e.shippingCity = 'City is required';
    if (!formData.shippingState) e.shippingState = 'State is required';
    if (!formData.shippingZip.trim() || formData.shippingZip.length < 6)
      e.shippingZip = 'Valid 6-digit pincode is required';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    if (items.length === 0) {
      router.push('/cart');
      return;
    }

    setPlacing(true);
    try {
      const sessionId = getSessionId();
      let token = null;
      if (isSignedIn) token = await getToken();
      const order = await orderAPI.create({ sessionId, ...formData }, token);
      await clearCart(); // Ensure the frontend explicitly wipes the cart context locally too!
      router.push(`/order-confirmation/${order.id}`);
    } catch (err) {
      console.error(err);
      setErrors({ general: err.message || 'Failed to place order. Please try again.' });
      setPlacing(false);
    }
  };

  if (!isLoaded || !isSignedIn) {
    return null; // Don't render while redirecting
  }

  if (items.length === 0 && !placing) {
    return (
      <div className={styles.emptyPage}>
        <h2>Your cart is empty</h2>
        <Link href="/products" className="btn btn-primary">Shop Now</Link>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Link href="/" className={styles.logoLink}>
            <span className={styles.logo}>amazon</span><span className={styles.logoIn}>.in</span>
          </Link>
          <h1 className={styles.title}>Checkout</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.layout}>
            {/* LEFT: Form */}
            <div className={styles.formSection}>
              {errors.general && (
                <div className="alert alert-error">{errors.general}</div>
              )}

              {/* Step 1: Address */}
              <div className={styles.step}>
                <div className={styles.stepHeader}>
                  <span className={styles.stepNumber}>1</span>
                  <h2 className={styles.stepTitle}>Shipping address</h2>
                </div>
                <div className={styles.stepBody}>
                  <div className={styles.formGrid2}>
                    <div className="form-group">
                      <label className="form-label" htmlFor="shippingName">Full name</label>
                      <input
                        id="shippingName"
                        name="shippingName"
                        type="text"
                        className={`form-control ${errors.shippingName ? 'error' : ''}`}
                        value={formData.shippingName}
                        onChange={handleChange}
                        placeholder="John Doe"
                      />
                      {errors.shippingName && <p className="form-error">{errors.shippingName}</p>}
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="shippingPhone">Mobile number</label>
                      <input
                        id="shippingPhone"
                        name="shippingPhone"
                        type="tel"
                        className={`form-control ${errors.shippingPhone ? 'error' : ''}`}
                        value={formData.shippingPhone}
                        onChange={handleChange}
                        placeholder="+91 9876543210"
                        maxLength={13}
                      />
                      {errors.shippingPhone && <p className="form-error">{errors.shippingPhone}</p>}
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="shippingEmail">Email address</label>
                    <input
                      id="shippingEmail"
                      name="shippingEmail"
                      type="email"
                      className={`form-control ${errors.shippingEmail ? 'error' : ''}`}
                      value={formData.shippingEmail}
                      onChange={handleChange}
                      placeholder="you@example.com"
                    />
                    {errors.shippingEmail && <p className="form-error">{errors.shippingEmail}</p>}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="shippingAddress">Address</label>
                    <input
                      id="shippingAddress"
                      name="shippingAddress"
                      type="text"
                      className={`form-control ${errors.shippingAddress ? 'error' : ''}`}
                      value={formData.shippingAddress}
                      onChange={handleChange}
                      placeholder="House number, Building, Street name"
                    />
                    {errors.shippingAddress && <p className="form-error">{errors.shippingAddress}</p>}
                  </div>

                  <div className={styles.formGrid3}>
                    <div className="form-group">
                      <label className="form-label" htmlFor="shippingCity">City</label>
                      <input
                        id="shippingCity"
                        name="shippingCity"
                        type="text"
                        className={`form-control ${errors.shippingCity ? 'error' : ''}`}
                        value={formData.shippingCity}
                        onChange={handleChange}
                        placeholder="Mumbai"
                      />
                      {errors.shippingCity && <p className="form-error">{errors.shippingCity}</p>}
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="shippingState">State</label>
                      <select
                        id="shippingState"
                        name="shippingState"
                        className={`form-control ${errors.shippingState ? 'error' : ''}`}
                        value={formData.shippingState}
                        onChange={handleChange}
                      >
                        <option value="">Select State</option>
                        {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                      {errors.shippingState && <p className="form-error">{errors.shippingState}</p>}
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="shippingZip">Pin code</label>
                      <input
                        id="shippingZip"
                        name="shippingZip"
                        type="text"
                        className={`form-control ${errors.shippingZip ? 'error' : ''}`}
                        value={formData.shippingZip}
                        onChange={handleChange}
                        placeholder="400001"
                        maxLength={6}
                      />
                      {errors.shippingZip && <p className="form-error">{errors.shippingZip}</p>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: Payment */}
              <div className={styles.step}>
                <div className={styles.stepHeader}>
                  <span className={styles.stepNumber}>2</span>
                  <h2 className={styles.stepTitle}>Payment method</h2>
                </div>
                <div className={styles.stepBody}>
                  <div className={styles.paymentOption}>
                    <input type="radio" id="cod" name="payment" defaultChecked />
                    <label htmlFor="cod" className={styles.paymentLabel}>
                      💵 Cash on Delivery
                    </label>
                  </div>
                  <div className={styles.paymentOption}>
                    <input type="radio" id="upi" name="payment" />
                    <label htmlFor="upi" className={styles.paymentLabel}>
                      📱 UPI Payment
                    </label>
                  </div>
                  <div className={styles.paymentOption}>
                    <input type="radio" id="card" name="payment" />
                    <label htmlFor="card" className={styles.paymentLabel}>
                      💳 Credit / Debit Card
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: Order Summary */}
            <div className={styles.orderSummary}>
              <div className={styles.summaryBox}>
                <h2 className={styles.summaryTitle}>Order Summary</h2>

                <div className={styles.summaryItems}>
                  {items.map(item => (
                    <div key={item.id} className={styles.summaryItem}>
                      <div className={styles.summaryItemLeft}>
                        <img
                          src={item.product.images?.[0]?.url}
                          alt={item.product.name}
                          className={styles.summaryImg}
                        />
                        <div>
                          <p className={styles.summaryItemName}>{item.product.name}</p>
                          <p className={styles.summaryItemQty}>Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span className={styles.summaryItemPrice}>
                        ₹{formatPrice(parseFloat(item.product.price) * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <hr />
                <div className={styles.totalRow}>
                  <span>Items ({cartCount}):</span>
                  <span>₹{formatPrice(cartSubtotal)}</span>
                </div>
                <div className={styles.totalRow}>
                  <span>Delivery:</span>
                  <span className={shipping === 0 ? styles.freeShip : ''}>
                    {shipping === 0 ? 'FREE' : `₹${shipping}`}
                  </span>
                </div>
                <hr />
                <div className={`${styles.totalRow} ${styles.grandTotal}`}>
                  <span>Order Total:</span>
                  <span>₹{formatPrice(total)}</span>
                </div>

                <button
                  type="submit"
                  id="place-order-btn"
                  className={styles.placeOrderBtn}
                  disabled={placing}
                >
                  {placing ? 'Placing Order...' : 'Place your order'}
                </button>

                <p className={styles.termsNote}>
                  By placing your order, you agree to Amazon's{' '}
                  <a href="#">privacy notice</a> and{' '}
                  <a href="#">conditions of use</a>.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

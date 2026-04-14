'use client';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <CartProvider>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </CartProvider>
    </AuthProvider>
  );
}

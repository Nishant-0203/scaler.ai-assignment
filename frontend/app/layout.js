import { ClerkProvider } from '@clerk/nextjs';
import Providers from '@/components/Providers';
import './globals.css';

export const metadata = {
  title: 'Amazon.in: Online Shopping - Electronics, Books, Clothing & More',
  description: 'Online Shopping for Electronics, Books, Clothing, Mobiles, Laptops and more at great prices.',
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        </head>
        <body>
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}

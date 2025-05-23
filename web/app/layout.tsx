import type { Metadata } from 'next';
import './globals.css';
import { Poppins } from 'next/font/google';
import Providers from './providers';
import LoadingScreen from '@/components/general/LoadingScreen';
import { Suspense } from 'react';
const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${poppins.className} antialiased`}>
        <Suspense fallback={<LoadingScreen />}>
          <Providers>{children}</Providers>
        </Suspense>
      </body>
    </html>
  );
}

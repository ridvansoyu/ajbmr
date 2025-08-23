import '../styles/globals.css';
import type { Metadata } from 'next';
import { LanguageProvider } from '@/context/LanguageContext';
import { AuthProvider } from '@/context/AuthContext';
import { NotificationProvider } from '@/context/NotificationContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AuthDebug from '@/components/debug/AuthDebug';
import MaterialUIProvider from '@/components/providers/MaterialUIProvider';
import React from 'react';

export const metadata: Metadata = {
  title: 'Academic Journal of Advanced Studies',
  description: 'A peer-reviewed journal dedicated to advancing research across multiple disciplines',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <MaterialUIProvider>
          <LanguageProvider>
            <NotificationProvider>
              <AuthProvider>
                <Header />
                {children}
                <Footer />
                <AuthDebug />
              </AuthProvider>
            </NotificationProvider>
          </LanguageProvider>
        </MaterialUIProvider>
      </body>
    </html>
  );
}



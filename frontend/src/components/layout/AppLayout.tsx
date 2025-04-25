
import React from 'react';
import Navbar from './Navbar';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="min-h-screen w-full">
      <Navbar />
      <main className="px-6 py-8">
        {children}
      </main>
    </div>
  );
};

export default AppLayout;

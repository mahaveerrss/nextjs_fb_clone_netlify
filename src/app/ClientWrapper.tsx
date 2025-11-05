'use client';

import React, { useEffect, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { ContextProvider } from '../component/contextApi/store';

interface ClientWrapperProps {
  children: ReactNode;
}

const ClientWrapper: React.FC<ClientWrapperProps> = ({ children }) => {
  const pathname = usePathname();

  useEffect(() => {
    
    return () => {
      
    };
  }, [pathname]);

  return (
    <ContextProvider>
      {children}
    </ContextProvider>
  );
};

export default ClientWrapper;

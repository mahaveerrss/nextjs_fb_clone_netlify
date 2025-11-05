'use client';

import React, { useEffect, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { UserUIConProvider } from '../../component/contextApi/store';

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
    <UserUIConProvider>
      {children}
    </UserUIConProvider>
  );
};

export default ClientWrapper;

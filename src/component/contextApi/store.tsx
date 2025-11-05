'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

 
interface User {
  emailVal: string;
  passwordVal: string;
}

interface UserContextType {
  value: User;
  setValue: React.Dispatch<React.SetStateAction<User>>;
}

interface UserUIContextType {
  dark: boolean;
  setDark: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ProviderProps {
  children: ReactNode;
}

 
const userContext = createContext<UserContextType | undefined>(undefined);
const userUIContext = createContext<UserUIContextType | undefined>(undefined);

 
export function ContextProvider({ children }: ProviderProps) {
  const [value, setValue] = useState<User>({ emailVal: 'user', passwordVal: 'pass@123' });

  return <userContext.Provider value={{ value, setValue }}>{children}</userContext.Provider>;
}

export function UserUIConProvider({ children }: ProviderProps) {
  const [dark, setDark] = useState<boolean>(true);

  return <userUIContext.Provider value={{ dark, setDark }}>{children}</userUIContext.Provider>;
}

// ---------------------
// Hooks
// ---------------------
export function useGContext(): UserContextType {
  const context = useContext(userContext);
  if (!context) throw new Error('useGContext must be used within a ContextProvider');
  return context;
}

export function useUserUIContext(): UserUIContextType {
  const context = useContext(userUIContext);
  if (!context) throw new Error('useUserUIContext must be used within a UserUIConProvider');
  return context;
}

export function setUserLogedInLS(bool:boolean): void{
    const localStorageVal = localStorage.getItem('fbCloneVal')
    if(!localStorageVal){
       localStorage.setItem('fbCloneVal',`${bool}`)
       
    }
    else{
       localStorage.setItem('fbCloneVal',`${bool}`)
    }
  }
"use client";

import { usePathname } from "next/navigation";
import ClientWrapper from "./ClientWrapper";
import { useEffect , useState } from "react";
import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const pathName = usePathname()
    const router = useRouter()
    const [logedIn , setLogedIn] = useState(false)
    useEffect(()=>{
     if(pathName === 'userpage'){
       const isUserLogedIn = localStorage.getItem('fbCloneVal') ?? '';
      if(isUserLogedIn.length >0 && JSON.parse(isUserLogedIn)){
        setLogedIn(true)
        
        router.replace('/userpage')
        
        
      }
      else {
        setLogedIn(false)
        router.replace('/')
         
        
      }
     }
     return ()=>{
      
     }
    },[pathName])
   

  return <>
  {
    logedIn ? <ClientWrapper>{children}</ClientWrapper> : ''
  }
  </>;
}

"use client";

import { usePathname } from "next/navigation";
 
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
      console.log(pathName);
      
         
                const isUserLogedIn = localStorage.getItem('fbCloneVal') ?? '';
      if(isUserLogedIn.length > 0 && JSON.parse(isUserLogedIn)){
        setLogedIn(true)
        
      
      }
      else {
        setLogedIn(false)
        router.replace('/')
      }
        
        

    },[pathName])
   

  return <>
  {
    logedIn ?  children  : ''
  }
  </>;
}

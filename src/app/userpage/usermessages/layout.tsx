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
        if(pathName === '/userpage/usermessages'){
                const isUserLogedIn = localStorage.getItem('fbCloneVal') ?? '';
      if(isUserLogedIn.length > 0 && JSON.parse(isUserLogedIn)){
        setLogedIn(true)
        
        router.replace('/userpage/usermessages')
      }
      else {
        setLogedIn(false)
        router.replace('/')
      }
        }
        return ()=> {
          
        }

    },[pathName])
   

  return <>
  {
    logedIn ?  children  : ''
  }
  </>;
}

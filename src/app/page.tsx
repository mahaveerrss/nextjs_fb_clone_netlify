'use client'
import { useEffect, useState } from "react";
import HomePage from "../component/HomePage";
import { useRouter, usePathname } from "next/navigation";
import { json } from "stream/consumers";
export default function Page() {
  const pathName = usePathname()
  const router = useRouter()
  const [logedIn , setLogedIn] = useState(true)
  useEffect(()=>{
    const isUserLogedIn = localStorage.getItem('fbCloneVal') ?? '';
    if(isUserLogedIn.length >0 && JSON.parse(isUserLogedIn)){
      setLogedIn(true)
      
      router.replace('/userpage')
    }
    else {
      setLogedIn(false)
    }
  },[pathName])
  return (
    <>
      {
        !logedIn ? <HomePage  /> : '' 
      }
    </>
  );
}

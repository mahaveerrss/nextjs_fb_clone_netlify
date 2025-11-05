"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useGContext ,setUserLogedInLS } from "../contextApi/store";
import {useRouter} from "next/navigation";

function Header() {
  const [visible, setVisible] = useState(false);
  const [invalidCreds, setInvalidCreds] = useState(false);
  const emailInput = useRef<HTMLInputElement | null>(null);
  const passwordInput = useRef<HTMLInputElement | null>(null);
  const{ value,setValue} = useGContext()

  const appRouter = useRouter();
 
  
   

  useEffect(() => {
    emailInput?.current?.focus();
  }, []);

 

  function onLoginFn(){
    let emailVal = emailInput.current?.value;
    emailVal = emailVal?.trimStart()
    let passwordVal = passwordInput.current?.value;
     passwordVal = passwordVal?.trimStart()
    console.log('onlogin');
    

     if((emailVal?.trim())?.length  && (passwordVal?.trim())?.length  ){
      setInvalidCreds(false)
      setValue({emailVal,passwordVal})
      setUserLogedInLS(true)
      appRouter.replace('/userpage')
      
     }
     else{
      setInvalidCreds(true)
     }
    
  }

  return (
    <div className="flex flex-col items-center md:flex-row md:items-start md:pt-48 justify-center bg-[rgb(242,244,247)] min-h-[89vh] px-4 sm:px-8 md:px-1 lg:px-24 py-10">
      {/* LEFT SECTION */}
      <div className="flex flex-col justify-center items-center md:items-start md:w-1/2 text-center md:text-left mb-10 md:mb-0">
        <img
          src="https://static.xx.fbcdn.net/rsrc.php/y1/r/4lCu2zih0ca.svg"
          alt="Facebook Logo"
          className="w-40 sm:w-48 md:w-60 lg:w-72 mb-4"
        />
        <p className="text-lg sm:text-xl md:text-2xl pl-7 pr-4 font-normal text-gray-800 max-w-sm sm:max-w-md leading-snug">
          Facebook helps you connect and share with the people in your life.
        </p>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex flex-col justify-center items-center md:items-center md:w-1/2">
        <div className="bg-white w-full max-w-sm px-6 py-6 rounded-lg shadow-md shadow-gray-300 flex flex-col justify-center">

          {/* Invalid credentials alert */}
          {invalidCreds ? <div className="bg-red-100 flex text-sm flex-col justify-center items-center rounded-sm p-6 m-6 text-black outline outline-red-700">
          <span className="font-semibold"> Wrong credentials</span>
          <span>Invalid username or password</span>
          </div> : null}
          
          {/* FORM */}
          <form className="flex flex-col gap-4 caret-blue-600">
            {/* Email input */}
            <input
              ref={emailInput}
              type="email"
              placeholder="Email address or phone number"
              className="text-base sm:text-lg py-3 px-4 rounded-md outline  outline-gray-300 focus:outline-blue-500 focus:shadow-sm focus:shadow-blue-100 transition-all"
            />

            {/* Password input */}
            <div className="relative">
              <input
                ref={passwordInput}
                type={visible ? "text" : "password"}
                placeholder="Password"
                className="text-base sm:text-lg py-3 px-4 w-full rounded-md outline outline-gray-300 focus:outline-blue-500 focus:shadow-sm focus:shadow-blue-100 transition-all"
              />
              <button
                type="button"
                onClick={() => setVisible((prev) => !prev)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-lg"
                aria-label={visible ? "Hide password" : "Show password"}
              >
                {visible ? "🙈" : "👁️"}
              </button>
            </div>

            {/* Login button */}
            <button
              type="button"
              onClick={()=>{onLoginFn()}}
              className="bg-blue-600 text-white font-bold text-lg py-3 rounded-md hover:bg-blue-500 active:bg-blue-700 transition-all"
            >
              Log in
            </button>

            {/* Guest link */}
            <Link
              href="/userpage"
              onClick={()=>{
                setValue({emailVal:'guestUser', passwordVal: 'pass@123'})
                setUserLogedInLS(true)
              }}
              className="text-blue-500 hover:underline active:text-blue-700 text-xs sm:text-base font-semibold text-center mt-1"
            >
              Guest user?
            </Link>

            {/* Divider + Create account */}
            <div className="border-t border-gray-300 pt-4 flex justify-center">
              <button
                type="button"
                className="bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-bold text-sm sm:text-base rounded-md w-3/4 py-2.5 transition-all"
              >
                Create new account
              </button>
            </div>
          </form>
        </div>

        {/* Bottom text */}
        <div className="text-xs   gap-3.5  flex justify-center items-center     sm:text-sm mt-6 text-center md:text-left text-gray-700">
          <Link href={'/'} className="hover:underline  font-semibold">Create a Page</Link> <p>for a celebrity, brand, or business.</p>
        </div>
      </div>
    </div>
  );
}

export default Header;

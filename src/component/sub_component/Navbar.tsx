"use client";
import {
  BellIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  HomeIcon,
  MoonIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import { useUserUIContext ,setUserLogedInLS } from "../contextApi/store";
import { useRouter } from "next/navigation";
 

export default function Navbar() {
  
   
   const {dark,setDark} =  useUserUIContext();
   const router = useRouter()

   function logoutBtn(){
    setUserLogedInLS(false)
     router.replace('/')
   }
   function messageBtn(){
    router.push('/userpage/usermessages')
   }
   
  

  return (
    <nav
      className={`shadow px-4 py-2 flex items-center justify-between sticky top-0 z-50 ${
        dark ? "bg-gray-900  border-b border-gray-700 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Logo + Search */}
      <div className="flex items-center gap-3">
        <div className="text-blue-600 font-bold text-2xl">Facebook</div>
        <input
          type="text"
          placeholder="Search Facebook"
          className="bg-gray-100 rounded-full px-3 py-2 text-sm w-64 focus:outline-none"
        />
      </div>

      {/* Center Icons */}
      <div className="hidden md:flex gap-6">
        <HomeIcon className="h-6 w-6 cursor-pointer text-blue-600" />
        <ChatBubbleOvalLeftEllipsisIcon onClick={messageBtn} className="h-6 w-6 cursor-pointer    hover:text-gray-400" />
        <BellIcon className="h-6 w-6 cursor-pointer hover:text-gray-400" />
      </div>
      

      {/* LogOut + Profile + Dark Mode */}
      <div className="flex items-center gap-4">
        <button onClick={logoutBtn} className="bg-[#1877F2] text-white font-semibold py-2 px-4 rounded-md hover:bg-[#166FE5] active:bg-[#145FC0] transition-colors">
          Log Out
        </button>
        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          className="rounded-full w-8 h-8 cursor-pointer"
        />
        <MoonIcon
          onClick={() => setDark((prev)=>!prev)}
          className="h-6 w-6 cursor-pointer hover:scale-110 transition-transform"
        />
      </div>
    </nav>
  );
}

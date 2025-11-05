"use client";
import {
  BellIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  HomeIcon,
  MoonIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import { useUserUIContext, setUserLogedInLS } from "../contextApi/store";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { dark, setDark } = useUserUIContext();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  function logoutBtn() {
    setUserLogedInLS(false);
    router.replace("/");
  }

  function messageBtn() {
    router.push("/userpage/usermessages");
  }

  return (
    <nav
      className={`shadow-md px-4 py-2 flex items-center justify-between sticky top-0 z-50 ${
        dark
          ? "bg-gray-900 border-b border-gray-700 text-white"
          : "bg-white text-gray-900"
      }`}
    >
      {/* Logo + Search */}
      <div className="flex items-center gap-3">
        <div className="text-blue-600 font-bold text-xl sm:text-2xl">
          Facebook
        </div>
        {/* Search Bar (hidden on mobile) */}
        <input
          type="text"
          placeholder="Search Facebook"
          className={`hidden sm:block rounded-full px-3 py-1.5 text-sm w-40 sm:w-64 focus:outline-none ${
            dark
              ? "bg-gray-800 placeholder-gray-400 text-gray-200"
              : "bg-gray-100 text-gray-800"
          }`}
        />
      </div>

      {/* Center Icons (desktop only) */}
      <div className="hidden md:flex gap-6">
        <HomeIcon className="h-6 w-6 cursor-pointer text-blue-600" />
        <ChatBubbleOvalLeftEllipsisIcon
          onClick={messageBtn}
          className="h-6 w-6 cursor-pointer hover:text-gray-400"
        />
        <BellIcon className="h-6 w-6 cursor-pointer hover:text-gray-400" />
      </div>

      {/* Right Side (desktop) */}
      <div className="hidden md:flex items-center gap-4">
        <button
          onClick={logoutBtn}
          className="bg-[#1877F2] text-white font-semibold py-2 px-4 rounded-md hover:bg-[#166FE5] active:bg-[#145FC0] transition-colors text-sm"
        >
          Log Out
        </button>
        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          className="rounded-full w-8 h-8 cursor-pointer"
        />
        <MoonIcon
          onClick={() => setDark((prev) => !prev)}
          className="h-6 w-6 cursor-pointer hover:scale-110 transition-transform"
        />
      </div>

      {/* Mobile Menu Toggle Button */}
      <button
        onClick={() => setMenuOpen((prev) => !prev)}
        className="md:hidden focus:outline-none"
      >
        {menuOpen ? (
          <XMarkIcon className="h-6 w-6" />
        ) : (
          <Bars3Icon className="h-6 w-6" />
        )}
      </button>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div
          className={`absolute top-14 left-0 w-full flex flex-col items-start gap-3 px-5 py-4 shadow-lg md:hidden ${
            dark
              ? "bg-gray-900 text-white border-t border-gray-700"
              : "bg-white text-gray-900"
          }`}
        >
          {/* Center icons */}
          <div className="flex justify-around w-full">
            <HomeIcon className="h-6 w-6 cursor-pointer text-blue-600" />
            <ChatBubbleOvalLeftEllipsisIcon
              onClick={messageBtn}
              className="h-6 w-6 cursor-pointer hover:text-gray-400"
            />
            <BellIcon className="h-6 w-6 cursor-pointer hover:text-gray-400" />
          </div>

          {/* Divider */}
          <div
            className={`border-b w-full ${
              dark ? "border-gray-700" : "border-gray-200"
            }`}
          ></div>

          {/* Buttons */}
          <div className="flex flex-col gap-3 w-full">
            <button
              onClick={logoutBtn}
              className="w-full bg-[#1877F2] text-white font-semibold py-2 rounded-md hover:bg-[#166FE5] active:bg-[#145FC0] transition-colors text-sm"
            >
              Log Out
            </button>
            <div className="flex justify-between items-center w-full">
              <img
                src="https://i.pravatar.cc/40"
                alt="profile"
                className="rounded-full w-9 h-9 cursor-pointer"
              />
              <MoonIcon
                onClick={() => setDark((prev) => !prev)}
                className="h-6 w-6 cursor-pointer hover:scale-110 transition-transform"
              />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

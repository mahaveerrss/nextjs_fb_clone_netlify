 

'use client';
import Link from 'next/link';
import React from 'react';

function Footer() {
  const languages: string[] = [
    "English (UK)",
    "हिन्दी",
    "বাংলা",
    "தமிழ்",
    "తెలుగు",
    "ગુજરાતી",
    "ಕನ್ನಡ",
    "മലയാളം",
    "ਪੰਜਾਬੀ",
    "ଓଡ଼ିଆ",
    "संस्कृतम्"
  ];

  const fbMenuItems = [
    "Sign Up",
    "Log in",
    "Messenger",
    "Facebook Lite",
    "Video",
    "Meta Pay",
    "Meta Store",
    "Meta Quest",
    "Ray-Ban Meta",
    "Meta AI",
    "Meta AI more content",
    "Instagram",
    "Threads",
    "Voting Information Centre",
    "Privacy Policy",
    "Privacy Centre",
    "About",
    "Create ad",
    "Create Page",
    "Developers",
    "Careers",
    "Cookies",
    "AdChoices",
    "Terms",
    "Help",
    "Contact uploading and non-users",
    "Settings"
  ];

  return (
    <footer className="w-full bg-white text-xs text-gray-500 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 py-6">
      
     
      <div className="flex flex-wrap items-center gap-3 mb-3">
        {languages.map((lang) => (
          <Link key={lang} href="/" className="hover:underline">
            {lang}
          </Link>
        ))}
        <button className="text-xl border border-gray-300 w-8 h-7 flex items-center justify-center rounded-sm active:bg-gray-200 font-medium">
          +
        </button>
      </div>

  
      <div className="border-t border-gray-300 my-3"></div>
 
      <div className="flex flex-wrap items-center gap-3 mb-3">
        {fbMenuItems.map((item) => (
          <Link key={item} href="/" className="hover:underline">
            {item}
          </Link>
        ))}
      </div>

    
      <div className="pt-2 font-semibold">Meta © 2025</div>
    </footer>
  );
}

export default Footer;

'use client';
import { useUserUIContext  } from "../contextApi/store";
import {
  UserGroupIcon,
  UsersIcon,
  TvIcon,
  BuildingStorefrontIcon,
  BookmarkIcon,
} from "@heroicons/react/24/solid";

export default function Sidebar() {
  const {dark,setDark} =  useUserUIContext();
  const menu = [
    { name: "Friends", icon: UsersIcon },
    { name: "Groups", icon: UserGroupIcon },
    { name: "Marketplace", icon: BuildingStorefrontIcon },
    { name: "Watch", icon: TvIcon },
    { name: "Saved", icon: BookmarkIcon },
  ];

  return (
    <aside className={`hidden lg:flex flex-col w-1/5 p-4 gap-2 ${ dark ? "bg-gray-900 border-t-0 border-l-0 text-white border border-gray-700" : "bg-white text-gray-900"}`}>
      {menu.map((item, i) => (
        <div key={i} className="flex items-center gap-3 p-2 hover:bg-gray-200 rounded cursor-pointer">
          <item.icon className="h-6 w-6 text-blue-600" />
          <span>{item.name}</span>
        </div>
      ))}

      <hr className="my-4" />

      <h3 className="font-semibold text-gray-600 mb-2">Your Shortcuts</h3>
      <div className="space-y-2">
        <div className="hover:bg-gray-200 p-2 rounded cursor-pointer">React Developers</div>
        <div className="hover:bg-gray-200 p-2 rounded cursor-pointer">Next.js Learners</div>
      </div>
    </aside>
  );
}

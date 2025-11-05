'use client';
import { useUserUIContext } from "../../component/contextApi/store";
import Navbar from "../../component/sub_component/Navbar";
import Sidebar from "../../component/sub_component/Sidebar";
import Feed from "../../component/sub_component/Feed";
import RightSidebar from "../../component/sub_component/RightSidebar";
import { usePathname } from "next/navigation";
 

export default function userPage() {
    const {dark,setDark} =  useUserUIContext();
    const pathName = usePathname()
  
  return (
    <div key={pathName} className={`min-h-screen flex flex-col ${ dark ? "bg-gray-900 text-white border border-gray-700" : "bg-white text-gray-900"}` }>
      <Navbar />
      <div className="flex flex-1 justify-between">
        <Sidebar />
        <Feed />
        <RightSidebar />
      </div>
    </div>
  );
}

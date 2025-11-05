'use client';
import { useUserUIContext  } from "../contextApi/store";
import { HandThumbUpIcon, ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";

interface PostProps {
  name: string;
  text: string;
  img?: string; // optional
}
export default function Post({ name , text, img } : PostProps) {
   const {dark,setDark} =  useUserUIContext();
   
  return (
    <div className={`  rounded shadow p-4 mb-4 ${ dark ? "bg-gray-900 text-white border border-gray-700" : "bg-white text-gray-900"}`}>
      <div className="flex items-center gap-3 mb-2">
        <img src="https://i.pravatar.cc/40" alt="profile" className="rounded-full" />
        <div>
          <div className="font-semibold">{name}</div>
          <div className="text-sm text-gray-500">1h ago</div>
        </div>
      </div>

      <p className="mb-2">{text}</p>
      {img && <img src={img} alt="post" className="rounded mb-2" />}

      <div className="flex justify-around text-gray-600 border-t pt-2">
        <button className="flex items-center gap-2 hover:text-blue-600">
          <HandThumbUpIcon className="h-5 w-5" /> Like
        </button>
        <button className="flex items-center gap-2 hover:text-blue-600">
          <ChatBubbleBottomCenterTextIcon className="h-5 w-5" /> Comment
        </button>
      </div>
    </div>
  );
}

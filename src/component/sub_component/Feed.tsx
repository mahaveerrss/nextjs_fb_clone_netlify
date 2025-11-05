"use client";
import Post from "./Post";
import { useUserUIContext } from "../contextApi/store";

export default function Feed() {
  const { dark } = useUserUIContext();

  const posts = [
    {
      name: "John Doe",
      text: "Just finished my new project!",
      img: "https://picsum.photos/600/400?1",
    },
    {
      name: "Jane Smith",
      text: "Good vibes only 😎",
      img: "https://picsum.photos/600/400?2",
    },
  ];

  return (
    <main
      className={`flex-1 p-3 sm:p-4 md:p-6 mx-auto w-full max-w-2xl 
        ${dark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}
        transition-colors duration-300`}
    >
      {/* Story Section */}
      <div className="flex gap-3 justify-evenly overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
        {[1, 2, 3, 4, 5].map((s) => (
          <div
            key={s}
            className={`relative shrink-0 w-20 sm:w-24 md:w-28 h-36 sm:h-40 md:h-44 rounded-xl overflow-hidden 
            ${dark ? "bg-gray-800" : "bg-gray-200"}`}
          >
            <img
              src={`https://picsum.photos/200/300?random=${s}`}
              alt={`story-${s}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 left-2 bg-blue-600 text-white text-xs sm:text-sm px-2 py-1 rounded-lg shadow">
              Story {s}
            </div>
          </div>
        ))}
      </div>

      {/* Post Composer */}
      <div
        className={`rounded-xl shadow-sm p-3 sm:p-4 mb-4 
          ${dark ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"}
        `}
      >
        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/40"
            alt="user-avatar"
            className="rounded-full w-10 h-10"
          />
          <input
            type="text"
            placeholder="What's on your mind?"
            className={`flex-1 rounded-full px-4 py-2 text-sm sm:text-base focus:outline-none
              ${dark ? "bg-gray-700 placeholder-gray-400 text-white" : "bg-gray-100 text-gray-800"}
            `}
          />
        </div>
      </div>

      {/* Feed Posts */}
      <div className="flex flex-col gap-4">
        {posts.map((p, i) => (
          <Post key={i} {...p} />
        ))}
      </div>
    </main>
  );
}

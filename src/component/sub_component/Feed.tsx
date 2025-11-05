'use client'
import Post from "./Post";
import { useUserUIContext  } from "../contextApi/store";
export default function Feed() {

   const {dark,setDark} =  useUserUIContext();

  const posts = [
    { name: "John Doe", text: "Just finished my new project!", img: "https://picsum.photos/600/400?1" },
    { name: "Jane Smith", text: "Good vibes only 😎", img: "https://picsum.photos/600/400?2" },
  ];

  return (
    <main className={`flex-1 p-4 max-w-2xl border-x-0 border-t-0 mx-auto ${ dark ? "bg-gray-900 border border-gray-700 text-white" : "bg-white text-gray-900"}`}>
      {/* Story Section */}
      <div className="flex gap-3 overflow-x-auto pb-3">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="relative w-24 h-40 bg-gray-200 rounded-lg overflow-hidden">
            <img
              src={`https://picsum.photos/200/300?random=${s}`}
              alt="story"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
              Story {s}
            </div>
          </div>
        ))}
      </div>

      {/* Post Composer */}
      <div className="bg-white rounded shadow p-4 mb-4">
        <input
          type="text"
          placeholder="What's on your mind?"
          className="w-full bg-gray-100 rounded-full px-4 py-2"
        />
      </div>

      {/* Feed Posts */}
      {posts.map((p, i) => (
        <Post key={i} {...p} />
      ))}
    </main>
  );
}

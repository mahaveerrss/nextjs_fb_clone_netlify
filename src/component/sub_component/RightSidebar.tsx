'use client';
import { useUserUIContext  } from "../contextApi/store";
export default function RightSidebar() {
  const birthdays = [{ name: "Alice", img: "https://i.pravatar.cc/30?img=5" }];
  const contacts = ["Bob", "Charlie", "David", "Eve", "Frank", "Grace"];
  const {dark,setDark} =  useUserUIContext();

  return (
    <aside className={`hidden xl:flex flex-col w-1/5 p-4 gap-6 ${ dark ? "bg-gray-900 border-t-0 border-r-0 text-white border border-gray-600" : "bg-white text-gray-900"}`}>
      {/* Sponsored */}
      <div>
        <h3 className="font-semibold text-gray-600 mb-2">Sponsored</h3>
        <div className="space-y-3">
          <div className="bg-gray-200 h-32 rounded-lg shadow-sm overflow-hidden cursor-pointer hover:opacity-90 transition">
            <img
              src="https://picsum.photos/300/150?random=11"
              alt="sponsored ad"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="bg-gray-200 h-32 rounded-lg shadow-sm overflow-hidden cursor-pointer hover:opacity-90 transition">
            <img
              src="https://picsum.photos/300/150?random=12"
              alt="sponsored ad"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* Birthdays */}
      <div>
        <h3 className="font-semibold text-gray-600 mb-2">Birthdays</h3>
        {birthdays.map((b, i) => (
          <div key={i} className={`flex items-center gap-2   p-2 rounded-lg shadow-sm ${ dark ? "bg-gray-900  border-r-0 text-white border-0  " : "bg-white text-gray-900 border border-gray-500"}`}>
            <img
              src={b.img}
              alt={b.name}
              className="rounded-full w-8 h-8 border border-gray-300 "
            />
            <span className="text-sm">
              <span className="font-medium">{b.name}</span> has a birthday today 🎂
            </span>
          </div>
        ))}
      </div>

      {/* Contacts */}
      <div>
        <h3 className="font-semibold text-gray-600 mb-3">Contacts</h3>
        <div className="flex flex-col gap-2">
          {contacts.map((c, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
            >
              <div className="relative">
                <img
                  src={`https://i.pravatar.cc/40?img=${i + 10}`}
                  alt={c}
                  className="w-8 h-8 rounded-full border border-gray-300"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></span>
              </div>
              <span className="text-sm">{c}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

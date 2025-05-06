// "use client";

// import { useEffect, useState } from "react";
// import { format } from "date-fns";
// import Image from "next/image";
// import { assets } from "@/constants/assets";

// type Notification = {
//   id: string;
//   type: string;
//   message: string;
//   read: boolean;
//   createdAt: string;
// };

// export default function NotificationsPage() {
//   const [notifications, setNotifications] = useState<Notification[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch("/api/notifications")
//       .then((res) => {
//         if (!res.ok) throw new Error(`HTTP ${res.status}`);
//         return res.json();
//       })
//       .then((data) => {
//         if (Array.isArray(data)) setNotifications(data);
//         else setNotifications([]);
//       })
//       .catch(() => setNotifications([]))
//       .finally(() => setLoading(false));
//   }, []);

//   const toggleRead = async (id: string, read: boolean) => {
//     await fetch(`/api/notifications/${id}`, {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ read }),
//     });
//     setNotifications((prev) =>
//       prev.map((n) => (n.id === id ? { ...n, read } : n))
//     );
//   };

//   const deleteNotif = async (id: string) => {
//     await fetch(`/api/notifications/${id}`, { method: "DELETE" });
//     setNotifications((prev) => prev.filter((n) => n.id !== id));
//   };

//   if (loading) return <p className="p-6">Loading…</p>;
//   if (notifications.length === 0)
//     return <p className="p-6">No notifications</p>;

//   return (
//     <div className="p-6 space-y-4">
//       <h1 className="text-2xl font-bold flex items-center">
//         <Image
//           src={assets.icons.bell}
//           alt=""
//           width={24}
//           height={24}
//           className="mr-2"
//         />
//         Notifications
//       </h1>

//       <ul className="space-y-2">
//         {notifications.map((n) => (
//           <li
//             key={n.id}
//             className={`relative flex items-start space-x-3 p-4 rounded-lg ${
//               n.read ? "bg-gray-800" : "bg-gray-700"
//             }`}
//           >
//             {/* Icon */}
//             <Image
//               src={assets.icons.bell}
//               alt=""
//               width={20}
//               height={20}
//               className="mt-1"
//             />

//             {/* Message & timestamp */}
//             <div className="flex-1">
//               <p className="text-sm">{n.message}</p>
//               <p className="text-xs text-gray-400">
//                 {format(new Date(n.createdAt), "MMM d, yyyy h:mm a")}
//               </p>
//             </div>

//             {/* Mark as Read/Unread */}
//             <button
//               onClick={() => toggleRead(n.id, !n.read)}
//               className="p-1 hover:bg-gray-600 rounded-full"
//               title={n.read ? "Mark as unread" : "Mark as read"}
//             >
//               <Image
//                 src={n.read ? assets.icons.check : assets.icons.check}
//                 // you can swap to a different icon if you have an “unread” badge
//                 alt={n.read ? "Unread" : "Read"}
//                 width={20}
//                 height={20}
//               />
//             </button>

//             {/* Delete */}
//             <button
//               onClick={() => deleteNotif(n.id)}
//               className="p-1 text-red-400 hover:bg-gray-600 rounded-full"
//               title="Delete notification"
//             >
//               <Image
//                 src={assets.icons.delete}
//                 alt="Delete"
//                 width={16}
//                 height={16}
//               />
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

"use client";

import { useEffect } from "react";
import { format } from "date-fns";
import Image from "next/image";
import { assets } from "@/constants/assets";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import {
  fetchNotifications,
  markNotificationRead,
  deleteNotification,
} from "@/store/slices/notificationSlice";

type Notification = {
  id: string;
  type: string;
  message: string;
  read: boolean;
  createdAt: string;
};

export default function NotificationsPage() {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector((s) => s.notifications.items);
  const loading = useAppSelector((s) => s.notifications.loading);

  useEffect(() => {
    if (!loading) {
      dispatch(fetchNotifications());
    }
  }, [loading]);

  const toggleRead = (id: string, read: boolean) => {
    dispatch(markNotificationRead({ id, read }));
  };

  const deleteNotif = (id: string) => {
    dispatch(deleteNotification(id));
  };

  if (loading) return <p className="p-6">Loading…</p>;
  if (notifications.length === 0)
    return <p className="p-6">No notifications</p>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold flex items-center">
        <Image
          src={assets.icons.bell}
          alt=""
          width={24}
          height={24}
          className="mr-2"
        />
        Notifications
      </h1>

      <ul className="space-y-2">
        {notifications.map((n) => (
          <li
            key={n.id}
            className={`relative flex items-start space-x-3 p-4 rounded-lg ${
              n.read ? "bg-gray-800" : "bg-gray-700"
            }`}
          >
            <Image
              src={assets.icons.bell}
              alt=""
              width={20}
              height={20}
              className="mt-1"
            />

            <div className="flex-1">
              <p className="text-sm">{n.message}</p>
              <p className="text-xs text-gray-400">
                {format(new Date(n.createdAt), "MMM d, yyyy h:mm a")}
              </p>
            </div>

            <button
              onClick={() => toggleRead(n.id, !n.read)}
              className="p-1 hover:bg-gray-600 rounded-full"
              title={n.read ? "Mark as unread" : "Mark as read"}
            >
              <Image
                src={n.read ? assets.icons.check : assets.icons.check}
                alt={n.read ? "Mark unread" : "Mark read"}
                width={20}
                height={20}
              />
            </button>

            <button
              onClick={() => deleteNotif(n.id)}
              className="p-1 text-red-400 hover:bg-gray-600 rounded-full"
              title="Delete notification"
            >
              <Image
                src={assets.icons.delete}
                alt="Delete"
                width={16}
                height={16}
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

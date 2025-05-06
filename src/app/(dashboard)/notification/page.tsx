// // // // "use client";

// // // // import { useEffect, useState } from "react";
// // // // import { format } from "date-fns";

// // // // type Notification = {
// // // //   id: string;
// // // //   type: string;
// // // //   message: string;
// // // //   read: boolean;
// // // //   createdAt: string;
// // // // };

// // // // export default function NotificationPage() {
// // // //   const [notes, setNotes] = useState<Notification[]>([]);
// // // //   const [loading, setLoading] = useState(true);

// // // //   useEffect(() => {
// // // //     fetch("/api/notifications")
// // // //       .then((r) => r.json())
// // // //       .then(setNotes)
// // // //       .finally(() => setLoading(false));
// // // //   }, []);

// // // //   const markRead = async (id: string) => {
// // // //     await fetch(`/api/notifications/${id}`, { method: "PATCH" });
// // // //     setNotes((prev) =>
// // // //       prev.map((n) => (n.id === id ? { ...n, read: true } : n))
// // // //     );
// // // //   };

// // // //   if (loading) return <p className="p-6">Loading…</p>;

// // // //   return (
// // // //     <div className="p-6 space-y-4">
// // // //       <h1 className="text-2xl font-bold">Notifications</h1>
// // // //       {notes.length === 0 ? (
// // // //         <p>No notifications.</p>
// // // //       ) : (
// // // //         <ul className="space-y-4">
// // // //           {notes.map((n) => (
// // // //             <li
// // // //               key={n.id}
// // // //               className={`p-4 rounded-lg shadow ${
// // // //                 n.read ? "bg-gray-100" : "bg-blue-100"
// // // //               } flex justify-between items-start`}
// // // //             >
// // // //               <div>
// // // //                 <p className="font-medium">{n.message}</p>
// // // //                 <p className="text-xs text-gray-600">
// // // //                   {format(new Date(n.createdAt), "MMM d, yyyy, h:mm:ss a")}
// // // //                 </p>
// // // //               </div>
// // // //               {!n.read && (
// // // //                 <button
// // // //                   onClick={() => markRead(n.id)}
// // // //                   className="text-sm text-blue-600 underline"
// // // //                 >
// // // //                   Mark read
// // // //                 </button>
// // // //               )}
// // // //             </li>
// // // //           ))}
// // // //         </ul>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // }

// // // "use client";

// // // import { useEffect, useState } from "react";
// // // import { format } from "date-fns";
// // // import { useRouter } from "next/navigation";

// // // type Notification = {
// // //   id: string;
// // //   message: string;
// // //   type?: string;
// // //   read: boolean;
// // //   createdAt: string;
// // // };

// // // export default function NotificationPage() {
// // //   const [notes, setNotes] = useState<Notification[]>([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const router = useRouter();

// // //   useEffect(() => {
// // //     fetch("/api/notifications")
// // //       .then((res) => {
// // //         if (!res.ok) throw new Error("Failed to load notifications");
// // //         return res.json();
// // //       })
// // //       .then((data: Notification[]) => setNotes(data))
// // //       .catch(console.error)
// // //       .finally(() => setLoading(false));
// // //   }, []);

// // //   if (loading) return <p className="p-6">Loading notifications…</p>;

// // //   return (
// // //     <div className="p-6 space-y-4">
// // //       <h1 className="text-2xl font-bold">Notifications</h1>
// // //       {notes.length === 0 && <p>No notifications</p>}
// // //       <ul className="space-y-3">
// // //         {notes.map((n) => (
// // //           <li
// // //             key={n.id}
// // //             className={`p-4 rounded-lg shadow ${
// // //               n.read ? "bg-gray-200" : "bg-blue-50"
// // //             } cursor-pointer`}
// // //             onClick={async () => {
// // //               if (!n.read) {
// // //                 await fetch(`/api/notifications/${n.id}`, { method: "PATCH" });
// // //                 router.refresh();
// // //               }
// // //             }}
// // //           >
// // //             <p className="font-medium">{n.message}</p>
// // //             <p className="text-xs text-gray-500">
// // //               {format(new Date(n.createdAt), "MMM d, yyyy, h:mm a")}
// // //             </p>
// // //           </li>
// // //         ))}
// // //       </ul>
// // //     </div>
// // //   );
// // // }

// // // src/app/notification/page.tsx
// // "use client";

// // import { useEffect, useState } from "react";
// // import Image from "next/image";
// // import { format } from "date-fns";
// // import { assets } from "@/constants/assets";

// // type Notification = {
// //   id: string;
// //   message: string;
// //   read: boolean;
// //   createdAt: string;
// // };

// // export default function NotificationPage() {
// //   const [notes, setNotes] = useState<Notification[]>([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     fetch("/api/notifications")
// //       .then((res) => {
// //         if (!res.ok) throw new Error("Failed to load notifications");
// //         return res.json();
// //       })
// //       .then((data: Notification[]) => setNotes(data))
// //       .catch(console.error)
// //       .finally(() => setLoading(false));
// //   }, []);

// //   const dismiss = async (id: string) => {
// //     // mark as read/delete on the server
// //     await fetch(`/api/notifications/${id}`, { method: "PATCH" });
// //     setNotes((prev) => prev.filter((n) => n.id !== id));
// //   };

// //   if (loading) {
// //     return <p className="p-6 text-center text-gray-500">Loading…</p>;
// //   }

// //   return (
// //     <div className="p-6 space-y-6">
// //       {/* Header */}
// //       <div className="flex items-center space-x-2">
// //         <Image
// //           src={assets.icons.bell}
// //           alt="Notifications"
// //           width={28}
// //           height={28}
// //         />
// //         <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
// //           Notifications
// //         </h1>
// //       </div>

// //       {/* List */}
// //       <div className="space-y-4">
// //         {notes.length === 0 && (
// //           <p className="text-center text-gray-500 dark:text-gray-400">
// //             You have no notifications.
// //           </p>
// //         )}

// //         {notes.map((n) => (
// //           <div
// //             key={n.id}
// //             className={`
// //               relative flex items-start p-4 rounded-2xl shadow
// //               ${
// //                 n.read
// //                   ? "bg-blue-600 dark:bg-blue-700"
// //                   : "bg-gray-100 dark:bg-gray-800"
// //               }
// //             `}
// //           >
// //             {/* Read icon */}
// //             {n.read && (
// //               <div className="flex-shrink-0 mt-1">
// //                 <Image
// //                   src={assets.icons.check} // ← your green-check asset
// //                   alt="Read"
// //                   width={20}
// //                   height={20}
// //                 />
// //               </div>
// //             )}

// //             {/* Message */}
// //             <div className={`ml-3 flex-1`}>
// //               <p
// //                 className={`${
// //                   n.read ? "text-white" : "text-gray-900 dark:text-gray-100"
// //                 } font-medium`}
// //               >
// //                 {n.message}
// //               </p>
// //               <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
// //                 {format(new Date(n.createdAt), "MMM d, yyyy, h:mm a")}
// //               </p>
// //             </div>

// //             {/* Dismiss button */}
// //             {!n.read && (
// //               <button
// //                 onClick={() => dismiss(n.id)}
// //                 className="absolute top-3 right-3"
// //                 title="Dismiss"
// //               >
// //                 <Image
// //                   src={assets.icons.delete}
// //                   alt="Delete"
// //                   width={20}
// //                   height={20}
// //                   className="hover:opacity-75"
// //                 />
// //               </button>
// //             )}
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // src/app/notifications/page.tsx
// "use client";

// import { useEffect, useState } from "react";
// import { format } from "date-fns";
// import { assets } from "@/constants/assets";
// import Image from "next/image";

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
//         if (!Array.isArray(data)) {
//           console.error("unexpected response shape", data);
//           setNotifications([]);
//         } else {
//           setNotifications(data);
//         }
//       })
//       .catch((err) => {
//         console.error("Failed to load notifications:", err);
//         setNotifications([]);
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   if (loading) {
//     return <p className="p-6">Loading…</p>;
//   }

//   if (notifications.length === 0) {
//     return <p className="p-6">No notifications</p>;
//   }

//   return (
//     <div className="p-6 space-y-4">
//       <h1 className="text-2xl font-bold">Notifications</h1>
//       <ul className="space-y-2">
//         {notifications.map((n) => (
//           <li
//             key={n.id}
//             className={`flex items-start space-x-3 p-4 rounded-lg ${
//               n.read ? "bg-gray-800" : "bg-gray-700"
//             }`}
//           >
//             <Image
//               src={assets.icons.bell}
//               alt=""
//               width={24}
//               height={24}
//               className="mt-1"
//             />
//             <div className="flex-1">
//               <p className="text-sm">{n.message}</p>
//               <p className="text-xs text-gray-400">
//                 {format(new Date(n.createdAt), "MMM d, yyyy HH:mm")}
//               </p>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import Image from "next/image";
import { assets } from "@/constants/assets";

type Notification = {
  id: string;
  type: string;
  message: string;
  read: boolean;
  createdAt: string;
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/notifications")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) setNotifications(data);
        else setNotifications([]);
      })
      .catch(() => setNotifications([]))
      .finally(() => setLoading(false));
  }, []);

  const toggleRead = async (id: string, read: boolean) => {
    await fetch(`/api/notifications/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read }),
    });
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read } : n))
    );
  };

  const deleteNotif = async (id: string) => {
    await fetch(`/api/notifications/${id}`, { method: "DELETE" });
    setNotifications((prev) => prev.filter((n) => n.id !== id));
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
            {/* Icon */}
            <Image
              src={assets.icons.bell}
              alt=""
              width={20}
              height={20}
              className="mt-1"
            />

            {/* Message & timestamp */}
            <div className="flex-1">
              <p className="text-sm">{n.message}</p>
              <p className="text-xs text-gray-400">
                {format(new Date(n.createdAt), "MMM d, yyyy h:mm a")}
              </p>
            </div>

            {/* Mark as Read/Unread */}
            <button
              onClick={() => toggleRead(n.id, !n.read)}
              className="p-1 hover:bg-gray-600 rounded-full"
              title={n.read ? "Mark as unread" : "Mark as read"}
            >
              <Image
                src={n.read ? assets.icons.check : assets.icons.check}
                // you can swap to a different icon if you have an “unread” badge
                alt={n.read ? "Unread" : "Read"}
                width={20}
                height={20}
              />
            </button>

            {/* Delete */}
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

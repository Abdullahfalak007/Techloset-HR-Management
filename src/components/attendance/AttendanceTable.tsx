// src/components/attendance/AttendanceTable.tsx
import Image from "next/image";

type Record = {
  id: string;
  status: string;
  checkIn: string;
  checkOut: string;
  employee: {
    id: string;
    name: string;
    avatar?: string;
    department: string;
    designation: string;
    type: string;
  };
};

export default function AttendanceTable({ records }: { records: Record[] }) {
  return (
    <div className="overflow-auto border border-gray-700 rounded-lg">
      <table className="min-w-full text-white text-sm">
        <thead className="border-b border-gray-700">
          <tr>
            <th className="px-4 py-3 text-left">Employee</th>
            <th className="px-4 py-3 text-left">Designation</th>
            <th className="px-4 py-3 text-left">Type</th>
            <th className="px-4 py-3 text-left">Check In</th>
            <th className="px-4 py-3 text-left">Check Out</th>
            <th className="px-4 py-3 text-left">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {records.map((r) => (
            <tr key={r.id} className="hover:bg-gray-900 transition">
              <td className="px-4 py-3 flex items-center space-x-2">
                <Image
                  src={r.employee.avatar || "/assets/icons/default-avatar.png"}
                  alt="avatar"
                  width={30}
                  height={30}
                  className="rounded-full"
                />
                <span>{r.employee.name}</span>
              </td>
              <td className="px-4 py-3">{r.employee.designation}</td>
              <td className="px-4 py-3">{r.employee.type}</td>
              <td className="px-4 py-3">{r.checkIn}</td>
              <td className="px-4 py-3">{r.checkOut}</td>
              <td className="px-4 py-3">
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    r.status === "ON_TIME"
                      ? "bg-green-600"
                      : r.status === "LATE"
                      ? "bg-yellow-600"
                      : "bg-red-600"
                  } text-white`}
                >
                  {r.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

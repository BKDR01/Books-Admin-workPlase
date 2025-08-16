import React, { useEffect, useState } from "react";
import { getAllLikes, getUserById } from "../../api/auth";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/uz";

dayjs.extend(relativeTime);
dayjs.locale("uz");

export default function Likes() {
  const [likes, setLikes] = useState([]);
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(true);
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllLikes();
        setLikes(res.data || []);

        const userIds = [...new Set(res.data.map(like => like.userId))];
        const userData = await Promise.all(
          userIds.map(async id => {
            try {
              const r = await getUserById(id);
              return { id, name: r.data?.fullName || r.data?.name || "No name" };
            } catch {
              return { id, name: "Unknown" };
            }
          })
        );

        const userMap = Object.fromEntries(userData.map(u => [u.id, u.name]));
        setUsers(userMap);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center py-5 text-gray-500">Loading...</div>;

  return (
    <div className="max-w-[1128px] w-full mx-auto px-4">
      <div className="shadow-lg rounded-md bg-white p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Likes:</h2>
          <div className="flex items-center bg-gray-200 rounded-md">
            <button onClick={() => setYear(year - 1)} className="text-blue-500 px-3 text-xl font-bold">{"<"}</button>
            <span className="px-6 py-1 text-lg font-semibold">{year}</span>
            <button onClick={() => setYear(year + 1)} className="text-blue-500 px-3 text-xl font-bold">{">"}</button>
          </div>
        </div>

        <table className="w-full bg-white rounded-md border-collapse">
          <thead>
            <tr className="bg-[#D1D1D6] text-black text-sm">
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">User</th>
              <th className="py-3 px-4 text-left">Book name</th>
              <th className="py-3 px-4 text-left">Passed</th>
              <th className="py-3 px-4 text-center">Like</th>
            </tr>
          </thead>
          <tbody>
            {likes.filter(like => dayjs(like.createdAt).year() === year).map((like, idx) => (
              <tr key={idx} className={`border-b hover:bg-gray-50 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                <td className="py-3 px-4">{dayjs(like.createdAt).format("DD MMM YYYY")}</td>
                <td className="py-3 px-4">{users[like.userId] || "Unknown"}</td>
                <td className="py-3 px-4">{like.book?.title || "No title"}</td>
                <td className="py-3 px-4 text-gray-500">{dayjs(like.createdAt).fromNow()}</td>
                <td className="py-3 px-4 text-center text-red-500 font-semibold">❤️ {like.likesCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

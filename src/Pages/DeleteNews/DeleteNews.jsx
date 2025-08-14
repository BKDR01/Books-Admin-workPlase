import React, { useEffect, useState } from "react";
import { getAllAdminNews, deleteNews } from "../../api/auth";
import News from "./../News/News.jsx";

const LANGUAGES = [
  { label: "Barcha tillar", value: "ALL" },
  { label: "O‘zbekcha", value: "UZ" },
  { label: "Русский", value: "RU" },
  { label: "English", value: "EN" },
];

export default function DeleteNews() {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showNews, setShowNews] = useState(false);
  const [selectedLang, setSelectedLang] = useState("ALL");

  const fetchNews = async () => {
    setLoading(true);
    try {
      const langParam = selectedLang === "ALL" ? undefined : selectedLang;

      const res = await getAllAdminNews({
        page: 1,
        limit: 1000,
        language: langParam,
        t: Date.now(),
      });

      console.log("📦 API’dan kelgan ma’lumot:", res?.data?.data);

      const allNews = res?.data?.data || [];
      setNewsList(allNews);
      setError(allNews.length ? null : "Yangiliklar topilmadi.");
    } catch {
      setError("Yangiliklarni yuklashda xatolik yuz berdi.");
      setNewsList([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const targetNews = newsList.find((n) => n.id === id);
    if (!targetNews) return alert("Yangilik topilmadi");

    if (!window.confirm("Rostdan ham ushbu yangilik va unga bog‘liq barcha tillarni o‘chirmoqchimisiz?")) return;

    const groupId = targetNews.groupId || targetNews.id;

    try {
      // Avval state ichidan olib tashlaymiz (UI darhol yangilanadi)
      setNewsList((prev) => prev.filter((n) => (n.groupId || n.id) !== groupId));

      // Keyin ketma-ket o‘chiramiz
      const relatedNews = newsList.filter((n) => (n.groupId || n.id) === groupId);
      for (const n of relatedNews) {
        await deleteNews(n.id);
      }

      alert("Yangilik va unga bog‘liq barcha tillar o‘chirildi.");
    } catch {
      alert("Xatolik yuz berdi. Iltimos, server ishlayotganligini tekshiring.");
    }
  };


  useEffect(() => { fetchNews(selectedLang); }, [selectedLang]);

  return (
    <div className="bg-white rounded-xl py-6 px-6 max-w-4xl w-full mx-auto">
      <button
        onClick={() => setShowNews((p) => !p)}
        className="text-gray-500 hover:text-black text-2xl font-bold"
        aria-label={showNews ? "Yashirish" : "Ko‘rsatish"}
      >
        {showNews ? "−" : "+"}
      </button>
      {showNews && (
        <div>
          <News onlyForm />
        </div>
      )}
      <div className="bg-white rounded-xl shadow-md py-6 px-6 max-w-4xl w-full mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Yangiliklarni o‘chirish</h2>
          <div className="flex items-center gap-4">
            <select
              value={selectedLang}
              onChange={(e) => setSelectedLang(e.target.value)}
              className="border rounded px-3 py-1"
            >
              {LANGUAGES.map(({ label, value }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>

          </div>
        </div>
        {loading && <p className="text-center text-gray-500">Yuklanmoqda...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}
        {!loading && !error && newsList.length > 0 && (
          <ul className="space-y-4">
            {newsList.map(({ id, title, language, thumbnail, images }) => (
              <li key={id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg shadow-sm">
                <div className="flex items-center gap-3">
                  <img
                    src={thumbnail || images?.[0] || "/placeholder.jpg"}
                    alt={title}
                    className="w-12 h-12 rounded-full object-cover border"
                  />
                  <div>
                    <p className="font-semibold">{title}</p>
                    <span className="text-sm text-gray-500">{language}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(id)}
                  className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition-colors"
                >
                  O‘chirish
                </button>
              </li>
            ))}
          </ul>
        )}


      </div>
    </div>

  );
}

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { addNews } from '../../api/auth';
import NewsForm from '../../Components/NewsForm/NewsForm.jsx';
import ImageUploader from '../../Components/ImageUploader/ImageUploader.jsx';
import download from '../../assets/IMG/download.png';

const LANGUAGES = [
  { code: 'UZ', label: 'O‘zbekcha' },
  { code: 'RU', label: 'Русский' },
  { code: 'EN', label: 'English' },
];

export default function News() {
  const [activeLang, setActiveLang] = useState('UZ');
  const [thumbnail, setThumbnail] = useState(null);
  const [gallery, setGallery] = useState([]);
  const forms = LANGUAGES.reduce((acc, { code }) => ({ ...acc, [code]: useForm() }), {});

  const handleFiles = (files, type) => {
    const images = files.filter(f => f.type.startsWith('image/'))
                        .map(f => ({ file: f, url: URL.createObjectURL(f) }));

    if (type === 'thumbnail') {
      setThumbnail(images[0] || null);
    } else {
      const updated = [...gallery, ...images];
      setGallery(updated);
      updateFileInput('galleryInput', updated);
    }
  };

  const updateFileInput = (id, files) => {
    const dt = new DataTransfer();
    files.forEach(i => dt.items.add(i.file));
    document.getElementById(id).files = dt.files;
  };

  const removeGalleryImage = (index) => {
    const updated = gallery.filter((_, i) => i !== index);
    setGallery(updated);
    updateFileInput('galleryInput', updated);
  };

  const validateForms = () => {
    if (!thumbnail?.file) return "Thumbnail tanlanmagan";
    if (!gallery.length) return "Galereya rasmi yuklang";

    for (let { code, label } of LANGUAGES) {
      const { title, context, publication_date } = forms[code].getValues();
      if (!title || !context || !publication_date)
        return `${label} tilidagi ma'lumotlar to‘liq emas`;
    }
    return null;
  };

  const onSubmit = async () => {
    const error = validateForms();
    if (error) return alert(error);

    try {
      for (let { code } of LANGUAGES) {
        const { title, context, source, publication_date } = forms[code].getValues();
        const fd = new FormData();
        fd.append("thumbnail", thumbnail.file);
        gallery.forEach(img => fd.append("images", img.file));
        fd.append("title", title);
        fd.append("context", context);
        fd.append("source", source || "");
        fd.append("language", code);
        fd.append("publication_date", new Date(publication_date).toISOString().split("T")[0]);
        fd.append("active", true);
        await addNews(fd);
      }
      alert("Barcha tillardagi yangiliklar qo‘shildi");
    } catch (e) {
      alert("Xatolik: " + (e.response?.data?.message || "Server xatosi"));
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md py-6 px-6 max-w-4xl w-full mx-auto">
      {/* Language Tabs */}
      <div className="flex gap-3 mb-6">
        {LANGUAGES.map(({ code, label }) => (
          <button
            key={code}
            onClick={() => setActiveLang(code)}
            className={`px-4 py-2 border rounded ${activeLang === code ? 'bg-[#6E39CB] text-white' : 'border-[#6E39CB] text-[#6E39CB]'}`}
          >
            {label}
          </button>
        ))}
      </div>

      {LANGUAGES.map(({ code }) =>
        activeLang === code && (
          <form key={code} onSubmit={e => e.preventDefault()}>
            <NewsForm
              register={forms[code].register}
              control={forms[code].control}
              errors={forms[code].formState.errors}
            />
          </form>
        )
      )}

      <ImageUploader
        thumbnail={thumbnail}
        galleryImages={gallery}
        handleFiles={handleFiles}
        removeGalleryImage={removeGalleryImage}
        download={download}
      />

      <div className="flex items-center gap-4 mt-6 justify-end">
        <button
          type="button"
          className='px-6 py-2 border-2 rounded-md border-[#6E39CB] text-[#6E39CB] hover:bg-[#f3f0ff] transition'
          onClick={() => window.location.reload()}
        >
          Cancel
        </button>
        <button
          type="button"
          className='px-6 py-2 bg-[#6E39CB] text-white rounded-md hover:bg-[#5834b4] transition'
          onClick={onSubmit}
        >
          Create News
        </button>
      </div>
    </div>
  );
}

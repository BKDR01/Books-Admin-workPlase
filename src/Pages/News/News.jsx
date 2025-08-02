import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { addNews } from '../../api/auth';
import NewsForm from './../../Components/NewsForm/NewsForm.jsx';
import ImageUploader from './../../Components/ImageUploader/ImageUploader.jsx';
import download from './../../assets/IMG/download.png';

// Frontendda kichik harflar bilan ishlaymiz
const languages = ['uz', 'ru', 'en'];
const langLabels = { uz: 'O‘zbekcha', ru: 'Русский', en: 'English' };

function News() {
    const [activeLang, setActiveLang] = useState('uz');
    const [thumbnail, setThumbnail] = useState(null);
    const [galleryImages, setGalleryImages] = useState([]);
    const [forms, setForms] = useState({
        uz: useForm(),
        ru: useForm(),
        en: useForm(),
    });

    const handleFiles = (files, type) => {
        const imageFiles = files.filter(file => file.type.startsWith('image/'));
        const previews = imageFiles.map(file => ({ file, url: URL.createObjectURL(file) }));

        if (type === 'thumbnail') {
            setThumbnail(previews[0]);
        } else {
            const updated = [...galleryImages, ...previews];
            setGalleryImages(updated);

            const dataTransfer = new DataTransfer();
            updated.forEach(item => dataTransfer.items.add(item.file));
            document.getElementById('galleryInput').files = dataTransfer.files;
        }
    };

    const validateLanguageInput = (text, lang) => {
        const patterns = {
            uz: /^[\u0400-\u04FF\s\w.,!?'"«»()-]+$/,
            ru: /^[А-Яа-яЁё\s.,!?'"«»()-]+$/,
            en: /^[A-Za-z0-9\s.,!?'"()-]+$/,
        };
        return patterns[lang].test(text);
    };

    const onSubmit = async () => {
        try {
            for (let lang of languages) {
                const values = forms[lang].getValues();

                if (!values.title || !values.context) {
                    alert(`${langLabels[lang]} tilidagi sarlavha yoki tavsif bo‘sh bo‘lmasligi kerak`);
                    return;
                }

                if (!values.publication_date) {
                    alert(`${langLabels[lang]} tilidagi sana bo‘sh bo‘lmasligi kerak`);
                    return;
                }

                const formData = new FormData();
                formData.append("title", values.title);
                formData.append("context", values.context);
                formData.append("publication_date", new Date(values.publication_date).toISOString().split("T")[0]);
                formData.append("source", values.source || "");
                formData.append("language", lang.toUpperCase()); // 🔥 Bu yerda toUpperCase muhim
                formData.append("active", true);

                if (thumbnail?.file) {
                    formData.append("thumbnail", thumbnail.file);
                } else {
                    alert("Thumbnail rasm tanlanmagan");
                    return;
                }

                if (galleryImages.length) {
                    galleryImages.forEach(img => formData.append("images", img.file));
                }

                const response = await addNews(formData);
                console.log(`✅ ${langLabels[lang]} tilida muvaffaqiyatli qo‘shildi`, response.data);
            }

            alert("Barcha tillarda yangilik muvaffaqiyatli qo‘shildi");

        } catch (error) {
            console.error("❌ Error:", error);
            if (error.response) {
                console.log("🔴 Server response:", error.response.data);
                alert("Xatolik yuz berdi: " + (error.response.data.message?.[0] || "Boshqa xatolik"));
            }
        }
    };

    const removeGalleryImage = (index) => {
        const updated = galleryImages.filter((_, i) => i !== index);
        setGalleryImages(updated);

        const dataTransfer = new DataTransfer();
        updated.forEach(item => dataTransfer.items.add(item.file));
        document.getElementById('galleryInput').files = dataTransfer.files;
    };

    return (
        <div className="bg-white rounded-xl shadow-md py-6 px-6 max-w-4xl w-full mx-auto">
            {/* Til Tanlash */}
            <div className="flex gap-3 mb-6">
                {languages.map((lang) => (
                    <button
                        key={lang}
                        onClick={() => setActiveLang(lang)}
                        className={`px-4 py-2 border rounded ${activeLang === lang ? 'bg-[#6E39CB] text-white' : 'border-[#6E39CB] text-[#6E39CB]'}`}
                    >
                        {langLabels[lang]}
                    </button>
                ))}
            </div>

            {/* Har bir til uchun form */}
            {languages.map((lang) => (
                activeLang === lang && (
                    <form key={lang} onSubmit={forms[lang].handleSubmit(() => { })}>
                        <NewsForm
                            register={forms[lang].register}
                            control={forms[lang].control}
                            errors={forms[lang].formState.errors}
                            validateInput={(value) =>
                                validateLanguageInput(value, lang) || `Siz ${langLabels[lang]} tilida yozishingiz kerak`
                            }
                        />
                    </form>
                )
            ))}

            {/* Rasm yuklash */}
            <ImageUploader
                thumbnail={thumbnail}
                galleryImages={galleryImages}
                handleFiles={handleFiles}
                removeGalleryImage={removeGalleryImage}
                download={download}
            />

            {/* Submit va Cancel tugmalari */}
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

export default News;

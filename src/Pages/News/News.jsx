import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { addNews } from '../../api/auth';
import NewsForm from './../../Components/NewsForm/NewsForm.jsx';
import ImageUploader from './../../Components/ImageUploader/ImageUploader.jsx';
import download from './../../assets/IMG/download.png';

function News() {
    const { register, handleSubmit, control, reset, formState: { errors } } = useForm();
    const [thumbnail, setThumbnail] = useState(null);
    const [galleryImages, setGalleryImages] = useState([]);

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("context", data.context);
            formData.append("publication_date", data.publication_date.toISOString());
            formData.append("source", data.source || "");
            formData.append("language", data.language);
            formData.append("active", true);
            if (thumbnail) formData.append("thumbnail", thumbnail.file);
            galleryImages.forEach((img) => formData.append("images", img.file));

            const response = await addNews(formData);
            console.log("✅ News added successfully:", response.data);
        } catch (error) {
            console.error("❌ Error:", error);
            if (error.response) {
                console.log("🔴 Server response:", error.response.data);
            }
        }
    };

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

    const removeGalleryImage = (index) => {
        const updated = galleryImages.filter((_, i) => i !== index);
        setGalleryImages(updated);

        const dataTransfer = new DataTransfer();
        updated.forEach(item => dataTransfer.items.add(item.file));
        document.getElementById('galleryInput').files = dataTransfer.files;
    };

    return (
        <div className="bg-white rounded-xl shadow-md py-6 px-6 max-w-4xl w-full mx-auto">
            <form onSubmit={handleSubmit(onSubmit)}>
                <NewsForm register={register} control={control} errors={errors} />
                <ImageUploader
                    thumbnail={thumbnail}
                    galleryImages={galleryImages}
                    handleFiles={handleFiles}
                    removeGalleryImage={removeGalleryImage}
                    download={download}
                />
                <div className="flex items-center gap-4 mt-6 justify-end">
                    <button type="button" className='px-6 py-2 border-2 rounded-md border-[#6E39CB] text-[#6E39CB] hover:bg-[#f3f0ff] transition'>
                        Cancel
                    </button>
                    <button type="submit" className='px-6 py-2 bg-[#6E39CB] text-white rounded-md hover:bg-[#5834b4] transition'>
                        Create News
                    </button>
                </div>
            </form>
        </div>
    );
}

export default News;

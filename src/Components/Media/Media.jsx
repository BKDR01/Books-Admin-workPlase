import React, { useRef, useState } from 'react';
import upload from './../../assets/IMG/upload.png';

function Media({ onClose, onSelectImage }) {
    const fileInputRef = useRef(null);
    const [preview, setPreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    const handleBrowseClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const imageUrl = URL.createObjectURL(file);
        setPreview(imageUrl);
        setImageFile(imageUrl);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (!file) return;

        const imageUrl = URL.createObjectURL(file);
        setPreview(imageUrl);
        setImageFile(imageUrl);
    };

    const handleDragOver = (e) => e.preventDefault();

    const handleNext = () => {
        if (imageFile) {
            onSelectImage(imageFile);
            onClose(); // faqat componentni yopadi
        }
    };

    return (
        <div className="bg-white rounded-lg p-6 w-full max-w-[700px] mx-auto">
            <div className="text-right">
                <button
                    onClick={onClose}
                    className="text-gray-500 text-xl font-bold"
                >
                    ×
                </button>
            </div>

            <h1 className="text-4xl text-center">Media</h1>
            <div
                className="w-full h-[200px] border-4 border-dashed border-[#2F80ED] rounded-[10px] mt-[40px] flex flex-col items-center justify-center cursor-pointer"
                onClick={handleBrowseClick}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                {preview ? (
                    <img
                        src={preview}
                        alt="Preview"
                        className="h-full object-contain"
                    />
                ) : (
                    <>
                        <img src={upload} alt="Upload Icon" className="w-[50px] h-[50px]" />
                        <h2 className="text-[16px] pt-[10px] text-center">
                            Drop your image here or{' '}
                            <span className="text-[#2F80ED] underline">Browse</span>
                        </h2>
                        <p className="text-[#89868D] text-[14px] pt-[10px] text-center">
                            Support: JPG, JPEG, PNG
                        </p>
                    </>
                )}
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                />
            </div>

            <div className="text-right">
                <button
                    className="px-8 py-2 bg-[#2F80ED] text-white rounded-md mt-6"
                    onClick={handleNext}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default Media;

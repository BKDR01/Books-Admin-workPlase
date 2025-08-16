import React, { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { IoMdCloudDownload } from "react-icons/io";
import useBookStore from '../../store/useBookStore';
import { ProgressBar } from 'primereact/progressbar';

const FormBlock = ({ index, items, format, books, handleFileAdd, handleFileRemove, files, onChange }) => {

    const formData = useBookStore((state) => state.formDataList[index]);

    const [uploadProgress, setUploadProgress] = useState({ image: 0, file: 0 });

    const handleInput = (key, value) => {
        onChange(index, key, value);
    };

    const handleFileAddWithProgress = (type, uploadedFile) => {
        handleFileAdd(index, type, uploadedFile);

        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            setUploadProgress(prev => ({
                ...prev,
                [type]: progress
            }));

            if (progress >= 100) {
                clearInterval(interval);
                setUploadProgress(prev => ({
                    ...prev,
                    [type]: 100
                }));
            }
        }, 300);
    };

    return (
        <div className="mt-[24px] pt-[24px] border-t border-[#e5e7eb]">
            <div className="flex items-center justify-between flex-wrap">
                <label className="flex flex-wrap w-[330px] gap-[12px] text-[#3A3541] text-[14px]">
                    Book Name
                    <input
                        type="text"
                        value={formData?.bookName || ''}
                        className="w-[330px] py-[13px] pl-[10px] text-[14px] rounded-[8px] bg-[#F4F5F9] border border-[#DBDCDE] focus:outline-0"
                        onChange={(e) => {
                            handleInput('bookName', e.target.value)
                        }}
                    />
                </label>
                <label className="flex flex-wrap w-[150px] gap-[12px] text-[#3A3541] text-[14px]">
                    Number of pages
                    <input
                        type="number"
                        value={Number(formData?.pages) || ''}
                        className="w-[150px] py-[13px] pl-[10px] text-[14px] rounded-[8px] bg-[#F4F5F9] border border-[#DBDCDE] focus:outline-0"
                        placeholder="123"
                        onChange={(e) => {
                            handleInput('pages', Number(e.target.value))
                        }}
                    />
                </label>
                <label className="flex flex-wrap w-[150px] gap-[12px] text-[#3A3541] text-[14px]">
                    Language
                    <Dropdown
                        value={formData?.language || null}
                        onChange={(e) => {
                            handleInput('language', e.value)
                        }}
                        options={items}
                        placeholder="Select Language"
                        className="w-[150px] py-[13px] pl-[10px] bg-[#F4F5F9] border border-[#DBDCDE] rounded-[8px]"
                    />
                </label>
                <div className='flex w-full justify-between my-6'>
                    <label className="flex flex-wrap w-[330px] gap-[12px] text-[#3A3541] text-[14px]">
                        Book format
                        <Dropdown
                            value={formData?.format || null}
                            onChange={(e) => {
                                handleInput('format', e.value)
                            }}
                            options={format}
                            placeholder="Select Format"
                            className="w-[330px] py-[13px] pl-[10px] bg-[#F4F5F9] border border-[#DBDCDE] rounded-[8px]"
                        />
                    </label>
                    <label className="flex flex-wrap w-[330px] gap-[12px] text-[#3A3541] text-[14px]">
                        Book
                        <Dropdown
                            value={formData?.book || null}
                            onChange={(e) => {
                                handleInput('book', e.value)
                            }}
                            options={books}
                            placeholder="Select Book"
                            className="w-[330px] py-[13px] pl-[10px] bg-[#F4F5F9] border border-[#DBDCDE] rounded-[8px]"
                        />
                    </label>
                </div>
                <div className='flex justify-between w-full'>
                    <label className="flex flex-wrap flex-col w-[45%] gap-[12px] text-[#3A3541] text-[14px]">
                        Published Year
                        <input
                            type="number"
                            value={Number(formData?.publishedYear) || ''}
                            className="w-[150px] py-[13px] pl-[10px] text-[14px] rounded-[8px] bg-[#F4F5F9] border border-[#DBDCDE] focus:outline-0"
                            placeholder="2000"
                            onChange={(e) => {
                                handleInput('publishedYear', Number(e.target.value))
                            }}
                        />
                    </label>
                    <label className="flex flex-wrap w-[330px] gap-[12px] text-[#3A3541] text-[14px]">
                        Author
                        <input
                            type="text"
                            value={formData?.author || ''}
                            className="w-[100%] py-[13px] pl-[10px] text-[14px] rounded-[8px] bg-[#F4F5F9] border border-[#DBDCDE] focus:outline-0"
                            onChange={(e) => handleInput('author', e.target.value)}
                        />
                    </label>
                </div>
                <label className="flex flex-wrap w-[100%] gap-[12px] text-[#3A3541] text-[14px] mt-6">
                    Description
                    <textarea
                        rows={3}
                        value={formData?.description || ''}
                        className="w-full py-[10px] px-[10px] text-[14px] rounded-[8px] resize-none bg-[#F4F5F9] border border-[#DBDCDE] focus:outline-0"
                        onChange={(e) => handleInput('description', e.target.value)}
                    />
                </label>
            </div>
            <div className="mt-[24px] bg-[#F4F5F9] rounded-[8px] w-[100%] px-[30px] py-[18px]">
                <p className="text-[14px] mb-[30px]">Starting File</p>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <label className="border-2 border-dashed border-[#6E39CB] rounded-lg p-6 text-center cursor-pointer hover:bg-[#6E39CB]/5">
                        <input
                            type="file"
                            accept="image/*"
                            name='image'
                            className="hidden"
                            onChange={(e) => {
                                if (e.target.files?.[0]) {
                                    handleFileAddWithProgress('image', e.target.files[0]);
                                }
                            }}
                        />
                        <p className="text-[#6E39CB] text-xl mb-1 flex justify-center">
                            <IoMdCloudDownload />
                        </p>
                        <p className="text-sm text-[#6E39CB]">
                            <span className="underline font-medium">Click to upload</span> or drag and drop<br />
                            <span className="text-xs text-gray-500">SVG, PNG, JPG (max 800x400px)</span>
                        </p>
                    </label>
                    <label className="border-2 border-dashed border-[#6E39CB] rounded-lg p-6 text-center cursor-pointer hover:bg-[#6E39CB]/5">
                        <input
                            type="file"
                            accept=".pdf,.epub,.azw3,.doc"
                            className="hidden"
                            name='file'
                            onChange={(e) => {
                                if (e.target.files?.[0]) {
                                    handleFileAddWithProgress('file', e.target.files[0]);
                                }
                            }}
                        />
                        <p className="text-[#6E39CB] text-xl mb-1 flex justify-center">
                            <IoMdCloudDownload />
                        </p>
                        <p className="text-sm text-[#6E39CB]">
                            <span className="underline font-medium">Click to upload</span> or drag and drop<br />
                            <span className="text-xs text-gray-500">PDF, EPUB, AZW3 or DOC (max 10 mb)</span>
                        </p>
                    </label>
                </div>
                {files[index] && (
                    <div className="mt-4 grid grid-cols-2 gap-4">
                        {['image', 'file'].map((type) => (
                            files[index][type] && (
                                <div
                                    key={type}
                                    className="flex items-center gap-4 p-3 border rounded-lg bg-white shadow-sm relative group"
                                >
                                    {/* Preview or icon */}
                                    {type === 'image' ? (
                                        <img
                                            src={URL.createObjectURL(files[index][type])}
                                            alt="preview"
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                    ) : (
                                        <div className="w-16 h-16 flex items-center justify-center bg-red-100 rounded">
                                            <span className="text-red-600 font-bold text-lg">
                                                {files[index][type].name.split('.').pop().toUpperCase()}
                                            </span>
                                        </div>
                                    )}

                                    {/* File information */}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">
                                            {files[index][type].name}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {(files[index][type].size / 1024).toFixed(0)} Kb
                                        </p>

                                        {/* PrimeReact ProgressBar komponenti */}
                                        <div className="flex items-center gap-2 mt-1">
                                            <ProgressBar
                                                value={uploadProgress[type]}
                                                showValue={false}
                                                className="w-full h-2 rounded bg-red-400"
                                            />
                                            <span className="text-xs text-gray-600">{uploadProgress[type]}%</span>
                                        </div>
                                    </div>

                                    {/* Remove button */}
                                    {uploadProgress[type] >= 100 && (
                                        <button
                                            onClick={() => handleFileRemove(index, type)}
                                            className="absolute top-1 right-1 bg-black/50 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
                                        >
                                            ✖
                                        </button>
                                    )}
                                </div>
                            )
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FormBlock;
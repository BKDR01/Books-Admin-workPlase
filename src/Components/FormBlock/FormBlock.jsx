import React from 'react';
import { Dropdown } from 'primereact/dropdown';
import { IoMdCloudDownload } from "react-icons/io";
import { Calendar } from 'primereact/calendar';
import useBookStore from '../../store/useBookStore';

const FormBlock = ({ index, items, format, books, handleFileAdd, handleFileRemove, files, onChange }) => {

    const formData = useBookStore((state) => state.formDataList[index]);

    const handleInput = (key, value) => {
        onChange(index, key, value);
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
                        onChange={(e) => handleInput('bookName', e.target.value)}
                    />
                </label>
                <label className="flex flex-wrap w-[150px] gap-[12px] text-[#3A3541] text-[14px]">
                    Number of pages
                    <input
                        type="number"
                        value={Number(formData?.pages) || ''}
                        className="w-[150px] py-[13px] pl-[10px] text-[14px] rounded-[8px] bg-[#F4F5F9] border border-[#DBDCDE] focus:outline-0"
                        placeholder="123"
                        onChange={(e) => handleInput('pages', e.target.value)}
                    />
                </label>
                <label className="flex flex-wrap w-[150px] gap-[12px] text-[#3A3541] text-[14px]">
                    Language
                    <Dropdown
                        value={formData?.language || null}
                        onChange={(e) => handleInput('language', e.value)}
                        options={items}
                        placeholder="Select Language"
                        className="w-[150px] bg-[#F4F5F9] border border-[#DBDCDE] rounded-[8px]"
                    />
                </label>
                <div className="w-[100%] flex flex-wrap gap-[30px] mt-[53px]">
                    <label className="flex flex-wrap w-[330px] gap-[12px] text-[#3A3541] text-[14px]">
                        Book format
                        <Dropdown
                            value={formData?.format || null}
                            onChange={(e) => handleInput('format', e.value)}
                            options={format}
                            placeholder="Select Format"
                            className="w-[330px] bg-[#F4F5F9] border border-[#DBDCDE] rounded-[8px]"
                        />
                    </label>
                    <label className="flex flex-wrap w-[330px] gap-[12px] text-[#3A3541] text-[14px]">
                        Book
                        <Dropdown
                            value={formData?.book || null}
                            onChange={(e) => handleInput('book', e.value)}
                            options={books}
                            placeholder="Select Book"
                            className="w-[330px] bg-[#F4F5F9] border border-[#DBDCDE] rounded-[8px]"
                        />
                    </label>
                    <label className="flex flex-wrap w-[45%] gap-[12px] text-[#3A3541] text-[14px]">
                        Published Year
                        <Calendar
                            dateFormat="mm/dd/yy"
                            placeholder="MM/DD/YYYY"
                            mask="99/99/9999"
                            value={formData?.publishedYear ? new Date(formData.publishedYear) : null}
                            onChange={(e) => handleInput('publishedYear', e.value?.toISOString() || '')}
                            className="w-full mt-[10px]"
                            inputClassName="bg-[#F4F5F9] text-[#3A3541] border border-[#DBDCDE] rounded-[8px] px-3 py-2 h-[46px] w-full focus:outline-none"
                        />
                    </label>
                    <label className="flex flex-wrap w-[45%] gap-[12px] text-[#3A3541] text-[14px]">
                        Author
                        <input
                            type="text"
                            value={formData?.author || ''}
                            className="w-[330px] py-[13px] pl-[10px] text-[14px] rounded-[8px] bg-[#F4F5F9] border border-[#DBDCDE] focus:outline-0"
                            onChange={(e) => handleInput('author', e.target.value)}
                        />
                    </label>
                    <label className="flex flex-wrap w-[100%] gap-[12px] text-[#3A3541] text-[14px]">
                        Description
                        <textarea
                            rows={3}
                            value={formData?.description || ''}
                            className="w-full py-[10px] px-[10px] text-[14px] rounded-[8px] resize-none bg-[#F4F5F9] border border-[#DBDCDE] focus:outline-0"
                            onChange={(e) => handleInput('description', e.target.value)}
                        />
                    </label>
                </div>
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
                                    handleFileAdd(index, 'image', e.target.files[0]);
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
                                    handleFileAdd(index, 'file', e.target.files[0]);
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
                    <div className="mb-6 space-y-2">
                        {['image', 'file'].map((type) => (
                            files[index][type] && (
                                <div
                                    key={type}
                                    className="flex items-center justify-between px-4 py-2 bg-gray-500 rounded-lg"
                                >
                                    <span className="text-sm text-white truncate w-64">
                                        {files[index][type].name}
                                    </span>
                                    <button
                                        onClick={() => handleFileRemove(index, type)}
                                        className="text-red-300 hover:text-red-600"
                                    >
                                        X
                                    </button>
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
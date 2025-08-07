import React, { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { IoMdCloudDownload } from "react-icons/io";
import { Calendar } from 'primereact/calendar';

const FormBlock = ({ index, language, format, category, handleFileAdd, handleFileRemove, files, dataForm, onChange }) => {


    const handleInputChange = (field, value) => {
        onChange({ ...dataForm, [field]: value });
    };

    return (
        <div className="mt-[24px] pt-[24px]">
            <div className="flex items-center justify-between flex-wrap">
                
                {/* ------------------------------------------------- */}
                <label className="flex flex-wrap w-[330px] gap-[12px] text-[#3A3541] text-[14px]">
                    Book Name
                    <input type="text" value={dataForm.title}
                        onChange={(e) => handleInputChange('title', e.target.value)} className="w-[330px] py-[13px] pl-[10px] text-[14px] rounded-[8px] bg-[#F4F5F9] border border-[#DBDCDE] focus:outline-0" />
                </label>
                {/* ------------------------------------------------- */}

                <label className="flex flex-wrap w-[150px] gap-[12px] text-[#3A3541] text-[14px]">
                    Number of pages
                    <input onChange={(e) => handleInputChange('pages', e.target.value)} type="number" className="w-[150px] py-[13px] pl-[10px] text-[14px] rounded-[8px] bg-[#F4F5F9] border border-[#DBDCDE] focus:outline-0" placeholder="123" />
                </label>
                {/* ------------------------------------------------- */}

                <label className="flex flex-wrap w-[150px] gap-[12px] text-[#3A3541] text-[14px]">
                    Language
                    <Dropdown
                        value={dataForm.language}
                        onChange={(e) => handleInputChange('language', e.value)}
                        options={language}
                        placeholder="Select Item"
                        className="w-[150px] py-[13px] pl-[10px] text-[14px] rounded-[8px] bg-[#F4F5F9] border border-[#DBDCDE] focus:outline-0"
                    />
                </label>
                {/* ------------------------------------------------- */}

                <div className="w-[100%] flex flex-wrap gap-[30px] mt-[53px]">

                    {/* ------------------------------------------------- */}
                    <label className="flex flex-wrap w-[330px] gap-[12px] text-[#3A3541] text-[14px]">
                        Book format
                        <Dropdown
                            value={dataForm.format}
                            onChange={(e) => handleInputChange('format', e.value)}
                            options={format}
                            placeholder="Select Item"
                            className="w-[330px] py-[13px] pl-[10px] text-[14px] rounded-[8px] bg-[#F4F5F9] border border-[#DBDCDE] focus:outline-0"
                        />
                    </label>
                    {/* ------------------------------------------------- */}

                    {/* ------------------------------------------------- */}
                    <label className="flex flex-wrap w-[330px] gap-[12px] text-[#3A3541] text-[14px]">
                        Book category
                        <Dropdown
                            value={dataForm.category}
                            onChange={(e) => handleInputChange('category', e.value)}
                            options={category}
                            placeholder="Select Item"
                            className="w-[330px] py-[13px] pl-[10px] text-[14px] rounded-[8px] bg-[#F4F5F9] border border-[#DBDCDE] focus:outline-0"
                        />
                    </label>
                    {/* ------------------------------------------------- */}


                    {/* ------------------------------------------------- */}
                    <label className="flex flex-wrap w-[50%] gap-[12px] text-[#3A3541] text-[14px]">
                        Published Year
                        <Calendar
                            value={dataForm.publishedYear}
                            dateFormat="mm/dd/yy"
                            placeholder="MM/DD/YYYY"
                            onChange={(e) => handleInputChange('publishedYear', e.value)}
                            mask="99/99/9999"
                            className="w-full mt-[10px]"
                            inputClassName="bg-[#F4F5F9] text-[#3A3541] border-2 border-[#DBDCDE] rounded-md px-3 py-1 h-[46px] w-full focus:outline-none"
                        />
                    </label>
                    {/* ------------------------------------------------- */}

                    {/* ------------------------------------------------- */}
                    <label className="flex flex-wrap w-[45%] gap-[12px] text-[#3A3541] text-[14px]">
                        Author
                        <input onChange={(e) => handleInputChange('author', e.target.value)}
                            type="text" className="w-[330px] py-[13px] pl-[10px] text-[14px] rounded-[8px] bg-[#F4F5F9] border border-[#DBDCDE] focus:outline-0" />
                    </label>
                    {/* ------------------------------------------------- */}

                    {/* ------------------------------------------------- */}
                    <label className='w-[100%]'>
                        Description
                        <textarea
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            className='mt-[10px] w-full h-52 py-[13px] resize-none pl-[10px] text-[14px] rounded-[8px] bg-[#F4F5F9] border border-[#DBDCDE] focus:outline-0'></textarea>
                    </label>
                    {/* ------------------------------------------------- */}

                </div>
            </div>

            <div className='mt-[24px] bg-[#F4F5F9] rounded-[8px] w-[100%] px-[30px] py-[18px]'>
                <p className="text-[14px] mb-[30px]">Starting File</p>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <label className="border-2 border-dashed border-[#6E39CB] rounded-lg p-6 text-center cursor-pointer hover:bg-[#6E39CB]/5">
                        {/* ------------------------------------------------- */}

                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleInputChange('image', e.target.files[0])} />
                        {/* ------------------------------------------------- */}

                        <p className="text-[#6E39CB] text-xl mb-1 flex justify-center"><IoMdCloudDownload /></p>
                        <p className="text-sm text-[#6E39CB]">
                            <span className="underline font-medium">Click to upload</span> or drag and drop<br />
                            <span className="text-xs text-gray-500">SVG, PNG, JPG (max 800x400px)</span>
                        </p>
                    </label>

                    <label className="border-2 border-dashed border-[#6E39CB] rounded-lg p-6 text-center cursor-pointer hover:bg-[#6E39CB]/5">
                        {/* ------------------------------------------------- */}
                        <input type="file"
                            accept=".pdf,.epub,.azw3,.doc"
                            className="hidden"
                            onChange={(e) => handleInputChange('file', e.target.files[0])} />
                        {/* ------------------------------------------------- */}

                        <p className="text-[#6E39CB] text-xl mb-1 flex justify-center"><IoMdCloudDownload /></p>
                        <p className="text-sm text-[#6E39CB]">
                            <span className="underline font-medium">Click to upload</span> or drag and drop<br />
                            <span className="text-xs text-gray-500">PDF, EPUB, AZW3 or DOC (max 10 mb)</span>
                        </p>
                    </label>
                </div>

                {files[index] && files[index].length > 0 && (
                    <div className="mb-6 space-y-2">
                        {files[index].map((file, idx) => (
                            <div key={idx} className="flex items-center justify-between px-4 py-2 bg-gray-500 rounded-lg">
                                <span className="text-sm text-white truncate w-64">{file.name}</span>
                                <button onClick={() => handleFileRemove(index, idx)} className="text-red-500 hover:text-red-700">X</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FormBlock
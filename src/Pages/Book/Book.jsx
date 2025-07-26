import React, { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { IoMdCloudDownload } from "react-icons/io";

const FormBlock = ({ index, items, format, books, handleFileAdd, handleFileRemove, files }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedFrom, setSelectedFrom] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);

  return (
    <div className="mt-[24px] pt-[24px]">
      <div className="flex items-center justify-between flex-wrap">
        <label className="flex flex-wrap w-[330px] gap-[12px] text-[#3A3541] text-[14px]">
          Book Name
          <input type="text" className="w-[330px] py-[13px] pl-[10px] text-[14px] rounded-[8px] bg-[#F4F5F9] border border-[#DBDCDE] focus:outline-0" />
        </label>

        <label className="flex flex-wrap w-[150px] gap-[12px] text-[#3A3541] text-[14px]">
          Number of pages
          <input type="number" className="w-[150px] py-[13px] pl-[10px] text-[14px] rounded-[8px] bg-[#F4F5F9] border border-[#DBDCDE] focus:outline-0" placeholder="123" />
        </label>

        <label className="flex flex-wrap w-[150px] gap-[12px] text-[#3A3541] text-[14px]">
          Language
          <Dropdown
            value={selectedItem}
            onChange={(e) => setSelectedItem(e.value)}
            options={items}
            placeholder="Select Item"
            className="w-[150px] py-[13px] pl-[10px] text-[14px] rounded-[8px] bg-[#F4F5F9] border border-[#DBDCDE] focus:outline-0"
          />
        </label>

        <div className="w-[100%] flex gap-[30px] mt-[53px]">
          <label className="flex flex-wrap w-[330px] gap-[12px] text-[#3A3541] text-[14px]">
            Book format
            <Dropdown
              value={selectedFrom}
              onChange={(e) => setSelectedFrom(e.value)}
              options={format}
              placeholder="Select Item"
              className="w-[330px] py-[13px] pl-[10px] text-[14px] rounded-[8px] bg-[#F4F5F9] border border-[#DBDCDE] focus:outline-0"
            />
          </label>

          <label className="flex flex-wrap w-[330px] gap-[12px] text-[#3A3541] text-[14px]">
            Book
            <Dropdown
              value={selectedBook}
              onChange={(e) => setSelectedBook(e.value)}
              options={books}
              placeholder="Select Item"
              className="w-[330px] py-[13px] pl-[10px] text-[14px] rounded-[8px] bg-[#F4F5F9] border border-[#DBDCDE] focus:outline-0"
            />
          </label>
        </div>
      </div>

      <div className='mt-[24px] bg-[#F4F5F9] rounded-[8px] w-[100%] px-[30px] py-[18px]'>
        <p className="text-[14px] mb-[30px]">Starting File</p>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <label className="border-2 border-dashed border-[#6E39CB] rounded-lg p-6 text-center cursor-pointer hover:bg-[#6E39CB]/5">
            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileAdd(index, e.target.files[0])} />
            <p className="text-[#6E39CB] text-xl mb-1 flex justify-center"><IoMdCloudDownload /></p>
            <p className="text-sm text-[#6E39CB]">
              <span className="underline font-medium">Click to upload</span> or drag and drop<br />
              <span className="text-xs text-gray-500">SVG, PNG, JPG (max 800x400px)</span>
            </p>
          </label>

          <label className="border-2 border-dashed border-[#6E39CB] rounded-lg p-6 text-center cursor-pointer hover:bg-[#6E39CB]/5">
            <input type="file" accept=".pdf,.epub,.azw3,.doc" className="hidden" onChange={(e) => handleFileAdd(index, e.target.files[0])} />
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

const Book = () => {
  const [formList, setFormList] = useState([{}]);
  const [files, setFiles] = useState({});

  const items = [
    { label: 'Uzbekcha', value: 'uz' },
    { label: 'Ruscha', value: 'ru' },
    { label: 'Inglizcha', value: 'en' },
    { label: 'Arabcha', value: 'ar' },
  ];

  const format = [
    { label: 'PDF', value: 'pdf' },
    { label: 'SVG', value: 'svg' },
    { label: 'PNG', value: 'png' },
    { label: 'JPG', value: 'jpg' },
  ];

  const books = [
    { label: 'Baddiy adabiyotlar' },
    { label: 'Rus adabiyotlar' },
    { label: 'O’zbek adabiyotlari' },
    { label: 'Prezident asarlari' },
    { label: 'Hikoyalar' },
  ];

  const handleAdd = () => {
    setFormList([...formList, {}]);
  };

  const handleFileAdd = (formIndex, file) => {
    const updated = { ...files };
    updated[formIndex] = [...(updated[formIndex] || []), file];
    setFiles(updated);
  };

  const handleFileRemove = (formIndex, fileIndex) => {
    const updated = { ...files };
    updated[formIndex].splice(fileIndex, 1);
    setFiles({ ...updated });
  };

  return (
    <div className="w-[750px] p-[30px] rounded-[8px] bg-white shadow-[0_0_4px_0_#00000026] mx-auto font-[Lato]">
      <div>
        <h2 className="text-[20px] font-medium">Book project</h2>
        <p className="text-[12.64px] text-[#89868D] mt-[10px]">Create new Book</p>
      </div>

      {formList.map((_, index) => (
        <FormBlock
          key={index}
          index={index}
          items={items}
          format={format}
          books={books}
          handleFileAdd={handleFileAdd}
          handleFileRemove={handleFileRemove}
          files={files}
        />
      ))}

      <div className='mt-[24px] flex justify-end'>
        <div className='w-[215px] flex justify-end flex-wrap'>
          <button onClick={handleAdd} className='w-[70px] h-[32px] text-white bg-[#6E39CB] rounded-[4px]'>+ Add</button>
          <div className='w-[215px] flex gap-[15px] mt-[127px]'>
            <button className='w-[100px] h-[32px] text-[12px] rounded-[4px] border border-[#6E39CB]'>Cancel</button>
            <button className='w-[100px] h-[32px] text-[12px] rounded-[4px] bg-[#6E39CB] text-white'>Create project</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;

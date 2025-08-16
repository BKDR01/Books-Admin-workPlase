import React, { useState } from 'react';
import useBookStore from './../../store/useBookStore.js';
import FormBlock from './../FormBlock/FormBlockAdd.jsx';
import { addBook } from '../../api/auth.js';
const API_BASE = 'https://lib.qaxramonov.uz/api/v1/admin/books';

function AddBook({ onClose, onUpdate }) {
 const {
    formDataList,
    files,
    addForm,
    updateFormData,
    addFile,
    removeFile,
    resetAll,
  } = useBookStore();

  const items = [
    { label: 'Uzbekcha', value: 'UZ' },
    { label: 'Ruscha', value: 'RU' },
    { label: 'Inglizcha', value: 'EN' },
  ];

  const format = [
    { label: 'PDF', value: 'pdf' },
    { label: 'SVG', value: 'svg' },
    { label: 'PNG', value: 'png' },
    { label: 'JPG', value: 'jpg' },
  ];

  // CORRECTED: Updated book categories to match server-side validation.
  const books = [
    { label: 'Badiiy adabiyotlar', value: 'Badiiy_Adabiyotlar' },
    { label: 'Rus adabiyotlar', value: 'Rus_Adabiyotlar' },
    { label: 'O’zbek adabiyotlari', value: 'Ozbek_Adabiyotlari' },
    { label: 'Prezident asarlari', value: 'Prezident_asarlari' },
    { label: 'Hikoyalar', value: 'Hikoyalar' },
  ];

  const postBookData = async () => {
    try {
      for (let i = 0; i < formDataList.length; i++) {
        const form = formDataList[i];
        const currentFiles = files[i];

        const formData = new FormData();
        formData.append("title", form.bookName || '');
        formData.append("language", form.language || '');
        formData.append("format", form.format || '');
        formData.append("pages", form.pages || '');
        formData.append("category", form.book || '');
        formData.append("publishedYear", form.publishedYear);

        formData.append("author", form.author || '');
        formData.append("description", form.description || '');

        // CORRECTED: Add the required 'active' boolean field
        formData.append("active", true); // Or false, depending on the desired default

        // Append files if they exist
        if (currentFiles?.file) formData.append("file", currentFiles.file);
        if (currentFiles?.image) formData.append("image", currentFiles.image);

        // Await each upload call
        await addBook(formData);
      }

      alert('All books uploaded successfully!');
      resetAll();
    } catch (err) {
      console.error('❌ Error uploading:', err);
      if (err.response) {
        console.error('Server response data:', err.response.data);
        console.error('Server response status:', err.response.status);
      }
      alert('Error uploading books!');
    }
  };

  return (
    <div className="w-[750px] p-[30px] rounded-[8px] bg-white shadow-[0_0_4px_0_#00000026] mx-auto font-[Lato]">
      <div>
        <h2 className="text-[20px] font-medium">Book project</h2>
        <p className="text-[12.64px] text-[#89868D] mt-[10px]">Create new Book</p>
      </div>

      {formDataList.map((_, index) => (
        <FormBlock
          key={index}
          index={index}
          items={items}
          format={format}
          books={books}
          handleFileAdd={addFile}
          handleFileRemove={removeFile}
          files={files}
          onChange={updateFormData}
        />
      ))}

      <div className="mt-[24px] flex justify-end">
        <div className="w-[215px] flex justify-end flex-wrap">
          <button
            onClick={addForm}
            className="w-[70px] h-[32px] text-white bg-[#6E39CB] rounded-[4px]"
          >
            + Add
          </button>
          <div className="w-[215px] flex gap-[15px] mt-[10px]">
            <button
              onClick={resetAll}
              className="w-[100px] h-[32px] text-[12px] rounded-[4px] border border-[#6E39CB]"
            >
              Cancel
            </button>
            <button
              onClick={postBookData}
              className="w-[100px] h-[32px] text-[12px] rounded-[4px] bg-[#6E39CB] text-white"
            >
              Create project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddBook;
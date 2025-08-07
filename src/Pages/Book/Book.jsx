import React, { useState } from 'react';
import FormBlock from '../../Components/FormBlock/FormBlock';
import axios from 'axios';

const Book = () => {
  const [formDataList, setFormDataList] = useState([{}]);
  const [files, setFiles] = useState({});
  const yourToken = localStorage.getItem('token');

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

  const books = [
    { label: 'Baddiy adabiyotlar', value: 'Baddiy adabiyotlar' },
    { label: 'Rus adabiyotlar', value: 'Rus adabiyotlar' },
    { label: 'O’zbek adabiyotlari', value: 'O’zbek adabiyotlari' },
    { label: 'Prezident asarlari', value: 'Prezident asarlari' },
    { label: 'Hikoyalar', value: 'Hikoyalar' },
  ];

  // Добавление новой формы
  const handleAdd = () => {
    setFormDataList([...formDataList, {}]);
  };

  // Добавление файла
  const handleFileAdd = (formIndex, file) => {
    const updated = { ...files };
    updated[formIndex] = [...(updated[formIndex] || []), file];
    setFiles(updated);
  };

  // Удаление файла
  const handleFileRemove = (formIndex, fileIndex) => {
    const updated = { ...files };
    if (!updated[formIndex]) return;
    updated[formIndex].splice(fileIndex, 1);
    setFiles({ ...updated });
  };

  // Изменение данных формы
  const handleFormDataChange = (index, key, value) => {
    const updated = [...formDataList];
    updated[index] = { ...updated[index], [key]: value };
    setFormDataList(updated);
  };

  // Отправка данных
  const postBookData = async () => {
    try {
      const formData = new FormData();

      formDataList.forEach((form, i) => {
        for (const key in form) {
          if (form[key] !== undefined && form[key] !== null) {
            formData.append(`books[${i}][${key}]`, form[key]);
          }
        }

        if (files[i]) {
          files[i].forEach((file) => {
            formData.append(`books[${i}][files][]`, file);
          });
        }
      });

      console.log('📦 FormData to send:');
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      const res = await axios.post(
        'https://lib.qaxramonov.uz/api/v1/admin/books/add',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${yourToken}`,
          },
        }
      );

      console.log('✅ Success:', res.data);
      alert('Books uploaded successfully!');
      // Очистка после отправки
      setFormDataList([{}]);
      setFiles({});
    } catch (err) {
      console.error('❌ Error uploading:', err);
      alert('Error uploading books!');
    }
  };

  return (
    <div className="w-[750px] p-[30px] rounded-[8px] bg-white shadow-[0_0_4px_0_#00000026] mx-auto font-[Lato]">
      <div>
        <h2 className="text-[20px] font-medium">Book project</h2>
        <p className="text-[12.64px] text-[#89868D] mt-[10px]">Create new Book</p>
      </div>

      {/* Все формы */}
      {formDataList.map((_, index) => (
        <FormBlock
          key={index}
          index={index}
          items={items}
          format={format}
          books={books}
          handleFileAdd={handleFileAdd}
          handleFileRemove={handleFileRemove}
          files={files}
          onChange={handleFormDataChange}
        />
      ))}

      {/* Кнопки */}
      <div className="mt-[24px] flex justify-end">
        <div className="w-[215px] flex justify-end flex-wrap">
          <button
            onClick={handleAdd}
            className="w-[70px] h-[32px] text-white bg-[#6E39CB] rounded-[4px]"
          >
            + Add
          </button>
          <div className="w-[215px] flex gap-[15px] mt-[127px]">
            <button
              onClick={() => {
                setFormDataList([{}]);
                setFiles({});
              }}
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
};

export default Book;

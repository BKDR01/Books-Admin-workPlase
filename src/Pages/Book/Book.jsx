import React, { useEffect, useState } from 'react';
import FormBlock from '../../Components/FormBlock/FormBlock';
import { addBook } from '../../api/auth';

const Book = () => {

  const [formList, setFormList] = useState([
    {
      title: '',
      pages: '',
      language: '',
      format: '',
      category: '',
      publishedYear: '',
      author: '',
      description: '',
      image: null,
      file: null
    }
  ]);

  const [files, setFiles] = useState({});

  const handleAdd = () => {
    setFormList([...formList, {
      title: '',
      pages: '',
      language: '',
      format: '',
      category: '',
      publishedYear: '',
      author: '',
      description: '',
      image: null,
      file: null
    }]);
  };

  const handleChangeForm = (index, updatedForm) => {
    const updatedList = [...formList];
    updatedList[index] = updatedForm;
    setFormList(updatedList);
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

  const postBookData = async () => {
    try {
      for (let form of formList) {
        const formData = new FormData();
        formData.append('title', form.title);
        formData.append('pages', form.pages);
        formData.append('language', form.language);
        formData.append('format', form.format);
        formData.append('category', form.category);
        formData.append('publishedYear', form.publishedYear?.toISOString?.() || '');
        formData.append('author', form.author);
        formData.append('description', form.description);
        if (form.image) formData.append('image', form.image);
        if (form.file) formData.append('file', form.file);

        await addBook(formData);
      }

      console.log('✅ All books uploaded successfully');
    } catch (error) {
      console.error('❌ Upload error:', error);
    }
  };

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
    { label: 'Baddiy adabiyotlar', value: 'badiiy' },
    { label: 'Rus adabiyotlar', value: 'rus' },
    { label: 'O’zbek adabiyotlari', value: 'uzbek' },
    { label: 'Prezident asarlari', value: 'prezident' },
    { label: 'Hikoyalar', value: 'hikoya' },
  ];
  return (
    <div className="w-[750px] p-[30px] rounded-[8px] bg-white shadow-[0_0_4px_0_#00000026] mx-auto font-[Lato]">
      <div>
        <h2 className="text-[20px] font-medium">Book project</h2>
        <p className="text-[12.64px] text-[#89868D] mt-[10px]">Create new Book</p>
      </div>

      {formList.map((form, index) => (
        <FormBlock
          key={index}
          index={index}
          dataForm={form}
          language={items}
          format={format}
          category={books}
          handleFileAdd={handleFileAdd}
          handleFileRemove={handleFileRemove}
          files={files}
          onChange={(updated) => handleChangeForm(index, updated)}
        />
      ))}

      <div className='mt-[24px] flex justify-end'>
        <div className='w-[215px] flex justify-end flex-wrap'>
          <button onClick={handleAdd} className='w-[70px] h-[32px] text-white bg-[#6E39CB] rounded-[4px]'>+ Add</button>
          <div className='w-[215px] flex gap-[15px] mt-[127px]'>
            <button className='w-[100px] h-[32px] text-[12px] rounded-[4px] border border-[#6E39CB]'>Cancel</button>
            <button onClick={postBookData} className='w-[100px] h-[32px] text-[12px] rounded-[4px] bg-[#6E39CB] text-white'>Create project</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;

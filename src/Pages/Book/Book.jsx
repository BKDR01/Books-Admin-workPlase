import React, { useState } from 'react';
import FormBlock from '../../Components/FormBlock/FormBlock';

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

  const handleSubmitBookData = () => {
    

  }

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

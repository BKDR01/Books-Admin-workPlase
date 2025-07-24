import React from 'react';

function InputForm({ label, type, placeholder, register, name, required = false }) {
  return (
    <div className="w-full">
      <label className="text-[#3A3541] text-[20px] block mb-2">
        {label}
      </label>
      <input
        {...register(name, { required })}
        type={type}
        placeholder={placeholder}
        className="bg-[#F4F5F9] text-[#3A3541] border border-[#DBDCDE] rounded-md px-3 py-[10px] h-[46px] w-full outline-none focus:border-[#3B82F6]"
      />
    </div>
  );
}

export default InputForm;

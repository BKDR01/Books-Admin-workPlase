import React from 'react';
import upload from './../../assets/IMG/upload.png';

function Media({ onClose }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-[600px] relative">
                <button
                    className="absolute top-2 right-2 text-gray-500 text-xl hover:text-red-500"
                    onClick={onClose}
                >
                    ×
                </button>

                <h1 className='text-4xl text-center'>Media</h1>

                <div className="w-full h-[200px] border-4 border-dashed border-[#2F80ED] rounded-[10px] mt-[40px]">
                    <img src={upload} alt="" className='mx-auto mt-[40px]' />
                    <h2 className='text-center text-[16px] pt-[10px]'>
                        Drop your image here or <span className='text-[#2F80ED]'><a href="">Browse</a></span>
                    </h2>
                    <p className='text-[#89868D] text-center text-[14px] pt-[10px]'>Support: JPG, JPEG, PNG</p>
                </div>

                <button className='px-8 py-2 bg-[#2F80ED] text-white rounded-md mt-6 float-right'>
                    Next
                </button>
            </div>
        </div>
    );
}

export default Media;

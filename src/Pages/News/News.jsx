import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Calendar } from 'primereact/calendar';
import download from './../../assets/IMG/download.png';

function News() {
    const { register, handleSubmit, control } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            const input = document.getElementById('fileUploadInput');
            input.files = dataTransfer.files;
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-md py-6 px-6 max-w-4xl w-[800px] mx-auto">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1 className='text-2xl'>News</h1>
                <p className='text-[#89868D] pt-[10px]'>Create news</p>

                <div className="flex items-center justify-between mt-[30px] w-[690px]">
                    <div>
                        <h1 className='text-[#3A3541]'>News Title</h1>
                        <input
                            type="text"
                            {...register('title')}
                            className='w-[330px] h-[46px] bg-[#F4F5F9] border-2 rounded-md border-[#DBDCDE] mt-[10px] focus:outline-none focus:border-transparent'
                        />
                    </div>
                    <div className="w-[330px]">
                        <label className="text-[#3A3541] block">News Date</label>
                        <Controller
                            name="newsDate"
                            control={control}
                            render={({ field }) => (
                                <Calendar
                                    value={field.value || null}
                                    onChange={(e) => field.onChange(e.value)}
                                    dateFormat="mm/dd/yy"
                                    placeholder="MM/DD/YYYY"
                                    mask="99/99/9999"
                                    className="w-full mt-[10px]"
                                    inputClassName="bg-[#F4F5F9] text-[#3A3541] border-2 border-[#DBDCDE] rounded-md px-3 py-1 h-[46px] w-full focus:outline-none"
                                />
                            )}
                        />
                    </div>
                </div>

                <div className="mt-[30px]">
                    <h1 className='text-[#3A3541]'>New Text</h1>
                    <textarea
                        {...register('text')}
                        className='w-[690px] h-[334px] mt-[10px] border-2 rounded-md border-[#DBDCDE] bg-[#F4F5F9] text-2xl focus:outline-none focus:border-transparent resize-none'>
                    </textarea>
                </div>

                <div className="w-[690px] h-[220px] bg-[#F4F5F9] mt-[20px] border-2 rounded-md border-[#DBDCDE]">
                    <h1 className='text-black pt-[10px] pl-[30px]'>Starting File</h1>
                    <div
                        className="w-[630px] h-[125px] border-3 rounded-md border-dashed border-[#6E39CB] mx-auto mt-[25px]"
                        onDrop={handleDrop}
                        onDragOver={(e) => e.preventDefault()}
                    >
                        <img
                            src={download}
                            alt="Upload"
                            className='mx-auto mt-[10px] cursor-pointer'
                            onClick={() => document.getElementById('fileUploadInput').click()}
                        />

                        <div>
                            <h1 className='text-center pt-[10px]'>
                                <span className='text-[#6E39CB]'>Click to upload</span> or drag and drop
                            </h1>
                            <h1 className='text-center'>SVG, PNG, JPG or GIF</h1>
                            <p className='text-[#89868D] text-center'>(max, 800x400px)</p>
                        </div>

                        <input
                            type="file"
                            id="fileUploadInput"
                            {...register('file')}
                            className="hidden"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-[15px] mt-[25px] justify-end">
                    <button
                        type="button"
                        className='px-[40px] py-[10px] border-2 rounded-md border-[#6E39CB] text-[#6E39CB]'>
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className='px-[20px] py-[11px] bg-[#6E39CB] text-white rounded-md'>
                        Create project
                    </button>
                </div>
            </form>
        </div>
    );
}

export default News;

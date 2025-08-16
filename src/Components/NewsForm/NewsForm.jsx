import React from 'react';
import { Controller } from 'react-hook-form';
import { Calendar } from 'primereact/calendar';

function NewsForm({ register, control, errors }) {
    return (
        <>
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h1 className='text-2xl'>News</h1>
                    <p className='text-[#89868D] pt-[10px]'>Create news</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div>
                    <label className='text-[#3A3541]'>Yangilik nomi</label>
                    <input
                        type="text"
                        {...register('title', { required: 'Sarlavha kiritilishi shart' })}
                        className='w-full h-[46px] bg-[#F4F5F9] border-2 rounded-md border-[#DBDCDE] mt-2 focus:outline-none px-3'
                    />
                    {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                </div>
                <div>
                    <label className="text-[#3A3541] block">Sanasi</label>
                    <Controller
                        name="publication_date"
                        control={control}
                        rules={{ required: 'Sanani tanlang' }}
                        render={({ field }) => (
                            <Calendar
                                value={field.value || null}
                                onChange={(e) => field.onChange(e.value)}
                                dateFormat="mm/dd/yy"
                                placeholder="MM/DD/YYYY"
                                mask="99/99/9999"
                                className="w-full mt-2"
                                inputClassName="bg-[#F4F5F9] text-[#3A3541] border-2 border-[#DBDCDE] rounded-md px-3 py-1 h-[46px] w-full focus:outline-none"
                            />
                        )}
                    />
                    {errors.publication_date && <p className="text-red-500 text-sm">{errors.publication_date.message}</p>}
                </div>
                <div>
                    <label className='text-[#3A3541]'>Manbasi</label>
                    <input
                        type="text"
                        {...register('source', { required: 'Manba kiritilishi shart' })}
                        className='w-full h-[46px] bg-[#F4F5F9] border-2 rounded-md border-[#DBDCDE] mt-2 focus:outline-none px-3'
                    />
                    {errors.source && <p className="text-red-500 text-sm">{errors.source.message}</p>}
                </div>
            </div>

            <div className="mt-6">
                <label className='text-[#3A3541]'>Habar tavsifi</label>
                <textarea
                    {...register('context', { required: 'Tavsif kiritilishi shart' })}
                    className='w-full h-[200px] mt-2 border-2 rounded-md border-[#DBDCDE] bg-[#F4F5F9] p-2 text-sm focus:outline-none resize-none'
                ></textarea>
                {errors.context && <p className="text-red-500 text-sm">{errors.context.message}</p>}
            </div>
        </>
    );
}

export default NewsForm;
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Calendar } from 'primereact/calendar';
import InputForm from './../../Components/InputForm/InputForm.jsx';
import Media from './../Media/Media.jsx';

import user from './../../assets/Mask group (4).png';
import qalam from './../../assets/IMG/Frame 1000003195.png';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

function Detalis() {
  const [showMedia, setShowMedia] = useState(false);
  const [selectedImage, setSelectedImage] = useState(user);

  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      ism: '',
      familiya: '',
      email: '',
      tugilganKuni: null,
      shahar: '',
      pochtaKodi: ''
    }
  });

  const onSubmit = (data) => console.log(data);
  const handleImageSelect = (image) => setSelectedImage(image);

  return (
    <div className="max-w-[700px] mx-auto">
      <div className="text-center pt-8">
        <h1 className="text-[#3A3541] text-3xl">Keling, asosiy ma'lumotlardan boshlaylik</h1>
        <p className="text-[#3A3541] text-sm pt-5">
          Ismingiz va elektron pochta manzilingizni bizga xabar bering. Boshqa foydalanuvchilar siz bilan bog'lanishlari uchun to'g'ri ma'lumot kiriting.
        </p>
      </div>
      <div className="flex items-center gap-7 mt-12">
        <div className="relative">
          <img src={selectedImage} alt="User" className="w-24 h-24 rounded-full border-4 border-gray-300 object-cover" />
          <img
            src={qalam}
            alt="Tahrirlash"
            className="absolute w-6 h-6 cursor-pointer"
            style={{ bottom: '12px', right: '-1px' }}
            onClick={() => setShowMedia(true)}
          />
        </div>
        <div>
          <h2 className="text-2xl text-[#3A3541]">Profil fotosurati</h2>
          <p className="text-[#89868D] pt-3">Bu sizning profilingizda ko'rsatiladi.</p>
        </div>
      </div>

      {showMedia && (
        <Media
          onClose={() => setShowMedia(false)}
          onSelectImage={handleImageSelect}
        />
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-6">

        <div className="flex gap-7">
          <InputForm label="Ism" name="ism" placeholder="Ismingiz" type="text" register={register} />
          <InputForm label="Familiya" name="familiya" placeholder="Familiyangiz" type="text" register={register} />
        </div>

        <div className="flex gap-7">
          <InputForm label="Email manzil" name="email" placeholder="Email manzil" type="email" register={register} />
          <div className="w-full">
            <label className="text-[#3A3541] text-[20px] block mb-2">Tug'ilgan kuni</label>
            <Controller
              name="tugilganKuni"
              control={control}
              render={({ field }) => (
                <Calendar
                  value={field.value || null}
                  onChange={(e) => field.onChange(e.value)}
                  dateFormat="mm/dd/yy"
                  placeholder="MM/DD/YYYY"
                  mask="99/99/9999"
                  className="w-full"
                  inputClassName="bg-[#F4F5F9] text-[#3A3541] border border-[#DBDCDE] rounded-md px-3 py-1 text-xs h-8 w-full focus:outline-none"
                />
              )}
            />
          </div>
        </div>

        <div className="flex gap-7">
          <InputForm label="Shahar" name="shahar" placeholder="Shahar" type="text" register={register} />
          <InputForm label="Pochta kodi" name="pochtaKodi" placeholder="Pochta kodi" type="text" register={register} />
        </div>

        <div className="text-right pt-5">
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md">
            Saqlash
          </button>
        </div>
      </form>
    </div>
  );
}
export default Detalis;
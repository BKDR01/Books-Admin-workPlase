import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import user from './../../assets/Mask group (4).png';
import qalam from './../../assets/IMG/Frame 1000003195.png';
import InputForm from './../../Components/InputForm/InputForm.jsx';
import { Calendar } from 'primereact/calendar';
import Media from './../Media/Media.jsx';
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

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="max-w-[700px] mx-auto">
      <div className="text-center pt-[30px]">
        <h1 className="text-[#3A3541] text-3xl">Keling, asosiy ma'lumotlardan boshlaylik</h1>
        <p className="text-[#3A3541] text-[14.22px] pt-[20px]">
          Ismingiz va elektron pochta manzilingizni bizga xabar bering. Siz bo'lmagan manzildan foydalaning
          boshqa foydalanuvchilar siz bilan bog'lanishlarini unutmang
        </p>
      </div>

      <div className="flex items-center gap-7 mt-[50px]">
        <div className="relative inline-block">
          <img src={selectedImage} alt="User" className="w-24 h-24 rounded-full border-[4px] border-gray-300" />
          <img
            src={qalam}
            alt="Qalamcha"
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 relative w-full max-w-[600px]">
            <button
              onClick={() => setShowMedia(false)}
              className="absolute top-2 right-2 text-gray-600 text-xl font-bold"
            >
              &times;
            </button>
            <Media onClose={() => setShowMedia(false)} onSelectImage={setSelectedImage} />
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-6">
        <div className="flex gap-[30px]">
          <InputForm
            label="Ism"
            type="text"
            placeholder="Ismingiz"
            register={register}
            name="ism"
          />
          <InputForm
            label="Familiya"
            type="text"
            placeholder="Familiyangiz"
            register={register}
            name="familiya"
          />
        </div>

        <div className="flex gap-[30px]">
          <InputForm
            label="Email manzil"
            type="email"
            placeholder="Email manzil"
            register={register}
            name="email"
          />
          <div className="w-full">
            <label className="text-[#3A3541] text-[20px] block mb-2">
              Tug'ilgan kuni
            </label>
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
                  showIcon={false}
                  showButtonBar={false}
                  className="w-full"
                  inputClassName="bg-[#F4F5F9] text-[#3A3541] border border-[#DBDCDE] rounded-md px-3 py-1 text-xs h-8 w-full focus:outline-none focus:border-[#DBDCDE] focus:ring-0 focus:shadow-none"
                  panelClassName="!text-xs !p-1 !m-0 [&_.p-datepicker-calendar]:text-[10px] [&_.p-datepicker-calendar]:leading-[1] [&_.p-datepicker-calendar]:p-0 [&_.p-datepicker-calendar]:m-0 [&_.p-datepicker-calendar]:gap-1"
                />
              )}
            />
          </div>
        </div>

        <div className="flex gap-[30px]">
          <InputForm
            label="Shahar"
            type="text"
            placeholder="Shahar"
            register={register}
            name="shahar"
          />
          <InputForm
            label="Pochta kodi"
            type="text"
            placeholder="Pochta kodi"
            register={register}
            name="pochtaKodi"
          />
        </div>

        <div className="text-right pt-5">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
          >
            Saqlash
          </button>
        </div>
      </form>
    </div>
  );
}

export default Detalis;

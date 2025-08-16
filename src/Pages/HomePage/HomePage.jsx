import ChartCircle from '../../Components/Chart/ChartCircle';

const HomePage = () => {

  return (
    <div className="bg-white rounded-xl shadow-md py-6 px-6 w-[980px] mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-black">Statistika</h2>
        <button className="bg-green-500 text-white px-4 py-2 rounded-md shadow hover:bg-green-600 transition">
          + Add widget
        </button>
      </div>

      <div className='w-full flex justify-center'>
        <ChartCircle />
      </div>

    </div>
  );
};

export default HomePage;

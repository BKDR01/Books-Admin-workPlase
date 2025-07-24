import Diogramma from './../../assets/IMG/Diagram.png';

const HomePage = () => {
  return (
    <>
      <div className="bg-white rounded-xl shadow-md py-6 px-6 max-w-4xl w-[968px] mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-black">Statistika</h2>
          <button className="bg-green-500 text-white px-4 py-2 rounded-md shadow hover:bg-green-600 transition">
            + Add widget
          </button>
        </div>

        <img src={Diogramma} className='mx-auto w-[60%]' alt="" />

        <div className="flex justify-center gap-12 mt-8">
          <div className="flex items-center gap-2">
            <div className="w-[71px] h-[71px] rounded-full bg-[#A84069] "></div>
            <span className="text-[30px] font-medium text-black">Likes</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-[71px] h-[71px] rounded-full bg-[#4CD964]"></div>
            <span className="text-[30px] font-medium text-black">Books</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-[71px] h-[71px] rounded-full bg-[#8D43FF] "></div>
            <span className="text-[30px] font-medium text-black">News</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage

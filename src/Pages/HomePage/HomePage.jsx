import React from 'react'
import Diogramma from './../../assets/IMG/Diagram.png';
import Amaki from './../../assets/IMG/15.png';
import { IoSearchSharp } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import notifikation from './../../assets/IMG/notifications.png';

const HomePage = () => {
  return (
    <>
      <header className='bg-[#F1F1F1] h-[100vh]'>
        <nav className='w-[100%] flex items-center justify-between px-[23px] py-[12px] border bg-white'>
          <div className='flex items-center gap-[33px] '>
            <div className='flex items-center gap-[17px]'>
              <img src={Amaki} alt="" />
              <h2 className='text-[24px]'>Xajiqurbonov.A</h2>
            </div>
            <div className='flex items-center'>
              <IoSearchSharp className='absolute text-[#2F80ED] ' />
              <input className='ml-[23px] focus:outline-0' type="text" placeholder='Quick search' />
            </div>
          </div>
          <div>
            <img src={notifikation} alt="" />
          </div>
        </nav>

        <div className='flex'>
          <div>

            <div className='w-[256px] py-[24px] px-[24px] bg-white mt-[16px] rounded-[14px] flex flex-wrap gap-[10px]'>
              <div className='w-[216px] flex gap-[24px] pl-[14px] py-[8px] rounded-[4px] hover:bg-[#EBF3FE] hover:text-[#2F80ED] transition-[0.5s]'>
                <MdDashboard className='w-[24px] h-[24px]' />
                <h2 className='text-[14px] font-[500] '>Dashboard</h2>
              </div>
              <div className='w-[216px] flex gap-[24px] pl-[14px] py-[8px] rounded-[4px] hover:bg-[#EBF3FE] hover:text-[#2F80ED] transition-[0.5s]'>
                <MdDashboard className='w-[24px] h-[24px]' />
                <h2 className='text-[14px] font-[500] '>Dashboard</h2>
              </div>
              <div className='w-[216px] flex gap-[24px] pl-[14px] py-[8px] rounded-[4px] hover:bg-[#EBF3FE] hover:text-[#2F80ED] transition-[0.5s]'>
                <MdDashboard className='w-[24px] h-[24px]' />
                <h2 className='text-[14px] font-[500] '>Dashboard</h2>
              </div>
              <div className='w-[216px] flex gap-[24px] pl-[14px] py-[8px] rounded-[4px] hover:bg-[#EBF3FE] hover:text-[#2F80ED] transition-[0.5s]'>
                <MdDashboard className='w-[24px] h-[24px]' />
                <h2 className='text-[14px] font-[500] '>Dashboard</h2>
              </div>
              <div className='w-[216px] flex gap-[24px] pl-[14px] py-[8px] rounded-[4px] hover:bg-[#EBF3FE] hover:text-[#2F80ED] transition-[0.5s]'>
                <MdDashboard className='w-[24px] h-[24px]' />
                <h2 className='text-[14px] font-[500] '>Dashboard</h2>
              </div>
              <div className='w-[216px] flex gap-[24px] pl-[14px] py-[8px] rounded-[4px] hover:bg-[#EBF3FE] hover:text-[#2F80ED] transition-[0.5s]'>
                <MdDashboard className='w-[24px] h-[24px]' />
                <h2 className='text-[14px] font-[500] '>Dashboard</h2>
              </div>
              <div className='w-[216px] flex gap-[24px] pl-[14px] py-[8px] rounded-[4px] hover:bg-[#EBF3FE] hover:text-[#2F80ED] transition-[0.5s]'>
                <MdDashboard className='w-[24px] h-[24px]' />
                <h2 className='text-[14px] font-[500] '>Dashboard</h2>
              </div>
              <div className='w-[216px] flex gap-[24px] pl-[14px] py-[8px] rounded-[4px] hover:bg-[#EBF3FE] hover:text-[#2F80ED] transition-[0.5s]'>
                <MdDashboard className='w-[24px] h-[24px]' />
                <h2 className='text-[14px] font-[500] '>Dashboard</h2>
              </div>
            </div>

          </div>

          <main className="flex-1 flex py-[16px] ">
            <div className="bg-white rounded-xl shadow-md p-6 max-w-4xl w-[968px] mx-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-black">Statistika</h2>
                <button className="bg-green-500 text-white px-4 py-2 rounded-md shadow hover:bg-green-600 transition">
                  + Add widget
                </button>
              </div>

              <img src={Diogramma} className='mx-auto' alt="" />

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
          </main>

        </div>
      </header>
    </>
  )
}

export default HomePage

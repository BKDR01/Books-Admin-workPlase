import React from 'react'
import Diogramma from './../../assets/IMG/Diagram.png';
import { MdDashboard, MdAssignment  } from "react-icons/md";
import { FaUserLarge } from "react-icons/fa6";
import { FcLike } from "react-icons/fc";
import { BiSolidBuildingHouse } from "react-icons/bi";
import { IoMdHelp } from "react-icons/io";
import { IoMdEasel } from "react-icons/io";
import Nav from '../../Components/Nav/Nav';

const HomePage = () => {

  const menyu = [
    { name: 'Dashboard', icon: <MdDashboard  className='w-[24px] h-[24px]'/>, path: 'Dashboard'},
    { name: 'Book', icon: <MdAssignment   className='w-[24px] h-[24px]'/>, path: 'Book'},
    { name: 'News', icon: <MdDashboard  className='w-[24px] h-[24px]'/>, path: 'News'},
    { name: 'Applications', icon: <IoMdEasel  className='w-[24px] h-[24px]'/>, path: 'Applications'},
    { name: 'Users', icon: <FaUserLarge   className='w-[24px] h-[24px]'/>, path: 'Users'},
    { name: 'Likes', icon: <FcLike className='text-black w-[24px] h-[24px]'/>, path: 'Likes'},
    { name: 'Administration', icon: <BiSolidBuildingHouse  className='w-[24px] h-[24px]'/>, path: 'Administration'},
    { name: 'help', icon: <IoMdHelp  className='w-[24px] h-[24px]'/>, path: 'help'},
  ]

  return (
    <>
    <header className='bg-[#F1F1F1] h-[100vh]'>
    <Nav />

    <div className='flex'> 
    <div>
    
      <div className='w-[256px] py-[24px] px-[24px] bg-white mt-[16px] rounded-[14px] flex flex-wrap gap-[10px]'>

      {
        menyu.map((item, index) => (
        <div key={index} className='w-[216px] flex gap-[24px] pl-[14px] py-[8px] rounded-[4px] hover:bg-[#EBF3FE] hover:text-[#2F80ED] transition-[0.5s]'>
          {item.icon}
          <h2 className='text-[14px] font-[500] '>{item.name}</h2>
        </div>
        ))
      }

      </div>

    </div>

      <main className="flex-1 flex py-[16px]">
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
        </main>

      </div>
    </header>
    </>
  )
}

export default HomePage

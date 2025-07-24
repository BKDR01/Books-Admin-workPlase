import React, { useState } from 'react'
import { MdDashboard, MdAssignment } from "react-icons/md";
import { FaUserLarge } from "react-icons/fa6";
import { FcLike } from "react-icons/fc";
import { BiSolidBuildingHouse } from "react-icons/bi";
import { IoMdHelp } from "react-icons/io";
import { IoMdEasel } from "react-icons/io";
import Nav from '../../Components/Nav/Nav';
import { Link, Outlet } from 'react-router';

const Layout = () => {
    const [open, setOpen] = useState(false)
    const menu = [
        { name: 'Dashboard', icon: <MdDashboard className='w-[24px] h-[24px]' />, path: '/' },
        { name: 'Book', icon: <MdAssignment className='w-[24px] h-[24px]' />, path: '/book' },
        { name: 'News', icon: <MdDashboard className='w-[24px] h-[24px]' />, path: '/news' },
        { name: 'Applications', icon: <IoMdEasel className='w-[24px] h-[24px]' />, path: '/applications' },
        { name: 'Users', icon: <FaUserLarge className='w-[24px] h-[24px]' />, path: '/users' },
        { name: 'Likes', icon: <FcLike className='text-black w-[24px] h-[24px]' />, path: '/likes' },
        { name: 'Administration', icon: <BiSolidBuildingHouse className='w-[24px] h-[24px]' />, path: '/admin' },
        { name: 'help', icon: <IoMdHelp className='w-[24px] h-[24px]' />, path: '/help' },
    ]
    return (
        <div className='bg-[#F1F1F1] h-[100vh]'>

            <Nav setOpen={setOpen} open={open} />
            <div onClick={() => setOpen(!open)} className={`absolute z-10 h-[100%] w-full ${open ? "bg-[#1919197c]" : "hidden"}`}></div>
            <div className="flex items-start ">
                <div className='w-[256px] py-[24px] px-[24px] bg-white mt-[16px] rounded-[14px] flex flex-wrap gap-[10px]'>

                    {
                        menu.map((item, index) => (
                            <Link to={item.path} key={index} >
                                <div className='w-[216px] flex gap-[24px] pl-[14px] py-[8px] rounded-[4px] hover:bg-[#EBF3FE] hover:text-[#2F80ED] transition-[0.5s]'>
                                    {item.icon}
                                    <h2 className='text-[14px] font-[500]'>{item.name}</h2>
                                </div>
                            </Link>
                        ))
                    }

                </div>
                <main className="flex-1 flex py-[16px]">
                    <Outlet />
                </main>
            </div>

        </div>
    )
}

export default Layout
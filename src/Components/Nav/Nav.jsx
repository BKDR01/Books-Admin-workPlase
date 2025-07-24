import { Dropdown } from 'primereact/dropdown';
import notifikation from './../../assets/IMG/notifications.png';
import Amaki from './../../assets/IMG/15.png';
import { IoSearchSharp, IoUmbrellaSharp } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { MdInsertDriveFile } from "react-icons/md";
import { IoMdRocket, IoMdCalendar } from "react-icons/io";

function Nav({ setOpen, open }) {
  const cities = [
    { name: 'My details', icon: <FaUserCircle />, },
    { name: 'My calendar', icon: <IoMdCalendar /> },
    { name: 'Vacations', icon: <IoUmbrellaSharp /> },
    { name: 'Corporate CV', icon: <MdInsertDriveFile /> },
    { name: 'Perfomance review', icon: <IoMdRocket /> }
  ];

  return (
    <div>
      <nav className='w-[100%] flex items-center justify-between px-[23px] py-[12px] bg-white'>
        <div className='flex items-center gap-[33px] '>
          <div className='flex items-center gap-[17px]'>
            <img src={Amaki} alt="" />
            <Dropdown
              options={cities}
              placeholder="Xajiqurbonov.A"
              className="w-[180px] bg-white"
              itemTemplate={(option) =>
                <div className="flex items-center gap-2">
                  {option.icon}<span>{option.name}</span>
                </div>}
              onClick={() => setOpen(!open)} />
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
    </div>
  )
}

export default Nav

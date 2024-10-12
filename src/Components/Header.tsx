import React, { useState } from 'react';
import RectanglePurs from '../assets/rectanglePurs.png';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import { IoIosArrowDown, IoMdLogOut, IoMdPerson } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = ({ text }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("pursToken");
        navigate("/login");
    };

    return (
        <div className='w-full flex justify-between pl-5 pr-10 pt-5 h-[80px] border-b border-[#AFBACA] pb-5'>
            <div className='flex pl-5'>
                <p className='text-2xl'>{text}</p>
            </div>
            <div className='relative'>
                <div
                    className='flex items-center cursor-pointer'
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                    <IoIosArrowDown size={24} />
                </div>
                {isDropdownOpen && (
                    <div className='absolute right-0 mt-2 bg-[#fff] border border-[#AFBACA] shadow-lg rounded-md'>
                        <button
                            className='w-full flex items-center px-4 py-2 text-left hover:bg-gray-100'
                            onClick={() => navigate("/profile")}
                        >
                            <IoMdPerson size={20} className='mr-2' />
                            Meu perfil
                        </button>
                        <button
                            className='w-full flex items-center px-4 py-2 text-left hover:bg-gray-100'
                            onClick={handleLogout}
                        >
                            <IoMdLogOut size={20} className='mr-2' />
                            Sair
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Header;
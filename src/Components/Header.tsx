import React from 'react';
import RectanglePurs from '../assets/rectanglePurs.png';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import { IoIosArrowDown } from 'react-icons/io';

const Header: React.FC = () => {
    return (
        <div className='w-full flex justify-between pl-5 pr-10 pt-5 bg-[#7144C0] h-[80px] border-b border-gray-500 pb-5'>
            <div className='flex'>
                <img src={RectanglePurs} className='w-12 mr-10' />
                <HiOutlineMagnifyingGlass size={20} className='mt-2 mr-3 cursor-pointer' />
                <p className='mt-[5px] mr-3'>|</p>
                <input placeholder='Pesquise aqui...' className='outline-0 mb-2 bg-[#F9FAFB]' />
            </div>
            <div className='flex cursor-pointer'>
                <p className='mr-5'>Olá</p>
                <IoIosArrowDown size={20} className='' />
            </div>
        </div>
    )
}

export default Header;
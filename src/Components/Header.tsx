import React from 'react';
import RectanglePurs from '../assets/rectanglePurs.png';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import { IoIosArrowDown } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import {makeCookieAdapter} from "~/app/main/factories/cache";
import {TOKEN_NAME} from "~/config/vars";

const Header: React.FC = () => {
    const navigate = useNavigate();
    const cookieAdapter = makeCookieAdapter();

    return (
        <div className='w-full flex justify-between pl-5 pr-10 pt-5 h-[80px] border-b border-[#AFBACA] pb-5'>
            <div className='flex' onClick={() => navigate("/chart")}>
                <img src={RectanglePurs} className='w-[40px] h-[40px] mr-10' />
                {/* <HiOutlineMagnifyingGlass size={20} className='mt-2 mr-3 cursor-pointer' />
                <p className='mt-[5px] mr-3'>|</p>
                <input placeholder='Pesquise aqui...' className='outline-0 mb-2 bg-[#FFF] p-2' /> */}
            </div>
            <div className='flex cursor-pointer' onClick={() => {
                navigate("/")
                cookieAdapter.set(TOKEN_NAME)
            }}>
                <p className='mr-5'>Sair</p>
                {/* <IoIosArrowDown size={20} className='' /> */}
            </div>
        </div>
    )
}

export default Header;
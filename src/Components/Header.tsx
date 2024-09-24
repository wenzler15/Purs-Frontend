import React from 'react';
import RectanglePurs from '../assets/rectanglePurs.png';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import { IoIosArrowDown } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import {makeCookieAdapter} from "~/app/main/factories/cache";
import {TOKEN_NAME} from "~/config/vars";

const Header: React.FC = ({ text }) => {
    const navigate = useNavigate();
    const cookieAdapter = makeCookieAdapter();

    return (
        <div className='w-full flex justify-between pl-5 pr-10 pt-5 h-[80px] border-b border-[#AFBACA] pb-5'>
            <div className='flex pl-5'>
                <p className='text-2xl'>{text}</p>
            </div>
            <div className='flex cursor-pointer' onClick={() => {
                navigate("/login")
                cookieAdapter.set(TOKEN_NAME)
            }}>
                <p className='mr-5'>Sair</p>
                {/* <IoIosArrowDown size={20} className='' /> */}
            </div>
        </div>
    )
}

export default Header;
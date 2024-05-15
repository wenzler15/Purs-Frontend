import React, { useState, useEffect } from 'react';
import Layer from '../../assets/layer.png';
import { useNavigate } from "react-router-dom";
import api from '../../services/api';
import { toast } from 'react-toastify';
import Group1975 from "../../assets/Group1975.png";
import Group1976 from "../../assets/Group1976.png";
import Group1977 from "../../assets/Group1977.png";
import Group1978 from "../../assets/Group1978.png";
import WomanIcon from "../../assets/Group197.png";
import PDI from "../../assets/PDI.svg";
import Org from "../../assets/Organograma.svg";
import AVD from "../../assets/AVD.svg";
import Pesquisa from "../../assets/Pesquisa.svg";
import SlideShow from '../../Components/Slides';
import RectanglePurs from '../../assets/rectanglePurs.png';
import Email from '../../assets/email.svg';
import { AiOutlineWhatsApp } from 'react-icons/ai';

const NewLp: React.FC = () => {
    const images = [
        Org,
        Pesquisa,
        AVD,
        PDI,
      ];

    const navigate = useNavigate();

    return (
        <div className='w-full'>  
            <div className='w-full bg-frame bg-cover h-[600px]'>
                <div className='flex flex-row items-center justify-around md:justify-center lg:justify-center flex-wrap-reverse'>
                    <div className='w-[30%]'>
                        <p className='text-[#eee] mt-5 md:text-2xl lg:text-3xl]'>
                            Descomplicamos a <span className='text-[#fff] font-bold'> gestão de pessoas </span> de seu negócio unindo <span className='text-[#fff] font-bold'> tecnologia </span> e <span className='text-[#fff] font-bold'> humanização </span>
                        </p>
                        <button onClick={() => window.open(`https://wa.me//${import.meta.env.VITE_WHATSAPP_NUMBR}?text=Olá,%20gostaria%20de%20mais%20informações%20sobre%20a%20Purs`, '_blank')} className='bg-[#331A71] text-[#fff] text-xs mt-5 p-3 lg:text-xl rounded-lg'>Falar com um especialista</button>
                    </div>
                    <div className='flex justify-center'>
                        <img src={WomanIcon} className='w-[60%] md:w-[60%] md:h-[20%] lg:w-[80%] lg:h-[20%]'/>
                    </div>
                </div>
            </div>


            <div className='w-full flex flex-row justify-center'>
                <div className='w-[80%] min-w-[400px] flex flex-row items-center justify-center md:justify-between lg:justify-between flex-wrap'>
                    <img src={Group1975} className='md:w-[24%] lg:w-[24%] min-w-[250px] h-[370px]' />
                    <img src={Group1976} className='md:w-[24%] lg:w-[24%] min-w-[250px] h-[370px]' />
                    <img src={Group1978} className='md:w-[24%] lg:w-[24%] min-w-[250px] h-[370px]' />
                    <img src={Group1977} className='md:w-[24%] lg:w-[24%] min-w-[250px] h-[370px]' />
                </div>
            </div>

            <div className='w-full flex items-center justify-center'>
                <button onClick={() => window.open(`https://wa.me//${import.meta.env.VITE_WHATSAPP_NUMBR}?text=Olá,%20gostaria%20de%20mais%20informações%20sobre%20a%20Purs`, '_blank')} className='bg-[#331A71] text-[#fff] p-3 rounded-lg mt-5'>Falar com um especialista</button>
            </div>
            
            <div className='w-full overflow-hidden'>
                <SlideShow images={images} />
            </div>
            <div className='w-full h-[120px] bg-purple-purs flex items-center place-content-evenly'>
                <div>
                    <img src={RectanglePurs} className='w-10' />
                    <p className='text-[#fff] text-sm'>Copyright © 2023 Purs. All rights reserved</p>
                </div>
                <div className='flex w-[150px]'>
                    <a href='mailto:contato@purs.com.br'>
                        <img src={Email} className='cursor-pointer' />
                    </a>
                    <a target='_blank' href={`https://wa.me//${import.meta.env.VITE_WHATSAPP_NUMBR}`}>
                        <AiOutlineWhatsApp size={20} className='mt-1 ml-3' color='#fff' />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default NewLp;
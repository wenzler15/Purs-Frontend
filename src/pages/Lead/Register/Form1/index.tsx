import React from 'react';
import Logo from '../../../../assets/logo.png';
import RectanglePurs from '../../../../assets/rectanglePurs.png';
import Twitter from '../../../../assets/twitter.svg';
import Email from '../../../../assets/email.svg';
import Facebook from '../../../../assets/facebook.svg';
import Instagram from '../../../../assets/instagram.svg';
import Smile from '../../../../assets/smile.svg';
import Lines from '../../../../assets/lines.svg';


const Form1: React.FC = () => {
    return (
        <div className='w-full h-[100vh] pt-8'>
            <div className='w-full h-[7%] p-2 flex items-end justify-end'>
                <div className='w-7/12 flex items-end justify-between'>
                    <img src={Logo} className='w-28' />
                    <div className='bg-purple-purs p-2 w-20 rounded-md cursor-pointer h-10 mb-[15px] mr-16'>
                        <p className='text-[#fff]'>Contato</p>
                    </div>
                </div>
            </div>
            <div className='w-full bg-gradient-to-b from-[#B8E6F6] to-[#D2B4F5] h-[80%] text-center pt-4'>
                <div className='flex justify-center'>
                    <div className='mt-6 mr-6 items-end flex flex-col'>
                        <p className='text-2xl'>Crie seu organograma gratuito</p>
                        <img src={Lines} className='w-26'/>
                    </div>
                    <div>
                        <img src={Smile} />
                    </div>
                </div>
            </div>
            <div className='w-full h-[13%] bg-purple-purs flex items-center place-content-evenly'>
                <div>   
                    <img src={RectanglePurs} className='w-10'/>
                    <p className='text-[#fff] text-sm'>Copyright © 2023 Purs. All rights reserved</p>
                </div>
                <div className='flex w-[150px] justify-between'>
                    <img src={Email} className='cursor-pointer' />
                    <img src={Twitter} className='cursor-pointer' />
                    <img src={Facebook} className='cursor-pointer' />
                    <img src={Instagram} className='cursor-pointer' />
                </div>
            </div>
        </div>
    );
}

export default Form1;
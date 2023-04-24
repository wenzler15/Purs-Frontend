import React from 'react';
import Logo from '../../../../assets/logo.png';

const Form1: React.FC = () => {
    return (
        <div className='w-full h-[100vh] pt-8'>
            <div className='w-full h-[5%] p-2 flex items-end justify-end'>
                <div className='w-7/12 flex items-end justify-between'>
                    <img src={Logo} className='w-28' />
                    <div className='bg-purple-purs p-2 w-20 rounded-md cursor-pointer h-10 mb-[15px] mr-16'>
                        <p className='text-[#fff]'>Contato</p>
                    </div>
                </div>
            </div>
            <div className='w-full bg-gradient-to-b from-[#B8E6F6] to-[#D2B4F5] h-[80%]'>

            </div>
            <div className='w-full h-[15%] bg-purple-purs'>

            </div>
        </div>
    );
}

export default Form1;
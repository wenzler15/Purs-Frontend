import React from 'react';

import { RiOrganizationChart } from 'react-icons/ri';
import { BsBarChartSteps } from 'react-icons/bs';
import { AiOutlineMessage } from 'react-icons/ai';

const NavBar: React.FC = () => {
    return (
        <div className='w-full h-full border-r bg-[#F9FAFB]'>
            <div className='h-[80px] bg-[#F9FAFB] border-b border-gray-500 p-8'>
                <p className='text-purple-purs text-lg font-bold'>Purs</p>
            </div>
            <div className='flex flex-col justify-center p-5 cursor-pointer border-b border-gray-500 pb-10'>
                <div className='flex justify-start mt-4'>
                    <RiOrganizationChart size={30} className='mt-2 mr-2 cursor-pointer' color={window.location.href.indexOf('/chart') > 0 ? '#7C5EB1' : ''} />
                    <p className={`text-sm mt-3 ${window.location.href.indexOf('/chart') > 0 ? 'text-purple-purs' : ''} font-bold`}>Organograma</p>
                </div>
                <div className='flex justify-start mt-4 ml-1 cursor-pointer'>
                    <BsBarChartSteps size={30} className='mt-2 mr-2 cursor-pointer' color={window.location.href.indexOf('/PDI') > 0 ? '#7C5EB1' : ''} />
                    <p className={`text-sm mt-3 font-bold ${window.location.href.indexOf('/PDI') > 0 ? 'text-purple-purs' : ''}`}>PDI</p>
                </div>
            </div>
            <div className='p-5 flex justify-center'>
                {/* <p className='text-sm text-grey-purs'>MINHA EMPRESA</p> */}
                <div className='bg-[#E9D8FA] rounded-md flex flex-col items-center w-full mt-10 max-w-[200px]'>
                    <div className='bg-purple-purs w-10 rounded-3xl h-10 p-[10px] mt-[-20px]'>
                        <AiOutlineMessage size={20} color='#fff' />
                    </div>
                    <div className='text-center'>
                        <p className='font-bold text-xs mt-2'>Precisa de ajuda?</p>
                        <p className='text-xs text-grey-purs mt-2'>Obtenha respostas rapidamente sobre recursos do produto, preços e muito mais.</p>
                    </div>
                    <div className='bg-purple-purs w-2/3 rounded-md text-center mt-3 mb-3 cursor-pointer'>
                        <p className='text-xs text-[#fff] p-1'>Enviar mensagem</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NavBar;
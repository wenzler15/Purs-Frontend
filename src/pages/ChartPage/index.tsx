import React from 'react';
import Header from '../../Components/Header';
import { AiOutlineDownload } from 'react-icons/ai';
import NavBar from '../../Components/NavBar';

const ChartPage: React.FC = () => {
    return (
        <div className='flex h-screen overflow-hidden'>
            <div className='w-1/6'>
                <NavBar />
            </div>
            <div className='w-full'>
                <Header />
                <div className='w-full bg-[#E4ECF5] h-full pt-10 pl-4 pr-4 box-border'>
                    <div className='flex'>
                        <div className='flex w-[200] bg-purple-purs p-2 rounded-md cursor-pointer'>
                            <AiOutlineDownload size={20} color={'#fff'} />
                            <p className='text-[#fff] ml-2 text-sm'> Exportar</p>
                        </div>
                    </div>
                    <div className='w-full h-full mt-10'>
                        <div className='bg-[#fff] w-full h-4/5 rounded-md'>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChartPage;
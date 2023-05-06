import React, { useState } from 'react';
import Logo from '../../../assets/logo.png';
import RectanglePurs from '../../../assets/rectanglePurs.png';
import Twitter from '../../../assets/twitter.svg';
import Email from '../../../assets/email.svg';
import Facebook from '../../../assets/facebook.svg';
import Instagram from '../../../assets/instagram.svg';
import Smile from '../../../assets/smile.svg';
import Lines from '../../../assets/lines.svg';
import { FileUploader } from 'react-drag-drop-files';

import { BsArrowLeftShort } from 'react-icons/bs';
import { AiOutlineDownload } from 'react-icons/ai';
import { useNavigate } from "react-router-dom";

const fileTypes = ["CSV", "XLS", "XLSX"]

const UploadFile: React.FC = () => {
    const [file, setFile] = useState<File>();

    const navigate = useNavigate();

    const handleChange = (file: File) => {
        console.log("file", file);
        setFile(file)
    };

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
                        <img src={Lines} className='w-26' />
                    </div>
                    <div>
                        <img src={Smile} />
                    </div>
                </div>
                <div className='flex justify-center'>
                    <div className='bg-[color:white] w-2/4 rounded-lg shadow-2xl p-8 mt-10'>
                        <div className='text-start w-3/4'>
                            <p className='font-bold'>Incluir funcionários</p>
                        </div>
                        <div className='w-full mt-2 text-start'>
                            <p className='text-[#5E718D] text-sm'>Faça download do modelo do arquivo e preencha as informações dos seus funcionários, em seguida carregue o arquivo aqui.</p>
                        </div>
                        <div className='flex justify-center'>
                            <div className='cursor-pointer border w-[270] mt-8 border-[#D7DFE9] rounded-md p-2 flex'>
                                <AiOutlineDownload size={20} color={'#455468'} />
                                <p className='text-sm ml-2'>Baixar modelo</p>
                            </div>
                        </div>
                        <div className='mt-4 w-full flex justify-center'>
                            <FileUploader label='Arraste e solte seu arquivo aqui' handleChange={handleChange} name="file" types={fileTypes} />
                        </div>
                        <div className='w-full flex justify-end mt-6'>
                            <div className='rounded-lg border border-[#ccc] mt-4 p-2 w-24 text-center cursor-pointer mr-4 flex justify-evenly' onClick={() => navigate('/lead/register2')}>
                                <BsArrowLeftShort size={25} />
                                <p className='text-sm mt-1 ml-[-5px]'>Voltar</p>
                            </div>
                            <div className='rounded-lg bg-purple-purs mt-4 p-2 w-36 text-center cursor-pointer' onClick={() => handleLogin()}>
                                <p className='text-[#fff] text-sm mt-1'>Importar arquivo</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full h-[13%] bg-purple-purs flex items-center place-content-evenly'>
                <div>
                    <img src={RectanglePurs} className='w-10' />
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

export default UploadFile;
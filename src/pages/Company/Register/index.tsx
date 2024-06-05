import React, { useState } from 'react';
import Logo from '../../../assets/logo.png';
import Ellipse2 from "../../../assets/Ellipse2.png";
import Ellipse3 from "../../../assets/Ellipse3.png";
import Ellipse5 from "../../../assets/Ellipse5.png";
import Ellipse8 from "../../../assets/Ellipse8.png";
//@ts-ignore
import api from "../../../services/api";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import TextButton from '../../../Components/Button';

const RegisterCompany: React.FC = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/company/register/step1')
      };

    return (
        <div className='p-6 pl-16'>
            <img src={Logo} className='w-20' />
            <div className='w-full flex flex-col items-center justify-center'>
                <p className='text-3xl mt-14 w-[40%] text-center'>Seja bem-vindo à sua primeira etapa na plataforma Purs!</p>
                <p className='mt-8 text-[#5E718D] w-[50%] text-center text-xl'>Aqui, começaremos o processo de cadastro da sua empresa, garantindo que todas as informações essenciais sejam fornecidas para uma experiência fluida. </p>
                <TextButton text="Começar" onClick={handleClick} style={{marginTop: "40px"}}/>
            </div>
        </div>
    );
}

export default RegisterCompany;
import React from 'react';
import Logo from '../../assets/logo.png';
import Ellipse2 from "../../assets/Ellipse2.png";
import Ellipse3 from "../../assets/Ellipse3.png";
import Ellipse5 from "../../assets/Ellipse5.png";
import Ellipse8 from "../../assets/Ellipse8.png";

const Login: React.FC = () => {
    return (
        <div className='w-full flex flex-col items-center z-0'>
            <img src={Logo} className='w-1/5' />


            <div className='rounded-lg w-2/5 flex flex-col items-center p-10 mt-10 shadow-2xl'>
            <img src={Ellipse2} className='absolute mr-[700px] z-10' />
                {/* <img src={Ellipse3} className='absolute' />
                <img src={Ellipse5} className='absolute' />
                <img src={Ellipse8} className='absolute' /> */}
                <p className='font-semibold text-3xl text-purple-purs'>Iniciar sessão</p>
                <div className='w-2/5 mt-5'>
                    <p className='text-blue-purs text-sm mt-4'>Endereço de e-mail</p>
                    <input className='border-blue-purs border w-full rounded-lg mt-1.5 pl-2 text-blue-purs' />
                    <p className='text-blue-purs text-sm mt-4'>Senha</p>
                    <input className='border-blue-purs border w-full rounded-lg mt-1.5 pl-2 text-blue-purs' type='password' />
                    <p className='text-xs mt-1.5 text-grey-purs cursor-pointer'>Esqueceu sua senha?</p>
                </div>
                <div className='rounded-2xl bg-purple-purs mt-4 p-2 w-2/5 text-center cursor-pointer'>
                    <p className='text-[#fff] text-sm'>Avançar</p>
                </div>
                <p className='text-blue-purs text-sm mt-5 cursor-pointer'>Não tem uma conta?</p>
            </div>
        </div>
    );
}

export default Login;
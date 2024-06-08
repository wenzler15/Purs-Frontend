import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import Logo from "~/assets/logo.png";
import Ellipse2 from "~/assets/Ellipse2.png";
import Ellipse3 from "~/assets/Ellipse3.png";
import Ellipse5 from "~/assets/Ellipse5.png";
import Ellipse8 from "~/assets/Ellipse8.png";
import {FaEye} from "react-icons/fa";
import {LoginComponentProps} from "~/app/domain/protocols";

function LoginComponent({ authentication }: LoginComponentProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordType, setPasswordType] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async () => {
        if (email === '' || password === '') return toast.error("Favor preencher email e senha");

        const body = {
            email,
            password
        }

        await authentication
            .signIn(body)
            .then(() => navigate("/lead/uploadFile"))
            .catch(err => toast.error(err.response.data.message))
    }

    return (
        <div className='w-full flex flex-col items-center bg-gradient-purs bg-cover bg-no-repeat h-[100vh] pt-[5%]'>
            <img src={Logo} className='w-1/5 max-w-[300px]'/>
            <img src={Ellipse2} className='absolute mr-[45%] mt-[10%] z-1'/>
            <img src={Ellipse3} className='absolute mr-[40%] mt-[20%] z-10'/>
            <img src={Ellipse5} className='absolute mr-[35%] mt-[8%] z-1'/>
            <img src={Ellipse8} className='absolute mr-[43%] mt-[25%] z-10'/>
            <div className='rounded-lg w-2/5 flex flex-col items-center p-10 mt-10 shadow-2xl z-0 bg-[color:white]'>
                <p className='font-semibold text-3xl text-purple-purs'>Iniciar sessão</p>
                <div className='w-[70%] mt-5'>
                    <p className='text-blue-purs text-sm mt-4'>Endereço de e-mail</p>
                    <input className='border-blue-purs border w-full rounded-lg mt-1.5 pl-2 text-blue-purs'
                           onChange={(e) => setEmail(e.target.value)}/>
                    <p className='text-blue-purs text-sm mt-4'>Senha</p>
                    <div className='relative'>
                        <input type={passwordType ? 'text' : 'password'}
                               className='border-blue-purs border w-full rounded-lg mt-1.5 pl-2 text-blue-purs'
                               onChange={(e) => setPassword(e.target.value)}/>
                        <span className='cursor-pointer absolute top-[52%] right-[10px] translate-y-[-50%] mt-1'
                              onClick={() => setPasswordType(!passwordType)}>
                            <FaEye/>
                        </span>
                    </div>
                    <p className='text-xs mt-1.5 text-grey-purs cursor-pointer'
                       onClick={() => navigate('/company/forgetPassword')}>Esqueceu sua senha?</p>
                </div>
                <div className='rounded-2xl bg-purple-purs mt-4 p-2 w-2/5 text-center cursor-pointer'
                     onClick={() => handleLogin()}>
                    <p className='text-[#fff] text-sm'>Avançar</p>
                </div>
                <p className='text-blue-purs text-sm mt-5 cursor-pointer'
                   onClick={() => navigate('/company/register')}>Não tem uma conta? Cadastre-se!</p>
            </div>
        </div>
    );
}

export default LoginComponent;
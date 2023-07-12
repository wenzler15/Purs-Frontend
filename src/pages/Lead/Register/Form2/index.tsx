import React, { useState } from 'react';
import Logo from '../../../../assets/logo-white.png';
import RectanglePurs from '../../../../assets/rectanglePurs.png';
import Twitter from '../../../../assets/twitter.svg';
import Email from '../../../../assets/email.svg';
import Facebook from '../../../../assets/facebook.svg';
import Instagram from '../../../../assets/instagram.svg';
import Smile from '../../../../assets/smile-white.svg';
import Lines from '../../../../assets/lines.svg';
import { toast } from 'react-toastify';
import api from "../../../../services/api";

import { FaEye } from 'react-icons/fa';
import { BsArrowLeftShort } from 'react-icons/bs';
import { useNavigate, useLocation } from "react-router-dom";

const Form2: React.FC = () => {
    const [passwordType, setPasswordType] = useState(false);
    const [confirmPasswordType, setConfirmPasswordType] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const location = useLocation();
    const navigate = useNavigate();

    const handleCreate = async () => {
        try {
            if (name === "" || email === "" || password === "" || confirmPassword === "") {
                toast.error("Favor preencher todos os dados");
            } else if (password !== confirmPassword) {
                toast.error("As senhas são diferentes");
            } else {
                const { companyName, companyArea, companySegment, companyPhone } = location.state

                const body = {
                    companyName,
                    companyPhone,
                    companySegment,
                    occupation: companyArea,
                    fullName: name,
                    email,
                    password
                }

                const resp = await api.post('/lead', body);

                localStorage.setItem('pursToken', resp.data.user.id);

                toast.success("Usuário criado com sucesso!");

                navigate('/lead/uploadFile')
            }
        } catch (err: any) {
            if (err.response.status === 400) {
                toast.error("Já existe um usuário com esse e-mail, favor tente um novo");
            } else {
                toast.error("Tivemos um problema no nosso servidor, tente mais tarde!");
            }
        }
    };

    return (
        <div className='w-full h-[100vh] pt-8 bg-gradient-to-b from-[#7144C0] to-[#A0D5DA]'>
            <div className='w-full h-[7%] p-2 flex items-end pl-8'>
                <div className='w-full flex items-end justify-between'>
                    <img src={Logo} className='w-28' />
                    <div className='bg-purple-purs p-2 w-20 rounded-md cursor-pointer h-10 mb-[15px] mr-16 text-center'>
                        <a target='_blank' href='https://wa.me/11952866259'>
                            <p className='text-[#fff]'>Contato</p>
                        </a>
                    </div>
                </div>
            </div>
            <div className='w-full h-[80%] text-center pt-4'>
                <div className='flex justify-center'>
                    <div className='mt-6 mr-6 items-end flex flex-col'>
                        <p className='text-2xl text-[#fff]'>Crie seu organograma gratuito</p>
                    </div>
                    <div>
                        <img src={Smile} />
                    </div>
                </div>
                <div className='flex justify-center'>
                    <div className='bg-[color:white] w-2/4 rounded-lg shadow-2xl p-8 mt-10'>
                        <div className='text-start w-3/4'>
                            <p className='font-bold'>Preencha seus dados de acesso para finalizar</p>
                        </div>
                        <div className='flex justify-between'>
                            <div className='mt-8 w-2/4 flex flex-col justify-start text-start mr-4'>
                                <p>Nome e sobrenome*</p>
                                <input className='border-blue-purs border w-full rounded-lg mt-1.5 pl-2 text-blue-purs placeholder:text-xs h-10' placeholder='Digite seu nome e sobrenome' value={name} onChange={(e) => setName(e.target.value)} />
                                <p className='mt-6'>Senha*</p>
                                <div className='relative'>
                                    <input type={passwordType ? 'text' : 'password'} className='border-blue-purs border w-full rounded-lg mt-1.5 pl-2 text-blue-purs placeholder:text-xs h-10' placeholder='Crie uma senha de 8 caracteres' value={password} onChange={(e) => setPassword(e.target.value)} />
                                    <span className='cursor-pointer absolute top-[51%] right-[10px] translate-y-[-50%]' onClick={() => setPasswordType(!passwordType)}>
                                        <FaEye />
                                    </span>
                                </div>
                            </div>
                            <div className='mt-8 w-2/4 flex flex-col justify-start text-start'>
                                <p>E-mail profissional*</p>
                                <input className='border-blue-purs border w-full rounded-lg mt-1.5 pl-2 text-blue-purs placeholder:text-xs h-10' placeholder='Digite seu e-mail profissional' value={email} onChange={(e) => setEmail(e.target.value)} />
                                <p className='mt-6'>Confirme a senha*</p>
                                <div className='relative'>
                                    <input type={confirmPasswordType ? 'text' : 'password'} className='border-blue-purs border w-full rounded-lg mt-1.5 pl-2 text-blue-purs placeholder:text-xs h-10' placeholder='Confirme sua senha' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                    <span className='cursor-pointer absolute top-[51%] right-[10px] translate-y-[-50%]' onClick={() => setConfirmPasswordType(!confirmPasswordType)}>
                                        <FaEye />
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className='w-full flex justify-end mt-6'>
                            <div className='rounded-lg border border-[#ccc] mt-4 p-2 w-24 text-center cursor-pointer mr-4 flex justify-evenly' onClick={() => navigate('/lead/register')}>
                                <BsArrowLeftShort size={25} />
                                <p className='text-sm mt-1 ml-[-5px]'>Voltar</p>
                            </div>
                            <div className='rounded-lg bg-purple-purs mt-4 p-2 w-36 text-center cursor-pointer' onClick={() => handleCreate()}>
                                <p className='text-[#fff] text-sm mt-1'>Criar organograma</p>
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
                    {/* <img src={Twitter} className='cursor-pointer' />
                    <img src={Facebook} className='cursor-pointer' />
                    <img src={Instagram} className='cursor-pointer' /> */}
                </div>
            </div>
        </div>
    );
}

export default Form2;
import React, { useState } from 'react';
import Logo from '../../../../assets/logo-white.png';
import RectanglePurs from '../../../../assets/rectanglePurs.png';
import Twitter from '../../../../assets/twitter.svg';
import Email from '../../../../assets/email.svg';
import Facebook from '../../../../assets/facebook.svg';
import Instagram from '../../../../assets/instagram.svg';
import Smile from '../../../../assets/smile-white.svg';
import { toast } from 'react-toastify';

import { useNavigate } from "react-router-dom";

const Form1: React.FC = () => {
    const [companyName, setCompanyName] = useState("");
    const [companyPhone, setCompanyPhone] = useState("");
    const [companyArea, setCompanyArea] = useState("0");
    const [companySegment, setCompanySegment] = useState("0");

    const navigate = useNavigate();

    const nextStep = async () => {
        if (companyName !== "" && companyPhone !== "" && companyArea !== "" && companySegment !== "") {
            navigate('/lead/register2', { state: { companyName, companyPhone, companyArea, companySegment } })
        } else {
            toast.error("Favor preencher todos os campos");
        }
    }

    const formatNumber = async (value: string) => {
        if (!value) return ""
        value = value.replace(/\D/g, '');
        value = value.replace(/(\d{2})(\d)/, "($1) $2");
        value = value.replace(/(\d)(\d{4})$/, "$1-$2");

        setCompanyPhone(value)
    }

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
                            <p className='font-bold'>Preencha o formulário abaixo para continuar</p>
                        </div>
                        <div className='flex justify-between'>
                            <div className='mt-8 w-2/4 flex flex-col justify-start text-start'>
                                <p>Nome da empresa*</p>
                                <input className='border-blue-purs border w-11/12 rounded-lg mt-1.5 pl-2 text-blue-purs placeholder:text-xs h-10' placeholder='Digite o nome da sua empresa' value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                                <p className='mt-6'>Área de atuação*</p>
                                <select className='border-blue-purs border w-11/12 rounded-lg mt-1.5 pl-2 text-blue-purs h-10 text-sm' value={companyArea} onChange={(e) => setCompanyArea(e.target.value)}>
                                    <option value='0' className='text-xs'>Selecione...</option>
                                    <option value='Recursos humanos' className='text-xs'>Recursos humanos</option>
                                    <option value='Comercial' className='text-xs'>Comercial</option>
                                    <option value='Marketing' className='text-xs'>Marketing</option>
                                    <option value='Tecnologia' className='text-xs'>Tecnologia</option>
                                    <option value='Logística' className='text-xs'>Logística</option>
                                    <option value='Administrativo' className='text-xs'>Administrativo</option>
                                    <option value='Financeiro' className='text-xs'>Financeiro</option>
                                    <option value='Operações' className='text-xs'>Operações</option>
                                    <option value='Atendimento ao cliente' className='text-xs'>Atendimento ao cliente</option>
                                    <option value='Outros' className='text-xs'>Outros</option>
                                </select>
                            </div>
                            <div className='mt-8 w-2/4 flex flex-col justify-start text-start'>
                                <p>Telefone da empresa*</p>
                                <input className='border-blue-purs border w-full rounded-lg mt-1.5 pl-2 text-blue-purs placeholder:text-xs h-10' placeholder='Digite seu telefone' value={companyPhone} onChange={(e) => formatNumber(e.target.value)} />
                                <p className='mt-6'>Segmento da empresa*</p>
                                <select className='border-blue-purs border w-full rounded-lg mt-1.5 pl-2 text-blue-purs h-10 text-sm' value={companySegment} onChange={(e) => setCompanySegment(e.target.value)}>
                                    <option value='0' className='text-xs'>Selecione...</option>
                                    <option value='Indústria' className='text-xs'>Indústria</option>
                                    <option value='Comércio' className='text-xs'>Comércio</option>
                                    <option value='Prestação de serviço' className='text-xs'>Prestação de serviço</option>
                                    <option value='Setor público' className='text-xs'>Setor público</option>
                                    <option value='Organização sem fins lucrativos' className='text-xs'>Organização sem fins lucrativos</option>
                                    <option value='Outros' className='text-xs'>Outros</option>
                                </select>
                            </div>
                        </div>
                        <div className='w-full flex justify-end mt-6'>
                            <div className='rounded-lg bg-purple-purs mt-4 p-2 w-36 text-center cursor-pointer' onClick={() => nextStep()}>
                                <p className='text-[#fff] text-sm'>Próximo passo</p>
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

export default Form1;
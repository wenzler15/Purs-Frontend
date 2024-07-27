import React, { useState } from 'react';
import Logo from '../../assets/logo-white.png';
import RectangleComplete from '../../assets/rectangleComplete.png';
import Woman from '../../assets/woman2.png';
import Macbook from '../../assets/macbook.png';
import OrgChartImage from '../../assets/orgchart.png';
import { useNavigate } from "react-router-dom";
import api from '../../services/api';
import { toast } from 'react-toastify';
import RectanglePurs from '../../assets/rectanglePurs.png';
import Email from '../../assets/email.svg';
import { AiOutlineWhatsApp } from 'react-icons/ai';
import { GiHamburgerMenu } from 'react-icons/gi';

const LP: React.FC = () => {
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState(false);
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [company, setCompany] = useState("");
    const [companyError, setCompanyError] = useState(false);
    const [phone, setPhone] = useState("");
    const [phoneError, setPhoneError] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);

    const navigate = useNavigate();

    const sendEmail = async () => {
        if (email.indexOf("@") > 0 && email.indexOf(".") > 0) {
            setEmailError(false)
        } else {
            setEmailError(true)
        }

        if (name === '') {
            setNameError(true)
        } else {
            setNameError(false)
        }

        if (company === '') {
            setCompanyError(true)
        } else {
            setCompanyError(false)
        }

        if (phone === '') {
            setPhoneError(true)
        } else {
            setPhoneError(false)
        }

        if (!emailError && !nameError && !companyError && !phoneError && validateEmail) {
            try {
                const toSend = {
                    name,
                    email,
                    cellphone: phone,
                    company
                }

                await api.post("/leadEmail", toSend);
                toast.success("Seu e-mail foi enviado ao nosso consultor")
                window.open(`https://wa.me//${import.meta.env.VITE_WHATSAPP_NUMBR}`, '_blank')
            } catch (err) {
                toast.error("Não foi possível enviar e-mail, favor tente mais tarde");
            }
        }
    }

    const handlePhone = (event) => {
        let input = event.target
        input.value = phoneMask(input.value)
        setPhone(input.value)
    }

    const phoneMask = (value) => {
        if (!value) return ""
        value = value.replace(/\D/g, '')
        value = value.replace(/(\d{2})(\d)/, "($1) $2")
        value = value.replace(/(\d)(\d{4})$/, "$1-$2")
        return value
    }

    return (
        <div className='w-full'>
            <div className='pb-6 w-full bg-woman bg-cover min-h-[760px]' id="principal">
                <div className='flex flex-row justify-between p-10'>
                    <img src={Logo} className='w-[50] ' />
                    <div className='hidden sm:flex flex-row justify-between w-[40%]'>
                        <p className='text-[#fff] cursor-pointer'>Home</p>
                        <p className='text-[#fff] cursor-pointer'>Quem somos</p>
                        <p className='text-[#fff] cursor-pointer' onClick={() => navigate("/login")}>Organograma</p>
                        <p className='text-[#fff] cursor-pointer'>Contato</p>
                    </div>
                    <div className='block sm:hidden'>
                        <GiHamburgerMenu size={40} onClick={() => setOpenMenu(!openMenu)} className='pointer ml-3' color='#fff' />
                    </div>
                </div>
                {openMenu && (
                    <div className='pl-10 mb-5 sm:hidden'>
                        <p className='text-2xl font-bold text-[#fff] cursor-pointer'>Home</p>
                        <p className='text-2xl font-bold text-[#fff] cursor-pointer'>Quem somos</p>
                        <p className='text-2xl font-bold text-[#fff] cursor-pointer' onClick={() => navigate("/login")}>Organograma</p>
                        <p className='text-2xl font-bold text-[#fff] cursor-pointer'>Contato</p>
                    </div>
                )}
                <div className='flex justify-between flex-wrap pr-10'>
                    <div className='w-full min-w-[250px] mb-10 pl-10 mt-2 sm:mt-32 sm:w-[35%]'>
                        <p className='text-[#fff] font-bold text-2xl mb-2'>Descomplicamos a gestão de pessoas unindo tecnologia e humanização</p>
                        <p className='text-[#fff] text-2xl'>pensando em torná-la estratégica e simples.</p>
                    </div>
                    <div className='w-full sm:w-[25%] min-w-[300px] flex justify-center'>
                        <div className='w-[80%] sm:w-full bg-[#fff] rounded-md p-5 text-center shadow-lg'>
                            <p className='text-[#3E79A5] text-2xl'>Fale com um especialista</p>
                            <div className='w-full flex flex-col items-center text-left'>
                                <div className='w-[90%] mt-4'>
                                    <p className='text-[#3E79A5]'>Nome *</p>
                                    <input placeholder='Digite seu nome' onChange={(e) => {
                                        setNameError(false);
                                        setName(e.target.value)
                                    }} className='mt-3 border rounded-md p-2 w-full' />
                                    {nameError && (
                                        <p className='text-[#f00] text-sm'>*Favor preencher o nome</p>
                                    )}

                                    <p className='text-[#3E79A5] mt-4 '>E-mail *</p>
                                    <input placeholder='Digite ser e-mail' onChange={(e) => {
                                        setEmailError(false)
                                        setEmail(e.target.value)
                                    }} className='mt-3  border rounded-md p-2 w-full' />
                                    {emailError && (
                                        <p className='text-[#f00] text-sm'>*Favor preencher com um e-mail valido</p>
                                    )}

                                    <p className='text-[#3E79A5] mt-4'>Empresa *</p>
                                    <input placeholder='Digite o nome da sua empresa' onChange={(e) => {
                                        setCompanyError(false)
                                        setCompany(e.target.value)
                                    }} className='mt-3 border rounded-md p-2 w-full' />
                                    {companyError && (
                                        <p className='text-[#f00] text-sm'>*Favor preencher o nome da empresa</p>
                                    )}

                                    <p className='text-[#3E79A5] mt-4'>Telefone *</p>
                                    <input maxLength={15} onChange={(event) => {
                                        setPhoneError(false)
                                        handlePhone(event)
                                    }} placeholder='(00) 0000-0000' className='mt-3 border rounded-md p-2 w-full' />
                                    {phoneError && (
                                        <p className='text-[#f00] text-sm'>*Favor preencher o telefone</p>
                                    )}

                                </div>
                            </div>
                            <button onClick={() => sendEmail()} className='bg-[#331A71] text-[#fff] p-3 rounded-lg mt-4'>Falar com um especialista</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full h-[30vh] min-h-[310px] bg-gradient-to-r from-[#5B359E] to-[#14E1B0] text-center pt-6'>
                <p className='text-[#fff] text-3xl'>A Purs chega em...</p>
                <div className='flex w-full justify-center mt-6'>
                    <div className='mr-10'>
                        <p className='sm:text-8xl text-5xl text-[#fff]'>10</p>
                        <p className='sm:text-2xl text-2xl text-[#fff]'>Dias</p>
                    </div>
                    <div className='mr-10'>
                        <p className='sm:text-8xl text-5xl text-[#fff]'>:</p>
                    </div>
                    <div className='mr-10'>
                        <p className='sm:text-8xl text-5xl text-[#fff]'>10</p>
                        <p className='sm:text-2xl text-2xl text-[#fff]'>Dias</p>
                    </div>
                    <div className='mr-10'>
                        <p className='sm:text-8xl text-5xl text-[#fff]'>:</p>
                    </div>
                    <div className='mr-10'>
                        <p className='sm:text-8xl text-5xl text-[#fff]'>10</p>
                        <p className='sm:text-2xl text-2xl text-[#fff]'>Dias</p>
                    </div>
                </div>
                <a href='#principal'>
                    <button onClick={() => sendEmail()} className='bg-[#331A71] text-[#fff] p-3 rounded-lg mt-10'>Falar com um especialista</button>
                </a>
            </div>
            <div className='w-full pt-10 bg-[#5B359E] flex justify-between flex-wrap'>
                <div className='relative sm:w-[50%] sm:min-w-[310px] w-full flex justify-center'>
                    <img src={Woman} className='absolute top-[12%] z-10 w-[60%] sm:w-[350px] sm:max-w-[400px]' />
                    <img src={RectangleComplete} className='relative w-[70%] sm:w-[90%] h-[400px] sm:h-[500px] sm:max-w-[400px]' />
                </div>
                <div className='w-full sm:w-[50%] text-center mt-[5%] pb-5 pl-5'>
                    <div className='text-center w-[90%] sm:text-left'>
                        <p className='text-[#B8E6F6] text-2xl'>Quem somos?</p>
                        <p className='text-[#fff] mt-10'>Somos uma empresa de tecnologia focada em descomplicar a gestão de pessoas e torná-la estratégica e simples, fortalecendo líderes para focar no que realmente importa: pessoas!</p>
                        <p className='text-[#fff] mt-6'>Acreditamos que uma gestão estratégica de pessoas, humanizada e baseada em dados, é fundamental para alcançar resultados positivos.</p>
                    </div>
                    <a href='#principal'>
                        <button onClick={() => sendEmail()} className='bg-[#331A71] text-[#fff] p-3 rounded-lg mt-6'>Falar com um especialista</button>
                    </a>
                </div>
            </div>
            <div className='w-full pt-10 bg-[#5B359E] flex justify-between pb-10 flex-wrap-reverse'>
                <div className='w-full sm:w-[70%] text-center mt-[5%] pl-10'>
                    <div className='w-[90%] text-left'>
                        <p className='text-[#B8E6F6] text-2xl'>Por que escolher a Purs?</p>
                        <div className='flex mt-6'>
                            <p className='text-[#fff] text-4xl mr-4'>1</p>
                            <p className='text-[#fff] text-base'> <span className='font-bold'> Adaptação personalizada:</span> Nossa ferramenta é flexível e se ajusta às necessidades e estrutura do seu negócio, centralizando as atividades de gestão de pessoas em um só lugar.</p>
                        </div>
                        <div className='flex mt-6'>
                            <p className='text-[#fff] text-4xl mr-4'>2</p>
                            <p className='text-[#fff] text-base'> <span className='font-bold'> Empoderamento da liderança:</span> Acreditamos que a gestão de pessoas não deve ser responsabilidade exclusiva do RH. Por isso, nossa solução promove o envolvimento ativo e o fortalecimento das lideranças.</p>
                        </div>
                        <div className='flex mt-6'>
                            <p className='text-[#fff] text-4xl mr-4'>3</p>
                            <p className='text-[#fff] text-base'> <span className='font-bold'> Suporte especializado:</span> Contamos com uma equipe de consultores dedicados em gestão de pessoas e liderança, prontos para fornecer atendimento e acompanhamento personalizado.</p>
                        </div>
                        <div className='flex mt-6'>
                            <p className='text-[#fff] text-4xl mr-4'>4</p>
                            <p className='text-[#fff] text-base'> <span className='font-bold'> Oficinas de estratégia e conceitos:</span> Oferecemos treinamentos que exploram as metodologias por trás de cada funcionalidade, capacitando você e sua equipe a compreender e aplicar os conceitos de forma efetiva para maximizar resultados.</p>
                        </div>
                    </div>
                    <a href='#principal'>
                        <button onClick={() => sendEmail()} className='bg-[#331A71] text-[#fff] p-3 rounded-lg mt-6'>Falar com um especialista</button>
                    </a>
                </div>
                <div className='relative w-full flex justify-center mb-10 sm:w-[30%] min-w-[310]'>
                    <img src={Macbook} className='absolute top-[20%] ml-[-10px] z-10 w-[350px] h-[300px] sm:w-[400px]' />
                    <img src={RectangleComplete} className='top-[14%] relative w-[350px] sm:w-[400px] sm:h-[350px]' />
                </div>
            </div>
            <div className='w-full pb-10 min-h-[300px] bg-gradient-to-r from-[#5B359E] to-[#14E1B0] flex flex-col items-center pt-6'>
                <div className='w-[70%] mt-6'>
                    <p className='text-[#B8E6F6] text-3xl text-center'>"Colaboradores que se sentem valorizados e têm a oportunidade de desenvolver suas habilidades são 21% mais produtivos"</p>
                    <p className='text-[#fff] mt-5 text-lg text-center'>Publicado em 2019, com o título "Reimagining the Employee Experience: A Capabilities- Driven Approach"</p>
                </div>
                <a href='#principal'>
                    <button onClick={() => sendEmail()} className='bg-[#331A71] text-[#fff] p-3 rounded-lg mt-10'>Falar com um especialista</button>
                </a>
            </div>
            <div className='w-full pt-10 bg-[#5B359E] pb-10 flex flex-col items-center'>
                <p className='text-[#B8E6F6] text-4xl'>Conheça Nossos Produtos</p>
                <div className='w-full flex justify-end flex-wrap 2xl:pb-10'>
                    <img src={OrgChartImage} className='xl:max-h-[800px] 2xl:max-h-[700px] min-[1800px]:mr-[40%] 2xl:mr-[25%] sm:absolute mr-[20%] hidden sm:block' />
                    <div className='w-full sm:w-1/2 p-10 sm:mt-24'>
                        <p className='text-[#B8E6F6] text-3xl'>Organograma</p>
                        <p className='text-[#fff] mt-10 font-bold text-2xl'>Simplifique a visualização e estrutura organizacional com nosso organograma automático!</p>
                        <p className='text-[#fff] mt-10 text-xl'>De maneira rápida, nosso organograma gera automaticamente a estrutura da sua empresa através de um modelo de planilha disponibilizado na plataforma</p>
                        <p className='text-[#fff] mt-10 font-bold text-2xl'>Teste agora o organograma gratuito!</p>
                        <div className='flex'>
                            <button className='bg-[#fff] mr-10 text-[##5B359E] p-3 rounded-lg mt-10' onClick={() => navigate("/login")}>Fazer organograma gratuito</button>
                            <a href='#principal'>
                                <button onClick={() => sendEmail()} className='bg-[#331A71] text-[#fff] p-3 rounded-lg mt-10'>Falar com um especialista</button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full h-[120px] bg-purple-purs flex items-center place-content-evenly'>
                <div>
                    <img src={RectanglePurs} className='w-10' />
                    <p className='text-[#fff] text-sm'>Copyright © 2023 Purs. All rights reserved</p>
                </div>
                <div className='flex w-[150px]'>
                    <a href='mailto:contato@purs.com.br'>
                        <img src={Email} className='cursor-pointer' />
                    </a>
                    <a target='_blank' href={`https://wa.me//${import.meta.env.VITE_WHATSAPP_NUMBR}`}>
                        <AiOutlineWhatsApp size={20} className='mt-1 ml-3' color='#fff' />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default LP;
import React from 'react';
import Logo from '../../assets/logo-white.png';
import Rectangle from '../../assets/rectangle.png';
import RectangleComplete from '../../assets/rectangleComplete.png';
import Woman from '../../assets/woman2.png';
import Macbook from '../../assets/macbook.png';

const LP: React.FC = () => {
    return (
        <div className='w-full'>
            <div className='h-[80vh] w-full bg-woman bg-cover'>
                <div className='flex flex-row justify-between p-10'>
                    <img src={Logo} className='w-[50] ' />
                    <div className='flex flex-row justify-between w-[40%]'>
                        <p className='text-[#fff] cursor-pointer'>Home</p>
                        <p className='text-[#fff] cursor-pointer'>Quem somos</p>
                        <p className='text-[#fff] cursor-pointer'>Produtos</p>
                        <p className='text-[#fff] cursor-pointer'>Contato</p>
                    </div>
                </div>
                <div className='flex justify-between pr-10'>
                    <div className='w-[35%] pl-10 mt-32'>
                        <p className='text-[#fff] font-bold text-2xl mb-10'>Descomplicamos a gestão de pessoas unindo tecnologia e humanização</p>
                        <p className='text-[#fff] text-2xl'>Pensando em torná-la estratégicas e simples.</p>
                    </div>
                    <div className='w-[25%] bg-[#fff] rounded-md p-5 text-center shadow-lg'>
                        <p className='text-[#3E79A5] text-2xl'>Fale com um Especialista</p>
                        <div className='w-full text-left'>
                            <p>Nome *</p>
                            <input placeholder='Digite seu nome' className='mt-3 mb-4 border rounded-md p-2 w-[80%]' />
                            <p>E-mail *</p>
                            <input placeholder='Digite seu nome' className='mt-3 mb-4 border rounded-md p-2 w-[80%]' />
                            <p>Empresa *</p>
                            <input placeholder='Digite seu nome' className='mt-3 mb-4 border rounded-md p-2 w-[80%]' />
                            <p>Telefone *</p>
                            <input placeholder='Digite seu nome' className='mt-3 mb-4 border rounded-md p-2 w-[80%]' />
                        </div>
                        <button className='bg-[#331A71] text-[#fff] p-3 rounded-lg mt-2'>Falar com um especialista</button>
                    </div>
                </div>
            </div>
            <div className='w-full h-[35vh] bg-gradient-to-r from-[#5B359E] to-[#14E1B0] text-center pt-6'>
                <p className='text-[#fff] text-3xl'>A Purs chega em...</p>
                <div className='flex w-full justify-center mt-6'>
                    <div className='mr-10'>
                        <p className='text-8xl text-[#fff]'>10</p>
                        <p className='text-2xl text-[#fff]'>Dias</p>
                    </div>
                    <div className='mr-10'>
                        <p className='text-8xl text-[#fff]'>:</p>
                    </div>
                    <div className='mr-10'>
                        <p className='text-8xl text-[#fff]'>10</p>
                        <p className='text-2xl text-[#fff]'>Horas</p>
                    </div>
                    <div className='mr-10'>
                        <p className='text-8xl text-[#fff]'>:</p>
                    </div>
                    <div className='mr-10'>
                        <p className='text-8xl text-[#fff]'>10</p>
                        <p className='text-2xl text-[#fff]'>Minutos</p>
                    </div>
                </div>
                <button className='bg-[#331A71] text-[#fff] p-3 rounded-lg mt-10'>Falar com um especialista</button>
            </div>
            <div className='w-full pt-10 bg-[#5B359E] flex justify-between'>
                <div className='relative w-[50%]'>
                    <img src={Woman} className='absolute top-[12%] left-[8%] z-10 w-[70%] max-w-[400px]' />
                    <img src={Rectangle} className='relative w-[70%] max-w-[400px]' />
                </div>
                <div className='w-[50%] text-center mt-[5%]'>
                    <div className='w-[90%] text-left'>
                        <p className='text-[#B8E6F6] text-2xl'>Quem somos?</p>
                        <p className='text-[#fff] mt-10'>Somos uma empresa de tecnologia focada em descomplicar a gestão de pessoas e torná-la estratégica e simples, fortalecendo líderes para focar no que realmente importa: pessoas!</p>
                        <p className='text-[#fff] mt-6'>Acreditamos que uma gestão estratégica de pessoas, humanizada e baseada em dados, é fundamental para alcançar resultados positivos.</p>
                    </div>
                    <button className='bg-[#331A71] text-[#fff] p-3 rounded-lg mt-6'>Falar com um especialista</button>
                </div>
            </div>
            <div className='w-full pt-10 bg-[#5B359E] flex justify-between'>
                <div className='w-[70%] text-center mt-[5%] pl-10'>
                    <div className='w-[90%] text-left'>
                        <p className='text-[#B8E6F6] text-2xl'>Por que escolher a Purs?</p>
                        <div className='flex mt-6'>
                            <p className='text-[#fff] text-4xl mr-4'>1</p>
                            <p className='text-[#fff] text-base'> <span className='underline font-bold'> Adaptação personalizada:</span> Nossa ferramenta é flexível e se ajusta às necessidades e estrutura do seu negócio, centralizando as atividades de gestão de pessoas em um só lugar.</p>
                        </div>
                        <div className='flex mt-6'>
                            <p className='text-[#fff] text-4xl mr-4'>2</p>
                            <p className='text-[#fff] text-base'> <span className='underline font-bold'> Empoderamento da liderança:</span> Acreditamos que a gestão de pessoas não deve ser responsabilidade exclusiva do RH. Por isso, nossa solução promove o envolvimento ativo e o fortalecimento das lideranças.</p>
                        </div>
                        <div className='flex mt-6'>
                            <p className='text-[#fff] text-4xl mr-4'>3</p>
                            <p className='text-[#fff] text-base'> <span className='underline font-bold'> Suporte especializado:</span> Contamos com uma equipe de consultores dedicados em gestão de pessoas e liderança, prontos para fornecer atendimento e acompanhamento personalizado.</p>
                        </div>
                        <div className='flex mt-6'>
                            <p className='text-[#fff] text-4xl mr-4'>4</p>
                            <p className='text-[#fff] text-base'> <span className='underline font-bold'> Oficinas de estratégia e conceitos:</span> Oferecemos treinamentos que exploram as metodologias por trás de cada funcionalidade, capacitando você e sua equipe a compreender e aplicar os conceitos de forma efetiva para maximizar resultados.</p>
                        </div>
                    </div>
                    <button className='bg-[#331A71] text-[#fff] p-3 rounded-lg mt-6'>Falar com um especialista</button>
                </div>
                <div className='relative w-[50%]'>
                    <img src={Macbook} className='absolute top-[20%] ml-[-20px] z-10 w-[70%] max-w-[400px] sm:w-[98%]' />
                    <img src={RectangleComplete} className='top-[14%] relative w-[70%] max-w-[400px] sm:w-[90%]' />
                </div>
            </div>
        </div>
    );
}

export default LP;
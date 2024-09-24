// NavBar.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RiOrganizationChart } from 'react-icons/ri';
import { HiOutlineDocumentMagnifyingGlass, HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { AiOutlineMessage } from 'react-icons/ai';
import { FaAngleDoubleLeft, FaSuitcase } from "react-icons/fa";
import { GoHome } from "react-icons/go";
import { ImProfile } from "react-icons/im"; import RectanglePurs from '../assets/rectanglePurs.png';
import { useUserContext } from '../contexts/UserContext';
import { PiUsersThreeBold } from "react-icons/pi";
import { CiUser } from "react-icons/ci";
import { VscTypeHierarchySub } from "react-icons/vsc";

const NavBar: React.FC<{ path: string }> = ({ path }) => {
  const { userData } = useUserContext();
  const navigate = useNavigate();

  return (
    <div className='w-full h-full overflow-y-auto border-r border-[#AFBACA] bg-[#F9FAFB]'>
      <div className='h-[80px] bg-[#F9FAFB] p-8 flex justify-between'>
        {userData?.companyLogo ? (
          <img src={userData.companyLogo} alt="Logo da Empresa" className='w-[65px] h-[40px]' />
        ) : (
          <img src={RectanglePurs} alt="Logo Padrão" className='w-[40px] h-[40px]' />
        )}
        <FaAngleDoubleLeft size={25} style={{ cursor: "pointer" }} />
      </div>
      <div className='flex flex-col justify-center p-5 cursor-pointer border-b border-[#AFBACA] pb-10'>
        {/* {userData && (
          <div>
            <p>{userData.name}</p>
          </div>
        )} */}

        <p>Minha conta</p>
        <div className='flex justify-start mt-4' onClick={() => navigate("/home")}>
          <GoHome size={30} className='mt-2 mr-2 cursor-pointer' color={path === "Home" ? '#7C5EB1' : ''} />
          <p className={`text-sm mt-3 ${path === "Home" ? 'text-purple-purs' : ''} font-bold`}>Início</p>
        </div>
        <div className='flex justify-start mt-4' onClick={() => navigate("/lead/uploadFile")}>
          <RiOrganizationChart size={30} className='mt-2 mr-2 cursor-pointer' color={path === "orgchart" ? '#7C5EB1' : ''} />
          <p className={`text-sm mt-3 ${path === "orgchart" ? 'text-purple-purs' : ''} font-bold`}>Organograma</p>
        </div>
        <div className='flex justify-start mt-4' onClick={() => navigate("/research")}>
          <HiOutlineDocumentMagnifyingGlass size={30} className='mt-2 mr-2 cursor-pointer' color={path === "research" ? '#7C5EB1' : ''} />
          <p className={`text-sm mt-3 ${path === "research" ? 'text-purple-purs' : ''} font-bold`}>Pesquisa</p>
        </div>
        <div className='flex justify-start mt-4' onClick={() => navigate("/profile")}>
          <ImProfile size={30} className='mt-2 mr-2 cursor-pointer' color={path === "profile" ? '#7C5EB1' : ''} />
          <p className={`text-sm mt-3 ${path === "profile" ? 'text-purple-purs' : ''} font-bold`}>Meu perfil</p>
        </div>
        {userData?.responsible === 1 && (
          <div>
            <div className='flex justify-start mt-4' onClick={() => navigate("/profileCompany")}>
              <HiOutlineBuildingOffice2 size={30} className='mt-2 mr-2 cursor-pointer' color={path === "companyProfile" ? '#7C5EB1' : ''} />
              <p className={`text-sm mt-3 ${path === "companyProfile" ? 'text-purple-purs' : ''} font-bold`}>Perfil empresa</p>
            </div>

            <div className='flex justify-start mt-4' onClick={() => navigate("/employees")}>
              <CiUser size={30} className='mt-2 mr-2 cursor-pointer' color={path === "employees" ? '#7C5EB1' : ''} />
              <p className={`text-sm mt-3 ${path === "employees" ? 'text-purple-purs' : ''} font-bold`}>Colaboradores</p>
            </div>

            <div className='flex justify-start mt-4' onClick={() => navigate("/groups")}>
              <PiUsersThreeBold size={30} className='mt-2 mr-2 cursor-pointer' color={path === "groups" ? '#7C5EB1' : ''} />
              <p className={`text-sm mt-3 ${path === "groups" ? 'text-purple-purs' : ''} font-bold`}>Grupos</p>
            </div>

            <div className='flex justify-start mt-4' onClick={() => navigate("/departments")}>
              <VscTypeHierarchySub size={30} className='mt-2 mr-2 cursor-pointer' color={path === "departments" ? '#7C5EB1' : ''} />
              <p className={`text-sm mt-3 ${path === "departments" ? 'text-purple-purs' : ''} font-bold`}>Departamentos</p>
            </div>

            <div className='flex justify-start mt-4' onClick={() => navigate("/roles")}>
              <FaSuitcase size={30} className='mt-2 mr-2 cursor-pointer' color={path === "roles" ? '#7C5EB1' : ''} />
              <p className={`text-sm mt-3 ${path === "roles" ? 'text-purple-purs' : ''} font-bold`}>Cargos</p>
            </div>
          </div>
        )}

        {/* <div className='flex justify-start mt-4 ml-1 cursor-pointer'>
          <BsBarChartSteps size={30} className='mt-2 mr-2 cursor-pointer' color={window.location.href.indexOf('/PDI') > 0 ? '#7C5EB1' : ''} />
          <p className={`text-sm mt-3 font-bold ${window.location.href.indexOf('/PDI') > 0 ? 'text-purple-purs' : ''}`}>PDI</p>
        </div> */}
      </div>
      <div className='p-5 flex justify-center'>
        <div className='bg-[#E9D8FA] rounded-md flex flex-col items-center w-full mt-10 max-w-[200px]'>
          <div className='bg-purple-purs w-10 rounded-3xl h-10 p-[10px] mt-[-20px]'>
            <AiOutlineMessage size={20} color='#fff' />
          </div>
          <div className='text-center'>
            <p className='font-bold text-xs mt-2'>Precisa de ajuda?</p>
            <p className='text-xs text-grey-purs mt-2'>Obtenha respostas rapidamente sobre recursos do produto, preços e muito mais.</p>
          </div>
          <div className='bg-purple-purs w-2/3 rounded-md text-center mt-3 mb-3 cursor-pointer'>
            <a target='_blank' href={`https://wa.me//${import.meta.env.VITE_WHATSAPP_NUMBR}`}>
              <p className='text-xs text-[#fff] p-1'>Enviar mensagem</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

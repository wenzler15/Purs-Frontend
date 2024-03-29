import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import {
  AiOutlineExclamationCircle
} from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';

import { useNavigate, useLocation } from "react-router-dom";

const Research: React.FC = () => {

  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-full">
        <Header />
        <div className="w-full bg-gradient-to-b from-[#8B95CE] to-[#DBF4FA] h-full pt-10 pl-4 pr-4 box-border">
          <div className="flex w-full">
            <div className="flex flex-row justify-between w-full">
                <div className="p-5 w-1/2">
                    <p className="text-purple-purs text-3xl font-bold">Módulo de pesquisas</p>
                    <p className="text-purple-purs">Flexível e intuitivo para criar e gerenciar pesquisas de forma personalizada</p>
                </div>
                <div className="flex flex-row justify-end w-1/2 items-end cursor-pointer p-5">
                    <p>Entenda os status das pesquisas</p>
                    <AiOutlineExclamationCircle size={22} className="ml-1"/>
                </div>
            </div>
          </div>

          <div className="flex flex-row justify-between w-full p-3">
            <div className="flex flex-row w-[150px] p-3 h-[50px] bg-purple-purs rounded-md cursor-pointer">
                <FaPlus size={15} color="#CCC" className="mt-[2px]"/>
                <p className="text-[#CCC] text-sm ml-2">Nova pesquisa</p>
            </div>

            <div className="w-[85%] h-[400px] bg-[#fff] rounded-md p-3">
                <div className="flex flex-row justify-between">
                    <p className="text-lg font-bold mt-2 ml-2">Pesquisas</p>
                    <div className="w-[60%] flex flex-row border border-[#CCC] p-1 rounded-md pl-3">
                        <HiOutlineMagnifyingGlass size={20} className='mt-2 mr-3 cursor-pointer' />
                        <input placeholder='Buscar pesquisa por nome' className='outline-0 mb-1 bg-[#FFF] p-2 w-[90%]' />
                    </div>
                </div>

                <div className="w-full mt-4 h-[80%] flex items-center justify-center">
                    <p>Você ainda não tem pesquisas...</p>
                </div>
            </div>
        </div>
        </div> 
      </div>
    </div>
  );
};

export default Research;

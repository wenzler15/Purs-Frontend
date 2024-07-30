import React, { useState, useEffect } from "react";
import Header from "../../Components/Header";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { RiArrowUpDownLine } from "react-icons/ri";
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import { useNavigate, useLocation } from "react-router-dom";
import { Tooltip } from 'react-tooltip';
import NavBar from "../../Components/NavBar";
import TextButton from "../../Components/Button";
import Checkbox from "../../Components/Checkbox";

const Research: React.FC = () => {
  const [researchs, setResearchs] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const handleCheckboxChange = (isChecked: boolean) => {
    setIsChecked(isChecked);
  };

  const getResearchs = async () => {
    const resp = [
      {
        'id': 1,
        'name': "Pesquisa teste",
        'desc': "Apenas uma pesquisa para testes",
        'owner': "Douglas Wenzler",
        'created': "12/07/2024",
        'status': "finish"
      },
      {
        'id': 2,
        'name': "Pesquisa teste 2",
        'desc': "Apenas uma pesquisa para testes 2",
        'owner': "Douglas Wenzler",
        'created': "13/07/2024",
        'status': "reproved"
      },
      {
        'id': 3,
        'name': "Pesquisa teste 2",
        'desc': "Apenas uma pesquisa para testes 2",
        'owner': "Douglas Wenzler",
        'created': "13/07/2024",
        'status': "approved"
      },
      {
        'id': 4,
        'name': "Pesquisa teste 2",
        'desc': "Apenas uma pesquisa para testes 2",
        'owner': "Douglas Wenzler",
        'created': "13/07/2024",
        'status': "draft"
      },
      {
        'id': 5,
        'name': "Pesquisa teste 2",
        'desc': "Apenas uma pesquisa para testes 2",
        'owner': "Douglas Wenzler",
        'created': "13/07/2024",
        'status': "pending"
      },
      {
        'id': 5,
        'name': "Pesquisa teste 2",
        'desc': "Apenas uma pesquisa para testes 2",
        'owner': "Douglas Wenzler",
        'created': "13/07/2024",
        'status': "ongoing"
      },
    ]

    setResearchs(resp);
  }

  useEffect(() => {
    getResearchs();
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-1/6">
        <NavBar path="research" />
      </div>
      <div className="w-full">
        <Header text="Pesquisas" />
        <div className="w-full bg-gradient-to-b from-[#8B95CE] to-[#DBF4FA] overflow-y-auto h-full pt-10 pl-4 pr-4 box-border pb-5">
          <div className="flex w-full">
            <div className="flex flex-row justify-between w-full">
              <div className="p-5 w-1/2">
                <p className="text-dark-purple-purs text-3xl font-bold">Módulo de pesquisas</p>
                <p className="text-purple-purs">Flexível e intuitivo para criar e gerenciar pesquisas de forma personalizada</p>
              </div>
              <div className="flex flex-row justify-end w-1/2 items-end cursor-pointer p-5">
                <p>Entenda os status das pesquisas</p>
                <AiOutlineExclamationCircle size={22} className="ml-1" data-tooltip-id="informationTooltip" />
                <Tooltip
                  id="informationTooltip"
                  place="bottom"
                  style={{
                    backgroundColor: '#2D3643',
                    width: 234,
                    borderRadius: 10,
                  }}
                >
                  <span>
                    • <strong style={{ textDecoration: 'underline', color: '#F0F3F9' }}>Aprovada:</strong> A pesquisa está pronta, só aguardando a data de início
                    <br />
                    <br />
                    • <strong style={{ textDecoration: 'underline', color: '#F0F3F9' }}>Pendente:</strong> Após a criação, dependerá ainda de aprovação da gestão
                    <br />
                    <br />
                    • <strong style={{ textDecoration: 'underline', color: '#F0F3F9' }}>Rascunho:</strong> A criação da pesquisa foi interrompida, mas poderá ser retomada
                    <br />
                    <br />
                    • <strong style={{ textDecoration: 'underline', color: '#F0F3F9' }}>Concluída:</strong> O prazo de respostas foi esgotado e a pesquisa encerrada
                    <br />
                    <br />
                    • <strong style={{ textDecoration: 'underline', color: '#F0F3F9' }}>Em curso:</strong> Já foi iniciada, está coletando respostas
                    <br />
                    <br />
                    • <strong style={{ textDecoration: 'underline', color: '#F0F3F9' }}>Reprovada:</strong> A gestão reprovou a criação desta pesquisa
                    <br />
                  </span>
                </Tooltip>
              </div>
            </div>
          </div>

          <div className="justify-between w-full p-3">
            <TextButton text='+ Nova pesquisa' onClick={() => navigate("/research/newResearch")} />

            <div className="w-full min-h-[400px] bg-[#fff] rounded-md ml-3 mt-3">
              <div className="flex flex-row justify-between p-3">
                <p className="text-lg font-bold mt-2 ml-2">Pesquisas</p>
                <div className="w-[60%] flex flex-row border border-[#CCC] p-1 rounded-md pl-3">
                  <HiOutlineMagnifyingGlass size={20} className='mt-2 mr-3 cursor-pointer' />
                  <input placeholder='Buscar pesquisa por nome' className='outline-0 mb-1 bg-[#FFF] p-2 w-[90%]' />
                </div>
              </div>

              <div className="w-full mt-4">
                {researchs.length > 0 ? (
                  <div className="w-full bg-[#E4ECF5] p-4 flex justify-between">
                    <div className="w-[4%] items-center">
                      <Checkbox
                        label=""
                        isChecked={isChecked}
                        onChange={handleCheckboxChange}
                      />
                    </div>
                    <div className="flex cursor-pointer w-[24%] justify-center">
                      <p>Pesquisa</p>
                      <RiArrowUpDownLine style={{ marginTop: 5, marginLeft: 5 }} />
                    </div>
                    <div className="flex cursor-pointer w-[24%] justify-center">
                      <p>Criado por</p>
                      <RiArrowUpDownLine style={{ marginTop: 5, marginLeft: 5 }} />
                    </div>
                    <div className="flex cursor-pointer w-[24%] justify-center">
                      <p>Criado em</p>
                      <RiArrowUpDownLine style={{ marginTop: 5, marginLeft: 5 }} />
                    </div>
                    <div className="flex cursor-pointer w-[24%] justify-center">
                      <p>Situação</p>
                      <RiArrowUpDownLine style={{ marginTop: 5, marginLeft: 5 }} />
                    </div>
                  </div>
                ) : (
                  <p>Você ainda não tem pesquisas...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Research;

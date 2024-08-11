import React, { useState, useEffect } from "react";
import Header from "../../Components/Header";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { RiArrowUpDownLine } from "react-icons/ri";
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import { useNavigate, useLocation } from "react-router-dom";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { CiCircleCheck } from "react-icons/ci";
import { Tooltip } from 'react-tooltip';
import NavBar from "../../Components/NavBar";
import TextButton from "../../Components/Button";
import Checkbox from "../../Components/Checkbox";
import { FaCopy, FaTrash, FaPen } from 'react-icons/fa';
import { IoCloseCircleOutline } from "react-icons/io5";
import { VscDebugStart } from "react-icons/vsc";
import { CiClock1 } from "react-icons/ci";

const Research: React.FC = () => {
  const [researchs, setResearchs] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showMenu, setShowMenu] = useState<number | null>(null);

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

  const handleMenuClick = (rowId) => {
    setShowMenu(showMenu === rowId ? null : rowId);
  };

  const handleDuplicate = (rowId: number) => {
    console.log('Duplicar linha', rowId);
    setShowMenu(null);
  };

  const handleDelete = (rowId: number) => {
    console.log('Excluir linha', rowId);
    setShowMenu(null);
  };

  const renderOptions = (id: number, status: string) => {
    switch (status) {
      case "draft":
        return (
          <div className="absolute w-[150px] right-0 top-full mt-1 bg-[#fff] border border-gray-300 rounded shadow-lg z-20">
            <button onClick={() => handleDuplicate(id)}
              className="flex p-2 border-0 text-left w-full hover:bg-[#ccc]">
              <FaPen style={{ marginRight: 10 }} /> Edição
            </button>
            <button onClick={() => handleDuplicate(id)}
              className="flex p-2 border-0 text-left w-full hover:bg-[#ccc]">
              <FaCopy style={{ marginRight: 10 }} /> Duplicar
            </button>
            <button onClick={() => handleDelete(id)}
              className="flex p-2 border-0 text-left w-full hover:bg-[#ccc]">
              <FaTrash style={{ marginRight: 10 }} /> Excluir
            </button>
          </div>
        )
      case "finish":
        return (
          <div className="absolute w-[150px] right-0 top-full mt-1 bg-[#fff] border border-gray-300 rounded shadow-lg z-20">
            <button onClick={() => handleDuplicate(id)}
              className="flex p-2 border-0 text-left w-full hover:bg-[#ccc]">
              <FaCopy style={{ marginRight: 10 }} /> Duplicar
            </button>
            <button onClick={() => handleDelete(id)}
              className="flex p-2 border-0 text-left w-full hover:bg-[#ccc]">
              <FaTrash style={{ marginRight: 10 }} /> Excluir
            </button>
          </div>
        )
      case "pending":
        return (
          <div className="absolute w-[150px] right-0 top-full mt-1 bg-[#fff] border border-gray-300 rounded shadow-lg z-20">
            <button onClick={() => handleDuplicate(id)}
              className="flex p-2 border-0 text-left w-full hover:bg-[#ccc]">
              <CiCircleCheck style={{ marginRight: 10, marginTop: 5, fontWeight: "bold" }} /> Aprovar
            </button>
            <button onClick={() => handleDuplicate(id)}
              className="flex p-2 border-0 text-left w-full hover:bg-[#ccc]">
              <IoCloseCircleOutline style={{ marginRight: 10, marginTop: 5 }} /> Reprovar
            </button>
            <button onClick={() => handleDuplicate(id)}
              className="flex p-2 border-0 text-left w-full hover:bg-[#ccc]">
              <FaPen style={{ marginRight: 10 }} /> Edição
            </button>
            <button onClick={() => handleDuplicate(id)}
              className="flex p-2 border-0 text-left w-full hover:bg-[#ccc]">
              <FaCopy style={{ marginRight: 10 }} /> Duplicar
            </button>
            <button onClick={() => handleDelete(id)}
              className="flex p-2 border-0 text-left w-full hover:bg-[#ccc]">
              <FaTrash style={{ marginRight: 10 }} /> Excluir
            </button>
          </div>
        )
      case "reproved":
        return (
          <div className="absolute w-[150px] right-0 top-full mt-1 bg-[#fff] border border-gray-300 rounded shadow-lg z-20">
            <button onClick={() => handleDuplicate(id)}
              className="flex p-2 border-0 text-left w-full hover:bg-[#ccc]">
              <FaPen style={{ marginRight: 10 }} /> Edição
            </button>
            <button onClick={() => handleDelete(id)}
              className="flex p-2 border-0 text-left w-full hover:bg-[#ccc]">
              <FaTrash style={{ marginRight: 10 }} /> Excluir
            </button>
          </div>
        )
      case "approved":
        return (
          <div className="absolute w-[150px] right-0 top-full mt-1 bg-[#fff] border border-gray-300 rounded shadow-lg z-20">
            <button onClick={() => handleDuplicate(id)}
              className="flex p-2 border-0 text-left w-full hover:bg-[#ccc]">
              <VscDebugStart style={{ marginRight: 10 }} /> Iniciar
            </button>
            <button onClick={() => handleDuplicate(id)}
              className="flex p-2 border-0 text-left w-full hover:bg-[#ccc]">
              <FaCopy style={{ marginRight: 10 }} /> Duplicar
            </button>
            <button onClick={() => handleDelete(id)}
              className="flex p-2 border-0 text-left w-full hover:bg-[#ccc]">
              <FaTrash style={{ marginRight: 10 }} /> Excluir
            </button>
          </div>
        )
      case "ongoing":
        return (
          <div className="absolute w-[150px] right-0 top-full mt-1 bg-[#fff] border border-gray-300 rounded shadow-lg z-20">
            <button onClick={() => handleDelete(id)}
              className="flex p-2 border-0 text-left w-full hover:bg-[#ccc]">
              <CiClock1 style={{ marginRight: 10 }} /> Encerrar
            </button>
            <button onClick={() => handleDuplicate(id)}
              className="flex p-2 border-0 text-left w-full hover:bg-[#ccc]">
              <FaCopy style={{ marginRight: 10 }} /> Duplicar
            </button>
          </div>
        )

      default:
        return <> </>
    }
  }

  const renderStatus = (status: string) => {
    switch (status) {
      case "finish":
        return <div className="w-[120px] flex rounded-3xl p-2 bg-[#E9D8FA] items-center justify-around h-[40px]"> <div className="bg-[#5B359E] w-3 h-3 rounded-full" />  <p className="text-[#5B359E]">Concluída</p> </div>;
      case "reproved":
        return <div className="w-[120px] flex rounded-3xl p-2 bg-[#C54B68] items-center justify-around h-[40px]"> <div className="bg-[#fff] w-3 h-3 rounded-full" />  <p className="text-[#fff]">Reprovada</p> </div>;
      case "approved":
        return <div className="w-[120px] flex rounded-3xl p-2 bg-[#11A75C] items-center justify-around h-[40px]"> <div className="bg-[#fff] w-3 h-3 rounded-full" />  <p className="text-[#fff]">Aprovada</p> </div>;
      case "draft":
        return <div className="w-[120px] flex rounded-3xl p-2 bg-[#F0F3F9] items-center justify-around h-[40px]"> <div className="bg-[#5E718D] w-3 h-3 rounded-full" />  <p className="text-[#5E718D]">Rascunho</p> </div>;
      case "pending":
        return <div className="w-[120px] flex rounded-3xl p-2 bg-[#FBEECA] items-center justify-around h-[40px]"> <div className="bg-[#AF6505] w-3 h-3 rounded-full" />  <p className="text-[#AF6505]">Pendente</p> </div>;
      case "ongoing":
        return <div className="w-[120px] flex rounded-3xl p-2 bg-[#3E79A5] items-center justify-around h-[40px]"> <div className="bg-[#fff] w-3 h-3 rounded-full" />  <p className="text-[#fff]">Em curso</p> </div>;
      default:
        return <p>DSla</p>;
    }
  }

  useEffect(() => {
    getResearchs();
  }, []);

  return (
    <div className="flex h-screen">
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
                  <div>
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
                    {researchs.map((item) => (
                      <div className="w-full p-4 flex justify-between border-b border-b-[#E4ECF5]">
                        <div className="w-[4%] items-center mt-2">
                          <Checkbox
                            label=""
                            isChecked={isChecked}
                            onChange={handleCheckboxChange}
                          />
                        </div>
                        <div className="cursor-pointer w-[24%] justify-center">
                          <p className="text-black-purs font-bold">{item.name}</p>
                          <p className="text-black-purs">{item.desc}</p>
                        </div>
                        <div className="flex w-[24%] justify-center items-center">
                          <p className="text-black-purs">{item.owner}</p>
                        </div>
                        <div className="flex w-[24%] justify-center items-center">
                          <p className="text-black-purs">{item.created}</p>
                        </div>
                        <div className="flex w-[24%] justify-center pl-10">
                          {renderStatus(item.status)}
                          <div style={{ position: 'relative' }}>
                            <PiDotsThreeVerticalBold onClick={() => handleMenuClick(item.id)} style={{ cursor: "pointer", marginLeft: 30, marginTop: 5 }} size={30} />
                            {showMenu === item.id && (
                              <>
                                {renderOptions(item.id, item.status)}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
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

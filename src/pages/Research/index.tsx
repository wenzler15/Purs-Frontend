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
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import api from '../../services/api';

const customModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '600px',
    padding: '20px',
    textAlign: 'center',
    borderRadius: 15
  }
};

const Research: React.FC = () => {
  const [researchs, setResearchs] = useState([]);
  const [checked, setChecked] = useState(0);
  const [action, setAction] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMenu, setShowMenu] = useState<number | null>(null);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState(new Set());

  const location = useLocation();
  const navigate = useNavigate();

  const getResearchs = async () => {
    // try {
    //   const token = makeCookieAdapter().get(TOKEN_NAME);

    //   const resp = await api.get(`/research/getResearchs`, {
    //     headers: {
    //       Authorization: token,
    //     },
    //   });

    //   setResearchs(resp.data)
    // } catch (err) {
    //   toast.error("Não foi possível listar as pesquisas")
    // }

    const resp = [
      {
        'id': 1,
        'name': "Pesquisa teste",
        'desc': "Apenas uma pesquisa para testes",
        'owner': "Douglas Wenzler",
        'created': "12/07/2024",
        'status': "finish",
        'checked': false
      },
      {
        'id': 2,
        'name': "Pesquisa teste 2",
        'desc': "Apenas uma pesquisa para testes 2",
        'owner': "Douglas Wenzler",
        'created': "13/07/2024",
        'status': "reproved",
        'checked': false
      },
      {
        'id': 3,
        'name': "Pesquisa teste 2",
        'desc': "Apenas uma pesquisa para testes 2",
        'owner': "Douglas Wenzler",
        'created': "13/07/2024",
        'status': "approved",
        'checked': false
      },
      {
        'id': 4,
        'name': "Pesquisa teste 2",
        'desc': "Apenas uma pesquisa para testes 2",
        'owner': "Douglas Wenzler",
        'created': "13/07/2024",
        'status': "draft",
        'checked': false
      },
      {
        'id': 5,
        'name': "Pesquisa teste 2",
        'desc': "Apenas uma pesquisa para testes 2",
        'owner': "Douglas Wenzler",
        'created': "13/07/2024",
        'status': "pending",
        'checked': false
      },
      {
        'id': 6,
        'name': "Pesquisa teste 2",
        'desc': "Apenas uma pesquisa para testes 2",
        'owner': "Douglas Wenzler",
        'created': "13/07/2024",
        'status': "ongoing",
        'checked': false
      },
    ]

    setResearchs(resp);
  }

  const handleMenuClick = (rowId: number) => {
    setShowMenu(showMenu === rowId ? null : rowId);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDuplicate = async (rowId: number) => {
    try {
      await api.get(`/research/duplicate/${rowId}`)

      toast.success("Pesquisa duplicada com sucesso")
      setShowMenu(null);
      window.location.reload();
    } catch (err) {
      toast.error("Não foi possível duplicar a pesquisa")
      setShowMenu(null);
    }
  };

  const handleMultipleDuplicate = async () => {
    for (const item of selectedIds) {
      try {
        await api.get(`/research/duplicate/${item}`)

        toast.success("Pesquisa duplicada com sucesso")
        setShowMenu(null);
      } catch (err) {
        toast.error("Não foi possível duplicar a pesquisa")
        setShowMenu(null);
      }
    }

    window.location.reload();
  };

  const handleChangeStatus = async (rowId: number, status: string) => {
    try {
      const toSend = {
        status
      }

      await api.patch(`/research/${rowId}`, toSend);

      toast.success("Status da pesquisa atualizado com sucesso");
      window.location.reload();
    } catch (err) {
      toast.error("Não foi possível trocar o status da pesquisa");
      setShowMenu(null);
    }
  }

  const handleMultipleChangeStatus = async (status: string) => {

    for (const item of selectedIds) {
      try {
        const toSend = {
          status
        };

        await api.patch(`/research/${item}`, toSend);

        toast.success("Status da pesquisa atualizado com sucesso");
      } catch (err) {
        toast.error("Não foi possível trocar o status da pesquisa");
      }
    }

    window.location.reload();
  }

  const handleDelete = async (rowId: number) => {
    try {
      await api.delete(`/research/${rowId}`);

      toast.success("Pesquisa deletada");
      window.location.reload();
    } catch (err) {
      toast.error("Não foi possível apagar a pesquisa");
      setShowMenu(null);
    }
  };

  const handleMultipleDelete = async () => {
    for (const item of selectedIds) {
      try {
        await api.delete(`/research/${item}`);

        toast.success("Pesquisa deletada");
      } catch (err) {
        toast.error("Não foi possível apagar a pesquisa");
        setShowMenu(null);
      }
    }

    window.location.reload();
  };

  const handleEdit = (rowId: number) => {
    //Navigate dps que a tela de criar tiver pronta
    console.log("Editado", rowId)
    setShowMenu(null);
  }

  const handleSelectAllChange = (event) => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);

    const updatedResearchs = researchs.map(item => ({
      ...item,
      checked: newSelectAll
    }));

    const allIds = newSelectAll ? updatedResearchs.map(item => item.id) : [];

    setResearchs(updatedResearchs);
    setSelectedItems(new Set(allIds));
  };

  const handleCheckboxChange = (id: number) => (isChecked: boolean) => {
    const updatedResearchs = researchs.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          checked: isChecked,
        };
      }
      return item;
    });

    const updatedSelectedItems = new Set(selectedItems);

    if (isChecked) {
      updatedSelectedItems.add(id);
    } else {
      updatedSelectedItems.delete(id);
    }

    setSelectedItems(updatedSelectedItems);
    setResearchs(updatedResearchs);
    setSelectAll(updatedResearchs.length === updatedSelectedItems.size);
  };

  const selectedIds = Array.from(selectedItems);

  const renderOptions = (id: number, status: string) => {
    switch (status) {
      case "draft":
        return (
          <div className="absolute w-[150px] right-0 top-full bg-[#fff] border border-gray-300 rounded shadow-lg z-20">
            <button onClick={() => {
              setIsModalOpen(true)
              setShowMenu(null)
              setAction("edit")
              setChecked(id)
            }}
              className="flex p-2 border-0 text-left w-full hover:bg-[#ccc]">
              <FaPen style={{ marginRight: 10 }} /> Edição
            </button>
            <button onClick={() => {
              setIsModalOpen(true)
              setShowMenu(null)
              setAction("duplicate")
              setChecked(id)
            }}
              className="flex p-2 border-0 text-left w-full hover:bg-[#ccc]">
              <FaCopy style={{ marginRight: 10 }} /> Duplicar
            </button>
            <button onClick={() => {
              setIsModalOpen(true)
              setShowMenu(null)
              setAction("delete")
              setChecked(id)
            }
            }
              className="flex p-2 border-0 text-left w-full hover:bg-[#ccc]">
              <FaTrash style={{ marginRight: 10 }} /> Excluir
            </button>
          </div>
        )
      case "finish":
        return (
          <div className="absolute w-[150px] right-0 top-full bg-[#fff] border border-gray-300 rounded shadow-lg z-20">
            <button onClick={() => {
              setIsModalOpen(true)
              setShowMenu(null)
              setAction("duplicate")
              setChecked(id)
            }}
              className="flex p-2 border-0 text-left w-full hover:bg-[#ccc]">
              <FaCopy style={{ marginRight: 10 }} /> Duplicar
            </button>
            <button onClick={() => {
              setIsModalOpen(true)
              setShowMenu(null)
              setAction("delete")
              setChecked(id)
            }
            }
              className="flex p-2 border-0 text-left w-full hover:bg-[#ccc]">
              <FaTrash style={{ marginRight: 10 }} /> Excluir
            </button>
          </div>
        )
      case "pending":
        return (
          <div className="absolute w-[150px] right-0 top-full bg-[#fff] border border-gray-300 rounded shadow-lg z-20">
            <button onClick={() => {
              setIsModalOpen(true)
              setShowMenu(null)
              setAction("approved")
              setChecked(id)
            }}
              className="flex p-2 border-0 text-left w-full hover:bg-[#ccc]">
              <CiCircleCheck style={{ marginRight: 10, marginTop: 5, fontWeight: "bold" }} /> Aprovar
            </button>
            <button onClick={() => {
              setIsModalOpen(true)
              setShowMenu(null)
              setAction("reproved")
              setChecked(id)
            }}
              className="flex p-2 border-0 text-left w-full hover:bg-[#ccc]">
              <IoCloseCircleOutline style={{ marginRight: 10, marginTop: 5 }} /> Reprovar
            </button>
            <button onClick={() => {
              setIsModalOpen(true)
              setShowMenu(null)
              setAction("edit")
              setChecked(id)
            }}
              className="flex p-2 border-0 text-left w-full hover:bg-[#ccc]">
              <FaPen style={{ marginRight: 10 }} /> Edição
            </button>
            <button onClick={() => {
              setIsModalOpen(true)
              setShowMenu(null)
              setAction("duplicate")
              setChecked(id)
            }}
              className="flex p-2 border-0 text-left w-full hover:bg-[#ccc]">
              <FaCopy style={{ marginRight: 10 }} /> Duplicar
            </button>
            <button onClick={() => {
              setIsModalOpen(true)
              setShowMenu(null)
              setAction("delete")
              setChecked(id)
            }
            }
              className="flex p-2 border-0 text-left w-full hover:bg-[#ccc]">
              <FaTrash style={{ marginRight: 10 }} /> Excluir
            </button>
          </div>
        )
      case "reproved":
        return (
          <div className="absolute w-[150px] right-0 top-full bg-[#fff] border border-gray-300 rounded shadow-lg z-20">
            <button onClick={() => {
              setIsModalOpen(true)
              setShowMenu(null)
              setAction("edit")
              setChecked(id)
            }}
              className="flex p-2 border-0 text-left w-full hover:bg-[#ccc]">
              <FaPen style={{ marginRight: 10 }} /> Edição
            </button>
            <button onClick={() => {
              setIsModalOpen(true)
              setShowMenu(null)
              setAction("delete")
              setChecked(id)
            }
            }
              className="flex p-2 border-0 text-left w-full hover:bg-[#ccc]">
              <FaTrash style={{ marginRight: 10 }} /> Excluir
            </button>
          </div>
        )
      case "approved":
        return (
          <div className="absolute w-[150px] right-0 top-full bg-[#fff] border border-gray-300 rounded shadow-lg z-20">
            <button onClick={() => {
              setIsModalOpen(true)
              setShowMenu(null)
              setAction("start")
              setChecked(id)
            }
            }
              className="flex p-2 border-0 text-left w-full hover:bg-[#ccc]">
              <VscDebugStart style={{ marginRight: 10 }} /> Iniciar
            </button>
            <button onClick={() => {
              setIsModalOpen(true)
              setShowMenu(null)
              setAction("duplicate")
              setChecked(id)
            }}
              className="flex p-2 border-0 text-left w-full hover:bg-[#ccc]">
              <FaCopy style={{ marginRight: 10 }} /> Duplicar
            </button>
            <button onClick={() => {
              setIsModalOpen(true)
              setShowMenu(null)
              setAction("delete")
              setChecked(id)
            }
            }
              className="flex p-2 border-0 text-left w-full hover:bg-[#ccc]">
              <FaTrash style={{ marginRight: 10 }} /> Excluir
            </button>
          </div>
        )
      case "ongoing":
        return (
          <div className="absolute w-[150px] right-0 top-full bg-[#fff] border border-gray-300 rounded shadow-lg z-20">
            <button onClick={() => {
              setIsModalOpen(true)
              setShowMenu(null)
              setAction("duplicate")
              setChecked(id)
            }}
              className="flex p-2 border-0 text-left w-full hover:bg-[#ccc]">
              <FaCopy style={{ marginRight: 10 }} /> Duplicar
            </button>
            <button onClick={() => {
              setIsModalOpen(true)
              setShowMenu(null)
              setAction("finish")
              setChecked(id)
            }}
              className="flex p-2 border-0 text-left w-full hover:bg-[#ccc]">
              <CiClock1 style={{ marginRight: 10 }} /> Encerrar
            </button>
          </div>
        )
      case "items":
        return (
          <div className="absolute w-[150px] left-8 top-10 bg-[#fff] border border-gray-300 rounded shadow-lg z-20">
            <button onClick={() => {
              setIsModalOpen(true)
              setShowMenu(null)
              setAction("finish")
              setChecked(id)
            }}
              className="flex p-2 border-0 text-left w-full hover:bg-[#ccc]">
              <CiClock1 style={{ marginRight: 10 }} /> Encerrar
            </button>
            <button onClick={() => {
              setIsModalOpen(true)
              setShowMenu(null)
              setAction("duplicate")
              setChecked(id)
            }}
              className="flex p-2 border-0 text-left w-full hover:bg-[#ccc]">
              <FaCopy style={{ marginRight: 10 }} /> Duplicar
            </button>
            <button onClick={() => {
              setIsModalOpen(true)
              setShowMenu(null)
              setAction("delete")
            }
            }
              className="flex p-2 border-0 text-left w-full hover:bg-[#ccc]">
              <FaTrash style={{ marginRight: 10 }} /> Excluir
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
                <div>
                  <p className="text-lg font-bold mt-2 ml-2">Pesquisas</p>
                  {selectedIds.length > 0 ? (
                    <div className="flex relative">
                      <p className="mt-2 ml-2">Selecionadas ({selectedIds.length})</p>
                      <PiDotsThreeVerticalBold onClick={() => handleMenuClick(0)} style={{ cursor: "pointer", marginTop: 8 }} size={25} />
                      {showMenu === 0 && (
                        <>
                          {renderOptions(0, "items")}
                        </>
                      )}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="w-[60%] h-[50px] flex flex-row border border-[#CCC] p-1 rounded-md pl-3">
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
                          isChecked={selectAll}
                          onChange={handleSelectAllChange}
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

                    {researchs.map((item: any) => (
                      <div className="w-full p-4 flex justify-between border-b border-b-[#E4ECF5]">
                        <div className="w-[4%] items-center mt-2">
                          <Checkbox
                            label=""
                            isChecked={item.checked}
                            onChange={handleCheckboxChange(item.id)}
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
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          style={customModalStyles}
          contentLabel="Alterar senha"
        >
          {action === "delete" ? (
            <>
              {selectedIds.length > 1 ? (
                <>
                  <p className="font-bold text-xl">Gostaria de excluir estas pequisas?</p>
                  <p className="mt-2">Excluindo estas pesquisas, todas as respostas não estarão mais disponiveis.</p>
                </>
              ) : (
                <>
                  <p className="font-bold text-xl">Gostaria de excluir esta pequisa?</p>
                  <p className="mt-2">Excluindo esta pesquisa, todas as respostas não estarão mais disponiveis.</p>
                </>
              )}

              <div className="flex justify-around">
                <TextButton text="Não excluir" onClick={() => {
                  setIsModalOpen(false)
                  setAction("")
                }}
                  style={{ marginTop: "40px", background: "#fff", border: "1px solid #000", color: "#000" }} />
                <TextButton text="Excluir" onClick={() => selectedIds.length > 0 ? handleMultipleDelete() : handleDelete(checked)} style={{ marginTop: "40px", background: "red" }} />
              </div>
            </>
          ) : action === "edit" ? (
            <>
              {selectedIds.length > 1 ? (
                <>
                  <p className="font-bold text-xl">Gostaria de editar estas pequisas?</p>
                  <p className="mt-2">Tem certeza que quer editar essas pesquisas?</p>
                </>
              ) : (
                <>
                  <p className="font-bold text-xl">Gostaria de editar esta pequisa?</p>
                  <p className="mt-2">Tem certeza que quer editar essa pesquisa?</p>
                </>
              )}

              <div className="flex justify-around">
                <TextButton text="Não editar" onClick={() => {
                  setIsModalOpen(false)
                  setAction("")
                }}
                  style={{ marginTop: "40px", background: "#fff", border: "1px solid #000", color: "#000" }} />
                <TextButton text="Sim" onClick={() => handleEdit(checked)} style={{ marginTop: "40px", marginLef: 10 }} />
              </div>
            </>
          ) : action === "duplicate" ? (
            <>
              {selectedIds.length > 1 ? (
                <>
                  <p className="font-bold text-xl">Gostaria de duplicar estas pequisas?</p>
                  <p className="mt-2">Tem certeza que gostaria de duplicar?</p>
                </>
              ) : (
                <>
                  <p className="font-bold text-xl">Gostaria de duplicar esta pequisa?</p>
                  <p className="mt-2">Tem certeza que gostaria de duplicar?</p>
                </>
              )}

              <div className="flex justify-around">
                <TextButton text="Não duplicar" onClick={() => {
                  setIsModalOpen(false)
                  setAction("")
                }}
                  style={{ marginTop: "40px", background: "#fff", border: "1px solid #000", color: "#000" }} />
                <TextButton text="Duplicar" onClick={() => selectedIds.length > 0 ? handleMultipleDuplicate() : handleDuplicate(checked)} style={{ marginTop: "40px" }} />
              </div>
            </>
          ) : action === "approved" ? (
            <>
              {selectedIds.length > 1 ? (
                <>
                  <p className="font-bold text-xl">Gostaria de aprovar estas pequisas?</p>
                  <p className="mt-2">Tem certeza que gostaria de aprovar?</p>
                </>
              ) : (
                <>
                  <p className="font-bold text-xl">Gostaria de aprovar esta pequisa?</p>
                  <p className="mt-2">Tem certeza que gostaria de aprovar?</p>
                </>
              )}

              <div className="flex justify-around">
                <TextButton text="Não aprovar" onClick={() => {
                  setIsModalOpen(false)
                  setAction("")
                }}
                  style={{ marginTop: "40px", background: "#fff", border: "1px solid #000", color: "#000" }} />
                <TextButton text="Aprovar" onClick={() => handleChangeStatus(checked, 'approved')} style={{ marginTop: "40px" }} />
              </div>
            </>
          ) : action === "reproved" ? (
            <>
              {selectedIds.length > 1 ? (
                <>
                  <p className="font-bold text-xl">Gostaria de reprovar estas pequisas?</p>
                  <p className="mt-2">Tem certeza que gostaria de reprovar?</p>
                </>
              ) : (
                <>
                  <p className="font-bold text-xl">Gostaria de reprovar esta pequisa?</p>
                  <p className="mt-2">Tem certeza que gostaria de reprovar?</p>
                </>
              )}

              <div className="flex justify-around">
                <TextButton text="Não reprovar" onClick={() => {
                  setIsModalOpen(false)
                  setAction("")
                }}
                  style={{ marginTop: "40px", background: "#fff", border: "1px solid #000", color: "#000" }} />
                <TextButton text="Reprovar" onClick={() => handleChangeStatus(checked, 'reproved')} style={{ marginTop: "40px", background: "red" }} />
              </div>
            </>
          ) : action === "start" ? (
            <>
              {selectedIds.length > 1 ? (
                <>
                  <p className="font-bold text-xl">Gostaria de começar estas pequisas?</p>
                  <p className="mt-2">Tem certeza que gostaria de começar estás pesquisas?</p>
                </>
              ) : (
                <>
                  <p className="font-bold text-xl">Gostaria de começar esta pequisa?</p>
                  <p className="mt-2">Tem certeza que gostaria de começar?</p>
                </>
              )}

              <div className="flex justify-around">
                <TextButton text="Não começar" onClick={() => {
                  setIsModalOpen(false)
                  setAction("")
                }}
                  style={{ marginTop: "40px", background: "#fff", border: "1px solid #000", color: "#000" }} />
                <TextButton text="Começar" onClick={() => handleChangeStatus(checked, 'ongoing')} style={{ marginTop: "40px" }} />
              </div>
            </>
          ) : action === "finish" ? (
            <>
              {selectedIds.length > 1 ? (
                <>
                  <p className="font-bold text-xl">Gostaria de finalizar estas pequisas?</p>
                  <p className="mt-2">Tem certeza que gostaria de finalizar?</p>
                </>
              ) : (
                <>
                  <p className="font-bold text-xl">Gostaria de finalizar esta pequisa?</p>
                  <p className="mt-2">Tem certeza que gostaria de finalizar?</p>
                </>
              )}

              <div className="flex justify-around">
                <TextButton text="Não finalizar" onClick={() => {
                  setIsModalOpen(false)
                  setAction("")
                }}
                  style={{ marginTop: "40px", background: "#fff", border: "1px solid #000", color: "#000" }} />
                <TextButton text="Finalizar" onClick={() => selectedIds.length > 0 ? handleMultipleChangeStatus("finish") : handleChangeStatus(checked, 'finish')} style={{ marginTop: "40px" }} />
              </div>
            </>
          ) : (
            <></>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default Research;

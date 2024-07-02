import React, { useEffect, useState } from "react";
import Header from "../../../Components/Header";
import NavBar from "../../../Components/NavBar";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useUserContext } from '../../../contexts/UserContext';
import { CiImageOn } from "react-icons/ci";
import { FaPen, FaCheck, FaRegTrashAlt } from 'react-icons/fa';
import { CiCirclePlus } from "react-icons/ci";
import { FcCancel } from "react-icons/fc";
import api from '../../../services/api';
import TextInput from "../../../Components/TextInput";
import Modal from 'react-modal';
import TextButton from "../../../Components/Button";
import Downshift from 'downshift'

const customModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '700px',
    padding: '20px',
    textAlign: 'center',
    borderRadius: 15
  }
};

const ProfileCompany: React.FC = () => {
  const [logoLink, setLogoLink] = useState("");
  const [name, setName] = useState("");
  const [corporateName, setCorporateName] = useState("");
  const [email, setEmail] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [state, setState] = useState("");
  const [mission, setMission] = useState("");
  const [vision, setVision] = useState("");
  const [values, setValues] = useState([{ value: "" }]);
  const [responsibles, setResponsibles] = useState([]);
  const [editingMainInfo, setEditingMainInfo] = useState(false);
  const [editingCompanyInfo, setEditingCompanyInfo] = useState(false);
  const [editingReponsibles, setEditingReponsibles] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [respDelete, setRespDelete] = useState(0);
  const [addResp, setAddResp] = useState(false);
  const [employees, setEmplooyees] = useState([]);

  const navigate = useNavigate();

  const saveMainInfo = async (info: string) => {
    try {
      let toSend = {};

      if (info === "main") {
        toSend = {
          name,
          email,
          phone,
          neighborhood,
          street,
          state,
          cnpj,
          corporateName
        }
      } else {

        toSend = {
          mission,
          vision
        }

        if (values[0].value !== "") {
          const valuesUpdated = JSON.stringify(values);
  
          toSend.values = valuesUpdated;
        }
      }

      const token = localStorage.getItem('pursToken');

      await api.patch(`/companies`, toSend, {
        headers: {
          Authorization: token,
        },
      });

      toast.success("Empresa atualizada com sucesso");
      setEditingMainInfo(false);
      setEditingCompanyInfo(false);
    } catch (err) {
      toast.error("Não foi possível salvar as informações da empresa")
    }
  }

  const closeModal = () => {
    setRespDelete(0);
    setShowModalDelete(false);
  };

  const handleCnpjChange = (event) => {
    let formattedCnpj = event.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (formattedCnpj.length > 2) {
      formattedCnpj = formattedCnpj.replace(/^(\d{2})(\d)/, '$1.$2'); // Adiciona ponto após os primeiros dois dígitos
    }
    if (formattedCnpj.length > 5) {
      formattedCnpj = formattedCnpj.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3'); // Adiciona ponto após os próximos três dígitos
    }
    if (formattedCnpj.length > 8) {
      formattedCnpj = formattedCnpj.replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3/$4'); // Adiciona barra após os próximos três dígitos
    }
    if (formattedCnpj.length > 12) {
      formattedCnpj = formattedCnpj.replace(/^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/, '$1.$2.$3/$4-$5'); // Adiciona hífen após os próximos quatro dígitos
    }
    setCnpj(formattedCnpj);
  };

  const getCompanyData = async () => {
    try {
      const token = localStorage.getItem('pursToken');
      const resp = await api.get('/companies/getOne', {
        headers: {
          Authorization: token,
        },
      });

      setLogoLink(resp.data.logoLink);
      setName(resp.data.name);
      setCorporateName(resp.data.corporateName);
      setEmail(resp.data.email);
      setCnpj(resp.data.cnpj);
      setStreet(resp.data.street);
      setPhone(resp.data.phone);
      setNeighborhood(resp.data.neighborhood);
      setState(resp.data.state);
      setMission(resp.data.mission);
      setVision(resp.data.vision);

      if (resp.data.values !== "") {
        const valuesParsed = JSON.parse(resp.data.values);

        setValues(valuesParsed);
      }

    } catch (err) {
      if (err?.response?.status === 405) {
        toast.error("Você não tem permissão de ver essa página");
        navigate("/home")
      }
    }
  }

  const getResponsibles = async () => {
    try {
      const token = localStorage.getItem('pursToken');
      const resp = await api.get('/companies/responsibles', {
        headers: {
          Authorization: token,
        }
      });

      setResponsibles(resp.data);
    } catch (err) {
      toast.error("Não foi possivel listar os responsaveis!")
    }
  }

  const handlePhoneChange = (event) => {
    let formattedTelefone = event.target.value.replace(/\D/g, '');
    if (formattedTelefone.length <= 10) {
      formattedTelefone = formattedTelefone.replace(/^(\d{2})(\d)/, '($1) $2');
      formattedTelefone = formattedTelefone.replace(/(\d{4})(\d)/, '$1-$2');
    } else {
      formattedTelefone = formattedTelefone.replace(/^(\d{2})(\d)/, '($1) $2 ');
      formattedTelefone = formattedTelefone.replace(/(\d{4})(\d)/, '$1-$2');
    }
    setPhone(formattedTelefone);
  };

  const addResponsibe = async (data) => {
    try {
      const token = localStorage.getItem('pursToken');

      const toSend = {
        responsible: 1
      };

      await api.patch(`/users/handleResp/${data.id}`, toSend, {
        headers: {
          Authorization: token,
        },
      });

      toast.success("Responsável adicionado");
      window.location.reload();

    } catch (err) {
      toast.error("Não foi possível adicionar o responsável")
    }
  }

  const deleteResp = async () => {
    try {
      const token = localStorage.getItem('pursToken');

      const toSend = {
        responsible: 0
      };

      if (responsibles.length === 1) {
        toast.error("Adicione outro responsável antes de apagar o atual");

        setRespDelete(0);
        setShowModalDelete(false);
      } else {
        await api.patch(`/users/handleResp/${respDelete}`, toSend, {
          headers: {
            Authorization: token,
          },
        });

        toast.success("Responsável removido");
        window.location.reload();
      }

    } catch (err) {
      toast.error("Não foi possível remover o responsável");

    }
  }

  const getEmployees = async () => {
    try {
      const token = localStorage.getItem('pursToken');
      const resp = await api.get('/users/listEmployees', {
        headers: {
          Authorization: token,
        },
      });

      setEmplooyees(resp.data)
    } catch (err) {
      toast.error("Não foi possível listar os funcionários")
    }

  }

  const addValue = () => {
    setValues([...values, { value: '' }]);
  };

  const handleChangeValue = (value: string, index: number) => {
    const newValue = values.map((valor, i) => {
      if (index === i) {
        return { ...valor, value };
      }
      return valor;
    });
    setValues(newValue);
  };

  const removeValue = (indexMain: number) => {
    const newValues = values.filter((item, index) => indexMain !== index);

    setValues(newValues);
  }

  useEffect(() => {
    getCompanyData();
    getResponsibles();
    getEmployees();
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-1/6">
        <NavBar path="companyProfile" />
      </div>
      <div className="w-full overflow-y-auto">
        <Header text="Perfil da Empresa" />
        <div className="w-full bg-gradient-to-b from-[#8B95CE] to-[#DBF4FA] h-auto pt-10 box-border px-4 pb-5">
          <div className="w-full rounded-lg bg-[#fff] p-5 px-8">
            <div className="flex">
              <h1>Informações Principais</h1>
              {editingMainInfo ? (
                <>
                  <FaCheck color="green" style={{ marginLeft: 5, marginTop: 5, cursor: 'pointer' }} onClick={() => saveMainInfo()} />
                  <FcCancel style={{ marginLeft: 5, marginTop: 5, cursor: 'pointer' }} onClick={() => setEditingMainInfo(false)} />
                </>
              ) : (
                <FaPen style={{ marginTop: 5, cursor: "pointer", marginLeft: 10 }} onClick={() => setEditingMainInfo(true)} />
              )}

            </div>
            <div className="flex mt-5 justify-between">
              <div className="rounded-lg flex justify-center items-center p-6 border border-blue-purs">
                <img src={logoLink} alt="Logo da Empresa" className='w-[95px] h-[60px]' />
              </div>
              <div>
                <TextInput text="Nome"
                  value={name}
                  disabled={!editingMainInfo}
                  onChange={(e) => setName(e.target.value)} />
                <TextInput text="Nome Fantasia"
                  value={corporateName}
                  disabled={!editingMainInfo}
                  onChange={(e) => setCorporateName(e.target.value)} />
              </div>
              <div>
                <TextInput text="E-mail principal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={!editingMainInfo}
                />

                <TextInput text="CNPJ"
                  value={cnpj}
                  onChange={handleCnpjChange}
                  disabled={!editingMainInfo}
                />
              </div>

              <div>
                <TextInput text="Telefone" value={phone}
                  disabled={!editingMainInfo}
                  onChange={handlePhoneChange}
                  maxLength={15} />

                <TextInput text="Rua"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  disabled={!editingMainInfo}
                />
              </div>

              <div>
                <TextInput text="Bairro"
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  disabled={!editingMainInfo}
                />
                <TextInput text="Estado"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  disabled={!editingMainInfo}
                />
              </div>
            </div>
          </div>

          <Modal
            isOpen={showModalDelete}
            onRequestClose={closeModal}
            style={customModalStyles}
            contentLabel="Remover Responsável"
          >
            <p>Você está prestes a remover esse responsável, tem certeza?</p>
            <div className="mt-5 flex">
              <TextButton text="Sim" onClick={deleteResp} />
              <TextButton text="Não" style={{ marginLeft: 10, background: '#C51918' }} onClick={() => {
                setRespDelete(0)
                setShowModalDelete(false)
              }} />
            </div>
          </Modal>

          <div className="flex justify-between mt-5">

            <div className="w-[48%] rounded-lg bg-[#fff] p-5 px-8">
              <div className="flex">
                <h1>Informações Institucionais</h1>
                {editingCompanyInfo ? (
                  <>
                    <FaCheck color="green" style={{ marginLeft: 5, marginTop: 5, cursor: 'pointer' }} onClick={() => saveMainInfo()} />
                    <FcCancel style={{ marginLeft: 5, marginTop: 5, cursor: 'pointer' }} onClick={() => setEditingCompanyInfo(false)} />
                  </>
                ) : (
                  <FaPen style={{ marginTop: 5, cursor: "pointer", marginLeft: 10 }} onClick={() => setEditingCompanyInfo(true)} />
                )}
              </div>
              <TextInput text="Missão"
                value={mission}
                disabled={!editingCompanyInfo}
                onChange={(e) => setMission(e.target.value)} />
              <TextInput text="Visão"
                value={vision}
                disabled={!editingCompanyInfo}
                onChange={(e) => setVision(e.target.value)} />

              {values.map((item, index) => (
                <>
                  <TextInput text={`Valor ${index + 1}`}
                    value={item.value}
                    disabled={!editingCompanyInfo}
                    onChange={(e) => handleChangeValue(e.target.value, index)} />
                  {editingCompanyInfo && (
                    <div className="w-full flex justify-end text-blue-purs cursor-pointer" onClick={() => removeValue(index)}>
                      <p className="underline">remover</p>
                    </div>
                  )}
                </>
              ))}
              {editingCompanyInfo && (
                <div className="flex w-full items-center justify-end mt-5 cursor-pointer" onClick={() => addValue()}>
                  <CiCirclePlus size={25} />
                  <p className="underline ml-2">Adicionar valor</p>
                </div>
              )}
            </div>

            <div className="w-[48%] rounded-lg bg-[#fff] p-5 px-8">
              <div className="flex">
                <h1>Responsáveis pela plataforma</h1>
                {editingReponsibles ? (
                  <FcCancel style={{ marginLeft: 5, marginTop: 5, cursor: 'pointer' }} onClick={() => setEditingReponsibles(false)} />
                ) : (
                  <FaPen style={{ marginTop: 5, cursor: "pointer", marginLeft: 10 }} onClick={() => setEditingReponsibles(true)} />
                )}
              </div>
              <div className="mt-5">
                <div className="w-full border-blue-purs rounded-xl p-5">
                  {responsibles.map((item) => (
                    <div className="flex w-full">
                      <div className="border rounded-lg border-blue-purs p-4 w-full flex">
                        <div className="w-1/5 flex items-center">
                          <div className="w-11 h-11 bg-gray-purs rounded-3xl flex items-center justify-center">
                            <CiImageOn size={30} />
                          </div>
                        </div>
                        <div>
                          <p> Nome: {item.name} </p>
                          <p> Cargo: {item.name} </p>
                          <p> E-mail: {item.email} </p>
                        </div>
                      </div>
                      {editingReponsibles && (
                        <div className="ml-2 border rounded-lg border-blue-purs w-[50px] flex items-center justify-center cursor-pointer" onClick={() => {
                          setRespDelete(item.id)
                          setShowModalDelete(true)
                        }}>
                          <FaRegTrashAlt color="red" />
                        </div>
                      )}
                    </div>
                  ))}
                  {editingReponsibles && (
                    <>
                      <div className="flex w-full items-center justify-end mt-5 cursor-pointer" onClick={() => setAddResp(true)}>
                        <CiCirclePlus size={25} />
                        <p className="underline ml-2">Adicionar responsável</p>
                      </div>
                      {addResp && (
                        <Downshift
                          onChange={selection => addResponsibe(selection)}
                          itemToString={item => (item ? item.value : '')}
                        >
                          {({
                            getInputProps,
                            getItemProps,
                            getLabelProps,
                            getMenuProps,
                            isOpen,
                            inputValue,
                            highlightedIndex,
                            selectedItem,
                            getRootProps,
                          }) => (
                            <div className="w-full">
                              <p className="text-lg text-grey-purs" {...getLabelProps()}>Adicione o e-mail</p>
                              <div
                                className="w-full"
                                style={{ display: 'inline-block' }}
                                {...getRootProps({}, { suppressRefError: true })}
                              >
                                <input className="w-full border rounded-xl border-grey-purs p-2 mt-2" {...getInputProps()} />
                              </div>
                              <ul {...getMenuProps()}>
                                {isOpen
                                  ? employees
                                    .filter(item => !inputValue || item.email.includes(inputValue))
                                    .map((item, index) => (
                                      <div className="border-b border-b-grey-purs">
                                        <li
                                          {...getItemProps({
                                            key: item.id,
                                            index,
                                            item,
                                            style: {
                                              backgroundColor:
                                                highlightedIndex === index ? 'lightgray' : 'white',
                                              fontWeight: selectedItem === item ? 'bold' : 'normal',
                                            },
                                          })}
                                        >
                                          <p className="font-bold">{item.name}</p>
                                        </li>

                                        <li
                                          {...getItemProps({
                                            key: item.id,
                                            index,
                                            item,
                                            style: {
                                              backgroundColor:
                                                highlightedIndex === index ? 'lightgray' : 'white',
                                              fontWeight: selectedItem === item ? 'bold' : 'normal',
                                            },
                                          })}
                                        >
                                          {item.email}
                                        </li>
                                      </div>
                                    ))
                                  : null}
                              </ul>
                            </div>
                          )}
                        </Downshift>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCompany;

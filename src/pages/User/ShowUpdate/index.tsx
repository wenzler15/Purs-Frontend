import React, { useEffect, useState } from "react";
import Header from "../../../Components/Header";
import NavBar from "../../../Components/NavBar";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import api from '../../../services/api';
import TextInput from "../../../Components/TextInput";
import TextButton from "../../../Components/Button";
import Dropdown from "../../../Components/Dropdown";
import Modal from 'react-modal';

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

const ShowUpdateUser: React.FC = () => {
    const [employees, setEmployees] = useState([]);
    const [roles, setRoles] = useState([]);
    const statusList = 
    [
        {
            'value': 1,
            'label': "Ativo"
        },
        {
            'value': 0,
            'label': "Inativo"
        }
    ]

    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [idRole, setIdRole] = useState(null);
    const [idLeader, setIdLeader] = useState(null);
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [complement, setComplement] = useState('');
    const [smo, setSmo] = useState<any>(null);
    const [smoL, setSmoL] = useState<any>(null);
    const [status, setStatus] = useState();
    const [smoS, setSmoS] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const getEmployees = async () => {
        try {
            const token = localStorage.getItem('pursToken');
            const resp = await api.get('/users/listEmployees', {
                headers: {
                    Authorization: token,
                },
            });

            const newArr: any = [{
                value: null, label: "Nenhum"
            }];

            resp.data.map((item) => {
                newArr.push({ value: item.id, label: item.name })
            });

            setEmployees(newArr)
        } catch (err) {
            toast.error("Não foi possível listar os funcionários")
        }

    }

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const getRoles = async () => {
        try {
            const token = localStorage.getItem('pursToken');
            const resp = await api.get('/roles', {
                headers: {
                    Authorization: token,
                },
            });

            const newArr: any = [];

            resp.data.map((item) => {
                newArr.push({ value: item.id, label: item.roleName })
            });

            setRoles(newArr)
        } catch (err) {
            toast.error("Não foi possível listar os cargos")
        }
    }

    const handleChangeCpf = (cpf: string) => {
        cpf = cpf.replace(/\D/g, '');

        cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

        setCpf(cpf);
    };

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

    const handleSelectRole = (option) => {
        setIdRole(option.value);
    };

    const handleSelectLeader = (option) => {
        setIdLeader(option.value);
    };

    const handleSelectStatus = (option) => {
        setStatus(option.value);
    };

    const handleCepChange = async (event) => {
        let cep = event.target.value.replace(/\D/g, '');
        if (cep.length > 5) {
            cep = cep.replace(/^(\d{5})(\d{3})/, '$1-$2');
        }
        setZipCode(cep);

        if (cep.length === 9) {
            try {
                let response: any = await fetch(`https://viacep.com.br/ws/${cep.replace('-', '')}/json/`);
                response = await response.json();

                const { logradouro, localidade, bairro, uf } = response;

                setStreet(logradouro);
                setCity(localidade);
                setState(uf);
                setNeighborhood(bairro);
            } catch (error) {
                toast.error('Erro ao buscar CEP. Verifique e tente novamente.');
            }
        }
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('pursToken');

            if (name === "" || cpf === "" || idRole === null || email === "") {
                toast.error("Favor preencher os seguintes dados: Nome, CPF, Cargo e email");
                return null;
            }

            const hasCEO = roles.find((item) => item.label.toUpperCase() === "CEO");

            if (!idLeader && !hasCEO) {
                setIsModalOpen(true);
                return null;
            }

            const roleName = roles.find((item) => item.value == idRole);

            if (!idLeader && roleName?.label !== "CEO") {
                toast.error("Apenas colaborador com o cargo: 'CEO', pode ser cadastrado sem líder")
                return null;
            }

            if (roleName?.label === "CEO" && idLeader) {
                toast.error("Colaborador com cargo CEO não pode ter líder direto, favor remover o líder")
                return null;
            }

            if(roleName?.label === "CEO"){
                try {
                    const hasCEO = await api.get(`/users/hasCEO/verify`, {
                        headers: {
                            Authorization: token,
                        },
                    });

                    if (hasCEO.data && hasCEO.data != location.state.id) {
                        toast.error("Já existe outra pessoa com o cargo de CEO na sua empresa");
                        return null;
                    }
                } catch (err) {
                    console.log("oi")
                }
            }

            const toSend = {
                name,
                cpf,
                idRole,
                idLeader,
                email,
                phone,
                street,
                city,
                state,
                zipCode,
                neighborhood,
                houseNumber,
                complement,
                status
            }

            await api.patch(`/users/${location.state.id}`, toSend, {
                headers: {
                    Authorization: token,
                },
            });

            toast.success("Informações atualizadas com sucesso!");
            navigate("/employees");
        } catch (error) {
            toast.error("Erro ao salvar informações. Tente novamente.");
        }
    };

    const getUserInfo = async (id: number) => {
        try {
            const token = localStorage.getItem('pursToken');
            const resp = await api.get(`/users/${id}`, {
                headers: {
                    Authorization: token,
                },
            });

            const { name, cpf, idRole, idLeader, email, phone, street, city, state, zipCode, neighborhood, houseNumber, complement, roleName, leaderName, status } = resp.data

            setName(name);
            setCpf(cpf);
            setEmail(email);
            setPhone(phone);
            setStreet(street);
            setCity(city);
            setState(state);
            setZipCode(zipCode);
            setNeighborhood(neighborhood);
            setHouseNumber(houseNumber);
            setComplement(complement)

            if (idRole) {
                setIdRole(idRole)
                setSmo({ value: idRole, label: roleName })
            }

            if (idLeader) {
                setIdLeader(idLeader)
                setSmoL({ value: idLeader, label: leaderName })
            }

            setStatus(status)
            setSmoS({ value: status, label: status === 1 ? "Ativo" : "Inativo" })
        } catch (err) {
            toast.error("Erro ao tentar listar as informações do usuário")
        }
    }

    useEffect(() => {
        getEmployees();
        getRoles();
        getUserInfo(location.state.id);
    }, []);

    return (
        <div className="flex h-screen overflow-hidden">
            <div className="w-1/6">
                <NavBar path="employees" />
            </div>
            <div className="w-full">
                <Header text="Colaborador" />
                <div className="w-full bg-gradient-to-b from-[#8B95CE] to-[#DBF4FA] h-full pt-10 box-border px-4 pb-5 overflow-y-auto">
                    <div className="w-full rounded-lg bg-[#fff] p-5 px-8">
                        <div className="flex w-full justify-between">
                            <TextInput text="Nome do colaborador" style={{ width: "90%" }} onChange={(e) => setName(e.target.value)} value={name} />

                            <TextInput text="CPF" style={{ width: "90%" }} maxLength={14} onChange={(e) => handleChangeCpf(e.target.value)} value={cpf} />
                        </div>

                        <div className="flex w-full justify-between">
                            <TextInput text="E-mail" style={{ width: "90%" }} onChange={(e) => setEmail(e.target.value)} value={email} />

                            <TextInput text="Telefone" style={{ width: "90%" }} onChange={handlePhoneChange} maxLength={15} value={phone} />
                        </div>

                        <div className="flex w-full justify-between mt-5">
                            <div className="w-[50%]">
                                <div className="w-[90%]">
                                    {smo && (
                                        <Dropdown value={smo} text="Selecione um cargo" options={roles} onSelect={handleSelectRole} />
                                    )}
                                </div>
                            </div>

                            <div className="w-[50%]">
                                <div className="w-[90%]">
                                    {smo && (
                                        <Dropdown value={smoL} text="Selecione um líder" options={employees} onSelect={handleSelectLeader} />
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex w-full justify-between">
                            <TextInput text="CEP" style={{ width: "90%" }} value={zipCode} maxLength={9} onChange={handleCepChange} />

                            <TextInput text="Rua" style={{ width: "90%" }} onChange={(e) => setState(e.target.value)} value={street} />
                        </div>

                        <div className="flex w-full justify-between">
                            <TextInput text="Cidade" style={{ width: "90%" }} value={city} onChange={(e) => setCity(e.target.value)} />

                            <TextInput text="Bairro" style={{ width: "90%" }} onChange={(e) => setNeighborhood(e.target.value)} value={neighborhood} />
                        </div>

                        <div className="flex w-full justify-between">
                            <TextInput text="Estado" style={{ width: "90%" }} value={state} onChange={(e) => setState(e.target.value)} />

                            <TextInput text="Número" style={{ width: "90%" }} onChange={(e) => setHouseNumber(e.target.value)} value={houseNumber} />
                        </div>

                        <div className="flex w-full justify-between">
                            <TextInput text="Complemento" style={{ width: "90%" }} value={complement} onChange={(e) => setComplement(e.target.value)} />
                            
                            
                            <div className="w-[91%] mt-9 mr-10">
                                {smoS && (
                                    <Dropdown value={smoS} text="Status" options={statusList} onSelect={handleSelectStatus} />
                                )}
                            </div>
                        </div>
                    </div>

                    <Modal
                        isOpen={isModalOpen}
                        onRequestClose={closeModal}
                        style={customModalStyles}
                        contentLabel="CEO"
                    >
                        <>
                            <div>
                                <p className="text-blue-purs font-bold text-lg">Para adicionar um colaborador sem líder ele precisa ser CEO, porém você ainda não cadastrou o cargo "CEO", gostaria de cadastrar agora?</p>
                            </div>
                            <div className="flex justify-around">
                                <TextButton text="Cancelar" onClick={() => setIsModalOpen(false)}
                                    style={{ marginTop: "40px", background: "#fff", border: "1px solid #000", color: "#000" }} />
                                <TextButton text="Cadastrar" onClick={() => navigate('/role/add')} style={{ marginTop: "40px" }} />
                            </div>
                        </>
                    </Modal>

                    <div className="w-full flex justify-end mt-5 mb-20">
                        <TextButton text="Salvar" onClick={handleSave} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShowUpdateUser;

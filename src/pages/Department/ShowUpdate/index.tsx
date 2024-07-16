import React, { useEffect, useState } from "react";
import Header from "../../../Components/Header";
import NavBar from "../../../Components/NavBar";
import { toast } from 'react-toastify';
import TextInput from "../../../Components/TextInput";
import TextButton from "../../../Components/Button";
import { useNavigate, useLocation } from "react-router-dom";
import api from '../../../services/api';
import Dropdown from "../../../Components/Dropdown";
import { CiCirclePlus } from "react-icons/ci";

const ShowUpdateDepartment: React.FC = () => {
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [employess, setEmplooyees] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [responsibilities, setResponsibilities] = useState<string[]>([]);
    const [smo, setSmo] = useState<any>(null);

    const location = useLocation();
    const navigate = useNavigate();

    const handleSelect = (option) => {
        setSelectedOption(option.value);
    };

    const getEmployees = async () => {
        try {
            const token = localStorage.getItem('pursToken');
            const resp = await api.get('/users/listEmployees', {
                headers: {
                    Authorization: token,
                },
            });

            const newArr = [];

            resp.data.map((item) => {
                newArr.push({ value: item.id, label: item.name })
            });

            setEmplooyees(newArr)
        } catch (err) {
            toast.error("Não foi possível listar os funcionários")
        }

    }

    const addResp = () => {
        setResponsibilities([...responsibilities, '']);
    };

    const removeResp = (indexMain: number) => {
        const newValues = responsibilities.filter((item, index) => indexMain !== index);

        setResponsibilities(newValues);
    }

    const handleChangeResp = (value: string, index: number) => {
        const newValues = [...responsibilities];
        newValues[index] = value;
        setResponsibilities(newValues);
    };

    const getDepartmentInfo = async (id: number) => {
        try {
            const token = localStorage.getItem('pursToken');
            const resp = await api.get(`/departments/${id}`, {
                headers: {
                    Authorization: token,
                },
            });

            const {name, desc, idLeader, responsibilities, leaderName} = resp.data

            setName(name);
            setDesc(desc);
            setResponsibilities(responsibilities);
            setSelectedOption(idLeader)
            setSmo({value: idLeader, label: leaderName})
        } catch (err) {
            toast.error("Erro ao tentar listar as informações do departamento")
        }
    }

    useEffect(() => {
        getEmployees();
        getDepartmentInfo(location.state.id);
    }, []);

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('pursToken');

            if (name === "" || desc === "" || !selectedOption || responsibilities[0] === "") {
                toast.error("Favor preencha todos os campos")
                return null;
            }

            const toSend = {
                name,
                desc,
                responsibilities,
                idLeader: selectedOption
            }

            await api.patch(`/departments/${location.state.id}`, toSend, {
                headers: {
                    Authorization: token,
                },
            });

            toast.success("Departamento atualizado com sucesso!");

            navigate("/departments")
        } catch (err) {
            toast.error("Não foi possível cadastrar o departamento!")
        }
    };

    return (
        <div className="flex h-screen overflow-hidden">
            <div className="w-1/6">
                <NavBar path="departments" />
            </div>
            <div className="w-full">
                <Header text="Departamento" />
                <div className="w-full bg-gradient-to-b from-[#8B95CE] to-[#DBF4FA] h-full overflow-y-auto pt-10 pl-4 pr-4 box-border pb-5">
                    <div className="w-full bg-[#fff] p-5 rounded-lg">
                        <div className="flex">
                            <p className="text-black-purs text-lg mr-3">Informações do departamento</p>
                        </div>
                        <div className="flex w-full justify-between">
                            <TextInput text="Nome do departamento" style={{ width: "90%" }} onChange={(e) => setName(e.target.value)} value={name} />

                            <TextInput text="Descrição" style={{ width: "90%" }} onChange={(e) => setDesc(e.target.value)} value={desc} />
                        </div>

                        {smo && (
                            <div className="w-[45%]">
                                <Dropdown text="Selecione um responsável" value={smo} options={employess} onSelect={handleSelect} />
                            </div>
                        )}

                        <div className="w-full mt-5">
                            <div className="flex justify-between w-full">
                                <p className="w-full text-black-purs">Responsabilidades do departamento</p>
                                <div className="flex w-full items-center justify-end mt-5 cursor-pointer" onClick={() => addResp()}>
                                    <CiCirclePlus size={25} />
                                    <p className="underline ml-2 text-black-purs">Adicionar</p>
                                </div>
                            </div>

                            {responsibilities.map((item, index) => (
                                <div>
                                    <TextInput value={item} text={`Responsabilidade ${index + 1}`} onChange={(e) => handleChangeResp(e.target.value, index)} />
                                    <div className="w-full flex justify-end text-blue-purs cursor-pointer" onClick={() => removeResp(index)}>
                                        <p className="underline">remover</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>

                    <div className="w-full flex justify-end mt-5 mb-20">
                        <TextButton text="Salvar" onClick={handleSave} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShowUpdateDepartment;

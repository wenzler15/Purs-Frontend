import React, { useEffect, useState } from "react";
import Header from "../../../Components/Header";
import NavBar from "../../../Components/NavBar";
import { toast } from 'react-toastify';
import TextInput from "../../../Components/TextInput";
import TextButton from "../../../Components/Button";
import { useNavigate } from "react-router-dom";
import api from '../../../services/api';
import Dropdown from "../../../Components/Dropdown";
import { CiCirclePlus } from "react-icons/ci";
import Checkbox from "../../../Components/Checkbox";

const AddUpdateRole: React.FC = () => {
    const [roleName, setRoleName] = useState('');
    const [roleDesc, setRoleDesc] = useState('');
    const [departments, setDepartments] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [responsibilities, setResponsibilities] = useState<{ response: string; desc: string }[]>([
        { response: '', desc: '' }
    ]);
    const [skills, setSkills] = useState<{ response: string; desc: string }[]>([
        { response: '', desc: '' }
    ]);
    const [qualifications, setQualifications] = useState<{ response: string; desc: string }[]>([
        { response: '', desc: '' }
    ]);
    const [isChecked, setIsChecked] = useState(false);
    const [minSalary, setMinSalary] = useState("");
    const [maxSalary, setMaxSalary] = useState("");

    const navigate = useNavigate();

    const handleSelect = (option) => {
        setSelectedOption(option.value);
    };

    const handleCheckboxChange = (isChecked: boolean) => {
        setIsChecked(isChecked);
    };

    const getDepartments = async () => {
        try {
            const token = localStorage.getItem('pursToken');
            const resp = await api.get('/departments', {
                headers: {
                    Authorization: token,
                },
            });

            const newArr = [];

            resp.data.map((item) => {
                newArr.push({ value: item.id, label: item.name })
            });

            setDepartments(newArr)
        } catch (err) {
            toast.error("Não foi possível listar os departamentos")
        }

    }

    const addResp = (arr: string) => {
        switch (arr) {
            case "resp":
                setResponsibilities([...responsibilities, { response: '', desc: '' }]);
                break;
            case "skill":
                setSkills([...skills, { response: '', desc: '' }]);
                break;
            case "qualification":
                setQualifications([...qualifications, { response: '', desc: '' }]);
                break;
        }
    };

    const removeResp = (indexMain: number, arr: string) => {
        switch (arr) {
            case "resp":
                setResponsibilities(responsibilities.filter((_, index) => index !== indexMain));
                break;
            case "skill":
                setSkills(skills.filter((_, index) => index !== indexMain));
                break;
            case "qualification":
                setQualifications(qualifications.filter((_, index) => index !== indexMain));
                break;
        }
    };


    const handleChangeResp = (value: string, index: number, field: 'response' | 'desc', arr: string) => {
        const updateItem = (items: any[], field: 'response' | 'desc') => {
            const updatedItems = [...items];
            updatedItems[index] = { ...updatedItems[index], [field]: value };
            return updatedItems;
        };

        switch (arr) {
            case "resp":
                setResponsibilities(updateItem(responsibilities, field));
                break;
            case "skill":
                setSkills(updateItem(skills, field));
                break;
            case "qualification":
                setQualifications(updateItem(qualifications, field));
                break;
        }
    };


    const handleChange = (event, type: string) => {
        let inputValue = event.target.value.replace(/\D/g, '');

        if (inputValue !== '') {
            inputValue = (parseFloat(inputValue) / 100).toFixed(2);
            inputValue = 'R$ ' + inputValue.toString().replace('.', ',');
            inputValue = inputValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        }

        if (type === "min") {
            setMinSalary(inputValue);
        } else {
            setMaxSalary(inputValue);
        }
    };

    useEffect(() => {
        getDepartments();
    }, []);

    const handleSave = async () => {
        try {
            if (roleName === "" || roleDesc === "") {
                toast.error("Favor preencher nome e descrição do cargo");
                return null;
            }

            const mins = parseFloat(minSalary.split('$')[1].replace('.', '').replace(',', '.'));
            const maxs = parseFloat(maxSalary.split('$')[1].replace('.', '').replace(',', '.'));

            if (maxs < mins) {
                toast.error("O valor máximo de salario precisa ser igual ou maior que o mínimo");
                return null;
            }

            const token = localStorage.getItem('pursToken');

            const toSend = {
                roleDesc,
                roleName,
                responsibilities,
                idDepartment: selectedOption,
                skills,
                qualifications,
                minSalary: mins,
                maxSalary: maxs
            }

            await api.post('/roles', toSend, {
                headers: {
                    Authorization: token,
                },
            });

            toast.success("Cargo cadastrado com sucesso!");

            navigate("/roles")
        } catch (err) {
            toast.error("Não foi possível cadastrar o cargo!")
        }
    };

    return (
        <div className="flex h-screen overflow-hidden">
            <div className="w-1/6">
                <NavBar path="roles" />
            </div>
            <div className="w-full">
                <Header text="Cargo" />
                <div className="w-full bg-gradient-to-b from-[#8B95CE] to-[#DBF4FA] h-full overflow-y-auto pt-10 pl-4 pr-4 box-border pb-5">
                    <div className="w-full bg-[#fff] p-5 rounded-lg">
                        <div className="flex">
                            <p className="text-black-purs text-lg mr-3">Informações do cargo</p>
                        </div>
                        <div className="flex w-full justify-between">
                            <TextInput text="Nome do cargo" style={{ width: "90%" }} onChange={(e) => setRoleName(e.target.value)} value={roleName} />

                            <TextInput text="Descrição" style={{ width: "90%" }} onChange={(e) => setRoleDesc(e.target.value)} value={roleDesc} />
                        </div>

                        <div className="mt-5">

                            <Checkbox
                                label="Esse cargo exlusivo de um deparmento?"
                                isChecked={isChecked}
                                onChange={handleCheckboxChange}
                            />

                        </div>

                        {isChecked && (
                            <div className="w-[45%]">
                                <Dropdown text="Selecione um departamento" options={departments} onSelect={handleSelect} />
                            </div>
                        )}

                        <div className="w-full mt-5">
                            <div className="flex justify-between w-full">
                                <p className="w-full text-black-purs">Responsabilidades do cargo</p>
                                <div className="flex items-center justify-end mt-5 cursor-pointer" onClick={() => addResp("resp")}>
                                    <CiCirclePlus size={25} />
                                    <p className="underline ml-2 text-black-purs">Adicionar</p>
                                </div>
                            </div>

                            {responsibilities.map((item, index) => (
                                <div key={index} className="mb-3">
                                    <TextInput
                                        value={item.response}
                                        text={`Responsabilidade ${index + 1}`}
                                        onChange={(e) => handleChangeResp(e.target.value, index, 'response', 'resp')}
                                    />
                                    <TextInput
                                        value={item.desc}
                                        text={`Descrição`}
                                        onChange={(e) => handleChangeResp(e.target.value, index, 'desc', 'resp')}
                                    />
                                    <div className="flex justify-end text-blue-purs">
                                        <p className="underline cursor-pointer" onClick={() => removeResp(index, "resp")}>Remover</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <hr className="mt-5 border border-blue-purs" />

                        <div className="w-full mt-5">
                            <div className="flex justify-between w-full">
                                <p className="w-full text-black-purs">Habilidades/skills do cargo</p>
                                <div className="flex items-center justify-end mt-5 cursor-pointer" onClick={() => addResp("skill")}>
                                    <CiCirclePlus size={25} />
                                    <p className="underline ml-2 text-black-purs">Adicionar</p>
                                </div>
                            </div>

                            {skills.map((item, index) => (
                                <div key={index} className="mb-3">
                                    <TextInput
                                        value={item.response}
                                        text={`Skill ${index + 1}`}
                                        onChange={(e) => handleChangeResp(e.target.value, index, 'response', 'skill')}
                                    />
                                    <TextInput
                                        value={item.desc}
                                        text={`Descrição`}
                                        onChange={(e) => handleChangeResp(e.target.value, index, 'desc', 'skill')}
                                    />
                                    <div className="flex justify-end text-blue-purs">
                                        <p className="underline cursor-pointer" onClick={() => removeResp(index, "skill")}>Remover</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <hr className="mt-5 border border-blue-purs" />

                        <div className="w-full mt-5">
                            <div className="flex justify-between w-full">
                                <p className="w-full text-black-purs">Qualificações do cargo</p>
                                <div className="flex items-center justify-end mt-5 cursor-pointer" onClick={() => addResp("qualification")}>
                                    <CiCirclePlus size={25} />
                                    <p className="underline ml-2 text-black-purs">Adicionar</p>
                                </div>
                            </div>

                            {qualifications.map((item, index) => (
                                <div key={index} className="mb-3">
                                    <TextInput
                                        value={item.response}
                                        text={`Qualificação ${index + 1}`}
                                        onChange={(e) => handleChangeResp(e.target.value, index, 'response', 'qualification')}
                                    />
                                    <TextInput
                                        value={item.desc}
                                        text={`Descrição`}
                                        onChange={(e) => handleChangeResp(e.target.value, index, 'desc', 'qualification')}
                                    />
                                    <div className="flex justify-end text-blue-purs">
                                        <p className="underline cursor-pointer" onClick={() => removeResp(index, "qualification")}>Remover</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="w-full mt-5">
                            <div className="flex justify-between w-full">
                                <p className="w-full text-black-purs">Faixa salarial</p>
                            </div>

                            <div className="flex w-full justify-between">
                                <TextInput text="Valor mínimo" onChange={(e) => handleChange(e, "min")} placeholder="R$ 0,00" style={{ width: "90%" }} value={minSalary} />

                                <TextInput text="Valor máximo" style={{ width: "90%" }} onChange={(e) => handleChange(e, "max")} placeholder="R$ 0,00" value={maxSalary} />
                            </div>
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

export default AddUpdateRole;

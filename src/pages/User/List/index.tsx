import React, { useEffect, useState } from "react";
import Header from "../../../Components/Header";
import NavBar from "../../../Components/NavBar";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { CiCirclePlus } from "react-icons/ci";
import { LuArrowUpDown } from "react-icons/lu";
import api from '../../../services/api';
import TextInput from "../../../Components/TextInput";
import TextButton from "../../../Components/Button";

const Employees: React.FC = () => {
    const [employees, setEmplooyees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [filterName, setFilterName] = useState("");
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const navigate = useNavigate();

    const getEmployees = async () => {
        try {
            const token = localStorage.getItem('pursToken');
            const resp = await api.get('/users/dashEmployees', {
                headers: {
                    Authorization: token,
                },
            });

            setEmplooyees(resp.data)
            setFilteredEmployees(resp.data)
        } catch (err) {
            toast.error("Não foi possível listar os funcionários")
        }
    }

    const applyFilter = () => {
        const filtered = employees.filter(employee =>
            employee.name.toLowerCase().includes(filterName.toLowerCase())
        );

        setFilteredEmployees(filtered);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilterName(event.target.value);
    };

    const handleFilterButtonClick = () => {
        applyFilter();
    };

    const handleResetFilterButtonClick = () => {
        setFilterName('');
        setFilteredEmployees(employees);
    };

    const handleSort = (field: string) => {
        const sortedData = [...filteredEmployees].sort((a, b) => {
            let aValue = a[field] || ''; 
            let bValue = b[field] || ''; 
    
            if (aValue === '' && bValue !== '') return sortOrder === 'asc' ? -1 : 1;
            if (bValue === '' && aValue !== '') return sortOrder === 'asc' ? 1 : -1;
    
            if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });
    
        setFilteredEmployees(sortedData);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    useEffect(() => {
        getEmployees();
    }, []);

    return (
        <div className="flex h-screen overflow-hidden">
            <div className="w-1/6">
                <NavBar path="employees" />
            </div>
            <div className="w-full overflow-y-auto">
                <Header text="Colaboradores" />
                <div className="w-full bg-gradient-to-b from-[#8B95CE] to-[#DBF4FA] h-full pt-10 box-border px-4 pb-5">
                    <div className="w-full rounded-lg bg-[#fff] p-5 px-8">

                        <div className="flex w-full">

                            <TextInput text="Nome"
                                value={filterName}
                                style={{ width: '80%' }}
                                onChange={handleInputChange}
                            />


                            <TextButton text="Filtrar" style={{ marginTop: 45, width: 150 }} onClick={handleFilterButtonClick} />
                            <TextButton text="Limpar" style={{ marginTop: 45, width: 150, marginLeft: 10, background: "#fff", color: "#000", border: '1px solid ' }} onClick={handleResetFilterButtonClick} />

                            <div className="w-1/2 flex items-end justify-end cursor-pointer" onClick={() => navigate('/employee/add')}>
                                <CiCirclePlus size={25} />
                                <p className="underline ml-2">Adicionar usuário</p>
                            </div>

                        </div>

                        <div className="w-full flex justify-center mt-5">
                            <div className="w-4/5 border rounded-lg border-grey-purs">
                                <div className="flex rounded-t-lg bg-purple-purs w-full justify-between p-2">
                                    <div className="flex items-center justify-center w-1/4 cursor-pointer" onClick={() => handleSort('name')}>
                                        <p className="text-[#fff] mr-2">Nome</p>
                                        <LuArrowUpDown color="#fff" size={20} />
                                    </div>
                                    <div className="flex items-center justify-center w-1/4 cursor-pointer" onClick={() => handleSort('roleName')}>
                                        <p className="text-[#fff] mr-2">Cargo</p>
                                        <LuArrowUpDown color="#fff" size={20} />
                                    </div>
                                    <div className="flex items-center justify-center w-1/4 cursor-pointer" onClick={() => handleSort('email')}>
                                        <p className="text-[#fff] mr-2">E-mail</p>
                                        <LuArrowUpDown color="#fff" size={20} />
                                    </div>
                                    <div className="flex items-center justify-center w-1/4 cursor-pointer" onClick={() => handleSort('leaderName')}>
                                        <p className="text-[#fff] mr-2">Líder</p>
                                        <LuArrowUpDown color="#fff" size={20} />
                                    </div>
                                </div>

                                {filteredEmployees.map((item) => (
                                    <div className="flex rounded-lg w-full justify-between p-2">
                                        <div className="flex items-center justify-center w-1/4 cursor-pointer underline" onClick={() => navigate('/employee/show', { state: { id: item.id } })}>
                                            <p>{item.name}</p>
                                        </div>
                                        <div className="flex items-center justify-center w-1/4">
                                            <p>{item.roleName}</p>
                                        </div>
                                        <div className="flex items-center justify-center w-1/4">
                                            <p>{item.email}</p>
                                        </div>
                                        <div className="flex items-center justify-center w-1/4">
                                            <p>{item.leaderName}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Employees;

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

const Departments: React.FC = () => {
    const [departments, setDepartments] = useState([]);
    const [filteredDepartments, setFilteredDepartments] = useState([]);
    const [filterName, setFilterName] = useState("");
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const navigate = useNavigate();

    const getDepartment = async () => {
        try {
            const token = localStorage.getItem('pursToken');
            const resp = await api.get('/departments', {
                headers: {
                    Authorization: token,
                },
            });

            setDepartments(resp.data)
            setFilteredDepartments(resp.data)
        } catch (err) {
            toast.error("Não foi possível listar os grupos")
        }
    }

    const handleSort = (field: string) => {
        const sortedData = [...filteredDepartments].sort((a, b) => {
            let aValue = a[field] || ''; 
            let bValue = b[field] || ''; 
    
            if (aValue === '' && bValue !== '') return sortOrder === 'asc' ? -1 : 1;
            if (bValue === '' && aValue !== '') return sortOrder === 'asc' ? 1 : -1;
    
            if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });
    
        setFilteredDepartments(sortedData);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const applyFilter = () => {
        const filtered = departments.filter(department =>
            department.name.toLowerCase().includes(filterName.toLowerCase())
        );
    
        setFilteredDepartments(filtered);
      };

      const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilterName(event.target.value);
      };
    
      const handleFilterButtonClick = () => {
        applyFilter();
      };
    
      const handleResetFilterButtonClick = () => {
        setFilterName('');
        setFilteredDepartments(departments);
      };
    
    useEffect(() => {
        getDepartment();
    }, []);

    return (
        <div className="flex h-screen overflow-hidden">
            <div className="w-1/6">
                <NavBar path="departments" />
            </div>
            <div className="w-full overflow-y-auto">
                <Header text="Departamentos" />
                <div className="w-full bg-gradient-to-b from-[#8B95CE] to-[#DBF4FA] h-full pt-10 box-border px-4 pb-5">
                    <div className="w-full rounded-lg bg-[#fff] p-5 px-8">

                        <div className="flex w-full">

                        <TextInput text="Nome"
                            value={filterName}
                            style={{width:'80%'}}
                            onChange={handleInputChange}
                            />

                        <TextButton text="Filtrar" style={{marginTop: 45, width: 150}} onClick={handleFilterButtonClick}/>
                        <TextButton text="Limpar" style={{marginTop: 45, width: 150, marginLeft: 10, background: "#fff", color: "#000", border: '1px solid '}} onClick={handleResetFilterButtonClick}/>

                        <div className="w-1/2 flex items-end justify-end cursor-pointer" onClick={() => navigate('/department/add')}>
                            <CiCirclePlus size={25} />
                            <p className="underline ml-2">Adicionar departamento</p>
                        </div>
                            
                        </div>

                        <div className="w-full flex justify-center mt-5">
                            <div className="w-4/5 border rounded-lg border-grey-purs">
                                <div className="flex rounded-t-lg bg-purple-purs w-full justify-between p-2">
                                    <div className="flex items-center justify-center cursor-pointer w-1/5" onClick={() => handleSort('name')}>
                                        <p className="text-[#fff] mr-2">Nome</p>
                                        <LuArrowUpDown color="#fff" size={20} />
                                    </div>
                                    <div className="flex items-center justify-center cursor-pointer w-3/5" onClick={() => handleSort('desc')}>
                                        <p className="text-[#fff] mr-2">Descrição</p>
                                        <LuArrowUpDown color="#fff" size={20} />
                                    </div>
                                    <div className="flex items-center justify-center cursor-pointer w-1/5" onClick={() => handleSort('leaderName')}>
                                        <p className="text-[#fff] mr-2">Líder</p>
                                        <LuArrowUpDown color="#fff" size={20} />
                                    </div>
                                </div>
                                {filteredDepartments.map((item: any) => (
                                    <div className="flex rounded-lg w-full justify-between p-2">
                                        <div className="flex items-center justify-center w-1/5 cursor-pointer underline" onClick={() => navigate('/department/show', { state: { id: item.id } })}>
                                            <p>{item.name}</p>
                                        </div>
                                        <div className="flex items-center justify-center w-3/5">
                                            <p>{item.desc}</p>
                                        </div>
                                        <div className="flex items-center justify-center w-1/5">
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

export default Departments;

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

const Roles: React.FC = () => {
    const [roles, setRoles] = useState([]);
    const [filteredRoles, setFilteredRoles] = useState([]);
    const [filterName, setFilterName] = useState("");
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const navigate = useNavigate();

    const getRoles = async () => {
        try {
            const token = localStorage.getItem('pursToken');
            const resp = await api.get('/roles', {
                headers: {
                    Authorization: token,
                },
            });

            setRoles(resp.data)
            setFilteredRoles(resp.data)
        } catch (err) {
            toast.error("Não foi possível listar os cargos")
        }
    }

    const handleSort = (field: string) => {
        const sortedData = [...filteredRoles].sort((a, b) => {
            let aValue, bValue;
    
            if (field === 'salary') {
                // Ordena com base em minSalary para ordem crescente e maxSalary para ordem decrescente
                aValue = sortOrder === 'asc' ? a.minSalary : a.maxSalary;
                bValue = sortOrder === 'asc' ? b.minSalary : b.maxSalary;
    
                if (aValue === null && bValue !== null) return sortOrder === 'asc' ? -1 : 1;
                if (bValue === null && aValue !== null) return sortOrder === 'asc' ? 1 : -1;
    
                return (aValue || 0) - (bValue || 0);
            } else {
                aValue = a[field] || '';
                bValue = b[field] || '';
    
                if (aValue === '' && bValue !== '') return sortOrder === 'asc' ? -1 : 1;
                if (bValue === '' && aValue !== '') return sortOrder === 'asc' ? 1 : -1;
    
                if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
                if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
                return 0;
            }
        });
    
        setFilteredRoles(sortedData);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const applyFilter = () => {
        const filtered = roles.filter(role =>
            role.roleName.toLowerCase().includes(filterName.toLowerCase())
        );
    
        setFilteredRoles(filtered);
      };

      const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilterName(event.target.value);
      };
    
      const handleFilterButtonClick = () => {
        applyFilter();
      };
    
      const handleResetFilterButtonClick = () => {
        setFilterName('');
        setFilteredRoles(roles);
      };
    
    useEffect(() => {
        getRoles();
    }, []);

    return (
        <div className="flex h-screen overflow-hidden">
            <div className="w-1/6">
                <NavBar path="roles" />
            </div>
            <div className="w-full overflow-y-auto">
                <Header text="Cargos" />
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

                        <div className="w-1/2 flex items-end justify-end cursor-pointer" onClick={() => navigate('/role/add')}>
                            <CiCirclePlus size={25} />
                            <p className="underline ml-2">Adicionar cargo</p>
                        </div>
                            
                        </div>

                        <div className="w-full flex justify-center mt-5">
                            <div className="w-4/5 border rounded-lg border-grey-purs">
                                <div className="flex rounded-t-lg bg-purple-purs w-full justify-between p-2">
                                    <div className="flex items-center justify-center cursor-pointer w-1/5" onClick={() => handleSort('roleName')}>
                                        <p className="text-[#fff] mr-2">Nome</p>
                                        <LuArrowUpDown color="#fff" size={20} />
                                    </div>
                                    <div className="flex items-center justify-center cursor-pointer w-3/5" onClick={() => handleSort('roleDesc')}>
                                        <p className="text-[#fff] mr-2">Descrição</p>
                                        <LuArrowUpDown color="#fff" size={20} />
                                    </div>
                                    <div className="flex items-center justify-center cursor-pointer w-1/5" onClick={() => handleSort('roleDesc')}>
                                        <p className="text-[#fff] mr-2">Média salario</p>
                                        <LuArrowUpDown color="#fff" size={20} />
                                    </div>
                                </div>
                                {filteredRoles.map((item: any) => (
                                    <div className="flex rounded-lg w-full justify-between p-2">
                                        <div className="flex items-center justify-center w-1/5 cursor-pointer underline" onClick={() => navigate('/role/show', { state: { id: item.id } })}>
                                            <p>{item.roleName}</p>
                                        </div>
                                        <div className="flex items-center justify-center w-3/5">
                                            <p>{item.roleDesc}</p>
                                        </div>
                                        <div className="flex items-center justify-center w-1/5">
                                            <p>{item.minSalary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} - {item.maxSalary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</p>
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

export default Roles;

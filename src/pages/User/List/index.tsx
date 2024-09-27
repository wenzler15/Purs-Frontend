import React, { useEffect, useState } from "react";
import Header from "../../../Components/Header";
import NavBar from "../../../Components/NavBar";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { CiCirclePlus } from "react-icons/ci";
import api from '../../../services/api';
import TextInput from "../../../Components/TextInput";
import TextButton from "../../../Components/Button";
import {makeCookieAdapter} from "~/app/main/factories/cache";
import {TOKEN_NAME} from "~/config/vars";

const Employees: React.FC = () => {
    const [employees, setEmplooyees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [filterName, setFilterName] = useState("");
    
    const navigate = useNavigate();

    const getEmployees = async () => {
        try {
            const { token } = makeCookieAdapter().get(TOKEN_NAME);
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
                            style={{width:'80%'}}
                            onChange={handleInputChange}
                            />

                        <TextButton text="Filtrar" style={{marginTop: 45, width: 150}} onClick={handleFilterButtonClick}/>
                        <TextButton text="Limpar" style={{marginTop: 45, width: 150, marginLeft: 10, background: "#fff", color: "#000", border: '1px solid '}} onClick={handleResetFilterButtonClick}/>

                        <div className="w-1/2 flex items-end justify-end cursor-pointer" onClick={() => navigate('/employee/add')}>
                            <CiCirclePlus size={25} />
                            <p className="underline ml-2">Adicionar usuário</p>
                        </div>
                            
                        </div>

                        <div className="w-full flex justify-center mt-5">
                            <div className="w-4/5 border rounded-lg border-grey-purs">
                                <div className="flex rounded-t-lg bg-purple-purs w-full justify-between p-2">
                                    <div className="flex items-center justify-center w-1/4">
                                        <p className="text-[#fff]">Nome</p>
                                    </div>
                                    <div className="flex items-center justify-center w-1/4">
                                        <p className="text-[#fff]">Cargo</p>
                                    </div>
                                    <div className="flex items-center justify-center w-1/4">
                                        <p className="text-[#fff]">E-mail</p>
                                    </div>
                                    <div className="flex items-center justify-center w-1/4">
                                        <p className="text-[#fff]">Líder</p>
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

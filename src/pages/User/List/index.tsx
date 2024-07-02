import React, { useEffect, useState } from "react";
import Header from "../../../Components/Header";
import NavBar from "../../../Components/NavBar";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { CiCirclePlus } from "react-icons/ci";
import api from '../../../services/api';
import TextInput from "../../../Components/TextInput";
import TextButton from "../../../Components/Button";

const Employees: React.FC = () => {
    const [employees, setEmplooyees] = useState([]);
    const [filterName, setFilterName] = useState("");

    const getEmployees = async () => {
        try {
            const token = localStorage.getItem('pursToken');
            const resp = await api.get('/users/dashEmployees', {
                headers: {
                    Authorization: token,
                },
            });

            setEmplooyees(resp.data)
        } catch (err) {
            toast.error("Não foi possível listar os funcionários")
        }
    }

    const filterNames = () => {
        console.log("teste", filterName)
    }

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

                        <div className="flex">

                        <TextInput text="Nome"
                            value={filterName}
                            style={{width:'70%'}}
                            onChange={(e) => setFilterName(e.target.value)} />

                        <TextButton text="Filtrar" style={{marginTop: 45}} onClick={filterNames}/>

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
                                {employees.map((item) => (
                                    <div className="flex rounded-lg w-full justify-between p-2">
                                        <div className="flex items-center justify-center w-1/4">
                                            <p>{item.name}</p>
                                        </div>
                                        <div className="flex items-center justify-center w-1/4">
                                            <p>{item.name}</p>
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

import React, { useEffect, useState } from "react";
import Header from "../../../Components/Header";
import NavBar from "../../../Components/NavBar";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import api from '../../../services/api';
import TextInput from "../../../Components/TextInput";
import TextButton from "../../../Components/Button";

const AddUpdateGroups: React.FC = () => {
    const [employees, setEmployees] = useState([]);
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [users, setUsers] = useState([]);

    const getEmployees = async () => {
        try {
            const token = localStorage.getItem('pursToken');
            const resp = await api.get('/users/listEmployees', {
                headers: {
                    Authorization: token,
                },
            });

            setEmployees(resp.data)
        } catch (err) {
            toast.error("Não foi possível listar os funcionários")
        }

    }

    useEffect(() => {
        getEmployees();
    }, []);

    return (
        <div className="flex h-screen overflow-hidden">
            <div className="w-1/6">
                <NavBar path="groups" />
            </div>
            <div className="w-full overflow-y-auto">
                <Header text="Grupos" />
                <div className="w-full bg-gradient-to-b from-[#8B95CE] to-[#DBF4FA] h-full pt-10 box-border px-4 pb-5">
                    <div className="w-full rounded-lg bg-[#fff] p-5 px-8">
                        <div className="flex w-full justify-between">
                            <TextInput text="Nome do grupo" style={{ width: "90%" }} onChange={(e) => setName(e.target.value)} value={name} />

                            <TextInput text="Descrição do grupo" style={{ width: "90%" }} onChange={(e) => setDesc(e.target.value)} value={desc} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddUpdateGroups;

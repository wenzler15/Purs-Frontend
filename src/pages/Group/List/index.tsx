import React, { useEffect, useState } from "react";
import Header from "../../../Components/Header";
import NavBar from "../../../Components/NavBar";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { CiCirclePlus } from "react-icons/ci";
import api from '../../../services/api';
import TextInput from "../../../Components/TextInput";
import TextButton from "../../../Components/Button";

const Groups: React.FC = () => {
    const [groups, setGroups] = useState([]);
    const [filteredGroups, setFilteredGroups] = useState([]);
    const [filterName, setFilterName] = useState("");

    const navigate = useNavigate();

    const getGroups = async () => {
        try {
            const token = localStorage.getItem('pursToken');
            const resp = await api.get('/groups', {
                headers: {
                    Authorization: token,
                },
            });

            setGroups(resp.data)
            setFilteredGroups(resp.data)
        } catch (err) {
            toast.error("Não foi possível listar os grupos")
        }
    }

    const applyFilter = () => {
        const filtered = groups.filter(group =>
          group.name.toLowerCase().includes(filterName.toLowerCase())
        );
    
        setFilteredGroups(filtered);
      };

      const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilterName(event.target.value);
      };
    
      const handleFilterButtonClick = () => {
        applyFilter();
      };
    
      const handleResetFilterButtonClick = () => {
        setFilterName('');
        setFilteredGroups(groups);
      };
    
    useEffect(() => {
        getGroups();
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

                        <div className="flex w-full">

                        <TextInput text="Nome"
                            value={filterName}
                            style={{width:'80%'}}
                            onChange={handleInputChange}
                            />

                        <TextButton text="Filtrar" style={{marginTop: 45, width: 150}} onClick={handleFilterButtonClick}/>
                        <TextButton text="Limpar" style={{marginTop: 45, width: 150, marginLeft: 10, background: "#fff", color: "#000", border: '1px solid '}} onClick={handleResetFilterButtonClick}/>

                        <div className="w-1/2 flex items-end justify-end cursor-pointer" onClick={() => navigate('/group/add')}>
                            <CiCirclePlus size={25} />
                            <p className="underline ml-2">Adicionar grupo</p>
                        </div>
                            
                        </div>

                        <div className="w-full flex justify-center mt-5">
                            <div className="w-4/5 border rounded-lg border-grey-purs">
                                <div className="flex rounded-t-lg bg-purple-purs w-full justify-between p-2">
                                    <div className="flex items-center justify-center w-1/4">
                                        <p className="text-[#fff]">Nome</p>
                                    </div>
                                    <div className="flex items-center justify-center w-3/4">
                                        <p className="text-[#fff]">Descrição</p>
                                    </div>
                                </div>
                                {filteredGroups.map((item) => (
                                    <div className="flex rounded-lg w-full justify-between p-2">
                                        <div className="flex items-center justify-center w-1/4 cursor-pointer">
                                            <p>{item.name}</p>
                                        </div>
                                        <div className="flex items-center justify-center w-3/4">
                                            <p>{item.desc}</p>
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

export default Groups;

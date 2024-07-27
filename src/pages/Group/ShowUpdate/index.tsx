import React, { useEffect, useState } from "react";
import Header from "../../../Components/Header";
import NavBar from "../../../Components/NavBar";
import { useNavigate, useLocation } from "react-router-dom";
import { FaRegTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import api from '../../../services/api';
import TextInput from "../../../Components/TextInput";
import TextButton from "../../../Components/Button";
import Downshift from 'downshift'
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

const ShowUpdateGroups: React.FC = () => {
    const [employees, setEmployees] = useState([]);
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [users, setUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(0);

    const location = useLocation();
    const navigate = useNavigate();

    const addUser = async (data) => {
        if (users.some(obj => obj.id == data.id)) {
            toast.error("Usuário já adicionado ao grupo");
            return null;
        }

        const newGroup = [...users, data];

        setUsers(newGroup);
    }

    const getEmployees = async () => {
        try {
            const token = localStorage.getItem('pursToken');
            const resp = await api.get('/users/listEmployees', {
                headers: {
                    Authorization: token,
                },
            });

            setEmployees(resp.data);
        } catch (err) {
            toast.error("Não foi possível listar os funcionários")
        }

    }

    const handleSave = async () => {
        try {
            if (name === "" || desc === "" || users.length === 0) {
                toast.error("Favor preencher todas as informações e adicionar pelo menos um usuário ao grupo")
            }

            const arrUsers: number[] = [];

            users.map((item) => {
                arrUsers.push(item.id)
            });

            const token = localStorage.getItem('pursToken');

            const toSend = {
                name,
                desc,
                users: arrUsers
            };

            await api.patch(`/groups/${location.state.id}`, toSend, {
                headers: {
                    Authorization: token,
                },
            });

            toast.success("Grupo criado com sucesso!")
            navigate('/groups');
        } catch (err) {
            toast.error("Não foi possível salvar as informações do grupo")
        }
    }

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const removeUser = async () => {
        const usersAux = users.filter((item, index) => {
            return index !== selectedUser
        });

        setUsers(usersAux);
        setIsModalOpen(false);
        setSelectedUser(0);
    }

    const getGroups = async (id) => {
        try {
            const token = localStorage.getItem('pursToken');
            const resp = await api.get(`/groups/${id}`, {
                headers: {
                    Authorization: token,
                },
            });

            const { name, desc, users } = resp.data

            setName(name);
            setDesc(desc);

            const arr = [];
            
            users.map((item) => {
                const unique = employees.find(subitem => item == subitem.id);

                arr.push(unique);
            });

            setUsers(arr);
        } catch (err) {
            toast.error("Erro ao tentar listar as informações do usuário")
        }
    }

    useEffect(() => {
        getEmployees();
        if(employees.length > 0 && users.length === 0) {
           getGroups(location.state.id);
        }
    }, [employees]);

    return (
        <div className="flex h-screen overflow-hidden">
            <div className="w-1/6">
                <NavBar path="groups" />
            </div>
            <div className="w-full overflow-y-auto">
                <Header text="Grupos" />
                <div className="w-full bg-gradient-to-b from-[#8B95CE] to-[#DBF4FA] h-full pt-10 box-border px-4 pb-5">
                    <div className="w-full rounded-lg bg-[#fff] p-5 px-8">
                        <div className="flex w-full justify-between mb-5">
                            <TextInput text="Nome do grupo" style={{ width: "90%" }} onChange={(e) => setName(e.target.value)} value={name} />

                            <TextInput text="Descrição do grupo" style={{ width: "90%" }} onChange={(e) => setDesc(e.target.value)} value={desc} />
                        </div>

                        <Downshift
                            onChange={selection => addUser(selection)}
                            itemToString={item => (item ? item.value : '')}
                        >
                            {({
                                getInputProps,
                                getItemProps,
                                getLabelProps,
                                getMenuProps,
                                isOpen,
                                inputValue,
                                highlightedIndex,
                                selectedItem,
                                getRootProps,
                            }) => (
                                <div className="w-full">
                                    <p className="text-lg text-black-purs" {...getLabelProps()}>Digite o nome ou e-mail dos membros</p>
                                    <div
                                        className="w-full"
                                        style={{ display: 'inline-block' }}
                                        {...getRootProps({}, { suppressRefError: true })}
                                    >
                                        <input className="w-[95%] border rounded-xl border-blue-purs p-2 mt-2 text-blue-purs" {...getInputProps()} />
                                    </div>
                                    <ul {...getMenuProps()}>
                                        {isOpen
                                            ? employees
                                                .filter(item => !inputValue || item.email.includes(inputValue) || item.name.toLowerCase().includes(inputValue.toLowerCase()))
                                                .map((item, index) => (
                                                    <div className="border-b border-b-grey-purs" key={`${item.id}-${index}`}>
                                                        <li
                                                            {...getItemProps({
                                                                key: `${item.id}-${index}-name`,
                                                                index,
                                                                item,
                                                                style: {
                                                                    backgroundColor:
                                                                        highlightedIndex === index ? 'lightgray' : 'white',
                                                                    fontWeight: selectedItem === item ? 'bold' : 'normal',
                                                                },
                                                            })}
                                                        >
                                                            <p className="font-bold">{item.name}</p>
                                                        </li>

                                                        <li
                                                            {...getItemProps({
                                                                key: `${item.id}-${index}-email`,
                                                                index,
                                                                item,
                                                                style: {
                                                                    backgroundColor:
                                                                        highlightedIndex === index ? 'lightgray' : 'white',
                                                                    fontWeight: selectedItem === item ? 'bold' : 'normal',
                                                                },
                                                            })}
                                                        >
                                                            {item.email}
                                                        </li>
                                                    </div>
                                                ))
                                            : null}
                                    </ul>


                                </div>
                            )}
                        </Downshift>

                        <Modal
                            isOpen={isModalOpen}
                            onRequestClose={closeModal}
                            style={customModalStyles}
                            contentLabel="Remover usuário"
                        >
                            <p>Tem certeza que gostaria de remover o usuário?</p>
                            <div className="flex mt-6">
                                <TextButton text="Remover" onClick={() => removeUser()} />
                                <TextButton text="Cancelar" onClick={() => setIsModalOpen(false)} style={{ marginLeft: 10, background: "red" }} />
                            </div>
                        </Modal>

                        <p className="text-black-purs mt-8 text-lg">Colaboradores do grupo</p>
                        <div className="w-[95%] border border-blue-purs rounded-2xl p-5 flex-wrap flex mt-3">
                            {users.map((item, index) => (
                                <div className="mt-2 min-w-[50px] border rounded-xl mr-2 ml-2 p-3 border-blue-purs flex">
                                    <div>
                                        <p className="font-bold text-lg">{item?.name}</p>
                                        <p>{item?.email}</p>
                                    </div>
                                    <FaRegTrashAlt onClick={() => {
                                        setSelectedUser(index)
                                        setIsModalOpen(true)
                                    }}
                                        color="red" style={{ marginLeft: 10, cursor: "pointer" }} />
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

export default ShowUpdateGroups;

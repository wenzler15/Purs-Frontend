import React, { useEffect, useState } from "react";
import Header from "../../../Components/Header";
import NavBar from "../../../Components/NavBar";
import { useUserContext } from '../../../contexts/UserContext';
import { toast } from 'react-toastify';
import TextInput from "../../../Components/TextInput";
import { FaPen } from 'react-icons/fa';
import { AiOutlineExclamationCircle } from "react-icons/ai";
import TextInputPass from "../../../Components/TextInputPass";
import TextButton from "../../../Components/Button";
import { Tooltip } from 'react-tooltip';

const Profile: React.FC = () => {
  const { userData, updateUser } = useUserContext();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [cpf, setCpf] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [street, setStreet] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [houseNumber, setHouseNumber] = useState(0);
  const [complement, setComplement] = useState('');
  const [editing, setEditing] = useState(false);
  const [editingAddress, setEditingAddress] = useState(false);

  useEffect(() => {
    if (userData) {
      setName(userData.name);
      setEmail(userData.email);
      setPhone(userData.phone);
      setCpf(userData.cpf);
      setState(userData.state);
      setZipCode(userData.zipCode);
      setStreet(userData.street);
      setHouseNumber(userData.houseNumber);
      setComplement(userData.complement);
      setNeighborhood(userData.neighborhood);
      setCity(userData.city);
    }
  }, [userData]);

  const handlePhoneChange = (event) => {
    let formattedTelefone = event.target.value.replace(/\D/g, '');
    if (formattedTelefone.length <= 10) {
      formattedTelefone = formattedTelefone.replace(/^(\d{2})(\d)/, '($1) $2');
      formattedTelefone = formattedTelefone.replace(/(\d{4})(\d)/, '$1-$2');
    } else {
      formattedTelefone = formattedTelefone.replace(/^(\d{2})(\d)/, '($1) $2 ');
      formattedTelefone = formattedTelefone.replace(/(\d{4})(\d)/, '$1-$2');
    }
    setPhone(formattedTelefone);
  };

  const handleChangeCpf = (cpf: string) => {
    cpf = cpf.replace(/\D/g, '');

    cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

    setCpf(cpf)
  };

  const handleCepChange = async (event) => {
    let cep = event.target.value.replace(/\D/g, '');
    if (cep.length > 5) {
      cep = cep.replace(/^(\d{5})(\d{3})/, '$1-$2');
    }
    setZipCode(cep);

    if (cep.length === 9) {
      try {
        let response = await fetch(`https://viacep.com.br/ws/${cep.replace('-', '')}/json/`);
        response = await response.json();
        const { logradouro, localidade, bairro, uf } = response;
        setStreet(logradouro);
        setCity(localidade);
        setState(uf);
        setNeighborhood(bairro);
      } catch (error) {
        toast.error('Erro ao buscar CEP. Verifique e tente novamente.');
      }
    }
  };

  const handleSave = async () => {
    try {
      await updateUser({ ...userData, name, email, phone, password, cpf, state, zipCode, street, neighborhood, houseNumber, complement, city });
      setEditing(false);
      toast.success("Informações atualizadas com sucesso!");
    } catch (error) {
      toast.error("Erro ao salvar informações. Tente novamente.");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-1/6">
        <NavBar path="profile" />
      </div>
      <div className="w-full">
        <Header text="Meu Perfil" />
        <div className="w-full bg-gradient-to-b from-[#8B95CE] to-[#DBF4FA] h-full overflow-y-auto pt-10 pl-4 pr-4 box-border pb-5">
          <div className="w-full bg-[#fff] p-5 rounded-lg">
            <div className="flex">
              <p className="text-black-purs text-lg mr-3">Dados pessoais</p>
              <FaPen style={{ marginTop: 5, cursor: "pointer" }} onClick={() => setEditing(!editing)} />
            </div>
            <div className="flex w-full justify-between">
              <TextInput text="Nome" style={{ width: "90%" }} disabled={!editing} onChange={(e) => setName(e.target.value)} value={editing ? name : userData?.name} />

              <TextInput text="E-mail" style={{ width: "90%" }} disabled={!editing} onChange={(e) => setEmail(e.target.value)} value={editing ? email : userData?.email} />
            </div>

            <div className="flex w-full justify-between">
              <TextInput text="CPF"
                style={{ width: "90%" }}
                value={editing ? cpf : userData?.cpf}
                disabled={!editing}
                maxLength={14}
                onChange={(e) => handleChangeCpf(e.target.value)}
              />

              <TextInput text="Celular" style={{ width: "90%" }}
                value={editing ? phone : userData?.phone}
                disabled={!editing}
                onChange={handlePhoneChange}
                maxLength={15} />

            </div>

            <div className="w-[48%] flex">
              <TextInputPass text="Senha"
                value={password}
                maxLength={14}
                disabled={!editing}
                onChange={(e) => setPassword(e.target.value)}
              />
              <AiOutlineExclamationCircle size={25} className="ml-1 mt-14" data-tooltip-id="informationTooltip" />
              <Tooltip
                  id="informationTooltip"
                  place="bottom"
                  style={{
                    backgroundColor: '#2D3643',
                    width: 234,
                    borderRadius: 10,
                  }}
                >
                  <span>
                    • <strong style={{ fontWeight: 'bold', color: '#F0F3F9' }}>Campo de Senha:</strong> Por motivos de segurança, o campo de senha está vazio. Não se preocupe, sua senha está salva. Para alterá-la, basta digitar a nova senha e clicar em "Salvar".
                  </span>
                </Tooltip>
            </div>
          </div>

          <div className="w-full bg-[#fff] p-5 rounded-lg mt-5">
            <div className="flex">
              <p className="text-black-purs text-lg mr-3">Endereço</p>
              <FaPen style={{ marginTop: 5, cursor: "pointer" }} onClick={() => setEditingAddress(!editingAddress)} />
            </div>
            <div className="flex w-full justify-between">

              <div className="w-1/2">

                <TextInput text="CEP"
                  style={{ width: "90%" }}
                  value={zipCode}
                  disabled={!editingAddress}
                  maxLength={9}
                  onChange={handleCepChange}
                />
              </div>
              <div className="w-1/2 flex">

                <div className="w-[75%]">

                  <TextInput text="Cidade" disabled={!editingAddress} onChange={(e) => setCity(e.target.value)} value={editingAddress ? city : userData?.city} />
                </div>

                <div className="w-[10%] ml-[5%]">

                  <TextInput text="Estado" disabled={!editingAddress} onChange={(e) => setState(e.target.value)} value={editingAddress ? state : userData?.state} />
                </div>
              </div>
            </div>

            <div className="flex w-full justify-between">
              <TextInput text="Bairro" style={{ width: "90%" }} disabled={!editingAddress} onChange={(e) => setStreet(e.target.value)} value={editingAddress ? street : userData?.street} />

              <TextInput text="Rua" style={{ width: "90%" }} disabled={!editingAddress} onChange={(e) => setNeighborhood(e.target.value)} value={editingAddress ? neighborhood : userData?.neighborhood} />
            </div>

            <div className="flex w-full justify-between">
              <TextInput text="Número da casa" style={{ width: "90%" }} disabled={!editingAddress} onChange={(e) => setHouseNumber(e.target.value)} value={editingAddress ? houseNumber : userData?.houseNumber} />

              <TextInput text="Complemento" style={{ width: "90%" }} disabled={!editingAddress} onChange={(e) => setComplement(e.target.value)} value={editingAddress ? complement : userData?.complement} />
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

export default Profile;

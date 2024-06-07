import React, { useState, useEffect } from 'react';
import Logo from '../../../../assets/logo.png';
import Step1 from '../../../../assets/step1.svg';
//@ts-ignore
import { useNavigate } from "react-router-dom";
import TextButton from '../../../../Components/Button';
import TextInput from '../../../../Components/TextInput';
import { toast } from 'react-toastify';
import { FileUploader } from 'react-drag-drop-files';
import api from '../../../../services/api';

const fileTypes = ["JPG", "JPEG", "PNG", "SVG"]

const RegisterCompanyStep1: React.FC = () => {
    const [fantasyName, setFantasyName] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [companyEmail, setCompanyEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [arrayResponsible, setArrayResponsible] = useState([{ email: '', cpf: '' }]);
    const [fileSelected, setFileSelected] = useState<File>();

    const navigate = useNavigate();

    const addResponsible = () => {
        setArrayResponsible([...arrayResponsible, { email: '' }]);
    };

    const handleChangeEmail = (email: string, index: number) => {
        const newResponsibles = arrayResponsible.map((responsible, i) => {
            if (index === i) {
                return { ...responsible, email };
            }
            return responsible;
        });
        setArrayResponsible(newResponsibles);
    };

    const handleChangeCpf = (cpf: string, index: number) => {
        cpf = cpf.replace(/\D/g, '');
    
        cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    
        const newResponsibles = arrayResponsible.map((responsible, i) => {
            if (index === i) {
                return { ...responsible, cpf };
            }
            return responsible;
        });
    
        setArrayResponsible(newResponsibles);
    };

    const validateEmails = () => {
        const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        for (let i = 0; i < arrayResponsible.length; i++) {
            const email = arrayResponsible[i].email;
            if (!regexEmail.test(email)) {
                return false;
            }
        }

        return true;
    };

    const validateCpf = () => {
        for (let i = 0; i < arrayResponsible.length; i++) {
            const cpf = arrayResponsible[i].cpf;
            if (cpf.length > 14) {
                return false;
            }
        }

        return true;
    };

    const handlePhoneChange = (event) => {
        let formattedTelefone = event.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
        if (formattedTelefone.length <= 10) {
          formattedTelefone = formattedTelefone.replace(/^(\d{2})(\d)/, '($1) $2'); // Adiciona parênteses e espaço após os primeiros dois dígitos
          formattedTelefone = formattedTelefone.replace(/(\d{4})(\d)/, '$1-$2'); // Adiciona hífen após os próximos quatro dígitos
        } else {
          formattedTelefone = formattedTelefone.replace(/^(\d{2})(\d)/, '($1) $2 '); // Adiciona espaço após o segundo dígito
          formattedTelefone = formattedTelefone.replace(/(\d{5})(\d)/, '$1-$2'); // Adiciona hífen após os próximos cinco dígitos
        }
        setPhone(formattedTelefone);
      };

      const handleChange = (file: File) => {
        setFileSelected(file)
    };

    const handleClick = async () => {
        console.log(arrayResponsible)
        const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        const companyEmailTest = regexEmail.test(companyEmail);

        const valideEmails = validateEmails();
        const valideCpf = validateCpf();

        if(!companyEmailTest) {
            toast.error("Favor verificar e-mail da empresa");
            return false;
        } 

        if(!valideEmails) {
            toast.error("Favor verificar o(s) e-mail(s) para responsáveis");
            return false;
        }

        if(!valideCpf) {
            toast.error("Favor verificar o(s) cpf(s) para responsáveis");
            return false;
        }

        const CompanyData = {
            fantasyName,
            cnpj,
            companyEmail,
            phone,
            arrayResponsible,
        }

        try {
            await api.post('/companies', CompanyData);            
        } catch (err) {
            if (err.response.status === 409) {
                toast.error("Empresa já cadastrada")
                return false;
            } else {
                toast.error("Não foi possível cadastrar a sua empresa");
                return false;
            }
        }

        if (fileSelected) {
            try {
                let formData = new FormData();
                formData.append('imagelogo', fileSelected);

                await api.post('/uploads', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'company': `${cnpj}`
                    }
                });
            } catch (err) {
                toast.error("Não foi possível fazer o upload a imagem, tento novamente mais tarde!")
                return false;
            }
        }

        toast.success("Empresa cadastrada com sucesso");

        //navigate('/login')
    };

    const handleCnpjChange = (event) => {
        let formattedCnpj = event.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
        if (formattedCnpj.length > 2) {
            formattedCnpj = formattedCnpj.replace(/^(\d{2})(\d)/, '$1.$2'); // Adiciona ponto após os primeiros dois dígitos
        }
        if (formattedCnpj.length > 5) {
            formattedCnpj = formattedCnpj.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3'); // Adiciona ponto após os próximos três dígitos
        }
        if (formattedCnpj.length > 8) {
            formattedCnpj = formattedCnpj.replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3/$4'); // Adiciona barra após os próximos três dígitos
        }
        if (formattedCnpj.length > 12) {
            formattedCnpj = formattedCnpj.replace(/^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/, '$1.$2.$3/$4-$5'); // Adiciona hífen após os próximos quatro dígitos
        }
        setCnpj(formattedCnpj);
    };

    return (
        <div className='p-6 pl-16'>
            <img src={Logo} className='w-20' />
            <div className='w-full flex flex-col items-center justify-center'>
                <p className='mt-8 text-[#5E718D] w-[50%] text-center text-xl'>Para iniciar, vamos preencher cuidadosamente os dados iniciais da sua empresa.  </p>
                <div className='w-1/2 mt-10'>
                    <TextInput text="Nome fantasia*" onChange={(e) => setFantasyName(e.target.value)} value={fantasyName} />
                    <TextInput text="CNPJ*" maxLength={18} onChange={handleCnpjChange} value={cnpj} />
                    <TextInput text="E-mail da empresa*" onChange={(e) => setCompanyEmail(e.target.value)} />
                    <TextInput text="Telefone da empresa*" value={phone}
                        onChange={handlePhoneChange}
                        maxLength={15} />
                    <p className='mt-5 text-black-purs mb-5'>Adicione aqui o logo da sua empresa em alta qualidade</p>
                    <FileUploader label='Arraste e solte seu arquivo aqui' handleChange={handleChange} name="file" types={fileTypes} />
                    <hr className='mt-7 border-blue-purs' />

                    {arrayResponsible.map((responsible, index) => (
                        <div key={index}>
                            <TextInput
                                text={index === 0 ? `E-mail do responsável da conta*` : `E-mail do responsável ${index + 1}`}
                                value={responsible.email}
                                onChange={(e) => handleChangeEmail(e.target.value, index)}
                            />
                            <TextInput text={index === 0 ? `CPF do responsável da conta*` : `CPF do responsável ${index + 1}`} 
                                value={responsible.cpf}
                                maxLength={14}
                                onChange={(e) => handleChangeCpf(e.target.value, index)}
                            />
                        </div>
                    ))}
                    <button onClick={addResponsible} className='w-full mt-5 flex flex-row justify-end'>
                        <p className='mt-[-2px]'>+</p>
                        <p className='ml-2 underline'>Adicionar responsável</p>
                    </button>
                </div>
                <TextButton disabled={fantasyName && cnpj && companyEmail && phone && arrayResponsible[0].email.length > 0 && arrayResponsible[0].cpf.length > 0 ? false : true} text="Próxima página" onClick={handleClick} style={{ marginTop: "40px" }} />
            </div>
        </div>
    );
}

export default RegisterCompanyStep1;
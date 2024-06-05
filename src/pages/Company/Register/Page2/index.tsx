import React, { useState, useEffect } from 'react';
import Logo from '../../../../assets/logo.png';
import Step2 from '../../../../assets/step2.svg';
//@ts-ignore
import { useNavigate } from "react-router-dom";
import TextButton from '../../../../Components/Button';
import TextInput from '../../../../Components/TextInput';
import { FileUploader } from 'react-drag-drop-files';
import { toast } from 'react-toastify';
import BackButton from '../../../../Components/BackButton';
import api from '../../../../services/api';

const fileTypes = ["JPG", "JPEG", "PNG", "SVG"]

const RegisterCompanyStep2: React.FC = () => {
    const [mission, setMission] = useState("");
    const [vision, setVision] = useState("");
    const [values, setValues] = useState([{text: ""}]);
    const [fileSelected, setFileSelected] = useState<File>();

    const navigate = useNavigate();

    const handleClick = async () => {
       let companyData = localStorage.getItem("registerUser");

       if(companyData) {
            companyData = {mission, vision, values, fileSelected, ...JSON.parse(companyData)}

           if(fileSelected) {
            let formData = new FormData();
            formData.append('imagelogo', fileSelected);

            const resp = await api.post('/uploads', formData, {
                headers: {
                'Content-Type': 'multipart/form-data',
                'company': `${companyData.cnpj}`
                }
            });

            console.log(resp.data);
           }           
       } else {
        toast.error("Não foi possível resgatar os dados. Favor voltar para o passo anterior")
       } 
    };

    const handleChange = (file: File) => {
        setFileSelected(file)
    };

    const handleChangeValues = (text: string, index: number) => {
        const newValues = values.map((value, i) => {
            if (index === i) {
                return { ...value, text };
            }
            return value;
        });
        setValues(newValues);
    };

    const addValue = () => {
        setValues([...values, { text: '' }]);
    };

    return (
        <div className='p-6 pl-16'>
            <img src={Logo} className='w-20' />
            <div className='w-full flex flex-col items-center justify-center'>
                <img src={Step2} className='w-1/4' />
                <p className='mt-8 text-[#5E718D] w-[50%] text-center text-xl'>Agora adicione as informações institucionais da sua empresa.  </p>
                <div className='w-1/2 mt-10'>
                    <TextInput text="Missão da empresa" onChange={(e) => setMission(e.target.value)} value={mission} />
                    <TextInput text="Visão da empresa" onChange={(e) => setVision(e.target.value)} value={vision} />
                    {values.map((value, index) => (
                        <div key={index}>
                            <TextInput
                                text={`Valor nº ${index+1} da empresa`}
                                value={value.text}
                                onChange={(e) => handleChangeValues(e.target.value, index)}
                            />
                        </div>
                    ))}
                    <button onClick={addValue} className='w-full mt-5 flex flex-row justify-end'>
                        <p className='mt-[-2px]'>+</p>
                        <p className='ml-2 underline'>Adicionar valor</p>
                    </button>
                    <hr className='mt-5 border-blue-purs'/>
                    <p className='mt-5 text-black-purs mb-5'>Adicione aqui o logo da sua empresa em alta qualidade</p>
                    <FileUploader label='Arraste e solte seu arquivo aqui' handleChange={handleChange} name="file" types={fileTypes} />

                </div>
                <div className='flex flex-row mt-6'>
                    <BackButton text="Voltar"/>
                    <TextButton text="Concluir" onClick={handleClick} style={{marginLeft: 20}}/>
                </div>
            </div>
        </div>
    );
}

export default RegisterCompanyStep2;
import {FaArrowLeft} from "react-icons/fa";
import {PiUploadSimple} from "react-icons/pi";
import React, {useState} from "react";

function HeadingComponent() {
    const [isTyping, setIsTyping] = useState(false);
    const [lastSaved, setLastSaved] = useState<Date | null>(null);

    const formatDate = (date: Date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${day}/${month}/${year} às ${hours}:${minutes}`;
    };

    const DraftInfo = () => {
        return (
            <p className="text-[#455468] text-sm cursor-pointer mr-4 flex items-center">
                Salvar como rascunho
                <span className="ml-2"><PiUploadSimple/></span>
            </p>
        )
    }

    const Autosave = () => {
        return (
            <p className="text-[#444D61] text-sm italic">
                Salvo automaticamente em: {lastSaved ? formatDate(lastSaved) : '-'}
            </p>
        )
    }

    return (
        <div className="flex flex-row w-full h-[60px] justify-between items-center mb-10">
            <div className="flex flex-row items-center">
                <FaArrowLeft size={16} color="#5E718D" className="mt-[2px]"/>
                <p className="text-[#5E718D] text-md ml-3">Voltar</p>
            </div>
            <div className="flex flex-row items-center">
                {isTyping ? <DraftInfo/> : <Autosave/>}
            </div>
        </div>
    )
}

export default HeadingComponent;
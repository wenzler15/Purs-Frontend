import React, { useState, useEffect } from "react";
import Header from "../../Components/Header";
import { FaArrowLeft } from "react-icons/fa";
import { MdAdd, MdClose, MdEdit } from "react-icons/md";
import { TfiLayoutMenuV } from "react-icons/tfi";
import { PiUploadSimple } from "react-icons/pi";

const NewResearch: React.FC = () => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isAddIcon, setIsAddIcon] = useState(true);

  useEffect(() => {
    if (title || description) {
      setIsTyping(true);
      const timer = setTimeout(() => {
        setIsTyping(false);
        setLastSaved(new Date());
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [title, description]);

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} às ${hours}:${minutes}`;
  };

  const handleIconClick = () => {
    setIsAddIcon(!isAddIcon);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-full">
        <Header />
        <div className="flex flex-col items-center w-full h-full bg-[#E4ECF5] pt-10 pl-4 pr-4 box-border">
          <div className="flex flex-row w-full h-[60px] justify-between items-center mb-10">
            <div className="flex flex-row items-center">
              <FaArrowLeft size={16} color="#5E718D" className="mt-[2px]" />
              <p className="text-[#5E718D] text-md ml-3">Voltar</p>
            </div>
            <div className="flex flex-row items-center">
              {isTyping ? (
                <p className="text-[#455468] text-sm cursor-pointer mr-4 flex items-center">
                  Salvar como rascunho
                  <span className="ml-2"><PiUploadSimple /></span>
                </p>
              ) : (
                <p className="text-[#444D61] text-sm italic">
                  Salvo automaticamente em: {lastSaved ? formatDate(lastSaved) : '-'}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center w-full">
            {(title || description) && (
              <div className="w-[632px] bg-[#5B359E] text-white text-center rounded-t-3xl p-2 shadow-md" />
            )}
            <div className="flex flex-col items-center w-[632px] h-[90px] border rounded-3xl p-3 border-[#D7DFE9] mb-12 shadow-lg">
              <input
                type="text"
                className="w-full text-[#5E718D] text-2xl mb-2 border-none outline-none bg-transparent text-center"
                placeholder="Qual o título da sua pesquisa?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="text"
                className="w-full text-[#5E718D] text-md border-none outline-none bg-transparent text-center"
                placeholder="Você pode usar também uma descrição, que podem ser alterados mais tarde"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-center">
              <div
                className="flex items-center justify-center w-[64px] h-[64px] bg-[#5B359E] rounded-full cursor-pointer"
                onClick={handleIconClick}
              >
                {isAddIcon ? (
                  <MdAdd size={24} color="#FFF" className="mt-[2px]" />
                ) : (
                  <MdClose size={24} color="#FFF" className="mt-[2px]" />
                )}
              </div>
              {!isAddIcon && (
                <div className="flex flex-row items-center mt-4">
                  <MdEdit size={24} color="#5E718D" className="mr-4 cursor-pointer" />
                  <TfiLayoutMenuV size={24} color="#5E718D" className="cursor-pointer" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewResearch;

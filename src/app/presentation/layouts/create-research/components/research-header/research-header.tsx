import {MenuDropdownTag} from "~/app/presentation/layouts/create-research/components";
import {FaRegEye, FaEllipsisV} from "react-icons/fa";
import {SendIcon} from "~/app/presentation/components/icons";
import React from "react";

function ResearchHeaderComponent() {
    return (
        <div className="flex justify-center items-center h-20 border-b border-[#AFBACA]">
            <div className="flex justify-between items-center w-full max-w-7xl">
                <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                        <input
                            type="text"
                            className="text-[#5E718D] font-semibold w-[227px] h-[29px] text-2xl mb-2 border-none outline-none bg-transparent"
                            placeholder="Pesquisa sem título"
                        />
                        <input
                            type="text"
                            className="text-[#5E718D] text-md border-none outline-none bg-transparent w-[227px] h-[17px]"
                            placeholder="Descrição da Pesquisa"
                        />
                    </div>

                    <FaEllipsisV fill="#5E718D" />
                </div>


                <div className='flex items-center gap-10'>
                    <div className='flex items-center gap-8'>
                        <a
                            href="#"
                            className="inline-flex items-center font-medium text-blue-600 gap-2"
                        >
                            Visualizar
                            <FaRegEye size={18}/>
                        </a>

                        <button type="button"
                                className="text-[#FFFFFF] bg-[#5B359E] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center gap-2">
                            Enviar
                            <SendIcon fill="#FFFFFF"/>
                        </button>

                    </div>

                    <MenuDropdownTag/>
                </div>
            </div>
        </div>
    )
}

export default ResearchHeaderComponent
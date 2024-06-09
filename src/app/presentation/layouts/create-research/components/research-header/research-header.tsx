import {MenuDropdownTag, ResearchConfigTag} from "~/app/presentation/layouts/create-research/components";
import {FaRegEye, FaEllipsisV} from "react-icons/fa";
import {SendIcon} from "~/app/presentation/components/icons";
import React from "react";
import {useCreateResearchContext} from "~/app/presentation/hooks/pages";
import {MainInputTag} from "~/app/presentation/pages/research/create-research/components";


function ResearchHeaderComponent() {
    const { control } = useCreateResearchContext();

    return (
        <div className="flex justify-center items-center h-20 border-b border-[#AFBACA]">
            <div className="flex justify-between items-center w-full max-w-7xl">
                <div className="flex items-center gap-4">
                    <div className="flex flex-col gap-1 w-[227px] ">
                        <MainInputTag control={control} name='title' height='h-[29px]' placeholder="Pesquisa sem título" />
                        <MainInputTag control={control} name='description' height='h-[17px]' placeholder="Descrição da Pesquisa" />
                    </div>

                    <ResearchConfigTag />
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
import {MainInputTag} from "~/app/presentation/pages/research/create-research/components";
import React from "react";
import {useCreateResearchContext} from "~/app/presentation/hooks/pages";

function HeaderInputsComponent() {
    const {control} = useCreateResearchContext();

    return (
        <div className="flex flex-col gap-1 w-[227px] ">
            <MainInputTag control={control} name='title' height='h-[29px]' placeholder="Pesquisa sem título"/>
            <MainInputTag control={control} name='description' height='h-[17px]' placeholder="Descrição da Pesquisa"/>
        </div>
    )
}

export default HeaderInputsComponent;
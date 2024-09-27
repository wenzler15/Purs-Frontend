import TextButton from "~/Components/Button";
import React from "react";
import {
    TableActionsTag,
    TableTag
} from "~/app/presentation/pages/research/researches/components/panel/components";
import {useResearchesContext} from "~/app/presentation/hooks/pages";

function PanelComponent() {
    const {handleCreateResearch} = useResearchesContext();

    return (
        <div className="justify-between w-full p-3">
            <TextButton text='+ Nova pesquisa' onClick={handleCreateResearch}/>

            <div className="w-full min-h-[400px] bg-[#fff] rounded-md ml-3 mt-3">
                <TableActionsTag/>

                <div className="w-full mt-4">
                    <TableTag/>
                </div>
            </div>
        </div>
    )
}

export default PanelComponent;
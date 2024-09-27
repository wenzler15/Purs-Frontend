import Checkbox from "~/Components/Checkbox";
import {RiArrowUpDownLine} from "react-icons/ri";
import React from "react";
import {useResearchesContext} from "~/app/presentation/hooks/pages";

function TableHeaderComponent() {
    const {selectAll, handleSelectAllChange } = useResearchesContext();

    return (
        <div className="w-full bg-[#E4ECF5] p-4 flex justify-between">
            <div className="w-[4%] items-center">
                <Checkbox label="" isChecked={selectAll} onChange={handleSelectAllChange}/>
            </div>
            <div className="flex cursor-pointer w-[24%] justify-center">
                <p>Pesquisa</p>
                <RiArrowUpDownLine style={{marginTop: 5, marginLeft: 5}}/>
            </div>
            <div className="flex cursor-pointer w-[24%] justify-center">
                <p>Criado por</p>
                <RiArrowUpDownLine style={{marginTop: 5, marginLeft: 5}}/>
            </div>
            <div className="flex cursor-pointer w-[24%] justify-center">
                <p>Criado em</p>
                <RiArrowUpDownLine style={{marginTop: 5, marginLeft: 5}}/>
            </div>
            <div className="flex cursor-pointer w-[24%] justify-center">
                <p>Situação</p>
                <RiArrowUpDownLine style={{marginTop: 5, marginLeft: 5}}/>
            </div>
        </div>
    )
}

export default TableHeaderComponent;
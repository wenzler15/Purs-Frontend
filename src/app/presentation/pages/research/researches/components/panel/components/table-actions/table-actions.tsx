import {PiDotsThreeVerticalBold} from "react-icons/pi";
import {HiOutlineMagnifyingGlass} from "react-icons/hi2";
import React from "react";
import {useResearchesContext} from "~/app/presentation/hooks/pages";
import {renderOptions} from "~/app/presentation/pages/research/researches/components/panel/components";

function TableActionsComponent() {
    const {selectedIds, handleMenuClick, showMenu} = useResearchesContext();
    const dotsStyles = {cursor: "pointer", marginTop: 8};
    return (
        <div className="flex flex-row justify-between p-3">
            <div>
                <p className="text-lg font-bold mt-2 ml-2">Pesquisas</p>

                {selectedIds?.length > 0 && (
                    <div className="flex relative">
                        <p className="mt-2 ml-2">Selecionadas ({selectedIds.length})</p>
                        <PiDotsThreeVerticalBold onClick={() => handleMenuClick(0)} style={dotsStyles} size={25}/>
                        {showMenu === 0 && renderOptions(0, "items")}
                    </div>
                )}
            </div>

            <div
                className="w-[60%] h-[50px] flex flex-row border border-[#CCC] p-1 rounded-md pl-3">
                <HiOutlineMagnifyingGlass size={20} className='mt-2 mr-3 cursor-pointer'/>
                <input placeholder='Buscar pesquisa por nome'
                       className='outline-0 mb-1 bg-[#FFF] p-2 w-[90%]'/>
            </div>
        </div>
    )
}

export default TableActionsComponent
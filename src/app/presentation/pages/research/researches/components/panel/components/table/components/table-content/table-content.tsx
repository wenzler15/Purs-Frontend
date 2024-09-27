import Checkbox from "~/Components/Checkbox";
import {renderOptions, renderStatus} from "~/app/presentation/pages/research/researches/components/panel/components";
import {PiDotsThreeVerticalBold} from "react-icons/pi";
import React from "react";
import {useResearchesContext} from "~/app/presentation/hooks/pages";

function TableContentComponent() {
    const {researches, handleCheckboxChange, handleMenuClick, showMenu} = useResearchesContext();

    return (
        <>
            {researches.map((item) => (
                <div
                    key={`research-${item.id}`}
                    className="w-full p-4 flex justify-between border-b border-b-[#E4ECF5]">
                    <div className="w-[4%] items-center mt-2">
                        <Checkbox
                            label=""
                            isChecked={item.checked}
                            onChange={handleCheckboxChange(item.id)}
                        />
                    </div>
                    <div className="cursor-pointer w-[24%] justify-center">
                        <p className="text-black-purs font-bold">{item.name}</p>
                        <p className="text-black-purs">{item.desc}</p>
                    </div>
                    <div className="flex w-[24%] justify-center items-center">
                        <p className="text-black-purs">{item.owner}</p>
                    </div>
                    <div className="flex w-[24%] justify-center items-center">
                        <p className="text-black-purs">{item.created}</p>
                    </div>
                    <div className="flex w-[24%] justify-center pl-10">
                        {renderStatus(item.status)}
                        <div style={{position: 'relative'}}>
                            <PiDotsThreeVerticalBold
                                onClick={() => handleMenuClick(item.id)}
                                style={{cursor: "pointer", marginLeft: 30, marginTop: 5}}
                                size={30}/>
                            {showMenu === item.id && renderOptions(item.id, item.status)}
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default TableContentComponent;
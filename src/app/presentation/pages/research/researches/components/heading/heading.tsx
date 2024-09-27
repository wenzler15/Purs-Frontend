import {AiOutlineExclamationCircle} from "react-icons/ai";
import {Tooltip} from "react-tooltip";
import {TooltipContentTag} from "~/app/presentation/pages/research/researches/components";
import React from "react";

function HeadingComponent() {
    const tooltipStyle = { backgroundColor: '#2D3643', width: 234, borderRadius: 10}

    return (
        <div className="flex w-full">
            <div className="flex flex-row justify-between w-full">
                <div className="p-5 w-1/2">
                    <p className="text-dark-purple-purs text-3xl font-bold">Módulo de pesquisas</p>
                    <p className="text-purple-purs">
                        Flexível e intuitivo para criar e gerenciar pesquisas de forma personalizada
                    </p>
                </div>
                <div className="flex flex-row justify-end w-1/2 items-end cursor-pointer p-5">
                    <p>Entenda os status das pesquisas</p>

                    <AiOutlineExclamationCircle
                        size={22} className="ml-1"
                        data-tooltip-id="informationTooltip"
                    />
                    <Tooltip id="informationTooltip" place="bottom" style={tooltipStyle}>
                        <TooltipContentTag/>
                    </Tooltip>
                </div>
            </div>
        </div>
    )
}

export default HeadingComponent;
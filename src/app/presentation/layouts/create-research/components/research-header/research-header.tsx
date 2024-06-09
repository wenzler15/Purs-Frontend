import {
    HeaderActionsTag, HeaderInputsTag,
    MenuDropdownTag,
    ResearchConfigTag
} from "~/app/presentation/layouts/create-research/components";
import React from "react";

function ResearchHeaderComponent() {
    return (
        <div className="flex justify-center items-center h-20 border-b border-[#AFBACA]">
            <div className="flex justify-between items-center w-full max-w-7xl">
                <div className="flex items-center gap-4">
                    <HeaderInputsTag/>
                    <ResearchConfigTag/>
                </div>

                <div className='flex items-center gap-10'>
                    <HeaderActionsTag/>
                    <MenuDropdownTag/>
                </div>
            </div>
        </div>
    )
}

export default ResearchHeaderComponent
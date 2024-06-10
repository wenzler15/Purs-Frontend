import {MdEdit} from "react-icons/md";
import {TfiLayoutMenuV} from "react-icons/tfi";
import React, {useState} from "react";
import {ActionButtonTag} from "~/app/presentation/pages/research/create-research/components";

function ResearchActions() {
    const [isOpen, setIsAddIcon] = useState(false);

    const handleIconClick = () => {
        setIsAddIcon(value => !value);
    };

    return (
        <div className="flex flex-col items-center">
            <ActionButtonTag isOpen={isOpen} onClick={handleIconClick} />

            {isOpen && (
                <div className="flex flex-row items-center gap-4 mt-4">
                    <div className="flex justify-center items-center h-12 w-12">
                        <div
                            className="flex justify-center items-center h-8 w-8 rounded-full bg-[#FFFFFF] cursor-pointer">
                            <MdEdit size={16} color="#5E718D"/>
                        </div>
                    </div>
                    <div className="flex justify-center items-center h-12 w-12">
                        <div
                            className="flex justify-center items-center h-8 w-8 rounded-full bg-[#FFFFFF] cursor-pointer">
                            <TfiLayoutMenuV size={16} color="#5E718D" className="cursor-pointer"/>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ResearchActions;
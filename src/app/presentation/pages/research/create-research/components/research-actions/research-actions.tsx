import React, {useState} from "react";
import {ActionButtonTag} from "~/app/presentation/pages/research/create-research/components";
import {ActionGroupTag} from "./components";

function ResearchActions() {
    const [isOpen, setIsAddIcon] = useState(false);

    const handleIconClick = () => {
        setIsAddIcon(value => !value);
    };

    return (
        <div className="flex flex-col items-center">
            <ActionButtonTag isOpen={isOpen} onClick={handleIconClick}/>
            <ActionGroupTag isOpen={isOpen}/>
        </div>
    )
}

export default ResearchActions;
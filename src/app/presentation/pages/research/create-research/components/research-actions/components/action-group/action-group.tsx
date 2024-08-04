import {
    FloatingButtonTag
} from "~/app/presentation/pages/research/create-research/components/research-actions/components";
import {SectionIcon, WriteTag} from "~/app/presentation/components/icons";
import React, {useEffect, useState} from "react";
import {useCreateResearchContext} from "~/app/presentation/hooks/pages";

type ActionGroupProps = {
    isOpen: boolean;
}

function ActionGroupComponent({isOpen: openControl}: ActionGroupProps) {
    const { createSection } = useCreateResearchContext();
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const scale = isOpen ? 'zoom' : 'scale-0'

    useEffect(() => {
        setIsOpen(openControl)
    }, [openControl]);

    return (
        <div className={`flex flex-row items-center gap-4 mt-4 transition  ${scale}`}>
            <FloatingButtonTag onClick={() => {}}>
                <WriteTag/>
            </FloatingButtonTag>
            <FloatingButtonTag onClick={createSection}>
                <SectionIcon/>
            </FloatingButtonTag>
        </div>
    )
}

export default ActionGroupComponent;

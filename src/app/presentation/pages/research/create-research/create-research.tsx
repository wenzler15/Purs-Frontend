import {useEffect, useState} from "react";

import {CreateResearchLayoutTag} from "~/app/presentation/layouts";
import {CreateResearchProps} from "~/app/domain/protocols";
import {CreateResearchProvider} from "~/app/presentation/providers";
import {HeadingTag, MainPanelTag, ResearchActionsTag} from "./components";

function CreateResearchComponent(props: CreateResearchProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [lastSaved, setLastSaved] = useState<Date | null>(null);

    useEffect(() => {
        if (title || description) {
            setIsTyping(true);
            const timer = setTimeout(() => {
                setIsTyping(false);
                setLastSaved(new Date());
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [title, description]);

    return (
        <CreateResearchProvider {...props} >
            <CreateResearchLayoutTag>
                <div className="flex flex-col items-center w-full h-full box-border">
                    <HeadingTag/>
                    <MainPanelTag/>
                    <ResearchActionsTag/>
                </div>
            </CreateResearchLayoutTag>
        </CreateResearchProvider>
    );
}

export default CreateResearchComponent
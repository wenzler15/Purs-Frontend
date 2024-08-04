import {CreateResearchLayoutTag} from "~/app/presentation/layouts";
import {CreateResearchProps} from "~/app/domain/protocols";
import {CreateResearchProvider} from "~/app/presentation/providers";
import {HeadingTag, ModalsTag, ResearchActionsTag, SectionGroupTag} from "./components";

function CreateResearchComponent(props: CreateResearchProps) {
    return (
        <CreateResearchProvider {...props} >
            <CreateResearchLayoutTag>
                <div className="flex flex-col items-center w-full h-full box-border">
                    <HeadingTag/>
                    <SectionGroupTag/>
                    <ResearchActionsTag/>
                    <ModalsTag/>
                </div>
            </CreateResearchLayoutTag>
        </CreateResearchProvider>
    );
}

export default CreateResearchComponent
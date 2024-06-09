import {CreateResearchLayoutTag} from "~/app/presentation/layouts";
import {CreateResearchProps} from "~/app/domain/protocols";
import {CreateResearchProvider} from "~/app/presentation/providers";
import {HeadingTag, MainPanelTag, ModalsTag, ResearchActionsTag} from "./components";

function CreateResearchComponent(props: CreateResearchProps) {
    return (
        <CreateResearchProvider {...props} >
            <CreateResearchLayoutTag>
                <div className="flex flex-col items-center w-full h-full box-border">
                    <HeadingTag/>
                    <MainPanelTag/>
                    <ResearchActionsTag/>
                    <ModalsTag />
                </div>
            </CreateResearchLayoutTag>
        </CreateResearchProvider>
    );
}

export default CreateResearchComponent
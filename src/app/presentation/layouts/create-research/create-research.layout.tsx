import {ResearchHeaderTag} from "~/app/presentation/layouts/create-research/components";
import {PropsWithChildren} from "react";

type CreateResearchLayoutProps = PropsWithChildren;

function CreateResearchLayoutComponent({children}: CreateResearchLayoutProps) {
    return (
        <div>
            <ResearchHeaderTag/>

            <div className="flex min-h-[calc(100vh-80px)] bg-[#E4ECF5] overflow-hidden">
                <div className="w-full max-w-7xl my-0 mx-auto py-2">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default CreateResearchLayoutComponent;
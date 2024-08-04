import {useCreateResearchContext} from "~/app/presentation/hooks/pages";
import {SectionTag} from "~/app/presentation/pages/research/create-research/components";

function SectionGroupComponent() {
    const { sections } = useCreateResearchContext();
    return (
        <>
            {sections.map((section, index) => (
                <SectionTag index={index + 1} section={section} key={`section-${index}`} />
            ))}
        </>
    )
}

export default SectionGroupComponent;
import {
    MainPanelTag,
    QuestionPanelTag,
    SectionPanelTag
} from "~/app/presentation/pages/research/create-research/components";
import {CreateResearchSection} from "~/app/domain/protocols";

type SectionProps = {
    section: CreateResearchSection;
    index: number;
}

function SectionComponent({section, index}: SectionProps) {
    const secondaryProps = {id: section.id, title: section.title, description: section.description, index};

    const panels = {
        primary: <MainPanelTag/>,
        secondary: <SectionPanelTag {...secondaryProps} />
    }

    return (
        <div>
            {panels[section.type]}

            {section.questions.map((question, index) => (
                <QuestionPanelTag  key={`question-${section.id}-${index}`} question={question} />
            ))}
        </div>
    )
}

export default SectionComponent;
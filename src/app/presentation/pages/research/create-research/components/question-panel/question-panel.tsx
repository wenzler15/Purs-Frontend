import {
    CheckBoxesTag,
    MultipleChoiceTag,
    ParagraphAnswerTag,
    QuestionFooterTag, QuestionHeaderTag,
    ShortAnswerTag
} from "./components";
import {useState} from "react";
import {DragPanelTag} from "~/app/presentation/pages/research/create-research/components";
import {CreateResearchQuestion, QuestionType} from "~/app/domain/protocols";


type QuestionPanelProps = {
    question: CreateResearchQuestion
}

function QuestionPanelComponent({}: QuestionPanelProps) {
    const [questionType, setQuestionType] = useState<QuestionType>('radio');
    const borderRadiusPrimaryInfo = 'rounded-md'

    const body = {
        text: <ShortAnswerTag/>,
        paragraph: <ParagraphAnswerTag/>,
        radio: <MultipleChoiceTag/>,
        checkbox: <CheckBoxesTag/>,
    }

    const selectOnChange = (e: string | number) => setQuestionType(e as QuestionType);

    return (
        <div className="flex flex-col items-center w-full">
            <div
                tabIndex={0}
                className={`flex flex-col gap-2 items-center w-[768px] ${borderRadiusPrimaryInfo} mb-6 bg-[#FFFFFF] shadow-lg`}
            >
                <DragPanelTag />

                <div className="w-full p-5">
                    <QuestionHeaderTag type={questionType} onChange={selectOnChange} />

                    {body[questionType]}

                    <QuestionFooterTag />
                </div>
            </div>
        </div>
    )
}

export default QuestionPanelComponent;
import {SelectFieldTag, TextFieldTag} from "~/app/presentation/components/common";
import {QuestionType} from "~/app/domain/protocols";
import {useCreateResearchContext} from "~/app/presentation/hooks/pages";

type QuestionHeaderProps = {
    type: QuestionType;
    onChange: (e: string | number) => void;
}

function QuestionHeaderComponent({type, onChange}: QuestionHeaderProps) {
    const { questionOptions } = useCreateResearchContext();

    return (
        <div className="w-full flex justify-between mb-4">
            <div className="w-full max-w-[390px]">
                <TextFieldTag placeholder="Pergunta sem título"/>
            </div>
            <div className="w-full max-w-[263px]">
                <SelectFieldTag
                    type='divider'
                    defaultValue={type}
                    options={questionOptions}
                    onChange={onChange}
                />
            </div>
        </div>
    )
}

export default QuestionHeaderComponent;

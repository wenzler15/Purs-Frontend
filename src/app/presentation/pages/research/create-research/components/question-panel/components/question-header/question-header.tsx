import {SelectFieldTag, TextFieldTag} from "~/app/presentation/components/common";
import {QuestionType} from "~/app/domain/protocols";
import {OptionLabelTag} from "~/app/presentation/pages/research/create-research/components/question-panel/components";
import {CheckboxIcon, ParagraphIcon, RadioButtonIcon, TextIcon} from "~/app/presentation/components/icons";

type QuestionHeaderProps = {
    type: QuestionType;
    onChange: (e: string | number) => void;
}

function QuestionHeaderComponent({type, onChange}: QuestionHeaderProps) {
    const questionOptionsFormat = [
        {label: <OptionLabelTag icon={<TextIcon/>}>Resposta curta</OptionLabelTag>, value: "text", group: 'text'},
        {label: <OptionLabelTag icon={<ParagraphIcon/>}>Parágrafo</OptionLabelTag>, value: "paragraph", group: 'text'},
        {
            label: <OptionLabelTag icon={<RadioButtonIcon/>}>Múltipla escolha</OptionLabelTag>,
            value: "radio",
            group: 'options'
        },
        {
            label: <OptionLabelTag icon={<CheckboxIcon/>}>Caixas de seleção</OptionLabelTag>,
            value: "checkbox",
            group: 'options'
        },
    ]

    return (
        <div className="w-full flex justify-between mb-4">
            <div className="w-full max-w-[390px]">
                <TextFieldTag placeholder="Pergunta sem título"/>
            </div>
            <div className="w-full max-w-[263px]">
                <SelectFieldTag
                    type='divider'
                    defaultValue={type}
                    options={questionOptionsFormat}
                    onChange={onChange}
                />
            </div>
        </div>
    )
}

export default QuestionHeaderComponent;

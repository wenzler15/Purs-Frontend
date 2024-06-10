import {SelectFieldTag, TextFieldTag} from "~/app/presentation/components/common";
import {
    CheckboxIcon,
    CopyIcon,
    ParagraphIcon,
    RadioButtonIcon,
    TextIcon,
    TrashIcon
} from "~/app/presentation/components/icons";
import { OptionLabelTag } from "./components";

function QuestionPanelComponent() {
    const borderRadiusPrimaryInfo = 'rounded-md'


    const questionOptionsFormat = [
        {label: <OptionLabelTag icon={<TextIcon/>}>Resposta curta</OptionLabelTag>, value: "text", group: 'text'},
        {label: <OptionLabelTag icon={<ParagraphIcon/>}>Parágrafo</OptionLabelTag>, value: "paragraph", group: 'text'},
        {label: <OptionLabelTag icon={<RadioButtonIcon />}>Múltipla escolha</OptionLabelTag>, value: "radio", group: 'options'},
        {label: <OptionLabelTag icon={<CheckboxIcon />}>Caixas de seleção</OptionLabelTag>, value: "checkbox", group: 'options'},
    ]

    return (
        <div className="flex flex-col items-center w-full">
            <div
                tabIndex={0}
                className={`flex flex-col gap-2 items-center w-[768px] ${borderRadiusPrimaryInfo} mb-6 bg-[#FFFFFF] shadow-lg`}
            >
                <div className="flex items-center justify-center w-full h-6 cursor-grab">
                    <div className="flex flex-col gap-1">
                        <svg width="16" height="4" viewBox="0 0 16 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M14 3.25C14.6213 3.25 15.125 2.74632 15.125 2.125C15.125 1.50368 14.6213 1 14 1C13.3787 1 12.875 1.50368 12.875 2.125C12.875 2.74632 13.3787 3.25 14 3.25Z"
                                fill="#5E718D"/>
                            <path
                                d="M8 3.25C8.62132 3.25 9.125 2.74632 9.125 2.125C9.125 1.50368 8.62132 1 8 1C7.37868 1 6.875 1.50368 6.875 2.125C6.875 2.74632 7.37868 3.25 8 3.25Z"
                                fill="#5E718D"/>
                            <path
                                d="M2 3.25C2.62132 3.25 3.125 2.74632 3.125 2.125C3.125 1.50368 2.62132 1 2 1C1.37868 1 0.875 1.50368 0.875 2.125C0.875 2.74632 1.37868 3.25 2 3.25Z"
                                fill="#5E718D"/>
                            <path
                                d="M14 3.25C14.6213 3.25 15.125 2.74632 15.125 2.125C15.125 1.50368 14.6213 1 14 1C13.3787 1 12.875 1.50368 12.875 2.125C12.875 2.74632 13.3787 3.25 14 3.25Z"
                                stroke="#5E718D" strokeWidth="0.4"/>
                            <path
                                d="M8 3.25C8.62132 3.25 9.125 2.74632 9.125 2.125C9.125 1.50368 8.62132 1 8 1C7.37868 1 6.875 1.50368 6.875 2.125C6.875 2.74632 7.37868 3.25 8 3.25Z"
                                stroke="#5E718D" strokeWidth="0.4"/>
                            <path
                                d="M2 3.25C2.62132 3.25 3.125 2.74632 3.125 2.125C3.125 1.50368 2.62132 1 2 1C1.37868 1 0.875 1.50368 0.875 2.125C0.875 2.74632 1.37868 3.25 2 3.25Z"
                                stroke="#5E718D" strokeWidth="0.4"/>
                        </svg>

                        <svg width="16" height="4" viewBox="0 0 16 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M14 3.25C14.6213 3.25 15.125 2.74632 15.125 2.125C15.125 1.50368 14.6213 1 14 1C13.3787 1 12.875 1.50368 12.875 2.125C12.875 2.74632 13.3787 3.25 14 3.25Z"
                                fill="#5E718D"/>
                            <path
                                d="M8 3.25C8.62132 3.25 9.125 2.74632 9.125 2.125C9.125 1.50368 8.62132 1 8 1C7.37868 1 6.875 1.50368 6.875 2.125C6.875 2.74632 7.37868 3.25 8 3.25Z"
                                fill="#5E718D"/>
                            <path
                                d="M2 3.25C2.62132 3.25 3.125 2.74632 3.125 2.125C3.125 1.50368 2.62132 1 2 1C1.37868 1 0.875 1.50368 0.875 2.125C0.875 2.74632 1.37868 3.25 2 3.25Z"
                                fill="#5E718D"/>
                            <path
                                d="M14 3.25C14.6213 3.25 15.125 2.74632 15.125 2.125C15.125 1.50368 14.6213 1 14 1C13.3787 1 12.875 1.50368 12.875 2.125C12.875 2.74632 13.3787 3.25 14 3.25Z"
                                stroke="#5E718D" strokeWidth="0.4"/>
                            <path
                                d="M8 3.25C8.62132 3.25 9.125 2.74632 9.125 2.125C9.125 1.50368 8.62132 1 8 1C7.37868 1 6.875 1.50368 6.875 2.125C6.875 2.74632 7.37868 3.25 8 3.25Z"
                                stroke="#5E718D" strokeWidth="0.4"/>
                            <path
                                d="M2 3.25C2.62132 3.25 3.125 2.74632 3.125 2.125C3.125 1.50368 2.62132 1 2 1C1.37868 1 0.875 1.50368 0.875 2.125C0.875 2.74632 1.37868 3.25 2 3.25Z"
                                stroke="#5E718D" strokeWidth="0.4"/>
                        </svg>

                    </div>
                </div>
                <div className="w-full p-5">
                    <div className="w-full flex justify-between mb-4">
                        <div className="w-full max-w-[390px]">
                            <TextFieldTag placeholder="Pergunta sem título"/>
                        </div>
                        <div className="w-full max-w-[263px]">
                            <SelectFieldTag type='divider' defaultValue='radio' options={questionOptionsFormat} />
                        </div>
                    </div>

                    <div className="flex justify-end w-full pt-4 mt-2 border-t border-[#E4ECF5]">
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-4 w-[112px] border-r border-[#E4ECF5]">
                                <button className="flex items-center justify-center w-6 h-6">
                                    <CopyIcon/>
                                </button>
                                <button className="flex items-center justify-center w-6 h-6">
                                    <TrashIcon/>
                                </button>
                            </div>

                            <div className="flex items-center">
                                <label className="inline-flex items-center cursor-pointer">
                                    <input type="checkbox" value="" className="sr-only peer"/>
                                    <div
                                        className="relative w-11 h-6 bg-[#E5E7EB] peer-checked:bg-[#5B359E] rounded-full peer peer-focus:ring-2  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-[#FFFFFF] after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-[#FFFFFF] after:border-[#d1d5db] after:border after:rounded-full after:h-5 after:w-5 after:transition-all"
                                    />
                                    <span
                                        className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Obrigatório</span>
                                </label>
                            </div>

                            <svg
                                className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 4 15"
                            >
                                <path
                                    d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                                />
                            </svg>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuestionPanelComponent;
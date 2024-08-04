import {CopyIcon, EllipsisVerticalIcon, TrashIcon} from "~/app/presentation/components/icons";

function QuestionFooterComponent() {
    return (
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
                            className="ms-3 text-sm font-medium text-gray-900">Obrigatório</span>
                    </label>
                </div>

                <EllipsisVerticalIcon className="w-5 h-5"/>
            </div>
        </div>
    )
}

export default QuestionFooterComponent;
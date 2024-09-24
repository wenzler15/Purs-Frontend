import {useRef, useState} from "react";
import {CopyIcon, EllipsisVerticalIcon, TrashIcon} from "~/app/presentation/components/icons";
import {useClickOutside} from "~/app/presentation/hooks/globals";
import {useCreateResearchContext} from "~/app/presentation/hooks/pages";

function ResearchConfigComponent() {
    const {handleModal} = useCreateResearchContext();
    const [isOpen, setIsOpen] = useState(false);
    const optionDropdownRef = useRef(null);

    useClickOutside(optionDropdownRef, () => setIsOpen(false));

    const handleDropDown = () => setIsOpen(value => !value);

    const activeModal = (type: 'duplicate' | 'delete') => {
        handleModal(type)
        setIsOpen(false);
    }
    return (
        <div ref={optionDropdownRef} className="relative">
            <button
                id="dropdownMenuIconButton"
                type="button"
                data-dropdown-toggle="dropdownDots"
                onClick={handleDropDown}
                className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 rounded-lg hover:bg-gray-100 focus:ring focus:outline-none"
            >
                <EllipsisVerticalIcon className="w-5 h-5" />
            </button>

            <div
                id="dropdownDots"
                className={`z-10 absolute bg-[#FFFFFF] rounded-lg border border-[#D7DFE9] py-3.5 w-[275px] shadow m-0 translate-x-0 translate-y-10 ${isOpen ? 'block' : 'hidden'}`}
                style={{inset: '0px auto auto 0px'}}
            >
                <ul className="text-sm text-gray-700 " aria-labelledby="dropdownMenuIconButton">
                    <li className="inline-flex items-center gap-2.5 px-4 py-2 hover:bg-gray-100 w-full text-base">
                        <label className="inline-flex items-center cursor-pointer">
                            <input type="checkbox" value="" className="sr-only peer"/>
                            <div
                                className="relative w-11 h-6 bg-[#E5E7EB] peer-checked:bg-[#5B359E] rounded-full peer peer-focus:ring-2 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-[#FFFFFF] after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-[#FFFFFF] after:border-[#d1d5db] after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                        </label>
                        Salvar automaticamente
                    </li>
                    <li
                        onClick={() => activeModal('duplicate')}
                        className="inline-flex items-center gap-2.5 px-4 py-2 hover:bg-gray-100 w-full text-base cursor-pointer"
                    >
                        <button className="cursor-pointer">
                            <CopyIcon/>
                        </button>
                        Duplicar
                    </li>
                    <li
                        onClick={() => activeModal('delete')}
                        className="inline-flex items-center gap-2.5 px-4 py-2 hover:bg-gray-100 w-full text-base cursor-pointer"
                    >
                        <button className="cursor-pointer">
                            <TrashIcon/>
                        </button>

                        Excluir
                    </li>
                </ul>
            </div>

        </div>
    )
}

export default ResearchConfigComponent;

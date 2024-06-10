import {useRef, useState} from "react";
import {useClickOutside} from "~/app/presentation/hooks/globals";
import {ArrowDownIcon} from "~/app/presentation/components/icons";
import {PrimaryTag} from "~/app/presentation/components/common/select-field/options";
import Divider from "~/app/presentation/components/common/select-field/options/divider/divider";

export type SelectFieldOptionProps = {
    value: string | number;
    label: string | JSX.Element;
    group?: string;
}

type SelectFieldProps = {
    type?: 'default' | 'divider',
    placeholder?: string;
    defaultValue?: string | number | null;
    onChange?: (value: string | number) => void;
    options: SelectFieldOptionProps[]
}

function SelectFieldComponent({
                                  type = 'default',
                                  placeholder = '',
                                  defaultValue = '',
                                  onChange,
                                  options
                              }: SelectFieldProps) {
    const [selected, setSelected] = useState(defaultValue)
    const [isOpen, setIsOpen] = useState(false);
    const dropdownState = isOpen ? 'block' : 'hidden'
    const selectRef = useRef(null);

    const label = options.find(option => option.value === selected)?.label ?? placeholder;
    const labelClassName = label ? 'text-[#202124]' : 'text-[#a9a9a9]'

    useClickOutside(selectRef, () => setIsOpen(false));

    const toggleDropdown = () => setIsOpen(value => !value);

    const handleChange = (value: string | number) => {
        onChange && onChange(value);
        setSelected(value);
        toggleDropdown();
    }

    const renderOptions = {
        default: <PrimaryTag selected={selected} options={options} onChange={handleChange} />,
        divider: <Divider selected={selected} options={options} onChange={handleChange} />
    }

    return (
        <div ref={selectRef} className="w-full relative">
            <button
                type="button"
                id="selectDropdownButton"
                data-dropdown-toggle="selectDropdown"
                className="w-full flex items-center justify-between gap-4 text-sm h-12 px-3.5 font-medium text-[#0D062D] rounded-lg border border-[#AFBACA] focus:ring"
                onClick={toggleDropdown}
            >
                <div className={`inline-flex items-center text-left text-sm truncate ${labelClassName}`}>
                    {label}
                </div>

                <div className="flex items-center gap-4">
                    <div className="w-[1px] h-4 bg-[#D7DFE9]"/>

                    <div className="flex items-center justify-center w-6 h-6">
                        <ArrowDownIcon/>
                    </div>
                </div>

            </button>

            <div
                id="selectDropdown"
                className={`border border-[#D7DFE9] absolute z-10 rounded-lg shadow py-2 text-sm text-[#202124] w-full bg-[#FFFFFF] m-0 translate-x-0 translate-y-14 ${dropdownState}`}
                style={{inset: '0px auto auto 0px'}}
            >
                {renderOptions[type]}
            </div>
        </div>
    )
}

export default SelectFieldComponent;
import {SelectFieldOptionProps} from "~/app/presentation/components/common/select-field/select-field";

type SelectOptionProps = {
    selected: string | number | null;
    option: SelectFieldOptionProps;
    onChange: (value: string | number) => void;
}

function SelectOptionComponent({ selected, option, onChange }: SelectOptionProps) {
    return (
        <div
            className="w-full px-6 flex items-center h-12 hover:bg-[#EEEEEE] aria-selected:bg-[#F2F5FF] cursor-pointer"
            tabIndex={0}
            aria-selected={selected === option.value}
            onClick={() => onChange(option.value)}
            role="option"
        >
            {option.label}
        </div>
    )
}

export default SelectOptionComponent;
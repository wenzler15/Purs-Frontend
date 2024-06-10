import {AbstractOptions} from "~/app/presentation/components/common/select-field/options/types";
import {SelectOptionTag} from "~/app/presentation/components/common/select-field/components";

function PrimaryComponent({selected, options, onChange}: AbstractOptions) {
    return (
        <>
            {options.map(option => (
                <SelectOptionTag
                    key={`select-option-${option.value}`}
                    selected={selected}
                    onChange={onChange}
                    option={option}
                />
            ))}
        </>
    )
}

export default PrimaryComponent;
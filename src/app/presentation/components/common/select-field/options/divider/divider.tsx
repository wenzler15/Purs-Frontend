import {AbstractOptions} from "~/app/presentation/components/common/select-field/options/types";
import {SelectFieldOptionProps} from "~/app/presentation/components/common/select-field/select-field";
import {SelectOptionTag} from "~/app/presentation/components/common/select-field/components";
import {Fragment} from "react";


type DividerOptions = {
    name: string;
    options: Omit<SelectFieldOptionProps, 'group'>[];
}

function DividerComponent({selected, options, onChange}: AbstractOptions) {
    const formattedGroup: DividerOptions[] = options.reduce((previousValue = [] as DividerOptions[], currentValue) => {
        const {group, ...option} = currentValue;
        const hasGroup = !!previousValue.find(acc => acc.name === group);

        if (!hasGroup) {
            previousValue.push({
                name: currentValue.group as string,
                options: [option]
            })

            return previousValue;
        }

        previousValue.map(acc => {
            if (acc.name === group) {
                acc.options.push(option);
            }

            return acc;
        })

        return previousValue
    }, [] as DividerOptions[])


    return (
        <>
            {formattedGroup.map(group => (
                <Fragment key={`select-group-${group.name}`}>
                    {group.options.map(option => (
                        <SelectOptionTag
                            key={`select-option-${option.value}`}
                            selected={selected}
                            onChange={onChange}
                            option={option}
                        />
                    ))}
                    <div className='w-full h-[1px] bg-[#0000001f] my-2 last:hidden' />
                </Fragment>
            ))}
        </>
    )
}

export default DividerComponent;
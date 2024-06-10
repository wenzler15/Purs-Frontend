import {SelectFieldOptionProps} from "~/app/presentation/components/common/select-field/select-field";

export type AbstractOptions = {
    selected: string | number | null;
    options: SelectFieldOptionProps[];
    onChange: (value: string | number) => void;
};

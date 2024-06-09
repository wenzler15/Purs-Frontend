import React, {InputHTMLAttributes} from "react";
import {Controller} from "react-hook-form";

type MainInputProps = InputHTMLAttributes<HTMLInputElement> & {
    name: string;
    control: any;
    textCenter?: boolean;
    height?: string;
}

function MainInputComponent({name, control, textCenter, height, type = 'text', ...props}: MainInputProps) {
    const fontClassName = name === 'title' ? 'font-semibold text-2xl' : 'text-md';
    const alignClassName = textCenter ? 'text-center' : '';

    return (
        <Controller
            data-testid='input-control'
            name={name}
            control={control}
            defaultValue=''
            render={({field, fieldState: { invalid}}) => (
                <input
                    {...field}
                    className={`w-full text-[#5E718D] border-none outline-none bg-transparent ${height ?? ''} ${fontClassName} ${alignClassName}`}
                    type={type}
                    {...props}
                />)
            }
        />
    )
}

export default MainInputComponent;
import {InputHTMLAttributes} from "react";

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {}

function TextFieldComponent({...props}: TextFieldProps) {
    return (
        <div className="w-full">
            <input
                className="w-full h-12 px-3.5 rounded-t-lg bg-[#F9FAFB] border-b-2 border-[#AFBACA] outline-none focus:border-[#5B359E] hover:bg-[#f1f3f4]"
                {...props}
            />
        </div>
    )
}

export default TextFieldComponent;
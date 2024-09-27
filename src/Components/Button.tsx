import React from 'react';

export interface ButtonInterface extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text?: string;
    disabled?: boolean;
}

const TextButton = ({disabled = false, text, ...props}: ButtonInterface) => {
    return (
        <div>
            <button
                disabled={disabled}
                {...props}
                className={`${disabled ? 'bg-gray-purs' : 'bg-dark-purple-purs'} p-3 rounded-3xl text-center ${disabled ? 'text-grey-purs' : 'text-[#fff]'} w-[200px]`}
            >
                {text}
            </button>
        </div>
    );
}

export default TextButton;
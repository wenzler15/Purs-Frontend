import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export interface ButtonInterface {
    text?: string;
    onClick?: () => void;
}

const TextInputPass: React.FC<ButtonInterface> = ({ text, ...props }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <div className='w-full mt-5'>
            <p className='text-black-purs'>{text}</p>
            <div className='relative'>
                <input {...props} type={isPasswordVisible ? 'text' : 'password'} className='border-blue-purs border w-full rounded-2xl mt-1.5 p-2 text-blue-purs' />
                <span onClick={togglePasswordVisibility} className='cursor-pointer absolute top-[52%] right-[10px] translate-y-[-50%] mt-1'>
                    {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </span>
            </div>
        </div>
    );
}

export default TextInputPass;
import React, { useState } from 'react';

interface CheckboxProps {
    label: string;
    isChecked: boolean;
    onChange: (isChecked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, isChecked, onChange }) => {
    const [checked, setChecked] = useState(isChecked);

    const handleChange = () => {
        const newChecked = !checked;
        setChecked(newChecked);
        onChange(newChecked);
    };

    return (
        <label className="flex items-center cursor-pointer">
            <div className="relative">
                <input
                    type="checkbox"
                    className="hidden"
                    checked={checked}
                    onChange={handleChange}
                />
                <div className="checkbox-container w-6 h-6 border border-grey-purs rounded-md bg-white flex justify-center items-center mr-2">
                    {checked && <svg className="fill-current w-4 h-4 text-blue-purs pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg>}
                </div>
            </div>
            <span className="text-black-purs text-sm">{label}</span>
        </label>
    );
};

export default Checkbox;

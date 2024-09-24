import React, { useState, useEffect } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const Dropdown = ({ options, onSelect, text, value = null }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleToggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        onSelect(option);
    };

    useEffect(() => {        
        if(value !== null) {
            setSelectedOption(value)
        }
    }, []);

    return (
        <div className="relative inline-block w-full">
            <div className="border border-blue-purs rounded-2xl p-2 mt-3 w-full">
                <div className="text-blue-purs relative flex justify-between" onClick={handleToggleDropdown}>
                    {selectedOption ? selectedOption.label : text}
                    {isOpen ? (
                        <IoIosArrowUp style={{marginTop: 3, marginRight: 4}} />
                    ) : (
                        <IoIosArrowDown style={{marginTop: 3, marginRight: 4}} />
                    )}
                </div>
                {isOpen && (
                    <ul className="absolute z-10 bg-[#fff] border border-blue-purs mt-2 w-[200px] rounded-lg shadow-lg">
                        {options.map((option) => (
                            <li
                                key={option.value}
                                className="text-blue-purs cursor-pointer py-2 px-4 hover:bg-gray-100"
                                onClick={() => handleOptionClick(option)}
                            >
                                {option.label}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Dropdown;

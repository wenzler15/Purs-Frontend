import React, {PropsWithChildren} from "react";

type FloatingButtonProps = PropsWithChildren & {
    onClick: () => void;
};

function FloatingButtonComponent({ onClick, children}: FloatingButtonProps) {
    return (
        <div className="flex justify-center items-center h-12 w-12">
            <button
                onClick={onClick}
                className="flex justify-center items-center h-8 w-8 rounded-full bg-[#FFFFFF] cursor-pointer"
            >
                {children}
            </button>
        </div>
    )
}

export default FloatingButtonComponent;
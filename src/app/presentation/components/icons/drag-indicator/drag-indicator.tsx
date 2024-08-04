import React, {SVGProps} from "react";

type DragIndicatorProps = SVGProps<SVGSVGElement> & {}

function DragIndicator({...props}: DragIndicatorProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            {...props}
        >
            <path
                fillRule="evenodd"
                d="M8 18a2 2 0 110 4 2 2 0 010-4zm8 0a2 2 0 110 4 2 2 0 010-4zm-8-8a2 2 0 110 4 2 2 0 010-4zm8 0a2 2 0 110 4 2 2 0 010-4zM8 2a2 2 0 110 4 2 2 0 010-4zm8 0a2 2 0 110 4 2 2 0 010-4z"
            ></path>
        </svg>
    );
}

export default DragIndicator;

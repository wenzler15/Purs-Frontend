import React, {SVGProps} from "react";

type EllipseVerticalProps = SVGProps<SVGSVGElement> & {}

function EllipsisVertical({...props}: EllipseVerticalProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            aria-hidden="true"
            viewBox="0 0 4 15"
            {...props}
        >
            <path d="M3.5 1.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm0 6.041a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm0 5.959a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"></path>
        </svg>
    );
}

export default EllipsisVertical;

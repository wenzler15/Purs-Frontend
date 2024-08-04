import React, {SVGProps} from "react";

type WriteProps = SVGProps<SVGSVGElement>;

function Write({...props}: WriteProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="none"
            viewBox="0 0 18 18"
            {...props}
        >
            <path
                stroke="#5E718D"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.959 17h-4.25A.708.708 0 011 16.292v-3.957a.708.708 0 01.207-.501L11.834 1.207a.709.709 0 011.002 0l3.957 3.958a.708.708 0 010 1.001L5.959 17zm0 0h10.626M5.959 17l-4.914-4.914M9.501 3.54L14.46 8.5"
            ></path>
        </svg>
    );
}

export default Write;

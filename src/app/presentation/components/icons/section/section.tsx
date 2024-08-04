import React, {SVGProps} from "react";

type SectionProps =  SVGProps<SVGSVGElement> & {};

function Section({...props}: SectionProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="14"
            fill="none"
            viewBox="0 0 18 14"
            {...props}
        >
            <path
                stroke="#5E718D"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.273 8.444H1.727A.725.725 0 001 9.167v3.61c0 .4.326.723.727.723h14.546a.725.725 0 00.727-.722V9.167a.725.725 0 00-.727-.723zM16.273.5H1.727A.725.725 0 001 1.222v3.611c0 .4.326.723.727.723h14.546A.725.725 0 0017 4.833v-3.61A.725.725 0 0016.273.5z"
            ></path>
        </svg>
    );
}

export default Section;

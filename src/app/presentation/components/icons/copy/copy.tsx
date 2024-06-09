import React from "react";

type CopyProps = {
    size?: number;
    fill?: string;
    border?: number
}

function Copy({size = 18, fill = "#5E718D", border = 1.5}: CopyProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            fill="none"
            viewBox="0 0 18 18"
        >
            <path
                stroke={fill}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={border}
                d="M17.25 14.25V.75H3.749m-3 3h13.5v13.5H.75V3.75z"
            ></path>
        </svg>
    );
}

export default Copy;

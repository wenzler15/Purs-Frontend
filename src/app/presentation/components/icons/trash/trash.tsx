import React from "react";

type TrashProps = {
    size?: number;
    fill?: string;
    border?: number
}
function Trash({size = 18, fill = "#455468", border = 1.5}: TrashProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size + 2}
            fill="none"
            viewBox="0 0 18 20"
        >
            <path
                stroke={fill}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={border}
                d="M11.25 8.75v6m-4.5-6v6m10.5-10.5H.75m15 0V18.5a.75.75 0 01-.75.75H3a.75.75 0 01-.75-.75V4.25m10.5 0v-1.5a1.5 1.5 0 00-1.5-1.5h-4.5a1.5 1.5 0 00-1.5 1.5v1.5"
            ></path>
        </svg>
    );
}

export default Trash;

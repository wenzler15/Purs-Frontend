import {SVGProps} from "react";

export type SendProps = SVGProps<SVGSVGElement> & {
    fill?: string;
};

function Send({fill = '#000000'}: SendProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 16 16"
        >
            <path
                stroke={fill}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.795 8.205l3.182-3.182m3.806-4.5l-13.1 3.695a.562.562 0 00-.089 1.05l6.02 2.85c.117.056.212.151.267.268l2.852 6.02a.562.562 0 001.05-.088l3.694-13.101a.563.563 0 00-.694-.694z"
            ></path>
        </svg>
    );
}

export default Send;

import {PropsWithChildren} from "react";

type OptionLabelProps = PropsWithChildren & {
    icon: JSX.Element;
};

function OptionLabelComponent({icon, children}: OptionLabelProps) {
    return (<div className='inline-flex items-center gap-2 truncate'>
        <div className="flex items-center justify-center w-5 h-5">{icon}</div>

        {children}
    </div>)
}

export default OptionLabelComponent;

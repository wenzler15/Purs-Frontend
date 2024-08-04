import {MdAdd, MdClose} from "react-icons/md";

type ActionButtonProps = {
    isOpen: boolean;
    onClick: () => void;
}

function ActionButtonComponent({isOpen, onClick}: ActionButtonProps) {
    const rotateClassName = isOpen ? 'rotate-45' : 'rotate-0';

    return (
        <div
            className="flex items-center justify-center w-[64px] h-[64px] bg-[#5B359E] rounded-full cursor-pointer"
            onClick={onClick}
        >
            <MdAdd size={24} color="#FFF" className={`mt-[2px] transition ${rotateClassName}`}/>
        </div>
    )
}

export default ActionButtonComponent;
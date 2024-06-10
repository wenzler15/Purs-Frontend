import {MdAdd, MdClose} from "react-icons/md";

type ActionButtonProps = {
    isOpen: boolean;
    onClick: () => void;
}

function ActionButtonComponent({isOpen, onClick}: ActionButtonProps) {
    const key = isOpen ? 'close' : 'open';
    const icons = {
        open: <MdAdd size={24} color="#FFF" className="mt-[2px]"/>,
        close: <MdClose size={24} color="#FFF" className="mt-[2px]"/>
    }

    return (
        <div
            className="flex items-center justify-center w-[64px] h-[64px] bg-[#5B359E] rounded-full cursor-pointer"
            onClick={onClick}
        >
            {icons[key]}
        </div>
    )
}

export default ActionButtonComponent;
import {FaInfoCircle, FaRegTimesCircle} from "react-icons/fa";

type DialogProps = {
    type?: "primary" | "danger";
    icon?: JSX.Element;
    open?: boolean;
    handleClose: () => void;
    title: string;
    description: string;
    cancelText?: string;
    okText?: string;
    onCancel?: () => void;
    onOk?: () => void;
}

const CloseIcon = () => (
    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
         viewBox="0 0 14 14">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
              strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
    </svg>
);

function DialogComponent({
                             type = 'primary',
                             icon,
                             open,
                             handleClose,
                             title,
                             description,
                             cancelText,
                             okText,
                             onCancel,
                             onOk
                         }: DialogProps) {
    if (!open) return null;

    const mainColors = {primary: '#5B359E', danger: '#E92215'}
    const secondaryColors = {primary: '#F2F5FF', danger: '#FFF5F4'}
    const icons = {
        primary: <FaInfoCircle fill={mainColors[type]} size={24}/>,
        danger: <FaRegTimesCircle fill={mainColors[type]} size={24}/>
    }

    const handleCancel = () => {
        onCancel && onCancel();
        handleClose();
    }

    const handleConfirm = () => {
        onOk && onOk();
        handleClose();
    }

    return (
        <div id="static-modal" data-modal-backdrop="static" tabIndex={-1} aria-hidden="true"
             className="flex items-center justify-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-screen max-h-full bg-[#000000] bg-opacity-70	">
            <div className="relative p-4 w-full max-w-[423px] max-h-full">
                <div className="relative bg-[#FFFFFF] rounded-lg shadow py-5 px-6">
                    <div
                        className="flex justify-between rounded-t mb-2"
                    >
                        <div
                            className={`flex items-center justify-center rounded-md bg-[${secondaryColors[type]}] w-12 h-12`}>
                            {icon ?? icons[type]}
                        </div>

                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-hide="static-modal"
                            onClick={handleClose}
                        >
                            <CloseIcon/>
                        </button>
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-2xl	font-bold">{title}</h1>
                        <p className="text-base leading-relaxed text-[#5E718D]">{description}</p>
                    </div>

                    <div
                        className="flex items-center mt-6 rounded-b"
                    >
                        <button
                            data-modal-hide="static-modal"
                            type="button"
                            onClick={handleCancel}
                            className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-[#FFFFFF] rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
                        >
                            {cancelText ?? 'Cancelar'}
                        </button>
                        <button
                            data-modal-hide="static-modal"
                            type="button"
                            onClick={handleConfirm}
                            className={`font-bold text-[#FFFFFF] bg-[${mainColors[type]}] py-2.5 px-5 ms-3 text-sm focus:outline-none rounded-lg focus:z-10 focus:ring-2 focus:ring-gray-100`}
                        >
                            {okText ?? 'Confirmar'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DialogComponent;
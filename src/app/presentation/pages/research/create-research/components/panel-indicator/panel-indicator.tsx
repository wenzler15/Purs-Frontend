type PanelIndicatorProps = {
    index: number;
    length: number;
};

function PanelIndicatorComponent({index, length}: PanelIndicatorProps) {
    return (
        <div className="flex w-[768px]">
            <div className='flex items-center h-[30px] py-4 px-2 rounded-t-md bg-[#5B359E]'>
                <p className='text-xs font-bold text-[#FFFFFF]'>Sessão {index} de {length}</p>
            </div>
        </div>
    )
}

export default PanelIndicatorComponent;
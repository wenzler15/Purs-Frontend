function OptionComponent() {
    return (
        <div className="w-full flex items-center h-[46px]">
            <div className='w-full flex items-center gap-2'>
                <div className='w-4 h-4 rounded-full  bg-[#F9FAFB] border border-[#AFBACA]'/>
                <input
                    className='flex-1 h-[38px] outline-none border-b border-[transparent] hover:border-[#AFBACA] focus:border-b-2 focus:border-[#5B359E]'
                    value='Opção 1'/>
            </div>
        </div>
    );
}

export default OptionComponent;
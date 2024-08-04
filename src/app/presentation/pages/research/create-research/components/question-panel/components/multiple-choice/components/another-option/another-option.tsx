function AnotherOptionComponent() {
    return (
        <div className="w-full flex items-center h-[46px]">
            <div className='w-full flex items-center gap-2'>
                <div className='w-4 h-4 rounded-full  bg-[#F9FAFB] border border-[#AFBACA]'/>
                <input placeholder='Adicionar opção' aria-label='Adicionar opção'
                       className='w-[114px] h-[38px] outline-none border-b border-[transparent] hover:border-[#AFBACA]'/>
                <span>ou</span>
                <button className='h-9 px-2 font-bold text-[#5B359E] rounded-lg hover:bg-[#F2F5FF]'>adicionar "Outro"
                </button>
            </div>
        </div>
    )
}

export default AnotherOptionComponent;
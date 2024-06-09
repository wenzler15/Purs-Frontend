import {useCreateResearchContext} from "~/app/presentation/hooks/pages";
import {MainInputTag} from "~/app/presentation/pages/research/create-research/components";
import {useState} from "react";

function MainPanelComponent() {
    const {control} = useCreateResearchContext();
    const [isFocus, setIsFocus] = useState(false)

    const borderRadiusPrimaryInfo = isFocus ? 'rounded-b-md' : 'rounded-md'

    const handleFocus = (value = true) => {
        setIsFocus(value)
    }

    return (
        <div className="flex flex-col items-center w-full">
            {isFocus && (
                <div className="w-[632px] bg-[#5B359E] text-white text-center rounded-t-3xl p-2 shadow-md"/>
            )}
            <div
                className={`flex flex-col gap-2 items-center w-[632px] ${borderRadiusPrimaryInfo} p-5 bg-[#FFFFFF] mb-12 shadow-lg`}>
                <MainInputTag placeholder="Pesquisa sem título" name='title' control={control} textCenter
                              onFocus={() => handleFocus(true)} onBlur={() => handleFocus(false)}/>
                <MainInputTag placeholder="Descrição da Pesquisa" name='description' control={control} textCenter
                              onFocus={() => handleFocus(true)} onBlur={() => handleFocus(false)}/>
            </div>
        </div>
    )
}

export default MainPanelComponent;

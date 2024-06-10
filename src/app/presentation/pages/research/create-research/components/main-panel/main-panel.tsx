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
                <div className="w-[768px] bg-[#5B359E] text-white text-center rounded-t-3xl p-2 shadow-md"/>
            )}
            <div
                className={`flex flex-col gap-2 items-center w-[768px] h-[136px] ${borderRadiusPrimaryInfo} p-5 bg-[#FFFFFF] mb-6 shadow-lg`}>
                <MainInputTag
                    name="title"
                    control={control}
                    height="h-[48px]"
                    placeholder="Pesquisa sem título"
                    onFocus={() => handleFocus(true)}
                    onBlur={() => handleFocus(false)}
                    textCenter
                />
                <MainInputTag
                    name="description"
                    control={control}
                    autoComplete="off"
                    placeholder="Descrição da Pesquisa"
                    onFocus={() => handleFocus(true)}
                    onBlur={() => handleFocus(false)}
                    textCenter
                />
            </div>
        </div>
    )
}

export default MainPanelComponent;

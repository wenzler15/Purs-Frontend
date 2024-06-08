import {useCreateResearchContext} from "~/app/presentation/hooks/pages";
import {MainInputTag} from "~/app/presentation/pages/research/create-research/components";
import {useEffect, useState} from "react";

function MainPanelComponent() {
    const { control, watch } = useCreateResearchContext();
    const [isTapping, setIsTapping] = useState(false)

    const borderRadiusPrimaryInfo = isTapping ? 'rounded-b-md' : 'rounded-md'


    useEffect(() => {
        const subscription = watch((value, { name, type }) => {
            setIsTapping(true)
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    return (
        <div className="flex flex-col items-center w-full">
            {(isTapping) && (
                <div
                    className="w-[632px] bg-[#5B359E] text-white text-center rounded-t-3xl p-2 shadow-md"/>
            )}
            <div
                className={`flex flex-col items-center w-[632px] ${borderRadiusPrimaryInfo} p-5 bg-[#FFFFFF] mb-12 shadow-lg`}>
                <MainInputTag placeholder="Pesquisa sem título" name='title' control={control} textCenter />
                <MainInputTag placeholder="Descrição da Pesquisa" name='description' control={control} textCenter />
            </div>
        </div>
    )
}

export default MainPanelComponent;

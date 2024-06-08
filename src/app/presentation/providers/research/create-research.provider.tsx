import {CreateResearchContext} from "~/app/presentation/context";
import {PropsWithChildren} from "react";
import {CreateResearchProps, ResearchValidation} from "~/app/domain/protocols";
import {useForm} from "react-hook-form";

type CreateResearchProviderProps = PropsWithChildren & CreateResearchProps & {}

export const CreateResearchProvider = ({validation, children}: CreateResearchProviderProps) => {
    const {control, watch} = useForm<ResearchValidation>({
        ...validation,
        mode: 'onTouched'
    });

    return <CreateResearchContext.Provider value={{control, watch}}>{children}</CreateResearchContext.Provider>
}
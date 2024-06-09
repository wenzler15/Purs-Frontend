import {CreateResearchContext} from "~/app/presentation/context";
import {PropsWithChildren, useReducer} from "react";
import {CreateResearchProps, ResearchValidation} from "~/app/domain/protocols";
import {useForm} from "react-hook-form";
import {CreateResearchModalsAction, createResearchModalsReducer} from "./reducer";

type CreateResearchProviderProps = PropsWithChildren & CreateResearchProps & {}

export const CreateResearchProvider = ({validation, children}: CreateResearchProviderProps) => {
    const [modals, modalsDispatch] = useReducer(createResearchModalsReducer, { open: false });
    const {control} = useForm<ResearchValidation>({
        ...validation,
        mode: 'onTouched'
    });

    const handleModal = (type: CreateResearchModalsAction) => modalsDispatch(type)

    return <CreateResearchContext.Provider value={{control, modals, handleModal }}>{children}</CreateResearchContext.Provider>
}
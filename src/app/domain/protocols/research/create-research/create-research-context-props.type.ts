import {Control} from "react-hook-form";
import {ResearchValidation} from "~/app/domain/protocols";

type Modals = {
    open: string | boolean;
};

export type CreateResearchContextProps = {
    control: Control<ResearchValidation, never>;
    modals: Modals;
    handleModal: (type: 'duplicate' | 'delete' | 'close') => void;
}
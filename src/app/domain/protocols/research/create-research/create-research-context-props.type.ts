import {Control} from "react-hook-form";
import {CreateResearchSection, ResearchValidation} from "~/app/domain/protocols";
import {ChangeEvent} from "react";
import {LoadQuestionType} from "~/app/domain/usecases/research";

type Modals = {
    open: string | boolean;
};

export type CreateResearchContextProps = {
    control: Control<ResearchValidation, never>;
    modals: Modals;
    questionOptions: LoadQuestionType.Response[],
    handleModal: (type: 'duplicate' | 'delete' | 'close') => void;
    sections: CreateResearchSection[];
    createSection: () => void;
    deleteSection: (id: string) => void;
    duplicateSection: (id: string) => void;
    onChangeSection: (e: ChangeEvent<HTMLInputElement>, id: string, input: 'title' | 'description') => void;
    createQuestion: () => void;
}
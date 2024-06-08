import {UseFormProps} from "react-hook-form";

export type ResearchValidation = {
    title: string;
    description: string;
}

export type CreateResearchProps = {
    validation: UseFormProps<ResearchValidation>
}
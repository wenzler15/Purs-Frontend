import {UseFormProps} from "react-hook-form";

export type ResearchValidation = {
    title: string;
    description: string;
}

export type QuestionType = 'text' | 'paragraph' | 'radio' | 'checkbox';

export type CreateResearchQuestionOption = {
    value: string;
}

export type CreateResearchQuestion = {
    title: string;
    type: QuestionType;
    required: boolean;
    options?: CreateResearchQuestionOption[];
}

export type CreateResearchSection = {
    id: string;
    title: string;
    description: string;
    type: 'primary' | 'secondary';
    questions: CreateResearchQuestion[];
}

export type CreateResearchProps = {
    validation: UseFormProps<ResearchValidation>
}
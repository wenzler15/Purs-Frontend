export interface LoadQuestionType {
    load: () => Promise<LoadQuestionType.Response[]>;
}

export namespace LoadQuestionType {
    export type Question = {
        id: number;
        desc: string;
        createdAt: string;
        updatedAt: string | null;
        deletedAt: string | null;
    }

    export type ApiResponse = Question[];

    export type Response = {
        label: string | JSX.Element;
        value: ValueType;
        group: GroupType;
    }

    export type ValueType = 'text' | 'paragraph' | 'radio' | 'checkbox';
    export type GroupType = 'text' | 'options';
}
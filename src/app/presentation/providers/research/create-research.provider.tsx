import {v4 as uuidv4} from 'uuid';
import {CreateResearchContext} from "~/app/presentation/context";
import {ChangeEvent, PropsWithChildren, useReducer, useState} from "react";
import {
    CreateResearchProps,
    CreateResearchQuestion,
    CreateResearchSection,
    ResearchValidation
} from "~/app/domain/protocols";
import {useForm} from "react-hook-form";
import {CreateResearchModalsAction, createResearchModalsReducer} from "./reducer";

type CreateResearchProviderProps = PropsWithChildren & CreateResearchProps & {}

export const CreateResearchProvider = ({validation, children}: CreateResearchProviderProps) => {
    const [modals, modalsDispatch] = useReducer(createResearchModalsReducer, {open: false});
    const {control, watch} = useForm<ResearchValidation>({
        ...validation,
        mode: 'onTouched'
    });

    const generateNewQuestion = (optionNumber: number = 1): CreateResearchQuestion => ({
        title: '',
        type: 'radio',
        required: false,
        options: [{ value: `Opção ${optionNumber}`}]
    })

    const [sections, setSections] = useState<CreateResearchSection[]>([{
        id: uuidv4(),
        title: '',
        description: '',
        type: 'primary',
        questions: [generateNewQuestion()]
    }])

    const generateNewSection = (): CreateResearchSection => ({
        id: uuidv4(),
        title: 'Sessão sem titulo',
        description: '',
        type: 'secondary',
        questions: [generateNewQuestion()]
    })


    const createSection = () => setSections(sections => [...sections, generateNewSection()])
    const deleteSection = (id: string) => setSections(sections => sections.filter(section => section.id !== id));
    const duplicateSection = (id: string) => setSections(sections => {
        const sectionSelected = sections.find(section => section.id === id);

        if (!sectionSelected) return sections

        return [...sections, sectionSelected]

    })

    const createQuestion = () => {
        const sectionId = sections[sections.length - 1].id;
        const newSections = sections.map((section) => {
            if (section.id === sectionId) {
                const newOptionNumber = section.questions.length;
                section.questions.push(generateNewQuestion(newOptionNumber))
            }

            return section
        })

        setSections(newSections);
    }

    const onChangeSection = (e: ChangeEvent<HTMLInputElement>, id: string, input: 'title' | 'description') => {
        setSections(sections => {
            return sections.map(section => {
                if (section.id === id) {
                    section[input] = e.target.value
                }
                return section;
            })
        })
    }

    const handleModal = (type: CreateResearchModalsAction) => modalsDispatch(type)

    return <CreateResearchContext.Provider value={{
        control,
        modals,
        handleModal,
        sections,
        createSection,
        deleteSection,
        duplicateSection,
        onChangeSection,
        createQuestion
    }}>
        {children}
    </CreateResearchContext.Provider>
}
import {CreateResearchTag} from "~/app/presentation/pages";
import {makeCreateResearchValidation} from "~/app/main/factories/pages";
import {makeRemoteLoadQuestionType} from "~/app/main/factories/usecases";

export const makeCreateResearch = () => {
    return <CreateResearchTag loadQuestionsType={makeRemoteLoadQuestionType()} validation={makeCreateResearchValidation()} />
};

import {CreateResearchTag} from "~/app/presentation/pages";
import {makeCreateResearchValidation} from "~/app/main/factories/pages";

export const makeCreateResearch = () => {
    return <CreateResearchTag validation={makeCreateResearchValidation()} />
};

import {ResearchesTag} from "~/app/presentation/pages";
import {makeRemoteCreateResearch, makeRemoteLoadResearches} from "~/app/main/factories/usecases";
import {makeCookieAdapter} from "~/app/main/factories/cache";

export const makeResearches = () => {
    return <ResearchesTag
        loadResearches={makeRemoteLoadResearches()}
        createResearch={makeRemoteCreateResearch()}
        cookieAdapter={makeCookieAdapter()}
    />
}
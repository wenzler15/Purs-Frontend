import {LoadResearches} from "~/app/domain/usecases";
import {successResearchList} from "./mocks";

export class RemoteLoadResearchesMocked implements LoadResearches {
    load(): Promise<RemoteLoadResearchesMocked.Response[]> {
        return Promise.resolve(successResearchList)
    }
}

export namespace RemoteLoadResearchesMocked {
    export type Response = LoadResearches.Response
}
import {LoadResearches} from "~/app/domain/usecases";
import {MOCKED_MODE} from "~/config/vars";
import {
    RemoteLoadResearchesMocked
} from "~/app/application/usecases/research/load-researches/remote-load-researches-mocked";
import {RemoteLoadResearches} from "~/app/application/usecases/research/load-researches/remote-load-researches";
import {makeAuthorizedHttpClientDecorator} from "~/app/main/factories/decorators";

export const makeRemoteLoadResearches = (): LoadResearches => {
    return MOCKED_MODE ?
        new RemoteLoadResearchesMocked() :
        new RemoteLoadResearches('/research/getResearchs', makeAuthorizedHttpClientDecorator())
}
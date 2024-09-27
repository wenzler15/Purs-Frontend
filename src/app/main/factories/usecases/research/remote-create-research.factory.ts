import {CreateResearch} from "~/app/domain/usecases/research";
import {RemoteCreateResearch} from "~/app/application/usecases";
import {makeAuthorizedHttpClientDecorator} from "~/app/main/factories/decorators";

export const makeRemoteCreateResearch = (): CreateResearch => {
    return new RemoteCreateResearch('/research', makeAuthorizedHttpClientDecorator());
}
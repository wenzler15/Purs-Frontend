import {LoadQuestionType} from "~/app/domain/usecases/research";
import {RemoteLoadQuestionType} from "~/app/application/usecases";
import {makeAuthorizedHttpClientDecorator} from "~/app/main/factories/decorators";

export const makeRemoteLoadQuestionType = (): LoadQuestionType => {
    return new RemoteLoadQuestionType('/questions-type', makeAuthorizedHttpClientDecorator());
}
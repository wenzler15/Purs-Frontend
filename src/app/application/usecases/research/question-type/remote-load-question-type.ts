import {LoadQuestionType} from "~/app/domain/usecases";
import {HttpClient, HttpStatusCodeEnum} from "~/app/application/protocols";
import {AccessDeniedError, UnexpectedError} from "~/app/domain/errors";

export class RemoteLoadQuestionType implements LoadQuestionType {
    constructor(private readonly url: string, private readonly httpClient: HttpClient<RemoteLoadQuestionType.ApiResponse>) {
    }

    async load(): Promise<RemoteLoadQuestionType.Response[]> {
        const httpResponse = await this.httpClient.request({
            method: 'get',
            url: this.url,
        })

        switch (httpResponse.statusCode) {
            case HttpStatusCodeEnum.ok:
                return makeResponse(httpResponse.body as RemoteLoadQuestionType.ApiResponse)
            case HttpStatusCodeEnum.noContent:
                return [] as RemoteLoadQuestionType.Response[];
            case HttpStatusCodeEnum.unauthorized:
                throw new AccessDeniedError();
            case HttpStatusCodeEnum.forbidden:
                throw new AccessDeniedError();
            default:
                throw new UnexpectedError();
        }
    }

}

const makeResponse = (params: RemoteLoadQuestionType.ApiResponse): RemoteLoadQuestionType.Response[] => {
    const factory: Record<string, Omit<RemoteLoadQuestionType.Response, 'label'>> = {
        'Resposta curta': { value: 'text', group: 'text' },
        'Parágrafo': { value: 'paragraph', group: 'text' },
        'Múltipla escolha': { value: 'radio', group: 'options' },
        'Caixas de seleção': { value: 'checkbox', group: 'options' },
    }

   return params.map(question => ({
       label: question.desc,
       ...factory[question.desc]
   }))
}

export namespace RemoteLoadQuestionType {
    export type Response = LoadQuestionType.Response;
    export type ApiResponse = LoadQuestionType.ApiResponse;
}
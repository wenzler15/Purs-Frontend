import {CreateResearch} from "~/app/domain/usecases";
import {HttpClient, HttpStatusCodeEnum} from "~/app/application/protocols";
import {AccessDeniedError, UnexpectedError} from "~/app/domain/errors";

export class RemoteCreateResearch implements CreateResearch {
    constructor(
        private readonly url: string,
        private readonly httpClient: HttpClient<RemoteCreateResearch.Response>
    ) {
    }

    async create(params: RemoteCreateResearch.Params): Promise<RemoteCreateResearch.Response> {
        const body = makeBody(params);

        const httpResponse = await this.httpClient.request({
            method: 'post',
            url: this.url,
            body
        })

        switch (httpResponse.statusCode) {
            case HttpStatusCodeEnum.ok:
            case HttpStatusCodeEnum.created:
                return httpResponse.body as RemoteCreateResearch.Response;
            case HttpStatusCodeEnum.noContent:
                return {} as RemoteCreateResearch.Response;
            case HttpStatusCodeEnum.unauthorized:
                throw new AccessDeniedError();
            case HttpStatusCodeEnum.forbidden:
                throw new AccessDeniedError();
            case HttpStatusCodeEnum.badRequest:
                throw new UnexpectedError()
            default:
                throw new UnexpectedError()
        }
    }
}

function makeBody(params: RemoteCreateResearch.Params): RemoteCreateResearch.ApiParam {
    return {
        idCompany: params.company,
        idUser:
        params.user,
        status:
        params.status
    }
}

export namespace RemoteCreateResearch {
    export type Params = CreateResearch.Params
    export type ApiParam = CreateResearch.ApiParam
    export type Response = CreateResearch.Response
}
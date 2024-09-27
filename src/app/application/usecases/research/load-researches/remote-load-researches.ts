import {LoadResearches} from "~/app/domain/usecases";
import {HttpClient, HttpStatusCodeEnum} from "~/app/application/protocols";
import {AccessDeniedError, UnexpectedError} from "~/app/domain/errors";

export class RemoteLoadResearches implements LoadResearches {
    constructor(
        private readonly url: string,
        private readonly httpClient: HttpClient<RemoteLoadResearches.Response[]>
    ) {
    }

    async load(): Promise<RemoteLoadResearches.Response[]> {
        const httpResponse = await this.httpClient.request({
            method: 'get',
            url: this.url,
        })

        switch (httpResponse.statusCode) {
            case HttpStatusCodeEnum.ok:
                return httpResponse.body as RemoteLoadResearches.Response[]
            case HttpStatusCodeEnum.noContent:
                return [] as RemoteLoadResearches.Response[]
            case HttpStatusCodeEnum.unauthorized:
                throw new AccessDeniedError();
            default:
                throw new UnexpectedError();
        }
    }
}

export namespace RemoteLoadResearches {
    export type Response = LoadResearches.Response;
}
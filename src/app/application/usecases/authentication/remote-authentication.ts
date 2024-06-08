import {
  HttpClient,
  HttpStatusCodeEnum,
  HttpStatusCodeEnum as HttpStatusCode
} from '~/app/application/protocols/http';
import { AccessDeniedError, UnexpectedError } from '~/app/domain/errors';
import { Authentication, AuthenticationInterface } from '~/app/domain/usecases';

export class RemoteAuthentication implements AuthenticationInterface {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpClient<RemoteAuthentication.Response>
  ) {}

  async signIn(
    params: RemoteAuthentication.Params
  ): Promise<RemoteAuthentication.Response> {
    const httpResponse = await this.httpPostClient.request({
      method: 'post',
      url: this.url,
      body: params
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
      case HttpStatusCode.created:
        return httpResponse.body as RemoteAuthentication.Response;
      case HttpStatusCodeEnum.noContent:
        return {} as RemoteAuthentication.Response;
      case HttpStatusCodeEnum.unauthorized:
        throw new AccessDeniedError();
      case HttpStatusCodeEnum.forbidden:
        throw new AccessDeniedError();
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteAuthentication {
  export type Params = Authentication.Params;
  export type Response = Authentication.Response;
}

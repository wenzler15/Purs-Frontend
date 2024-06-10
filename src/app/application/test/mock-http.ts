import {
  HttpClient,
  HttpRequestParams,
  HttpResponse,
  HttpStatusCodeEnum
} from '~/app/application/protocols/http';

export class HttpClientSpy<ResponseType = any>
  implements HttpClient<ResponseType>
{
  url = '';
  headers?: any;
  response: HttpResponse<ResponseType> = {
    statusCode: HttpStatusCodeEnum.ok
  };

  async request(
    params: HttpRequestParams
  ): Promise<HttpResponse<ResponseType>> {
    this.url = params.url;
    this.headers = params.headers;
    return this.response;
  }
}

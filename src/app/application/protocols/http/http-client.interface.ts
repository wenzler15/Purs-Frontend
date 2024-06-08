import { HttpRequestParams } from '~/app/application/protocols/http/http-request-params.type';
import { HttpResponse } from '~/app/application/protocols/http/http-response.type';

export interface HttpClient<ResponseData = any> {
  request: (params: HttpRequestParams) => Promise<HttpResponse<ResponseData>>;
}

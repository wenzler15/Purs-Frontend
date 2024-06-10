import { GetStorage } from '~/app/application/protocols/cache';
import {
  HttpClient,
  HttpRequestParams,
  HttpResponse
} from '~/app/application/protocols/http';
import { TOKEN_NAME } from '~/config/vars';

export class AuthorizeHttpClientDecorator implements HttpClient {
  constructor(
    private readonly serviceStorage: GetStorage,
    private readonly httpClient: HttpClient
  ) {}

  async request(params: HttpRequestParams): Promise<HttpResponse> {
    const { token } = this.serviceStorage.get(TOKEN_NAME);

    if (token) {
      Object.assign(params, {
        headers: Object.assign(params.headers || {}, {
          Authorization: `Bearer ${token.accessToken as string}`
        })
      });
    }

    return await this.httpClient.request(params);
  }
}

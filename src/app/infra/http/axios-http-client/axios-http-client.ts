import { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import {
  HttpClient,
  HttpRequestParams,
  HttpResponse
} from '~/app/application/protocols/http';

export class AxiosHttpClient implements HttpClient {
  constructor(private readonly axiosInstance: AxiosInstance) {}

  async request(params: HttpRequestParams): Promise<HttpResponse> {
    const { method, url, body: data, headers } = params;

    let axiosResponse: AxiosResponse | undefined;

    try {
      axiosResponse = await this.axiosInstance.request({
        url,
        data,
        headers,
        method
      });
    } catch (error) {
      axiosResponse = (error as AxiosError)?.response;
    }

    return {
      statusCode: axiosResponse?.status,
      body: axiosResponse?.data
    };
  }
}

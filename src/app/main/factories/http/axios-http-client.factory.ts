import { AxiosHttpClient } from '~/app/infra/http';
import { makeAxios } from '~/app/main/factories/http';

export const makeAxiosHttpClient = (): AxiosHttpClient => {
  return new AxiosHttpClient(makeAxios());
};

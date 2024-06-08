import { HttpClient } from '~/app/application/protocols/http';
import { AuthorizeHttpClientDecorator } from '~/app/main/decorators/client-authorized';
import { makeCookieAdapter } from '~/app/main/factories/cache';
import { makeAxiosHttpClient } from '~/app/main/factories/http';

export const makeAuthorizedHttpClientDecorator = (
): HttpClient => {
  return new AuthorizeHttpClientDecorator(
    makeCookieAdapter(),
    makeAxiosHttpClient()
  );
};

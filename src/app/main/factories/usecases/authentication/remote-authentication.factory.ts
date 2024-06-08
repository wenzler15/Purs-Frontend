import { RemoteAuthentication } from '~/app/application/usecases';
import { AuthenticationInterface } from '~/app/domain/usecases';
import { makeAxiosHttpClient } from '~/app/main/factories/http';

export const makeRemoteAuthentication = (): AuthenticationInterface => {
  return new RemoteAuthentication('/usersAuth', makeAxiosHttpClient());
};

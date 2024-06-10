import { SetStorage } from '~/app/application/protocols/cache';
import { Authentication, AuthenticationInterface } from '~/app/domain/usecases';
import { TOKEN_NAME } from '~/config/vars';

export class RemoteAuthenticationDecorator implements AuthenticationInterface {
  constructor(
    private readonly setStorage: SetStorage,
    private readonly remoteAuthentication: AuthenticationInterface
  ) {}

  async signIn(
    params: Authentication.Params
  ): Promise<Authentication.Response> {
    const httpResponse = await this.remoteAuthentication.signIn(params);
    this.setStorage.set(TOKEN_NAME, httpResponse);
    return httpResponse;
  }
}

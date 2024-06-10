import Cookies from 'universal-cookie';
import { GetStorage, SetStorage } from '~/app/application/protocols/cache';

export class CookieAdapter implements SetStorage, GetStorage {
  private cookies = new Cookies();

  set(key: string, value?: object | string): void {
    if (value) {
      this.cookies.set( key, value, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/'
      });
    } else {
      this.cookies.remove(key);
    }
  }

  get(key: string): any {
    const cookies = this.cookies.get(key);

    if (!cookies) return undefined;

    return cookies;
  }
}

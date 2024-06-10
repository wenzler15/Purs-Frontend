import {GetStorage, SetStorage} from '~/app/application/protocols';
import {CookieAdapter} from '~/app/infra/cache';

export const makeCookieAdapter = (): SetStorage & GetStorage => {
    return new CookieAdapter();
};

import {LoginTag} from "~/app/presentation/pages";
import {makeRemoteAuthenticationDecorator} from "~/app/main/factories/decorators";
import {makeCookieAdapter} from "~/app/main/factories/cache";

export const makeLogin = () => {
    return <LoginTag cookieAdapter={makeCookieAdapter()} authentication={makeRemoteAuthenticationDecorator()} />
}
import {LoginTag} from "~/app/presentation/pages";
import {makeRemoteAuthenticationDecorator} from "~/app/main/factories/decorators";

export const makeLogin = () => {
    return <LoginTag authentication={makeRemoteAuthenticationDecorator()} />
}
import { AuthenticationInterface } from '~/app/domain/usecases';
import {GetStorage, SetStorage} from "~/app/application/protocols";

export type LoginComponentProps = {
    cookieAdapter: SetStorage & GetStorage;
    authentication: AuthenticationInterface;
};

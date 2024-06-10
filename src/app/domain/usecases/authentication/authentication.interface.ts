export interface AuthenticationInterface {
  signIn: (params: Authentication.Params) => Promise<Authentication.Response>;
}

export namespace Authentication {
  export type Params = {
    email: string;
    password: string;
  };

  export interface Response {
    message: string;
    token: string;
    user: User;
  }

  export interface User {
    id: number;
    idCompany: number;
    idRole: number | null;
    idLeader: number;
    cpf: string;
    name: string;
    createdAt: string;
    updatedAt: string | null;
    email: string;
    street: string;
    district: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
    status: number;
    token: string;
  }
}

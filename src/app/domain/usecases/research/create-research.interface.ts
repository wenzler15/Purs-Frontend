export interface CreateResearch {
    create: (params: CreateResearch.Params) => Promise<CreateResearch.Response>;
}

export namespace CreateResearch {
    export type Params = {
        company: number,
        user: number,
        status: string
    }

    export type ApiParam = {
        idCompany: number;
        idUser: number;
        status: string
    }

    export type ApiQuestion = {
        id: 16,
        idCompany: number,
        idUser: number,
        status: string,
        createdAt: string,
        updatedAt: string | null,
        deletedAt: string | null,
        title: string,
        subtitle: string,
        desc: string,
    }

    export type Response = {
        message: string
        question: ApiQuestion
    }
}
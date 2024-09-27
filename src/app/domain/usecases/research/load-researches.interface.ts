export interface LoadResearches {
    load: () => Promise<LoadResearches.Response[]>
}

export namespace LoadResearches {
    export type Action = 'delete' | 'edit' | 'duplicate' | 'approved' | 'reproved' | 'start' | 'finish';

    export type Status = 'finish' | 'reproved' | 'approved' | 'draft' | 'pending' | 'ongoing';

    export type Response = {
        id: number,
        name: string,
        desc: string,
        owner: string,
        created: string,
        status: Status,
        checked: boolean
    }
}
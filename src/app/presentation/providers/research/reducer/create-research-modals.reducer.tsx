type CreateResearchModalsState = {
    open: string | boolean;
}

export type CreateResearchModalsAction = 'duplicate' | 'delete' | 'close'

export function createResearchModalsReducer(state: CreateResearchModalsState, action: CreateResearchModalsAction) {
    switch (action) {
        case 'duplicate':
            return {
                open: 'duplicate'
            };
        case 'delete':
            return {
                open: 'delete'
            };
        case 'close':
            return {
                open: false
            };
        default:
            return state;
    }
}
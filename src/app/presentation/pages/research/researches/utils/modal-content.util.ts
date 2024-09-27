import {LoadResearches} from "~/app/domain/usecases";

type Heading = {
    title: string;
    subtitle: string;
    cancel: string;
    confirm: string;
}

export const generateHeading = (isPlural: boolean): Record<LoadResearches.Action, Heading> => {
    const add: string =  isPlural ? 's' : ''

    return {
        delete: {
            title: `Gostaria de excluir esta${add} pequisa${add}?`,
            subtitle: `Excluindo esta${add} pesquisa${add}, todas as respostas não estarão mais disponiveis.`,
            cancel: 'Não excluir',
            confirm: 'Excluir'
        },
        edit: {
            title: `Gostaria de editar esta${add} pequisa${add}?`,
            subtitle: `Tem certeza que quer editar essa${add} pesquisa${add}?`,
            cancel: 'Não editar',
            confirm: 'Sim'
        },
        duplicate: {
            title: `Gostaria de duplicar esta${add} pequisa${add}?`,
            subtitle: `Tem certeza que gostaria de duplicar?`,
            cancel: 'Não duplicar',
            confirm: 'Duplicar'
        },
        approved: {
            title: `Gostaria de aprovar esta${add} pequisa${add}?`,
            subtitle: `Tem certeza que gostaria de aprovar?`,
            cancel: 'Não aprovar',
            confirm: 'Aprovar'
        },
        reproved: {
            title: `Gostaria de reprovar esta${add} pequisa${add}?`,
            subtitle: `Tem certeza que gostaria de reprovar?`,
            cancel: 'Não reprovar',
            confirm: 'Reprovar'
        },
        start: {
            title: `Gostaria de começar esta${add} pequisa${add}?`,
            subtitle: isPlural ? `Tem certeza que gostaria de começar estás pesquisas?` : 'Tem certeza que gostaria de começar?',
            cancel: 'Não começar',
            confirm: 'Começar'
        },
        finish: {
            title: `Gostaria de finalizar esta${add} pequisa${add}?`,
            subtitle: `Tem certeza que gostaria de finalizar?`,
            cancel: 'Não finalizar',
            confirm: 'Finalizar'
        }
    }

}

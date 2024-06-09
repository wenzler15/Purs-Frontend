import {DialogTag} from "~/app/presentation/components/common";
import {CopyIcon, TrashIcon} from "~/app/presentation/components/icons";
import {useCreateResearchContext} from "~/app/presentation/hooks/pages";

function ModalsComponent() {
    const {modals, handleModal,} = useCreateResearchContext();
    const DuplicateIcon = () => <CopyIcon fill='#5B359E' size={24} border={2.5}/>
    const DeleteIcon = () => <TrashIcon fill='#E92215' size={24} border={2.5}/>

    const modalsCollection = [
        {
            open: modals.open === 'duplicate',
            icon: <DuplicateIcon/>,
            handleClose: () => handleModal('close'),
            title: 'Gostaria de duplicar esta pesquisa?',
            description: 'Esta pesquisa será duplicada, assim como todas as suas respostas',
            cancelText: 'Não duplicar',
            okText: 'Sim, duplicar',
        },
        {
            type: 'danger' as 'primary' | 'danger',
            open: modals.open === 'delete',
            handleClose: () => handleModal('close'),
            icon: <DeleteIcon/>,
            title: 'Gostaria de excluir esta pesquisa?',
            description: 'Excluindo esta pesquisa, todas as respostas não estarão mais disponíveis',
            cancelText: 'Não excluir',
            okText: 'Sim, excluir',
        }
    ]

    return <>{modalsCollection.map((modal) => <DialogTag {...modal} />)}</>;
}

export default ModalsComponent;

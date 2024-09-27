import {ModalContentTag} from "~/app/presentation/pages/research/researches/components";
import Modal from "react-modal";
import React from "react";
import {useResearchesContext} from "~/app/presentation/hooks/pages";

const customModalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: '600px',
        padding: '20px',
        textAlign: 'center',
        borderRadius: 15
    }
};

function ActionModalComponent() {
    const {isModalOpen, onToggle} = useResearchesContext();

    return (
        <Modal
            isOpen={isModalOpen}
            onRequestClose={onToggle}
            style={customModalStyles as any}
            contentLabel="Alterar senha"
        >
            <ModalContentTag/>
        </Modal>
    )
}

export default ActionModalComponent;
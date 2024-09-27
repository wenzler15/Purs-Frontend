import React from "react";

type ElementObject = Record<string, string>;

function TooltipContentComponent() {
    const style: ElementObject = {textDecoration: 'underline', color: '#F0F3F9'};

    const statusList = [
        { title: 'Aprovada', description: 'A pesquisa está pronta, só aguardando a data de início' },
        { title: 'Pendente', description: 'Após a criação, dependerá ainda de aprovação da gestão' },
        { title: 'Rascunho', description: 'Após a criação, dependerá ainda de aprovação da gestão' },
        { title: 'Concluída', description: 'O prazo de respostas foi esgotado e a pesquisa encerrada' },
        { title: 'Em curso', description: 'Já foi iniciada, está coletando respostas' },
        { title: 'Reprovada', description: 'A gestão reprovou a criação desta pesquisa' },
    ];

    return (
        <div className="flex flex-col gap-6">
            {
                statusList.map((status, index) => (
                   <span key={`tooltip-item-${index}`}> • <strong style={style}>{status.title}:</strong> {status.description}</span>
                ))
            }
        </div>
    )
}

export default TooltipContentComponent;
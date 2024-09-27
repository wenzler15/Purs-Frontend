import {useResearchesContext} from "~/app/presentation/hooks/pages";
import React from "react";
import {
    TableContentTag,
    TableHeaderTag
} from "./components";

function TableComponent() {
    const {researches, selectAll, handleSelectAllChange, handleCheckboxChange, handleMenuClick,  showMenu} = useResearchesContext();

    if (!researches.length) return <p>Você ainda não tem pesquisas...</p>;

    return (
        <div>
            <TableHeaderTag />
            <TableContentTag />
        </div>
    )
}

export default TableComponent;
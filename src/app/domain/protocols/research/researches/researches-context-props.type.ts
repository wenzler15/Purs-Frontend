import {LoadResearches} from "~/app/domain/usecases";
import {Dispatch, SetStateAction} from "react";

export type ResearchesContextProps = {
    action: LoadResearches.Action | null;
    setAction: Dispatch<SetStateAction<LoadResearches.Action | null>>;
    researches: LoadResearches.Response[];
    isModalOpen: boolean;
    onToggle: () => void;
    checked: number;
    selectAll: boolean;
    handleSelectAllChange: () => void;
    handleCheckboxChange: (id: number) => (isChecked: boolean) => void;
    handleMenuClick: (value: number) => void;
    setChecked: Dispatch<SetStateAction<number>>;
    selectedIds: unknown[];
    setShowMenu: Dispatch<SetStateAction<number | null>>;
    showMenu: number | null;
    hasMultipleIDS: boolean;
    modalOnClick: Record<LoadResearches.Action, any>
    handleCreateResearch: () => void;
}
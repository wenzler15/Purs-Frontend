import {PropsWithChildren, useEffect, useState} from "react";
import {ResearchesProps} from "~/app/domain/protocols";
import {ResearchesContext} from "~/app/presentation/context";
import {LoadResearches} from "~/app/domain/usecases";
import {toast} from "react-toastify";
// @ts-ignore
import api from '~/services/api';
import {TOKEN_NAME} from "~/config/vars";
import {useNavigate} from "react-router-dom";

type ResearchesProviderProps = PropsWithChildren & ResearchesProps;

export const ResearchesProvider = ({
                                       loadResearches,
                                       createResearch,
                                       cookieAdapter,
                                       children
                                   }: ResearchesProviderProps) => {
    const [researches, setResearches] = useState<LoadResearches.Response[]>([]);
    const [checked, setChecked] = useState(0);
    const [action, setAction] = useState<LoadResearches.Action | null>(null);
    const [showMenu, setShowMenu] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItems, setSelectedItems] = useState(new Set());
    const [selectAll, setSelectAll] = useState(false);

    const navigate = useNavigate();

    const selectedIds = Array.from(selectedItems);
    const hasMultipleIDS = !!selectedIds.length;
    const onToggle = () => setIsModalOpen(value => !value)

    const getResearches = async () => {
        await loadResearches
            .load()
            .then(response => setResearches(response))
            .catch(() => toast.error("Não foi possível listar as pesquisas"));
    }

    const handleMenuClick = (rowId: number) => {
        setShowMenu(showMenu === rowId ? null : rowId);
    };

    const handleDuplicate = async (rowId: number) => {
        try {
            await api.get(`/research/duplicate/${rowId}`)

            toast.success("Pesquisa duplicada com sucesso")
            setShowMenu(null);
        } catch (err) {
            toast.error("Não foi possível duplicar a pesquisa")
            setShowMenu(null);
        }
    };

    const handleMultipleDuplicate = async () => {
        for (const item of selectedIds) {
            try {
                await api.get(`/research/duplicate/${item}`)

                toast.success("Pesquisa duplicada com sucesso")
                setShowMenu(null);
            } catch (err) {
                toast.error("Não foi possível duplicar a pesquisa")
                setShowMenu(null);
            }
        }

    };

    const handleChangeStatus = async (rowId: number, status: string) => {
        try {
            const toSend = {
                status
            }

            await api.patch(`/research/${rowId}`, toSend);

            toast.success("Status da pesquisa atualizado com sucesso");
        } catch (err) {
            toast.error("Não foi possível trocar o status da pesquisa");
            setShowMenu(null);
        }
    }

    const handleMultipleChangeStatus = async (status: string) => {

        for (const item of selectedIds) {
            try {
                const toSend = {
                    status
                };

                await api.patch(`/research/${item}`, toSend);

                toast.success("Status da pesquisa atualizado com sucesso");
            } catch (err) {
                toast.error("Não foi possível trocar o status da pesquisa");
            }
        }
    }

    const handleDelete = async (rowId: number) => {
        try {
            await api.delete(`/research/${rowId}`);

            toast.success("Pesquisa deletada");
        } catch (err) {
            toast.error("Não foi possível apagar a pesquisa");
            setShowMenu(null);
        }
    };

    const handleMultipleDelete = async () => {
        for (const item of selectedIds) {
            try {
                await api.delete(`/research/${item}`);

                toast.success("Pesquisa deletada");
            } catch (err) {
                toast.error("Não foi possível apagar a pesquisa");
                setShowMenu(null);
            }
        }
    };

    const handleEdit = (rowId: number) => {
        //Navigate dps que a tela de criar tiver pronta
        console.log("Editado", rowId)
        setShowMenu(null);
    }

    const handleSelectAllChange = () => {
        const newSelectAll = !selectAll;
        setSelectAll(newSelectAll);

        const updatedResearches = researches.map(item => ({
            ...item,
            checked: newSelectAll
        }));

        const allIds = newSelectAll ? updatedResearches.map(item => item.id) : [];

        setResearches(updatedResearches);
        setSelectedItems(new Set(allIds));
    };

    const handleCheckboxChange = (id: number) => (isChecked: boolean) => {
        const updatedResearches = researches.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    checked: isChecked,
                };
            }
            return item;
        });

        const updatedSelectedItems = new Set(selectedItems);

        if (isChecked) {
            updatedSelectedItems.add(id);
        } else {
            updatedSelectedItems.delete(id);
        }

        setSelectedItems(updatedSelectedItems);
        setResearches(updatedResearches);
        setSelectAll(updatedResearches.length === updatedSelectedItems.size);
    };

    async function handleCreateResearch() {
        try {
            const {user} = await cookieAdapter.get(TOKEN_NAME);

            const params = {user: user.id, company: user.idCompany, status: 'Pending'}
            const response = await createResearch.create(params);

            navigate(`/research/${response.question.id}`)

        } catch (err) {
            toast.error("Não foi possível criar uma nova pesquisa!");
        }

    }

    const modalOnClick: Record<LoadResearches.Action, any> = {
        delete: () => hasMultipleIDS ? handleMultipleDelete() : handleDelete(checked),
        edit: () => handleEdit(checked),
        duplicate: () => hasMultipleIDS ? handleMultipleDuplicate() : handleDuplicate(checked),
        approved: () => handleChangeStatus(checked, 'approved'),
        reproved: () => handleChangeStatus(checked, 'reproved'),
        start: () => handleChangeStatus(checked, 'ongoing'),
        finish: () => hasMultipleIDS ? handleMultipleChangeStatus("finish") : handleChangeStatus(checked, 'finish'),
    }


    useEffect(() => {
        getResearches();
    }, []);


    return <ResearchesContext.Provider value={{
        action,
        setAction,
        researches,
        selectedIds,
        isModalOpen,
        onToggle,
        handleMenuClick,
        showMenu,
        setShowMenu,
        checked,
        setChecked,
        modalOnClick,
        hasMultipleIDS,
        selectAll,
        handleSelectAllChange,
        handleCheckboxChange,
        handleCreateResearch
    }}>{children}</ResearchesContext.Provider>
}
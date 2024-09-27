import {useResearchesContext} from "~/app/presentation/hooks/pages";
import {LoadResearches} from "~/app/domain/usecases";
import {FaCopy, FaPen, FaTrash} from "react-icons/fa";
import {CiCircleCheck, CiClock1} from "react-icons/ci";
import {IoCloseCircleOutline} from "react-icons/io5";
import {VscDebugStart} from "react-icons/vsc";
import React from "react";


export function renderOptions(id: number, status: string) {
    const {
        onToggle,
        setShowMenu,
        setAction,
        setChecked,
    } = useResearchesContext();

    function onMenuClick(action: LoadResearches.Action, id: number): void {
        onToggle();
        setShowMenu(null)
        setAction(action)
        setChecked(id)
    }

    switch (status) {
        case "draft":
            return (
                <div
                    className="absolute w-[150px] right-0 top-full bg-[#fff] border border-gray-300 rounded shadow-lg z-20">
                    <button onClick={() => onMenuClick('edit', id)}
                            className="flex p-2 border-0 text-left w-full hover:bg-[#ccc]">
                        <FaPen style={{marginRight: 10}}/> Edição
                    </button>
                    <button onClick={() => onMenuClick("duplicate", id)}
                            className="flex p-2 border-0 text-left w-full hover:bg-[#ccc]">
                        <FaCopy style={{marginRight: 10}}/> Duplicar
                    </button>
                    <button onClick={() => onMenuClick("delete", id)}
                            className="flex p-2 border-0 text-left w-full hover:bg-[#ccc]">
                        <FaTrash style={{marginRight: 10}}/> Excluir
                    </button>
                </div>
            )
        case "finish":
            return (
                <div
                    className="absolute w-[150px] right-0 top-full bg-[#fff] border border-gray-300 rounded shadow-lg z-20">
                    <button onClick={() => onMenuClick("duplicate", id)}
                            className="flex p-2 border-0 text-left w-full hover:bg-[#ccc]">
                        <FaCopy style={{marginRight: 10}}/> Duplicar
                    </button>
                    <button onClick={() => onMenuClick("delete", id)}
                            className="flex p-2 border-0 text-left w-full hover:bg-[#ccc]">
                        <FaTrash style={{marginRight: 10}}/> Excluir
                    </button>
                </div>
            )
        case "pending":
            return (
                <div
                    className="absolute w-[150px] right-0 top-full bg-[#fff] border border-gray-300 rounded shadow-lg z-20">
                    <button onClick={() => onMenuClick("approved", id)}
                            className="flex p-2 border-0 text-left w-full hover:bg-[#ccc]">
                        <CiCircleCheck style={{marginRight: 10, marginTop: 5, fontWeight: "bold"}}/> Aprovar
                    </button>
                    <button onClick={() => onMenuClick("reproved", id)}
                            className="flex p-2 border-0 text-left w-full hover:bg-[#ccc]">
                        <IoCloseCircleOutline style={{marginRight: 10, marginTop: 5}}/> Reprovar
                    </button>
                    <button onClick={() => onMenuClick("edit", id)}
                            className="flex p-2 border-0 text-left w-full hover:bg-[#ccc]">
                        <FaPen style={{marginRight: 10}}/> Edição
                    </button>
                    <button onClick={() => onMenuClick("duplicate", id)}
                            className="flex p-2 border-0 text-left w-full hover:bg-[#ccc]">
                        <FaCopy style={{marginRight: 10}}/> Duplicar
                    </button>
                    <button onClick={() => onMenuClick("delete", id)                        }
                            className="flex p-2 border-0 text-left w-full hover:bg-[#ccc]">
                        <FaTrash style={{marginRight: 10}}/> Excluir
                    </button>
                </div>
            )
        case "reproved":
            return (
                <div
                    className="absolute w-[150px] right-0 top-full bg-[#fff] border border-gray-300 rounded shadow-lg z-20">
                    <button onClick={() => onMenuClick("edit", id)}
                            className="flex p-2 border-0 text-left w-full hover:bg-[#ccc]">
                        <FaPen style={{marginRight: 10}}/> Edição
                    </button>
                    <button onClick={() => onMenuClick("delete", id)}
                            className="flex p-2 border-0 text-left w-full hover:bg-[#ccc]">
                        <FaTrash style={{marginRight: 10}}/> Excluir
                    </button>
                </div>
            )
        case "approved":
            return (
                <div
                    className="absolute w-[150px] right-0 top-full bg-[#fff] border border-gray-300 rounded shadow-lg z-20">
                    <button onClick={() => onMenuClick("start", id)}
                            className="flex p-2 border-0 text-left w-full hover:bg-[#ccc]">
                        <VscDebugStart style={{marginRight: 10}}/> Iniciar
                    </button>
                    <button onClick={() => onMenuClick("duplicate", id)}
                            className="flex p-2 border-0 text-left w-full hover:bg-[#ccc]">
                        <FaCopy style={{marginRight: 10}}/> Duplicar
                    </button>
                    <button onClick={() => onMenuClick("delete", id)}
                            className="flex p-2 border-0 text-left w-full hover:bg-[#ccc]">
                        <FaTrash style={{marginRight: 10}}/> Excluir
                    </button>
                </div>
            )
        case "ongoing":
            return (
                <div
                    className="absolute w-[150px] right-0 top-full bg-[#fff] border border-gray-300 rounded shadow-lg z-20">
                    <button onClick={() => onMenuClick("duplicate", id)}
                            className="flex p-2 border-0 text-left w-full hover:bg-[#ccc]">
                        <FaCopy style={{marginRight: 10}}/> Duplicar
                    </button>
                    <button onClick={() => onMenuClick("finish", id)}
                            className="flex p-2 border-0 text-left w-full hover:bg-[#ccc]">
                        <CiClock1 style={{marginRight: 10}}/> Encerrar
                    </button>
                </div>
            )
        case "items":
            return (
                <div
                    className="absolute w-[150px] left-8 top-10 bg-[#fff] border border-gray-300 rounded shadow-lg z-20">
                    <button onClick={() => onMenuClick("finish", id)}
                            className="flex p-2 border-0 text-left w-full hover:bg-[#ccc]">
                        <CiClock1 style={{marginRight: 10}}/> Encerrar
                    </button>
                    <button onClick={() => onMenuClick("duplicate", id)}
                            className="flex p-2 border-0 text-left w-full hover:bg-[#ccc]">
                        <FaCopy style={{marginRight: 10}}/> Duplicar
                    </button>
                    <button onClick={() => onMenuClick("delete", id)}
                            className="flex p-2 border-0 text-left w-full hover:bg-[#ccc]">
                        <FaTrash style={{marginRight: 10}}/> Excluir
                    </button>
                </div>
            )
        default:
            return <> </>
    }
}
import React from "react";

export const renderStatus = (status: string) => {
    switch (status) {
        case "finish":
            return <div
                className="w-[120px] flex rounded-3xl p-2 bg-[#E9D8FA] items-center justify-around h-[40px]">
                <div className="bg-[#5B359E] w-3 h-3 rounded-full"/>
                <p className="text-[#5B359E]">Concluída</p></div>;
        case "reproved":
            return <div
                className="w-[120px] flex rounded-3xl p-2 bg-[#C54B68] items-center justify-around h-[40px]">
                <div className="bg-[#fff] w-3 h-3 rounded-full"/>
                <p className="text-[#fff]">Reprovada</p></div>;
        case "approved":
            return <div
                className="w-[120px] flex rounded-3xl p-2 bg-[#11A75C] items-center justify-around h-[40px]">
                <div className="bg-[#fff] w-3 h-3 rounded-full"/>
                <p className="text-[#fff]">Aprovada</p></div>;
        case "draft":
            return <div
                className="w-[120px] flex rounded-3xl p-2 bg-[#F0F3F9] items-center justify-around h-[40px]">
                <div className="bg-[#5E718D] w-3 h-3 rounded-full"/>
                <p className="text-[#5E718D]">Rascunho</p></div>;
        case "pending":
            return <div
                className="w-[120px] flex rounded-3xl p-2 bg-[#FBEECA] items-center justify-around h-[40px]">
                <div className="bg-[#AF6505] w-3 h-3 rounded-full"/>
                <p className="text-[#AF6505]">Pendente</p></div>;
        case "ongoing":
            return <div
                className="w-[120px] flex rounded-3xl p-2 bg-[#3E79A5] items-center justify-around h-[40px]">
                <div className="bg-[#fff] w-3 h-3 rounded-full"/>
                <p className="text-[#fff]">Em curso</p></div>;
        default:
            return <p>DSla</p>;
    }
}
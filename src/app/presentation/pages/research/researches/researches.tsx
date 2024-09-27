import React from "react";
import {ResearchesProps} from "~/app/domain/protocols";
import NavBar from "~/Components/NavBar";
import Header from "~/Components/Header";
import { ActionModalTag, HeadingTag, PanelTag } from "./components";
import {ResearchesProvider} from "~/app/presentation/providers";


function ResearchesComponent(props: ResearchesProps) {
    return (
        <ResearchesProvider {...props}>
            <div className="flex h-screen">
                <div className="w-1/6">
                    <NavBar path="research"/>
                </div>
                <div className="w-full">
                    <Header text="Pesquisas"/>
                    <div
                        className="w-full bg-gradient-to-b from-[#8B95CE] to-[#DBF4FA] overflow-y-auto h-full pt-10 pl-4 pr-4 box-border pb-5">
                        <HeadingTag/>
                        <PanelTag/>
                    </div>
                    <ActionModalTag />
                </div>
            </div>
        </ResearchesProvider>
    );
};

export default ResearchesComponent;

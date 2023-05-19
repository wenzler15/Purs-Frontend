import React from "react";
import Header from "../../Components/Header";
import {
  AiOutlineDownload,
} from "react-icons/ai";
import NavBar from "../../Components/NavBar";

import OrgChart from "../../Components/OrgChart";

type RowInterface = {
  name: string;
  title: string;
  email: string;
  father?: string;
  children?: Array<RowInterface>;
};

/*
  Load data from excel
  Use the father field to indicate the e-mail of highest hierarchical node
 */
const dataList = [
  { name: "Tamara Santos", title: "Designer", email: "tamara.santos@purs" },
  {
    name: "João Alves",
    title: "UI Designer",
    email: "joao.alvez@purs",
    father: "tamara.santos@purs",
  },
  {
    name: "Ana Clara",
    title: "Estagiária",
    email: "ana.clara@purs",
    father: "joao.alvez@purs",
  },
  {
    name: "Patricia Silva",
    title: "Estagiária",
    email: "patricia.silva@purs",
    father: "ana.clara@purs",
  },
  {
    name: "Viviane Lucas",
    title: "Estagiária",
    email: "viviane.lucas@purs",
    father: "ana.clara@purs",
  },
  {
    name: "Aline Silva",
    title: "Estagiária",
    email: "aline.silva@purs",
    father: "patricia.silva@purs",
  },
  {
    name: "Luciana Duarte",
    title: "Estagiária",
    email: "luciana.duarte@purs",
    father: "aline.silva@purs",
  },
  {
    name: "Paulo Gustavo",
    title: "Estagiária",
    email: "pauo.gustavo@purs",
    father: "luciana.duarte@purs",
  },
  {
    name: "Maria Soares",
    title: "UI Designer",
    email: "maria.soares@purs",
    father: "tamara.santos@purs",
  },
  {
    name: "Angela Nunes",
    title: "ADM",
    email: "angela.nunes@purs",
    father: "tamara.santos@purs",
  },
  {
    name: "Micaelly",
    title: "Aux Adm",
    email: "micaely@purs",
    father: "angela.nunes@purs",
  },
] as RowInterface[];

const ChartPage: React.FC = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-1/6">
        <NavBar />
      </div>
      <div className="w-full">
        <Header />
        <div className="w-full bg-[#E4ECF5] h-full pt-10 pl-4 pr-4 box-border">
          <div className="flex">
            <div className="flex w-[200] bg-purple-purs p-2 rounded-md cursor-pointer">
              <AiOutlineDownload size={20} color={"#fff"} />
              <p className="text-[#fff] ml-2 text-sm"> Exportar</p>
            </div>
          </div>
          <div className="w-full h-full mt-10">
            <div className="bg-[#fff] w-full h-4/5 rounded-md">
              <OrgChart datalist={dataList} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartPage;

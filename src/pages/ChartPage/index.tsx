import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import {
  AiOutlineDownload,
} from "react-icons/ai";
import NavBar from "../../Components/NavBar";
import { useNavigate, useLocation } from "react-router-dom";
import * as XLSX from 'xlsx';
import * as csvtojson from 'csvtojson';

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
// const dataList = [
//   { name: "Tamara Santos", title: "Designer", email: "tamara.santos@purs", father: "" },
//   {
//     name: "João Alves",
//     title: "UI Designer",
//     email: "joao.alvez@purs",
//     father: "tamara.santos@purs",
//   },
//   {
//     name: "Ana Clara",
//     title: "Estagiária",
//     email: "ana.clara@purs",
//     father: "joao.alvez@purs",
//   },
//   {
//     name: "Patricia Silva",
//     title: "Estagiária",
//     email: "patricia.silva@purs",
//     father: "ana.clara@purs",
//   },
//   {
//     name: "Viviane Lucas",
//     title: "Estagiária",
//     email: "viviane.lucas@purs",
//     father: "ana.clara@purs",
//   },
//   {
//     name: "Aline Silva",
//     title: "Estagiária",
//     email: "aline.silva@purs",
//     father: "patricia.silva@purs",
//   },
//   {
//     name: "Luciana Duarte",
//     title: "Estagiária",
//     email: "luciana.duarte@purs",
//     father: "aline.silva@purs",
//   },
//   {
//     name: "Paulo Gustavo",
//     title: "Estagiária",
//     email: "pauo.gustavo@purs",
//     father: "luciana.duarte@purs",
//   },
//   {
//     name: "Maria Soares",
//     title: "UI Designer",
//     email: "maria.soares@purs",
//     father: "tamara.santos@purs",
//   },
//   {
//     name: "Angela Nunes",
//     title: "ADM",
//     email: "angela.nunes@purs",
//     father: "tamara.santos@purs",
//   },
//   {
//     name: "Micaelly",
//     title: "Aux Adm",
//     email: "micaely@purs",
//     father: "angela.nunes@purs",
//   },
// ];

const ChartPage: React.FC = () => {
  const [teamJson, setTeamJson] = useState([]);
  const [dataList, setDataList] = useState<RowInterface[]>();

  const location = useLocation();
  const navigate = useNavigate();

  const formatTeamArray = async () => {
    const finalArray: RowInterface[] = [];
    teamJson.map((item: any) => {

      finalArray.push({
        name: item.Nome,
        title: item.Cargo,
        email: item.Email,
        father: item['Email do lider'] ? item['Email do lider'] : ''
      });

    });

    setDataList(finalArray);
  };

  useEffect(() => {
    formatTeamArray();
  }, [teamJson]);

  const convertXLSXtoJson = (file: any) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const workbook = XLSX.read(e.target.result, { type: 'binary' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: false });
      setTeamJson(jsonData);
    };
    reader.readAsBinaryString(file);
  };

  const convertCSVtoJson = (file: any) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      csvtojson()
        .fromString(e.target.result)
        .then((jsonData) => {
          setTeamJson(jsonData);
        });
    };
    reader.readAsText(file);
  };



  const formatFile = async () => {
    if (location.state.fileSelected.name.split('.')[1] === 'xlsx') {
      convertXLSXtoJson(location.state.fileSelected);
    } else {
      convertCSVtoJson(location.state.fileSelected);
    }
  };

  useEffect(() => {
    formatFile();
  }, []);

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

              {dataList?.length > 0 && dataList !== undefined ? (
                <OrgChart datalist={dataList} />
              ) : (
                <div> </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartPage;

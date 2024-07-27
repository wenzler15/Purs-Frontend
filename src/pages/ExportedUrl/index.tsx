import React, { useEffect, useState } from "react";
import NavBar from "../../Components/NavBar";
import * as XLSX from 'xlsx';
import * as csvtojson from 'csvtojson';
import api from '../../services/api';

import OrgChart from "../../Components/OrgChart";
import { toast } from "react-toastify";

type RowInterface = {
  name: string;
  title: string;
  email: string;
  father?: string;
  children?: Array<RowInterface>;
};

const ExportLink: React.FC = () => {
  const [teamJson, setTeamJson] = useState([]);
  const [dataList, setDataList] = useState<RowInterface[]>();

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

  const getFile = async () => {
    try {
      const fileId = window.location.href.split('file=')[1];
      const token = localStorage.getItem("pursToken")

      const resp = await api.get(`/export-url/${fileId}`, {
        headers: {
          'Authorization': token,
        }
      })

      fetch(resp.data.link).then((response) => {
        if (!response.ok) {
          toast.error("Não foi possível baixar o arquivo!")
        }
        return response.arrayBuffer();
      })
        .then(arrayBuffer => {
          if (resp.data.link.indexOf('xlsx') > 0) {
            const workbook = XLSX.read(arrayBuffer, { type: 'binary' });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: false });
            setTeamJson(jsonData);
          } else {
            csvtojson()
              .fromString(e.target.result)
              .then((jsonData) => {
                setTeamJson(jsonData);
              });
          }
        });
    } catch (err) {
    }
  }

  useEffect(() => {
    getFile();
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-1/6">
        <NavBar />
      </div>
      <div className="w-full">
        {/* <Header /> */}
        <div className="w-full bg-gradient-to-b from-[#8B95CE] to-[#DBF4FA] h-full pt-10 pl-4 pr-4 box-border">
          {/* <div className="flex">
            <div className="flex w-[200] bg-purple-purs p-2 rounded-md cursor-pointer" onClick={() => handleComponentDownload()}>
              <AiOutlineDownload size={20} color={"#fff"} />
              <p className="text-[#fff] ml-2 text-sm"> Exportar</p>
            </div>
          </div> */}
          <div className="w-full h-full mt-10">
            <div className="bg-[#fff] w-full h-4/5 rounded-md hidden" id="org">
              {dataList?.length > 0 && dataList !== undefined ? (
                <OrgChart datalist={dataList} />
              ) : (
                <div> </div>
              )}
            </div>
            <p>Total: {dataList?.length}</p>
            <div className="bg-[#fff] w-[100%] h-[90%] rounded-md">
              {dataList?.length > 0 && dataList !== undefined ? (
                <OrgChart datalist={dataList} showCollapse />
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

export default ExportLink;

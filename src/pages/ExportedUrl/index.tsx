import React, { useEffect, useState } from "react";
import NavBar from "../../Components/NavBar";
import * as XLSX from "xlsx";
import * as csvtojson from "csvtojson";
import api from "../../services/api";

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
        father: item["Email do lider"] ? item["Email do lider"] : "",
      });
    });

    setDataList(finalArray);
  };

  useEffect(() => {
    formatTeamArray();
  }, [teamJson]);

  const getFile = async () => {
    try {
      const fileId = window.location.href.split("file=")[1];
      const token = localStorage.getItem("pursToken");

      const resp = await api.get(`/export-url/${fileId}`, {
        headers: {
          Authorization: token,
        },
      });

      setDataList(resp.data);
    } catch (err) {}
  };

  useEffect(() => {
    getFile();
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-1/6">
        <NavBar path="exported" />
      </div>
      <div className="w-full">
        <div className="w-full bg-gradient-to-b from-[#8B95CE] to-[#DBF4FA] h-full pt-10 pl-4 pr-4 box-border">
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

import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import {
  AiOutlineDownload,
} from "react-icons/ai";
import NavBar from "../../Components/NavBar";
import { useNavigate, useLocation } from "react-router-dom";
import * as XLSX from 'xlsx';
import * as csvtojson from 'csvtojson';
import html2canvas from "html2canvas";
import api from '../../services/api';
import OrgChart from "../../Components/OrgChart";
import { toast } from 'react-toastify';

type RowInterface = {
  name: string;
  title: string;
  email: string;
  father?: string;
  children?: Array<RowInterface>;
};

const ChartPage: React.FC = () => {
  const [teamJson, setTeamJson] = useState([]);
  const [dataList, setDataList] = useState<RowInterface[]>();

  const location = useLocation();
  const navigate = useNavigate();

  const handleComponentDownload = () => {
    const componentId = 'org';
    const filename = 'organograma.png';

    const component = document.getElementById(componentId);

    if (component) {
      component.style.display = 'block';
      html2canvas(component)
        .then(canvas => {
          const url = canvas.toDataURL('image/png');
          const a = document.createElement('a');
          a.href = url;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        })
      component.style.display = 'none';
    }
  }

  const formatTeamArray = async () => {
    const finalArray: RowInterface[] = [];
    teamJson.map((item: any) => {

      finalArray.push({
        name: item.Nome,
        title: item.Cargo,
        email: item.Email,
        father: item['Email do lider'] ? item['Email do lider'] : '',
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

  const handleUrl = async () => {
    try {
      let formData = new FormData();
      formData.append('orgfile', location.state.fileSelected);

      const token = localStorage.getItem("pursToken")

      const resp = await api.post('/usersCreateURLOrg', formData, {
        headers: {
          'Authorization': token,
          'Content-Type': 'multipart/form-data',
        }
      });

      navigator.clipboard.writeText(`${window.location.href}Export?file=${resp.data.link}`)
      toast.success("Link de compartilhamento copiado para clipboard");
    } catch (err) {
      toast.error("Não foi possível gerar um link");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-1/6">
        <NavBar />
      </div>
      <div className="w-full">
        <Header />
        <div className="w-full bg-gradient-to-b from-[#8B95CE] to-[#DBF4FA] h-full pt-10 pl-4 pr-4 box-border">
          <div className="flex">
            <div className="flex w-[200] bg-purple-purs p-2 rounded-md cursor-pointer" onClick={() => handleUrl()}>
              <AiOutlineDownload size={20} color={"#fff"} />
              <p className="text-[#fff] ml-2 text-sm"> Exportar</p>
            </div>
          </div>
          <div className="w-full h-full mt-10 pb-2">
            <div className="bg-[#fff] w-full h-4/5 rounded-md hidden" id="org">
              {dataList?.length > 0 && dataList !== undefined ? (
                <OrgChart datalist={dataList} />
              ) : (
                <div> </div>
              )}
            </div>
            <p>Total: {dataList?.length}</p>
            <div className="bg-[#fff] w-[100%] h-[70%] rounded-md">
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

export default ChartPage;

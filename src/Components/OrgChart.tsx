import React, { useEffect, useState } from "react";
import {
  AiOutlineMinus,
  AiOutlineMinusSquare,
  AiOutlinePlus,
} from "react-icons/ai";

// @ts-ignore
// this library doesn't have @types
// check at https://github.com/dabeng/react-orgchart
import OrganizationChart from "@dabeng/react-orgchart";

import "./OrgChart.css";

type RowInterface = {
  name: string;
  title: string;
  email: string;
  father?: string;
  children?: Array<RowInterface>;
};

type PropsInterface = {
  datalist: RowInterface[];
};

/*
  This is the resulting excel data structure

  const dataList = [
    { name: "Tamara Santos", title: "Designer", email: "tamara.santos@purs" },
    { name: "João Alves", title: "UI Designer", email: "joao.alvez@purs", father: "tamara.santos@purs" },
    { name: "Ana Clara", title: "Estagiária", email: "ana.clara@purs", father: "joao.alvez@purs" },
    { name: "Patricia Silva", title: "Estagiária", email: "patricia.silva@purs", father: "ana.clara@purs" },
    { name: "Maria Soares", title: "UI Designer", email: "maria.soares@purs", father: "tamara.santos@purs" },
    { name: "Rebecka Nunes", title: "UI Designer", email: "rebecka.nunes@purs", father: "tamara.santos@purs" },
  ];

  This is the data structure expected by the lib

  const ds = {
    name: "Tamara Santos",
    title: "Designer",
    children: [
      { name: "João Alves", title: "UI Designer" },
      {
        name: "João Alves",
        title: "UI Designer",
        children: [
          {
            name: "Ana Clara",
            title: "Estagiária",
            children: [
              { name: "Ana Clara", title: "Estagiária" },
            ],
          },
          { name: "Ana Clara", title: "Estagiária" },
        ],
      },
      { name: "Maria Soares", title: "UI Designer" },
    ],
  };
*/

const structureDataList = async (datalist: RowInterface[]): Promise<RowInterface | null> => {
  // clone array
  let auxList: RowInterface[] = JSON.parse(JSON.stringify(datalist));

  // find fathers and structure
  await auxList.map((row) => {
    if (row.father) {
      const father = auxList.find(
        (fatherRow) => fatherRow.email === row.father
      );
      if (father && !father.children) father.children = [row];
      else if (father && father.children) father.children.push(row);
    }
  });

  const structure = auxList.find((row) => !row.father);
  return structure || null;
};

const getAcronym = (name: string) => {
  const arrName = name.toString().split(" ");
  return (
    (arrName?.[0] ? arrName?.[0]?.[0] : "") +
    (arrName?.[1] ? arrName?.[1]?.[0] : "")
  );
};

const OrgChart: React.FC<PropsInterface> = (props) => {
  const {datalist} = props;

  const [zoom, setZoom] = useState(75);
  const [datasource, setDatasource] = useState<RowInterface>();

  const zoomOut = () => {
    if (zoom > 50) setZoom(zoom - 25);
  };

  const zoomIn = () => {
    if (zoom < 150) setZoom(zoom + 25);
  };

  useEffect(() => {
    const startStructure = async () => {
      const ds = await structureDataList(datalist);
      if (ds) setDatasource(ds);
    };
    startStructure();
  }, []);

  if (!datasource) return null;
  return (
    <>
      <OrganizationChart
        datasource={datasource}
        chartClass={`chart-content zoom-${zoom}`}
        NodeTemplate={({ nodeData }: any) => (
          <div className="items-center gap-x-6 node-container">
            <div className="card-tag">
              <span>{getAcronym(nodeData.name)}</span>
            </div>
            <div className="node-card">
              <h3 className="card-title">{nodeData.name}</h3>
              <p className="card-subtitle">{nodeData.title}</p>
              {nodeData.children && (
                <button type="button" onClick={() => console.log("collapse")}>
                  <AiOutlineMinusSquare size={20} color="black" />
                </button>
              )}
            </div>
          </div>
        )}
        collapsible={false}
      />
      <div className="zoom-panel">
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
          onClick={zoomOut}
          disabled={zoom <= 50}
        >
          <AiOutlineMinus size={20} color={zoom <= 50 ? "gray" : "black"} />
        </button>
        <span>{`${zoom}%`}</span>
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
          onClick={zoomIn}
          disabled={zoom >= 150}
        >
          <AiOutlinePlus size={20} color={zoom >= 150 ? "gray" : "black"} />
        </button>
      </div>
    </>
  );
};

export default OrgChart;

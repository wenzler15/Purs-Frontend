import React, { useEffect, useState } from "react";
import {
  AiOutlineMinus,
  AiOutlinePlus,
} from "react-icons/ai";
import { MdOutlineCloseFullscreen, MdOutlineOpenInFull } from 'react-icons/md'
import { BsFullscreen } from "react-icons/bs"
// @ts-ignore react-orgchart does not support ts
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
  showCollapse: boolean;
};

const structureDataList = async (
  datalist: RowInterface[],
  collapsedNodes?: RowInterface[]
): Promise<[RowInterface | null, RowInterface[]]> => {
  let auxList: RowInterface[] = JSON.parse(JSON.stringify(datalist));

  let fathersList: RowInterface[] = [];

  await auxList.map((row, index) => {
    if (collapsedNodes?.find((collapseRow) => collapseRow.email === row.father))
      return;
    if (row.father) {
      const father = auxList.find(
        (fatherRow) => fatherRow.email === row.father
      );
      if (father && !father.children) father.children = [row];
      else if (father && father.children) {
        father.children.push(row)
      };

      if (father) fathersList.push(father);
    }
  });

  const structure = auxList.find((row) => !row.father) || null;
  if (!collapsedNodes && structure) structure.children = undefined; // start collapsed
  return [structure, fathersList];
};

const getAcronym = (name: string) => {
  const arrName = name.toString().split(" ");
  return (
    (arrName?.[0] ? arrName?.[0]?.[0] : "") +
    (arrName?.[1] ? arrName?.[1]?.[0] : "")
  );
};

const getAcronymFullname = (name: string) => {
  const arrName = name.toString().split(" ");
  console.log(name);

  let convertedName = name;

  if (arrName.length > 2) {
    convertedName = arrName[0];    

    arrName.map((item: string, index) => {      
      if(index !== 0 && index < arrName.length - 1) convertedName += " " + item.charAt(0).toUpperCase();
    });

    convertedName += " " + arrName[arrName.length - 1];
  }
  
  return convertedName
}

const zoomOut = (zoom: number): number => {
  if (zoom > 50) return (zoom - 25);
  else return zoom;
};

const zoomIn = (zoom: number): number => {
  if (zoom < 150) return (zoom + 25);
  else return zoom;
};

const countChildren = (datalist: RowInterface[], email: string) => {
  let howMany = 0;

  const findChildren = (fatherEmail: string) => {
    datalist.map((row) => {
      if (row.father === fatherEmail) {
        howMany += 1;
        findChildren(row.email)
      }
    })
  }

  findChildren(email);
  return howMany;
}

const OrgChart: React.FC<PropsInterface> = (props) => {
  const { datalist, showCollapse } = props;

  const [zoom, setZoom] = useState(75);

  const [datasource, setDatasource] = useState<RowInterface>();

  const [collapsedNodes, setCollapsedNodes] = useState<RowInterface[] | null>(null);

  const [initial, setInitial] = useState(0);

  const colors = [
    'bg-[#8962C480]',
    'bg-[#AF87E180]',
    'bg-[#D2B4F5B2]',
    'bg-[#0B234F66]',
    'bg-[#2D5F8D80]',
    'bg-[#3E79A580]',
    'bg-[#6AA6C980]',
    'bg-[#B8E6F6B2]',
    'bg-[#035C6C66]',
    'bg-[#0EC1A780]',
    'bg-[#14E1B080]',
    'bg-[#4BECB680]',
    'bg-[#A0FCCB80]',
    // Adicione mais classes de cores do Tailwind CSS conforme necessário.
  ];

  const assignIdsAndLevelsToNestedArrays = (arrays: any) => {
    let idCounter = 1;

    const assignIdsAndLevelsRecursively = (nestedArray: any, level: any) => {
      for (const element of nestedArray) {
        element.id = idCounter++;
        element.level = level;

        if (Array.isArray(element.children)) {
          assignIdsAndLevelsRecursively(element.children, level + 1);
        }
      }
    };

    assignIdsAndLevelsRecursively(arrays, 0);
  };

  const startStructure = async () => {
    const [ds, fathersList] = await structureDataList(datalist);
    if (ds) {
      assignIdsAndLevelsToNestedArrays([ds]);
      setDatasource(ds)
    };
    if (fathersList) setCollapsedNodes(fathersList);
  };

  useEffect(() => {
    startStructure();
  }, []);

  useEffect(() => {
    if (!collapsedNodes) return;
    const updateStructure = async () => {
      const [ds] = await structureDataList(datalist, collapsedNodes);
      if (ds) {
        assignIdsAndLevelsToNestedArrays([ds]);
        setDatasource(ds);
      };
    };
    updateStructure();
  }, [collapsedNodes?.length]);

  const handleMax = async () => {
    setCollapsedNodes([]);
  }

  const handleMin = async () => {
    startStructure();
  }


  if (!datasource) return null;
  return (
    <>
      <div className="w-full flex justify-end pt-5 pr-5">
        <div className="border rounded-3xl p-3 border-[#D7DFE9] bg-[#F9FAFB] mr-3 cursor-pointer" onClick={() => handleMin()}>
          <MdOutlineCloseFullscreen size={25} color="#000" />
        </div>
        <div className="border rounded-3xl p-3 border-[#D7DFE9] bg-[#F9FAFB] cursor-pointer" onClick={() => handleMax()}>
          <MdOutlineOpenInFull size={25} color="#000" />
        </div>
      </div>
      <OrganizationChart
        datasource={datasource}
        chartClass={`chart-content zoom-${zoom}`}
        // NodeTemplate={({ nodeData }: { nodeData: RowInterface }) => (
        NodeTemplate={({ nodeData }: any) => (
          <div className="items-center gap-x-6 w-full node-container">
            <div className="card-tag">
              <span>{getAcronym(nodeData.name)}</span>
            </div>
            <div className={`node-card ${colors[nodeData.level] ? colors[parseInt(nodeData.level) - 1] : 'bg-[#23105B66]'}  `}>
              <h3 className="card-title">{getAcronymFullname(nodeData.name)}</h3>
              <p className="card-subtitle">{nodeData.title}</p>
              {nodeData.children && showCollapse ? (
                <button
                  type="button"
                  className="collapse-button"
                  onClick={() => {
                    setCollapsedNodes([...collapsedNodes || [], nodeData]);
                  }}
                  id="minButton"
                >
                  <span>{countChildren(datalist, nodeData.email)}</span>
                  <AiOutlineMinus size={14} color="#444D61" />
                </button>
              ) : (
                <></>
              )}
              {collapsedNodes?.find((row) => row.email === nodeData.email) && (
                <button
                  type="button"
                  className="collapse-button"
                  onClick={() => {
                    setInitial(1)
                    setCollapsedNodes([
                      ...collapsedNodes.filter(
                        (row) => row.email !== nodeData.email
                      ),
                    ]);
                  }}
                  id="maxButton"
                >
                  <span>{countChildren(datalist, nodeData.email)}</span>
                  <AiOutlinePlus size={14} color="#444D61" />
                </button>
              )}
            </div>

          </div>
        )}
        collapsible={false}
      />
      {showCollapse ? (
        <div className="zoom-panel">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
            onClick={() => setZoom(zoomOut(zoom))}
            disabled={zoom <= 50}
          >
            <AiOutlineMinus size={20} color={zoom <= 50 ? "gray" : "black"} />
          </button>
          <span>{`${zoom}%`}</span>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
            onClick={() => setZoom(zoomIn(zoom))}
            disabled={zoom >= 150}
          >
            <AiOutlinePlus size={20} color={zoom >= 150 ? "gray" : "black"} />
          </button>
        </div>
      ) : (
        <> </>
      )}
    </>
  );
};

export default OrgChart;
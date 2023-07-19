import React, { useEffect, useState } from "react";
import {
  AiOutlineMinus,
  AiOutlinePlus,
} from "react-icons/ai";
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
): Promise<RowInterface | null> => {
  let auxList: RowInterface[] = JSON.parse(JSON.stringify(datalist));

  await auxList.map((row) => {
    if (collapsedNodes?.find((collapseRow) => collapseRow.email === row.father))
      return;
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

  const [collapsedNodes, setCollapsedNodes] = useState<RowInterface[]>([]);

  const [initial, setInitial] = useState(0);

  useEffect(() => {
    const startStructure = async () => {
      const ds = await structureDataList(datalist);
      if (ds) setDatasource(ds);
    };
    startStructure();
  }, []);

  useEffect(() => {
    if (!collapsedNodes) return;
    const updateStructure = async () => {
      const ds = await structureDataList(datalist, collapsedNodes);
      if (ds) setDatasource(ds);
    };
    updateStructure();
  }, [collapsedNodes.length]);

  const funcao = async () => {
    const buttonCollapse = document.getElementById('teste');
    if (buttonCollapse) {
      buttonCollapse.click();
    }
  }

  useEffect(() => {
    if (initial === 0) {
      funcao()
    }
  }, [datasource]);

  if (!datasource) return null;
  return (
    <>
      <OrganizationChart
        datasource={datasource}
        chartClass={`chart-content zoom-${zoom}`}
        NodeTemplate={({ nodeData }: { nodeData: RowInterface }) => (
          <div className="items-center gap-x-6 w-full node-container">
            <div className="card-tag">
              <span>{getAcronym(nodeData.name)}</span>
            </div>
            <div className="node-card">
              <h3 className="card-title">{nodeData.name}</h3>
              <p className="card-subtitle">{nodeData.title}</p>
              {nodeData.children && showCollapse ? (
                <button
                  type="button"
                  className="collapse-button"
                  onClick={() => {
                    setCollapsedNodes([...collapsedNodes, nodeData]);
                  }}
                  id="teste"
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

import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import NavBar from "../../Components/NavBar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";
import TextButton from "../../Components/Button";
import WordCloud from "react-wordcloud";
import Dropdown from "../../Components/Dropdown";
import PieChart from "../../Components/PieChart";
import LineChart from "../../Components/LineChart";
import BarChart from "../../Components/BarChart";

const options = {
  rotations: 2,
  rotationAngles: [-90, 0],
  fontSizes: [15, 60],
};

const Graphs: React.FC = () => {
  const [mode, setMode] = useState("");
  const [selectedResearch, setSelectedResearch] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [researchs, setResearchs] = useState([]);
  const [questionsCloud, setQuestionsCloud] = useState([]);
  const [words, setWords] = useState([]);
  const [responses, setResponses] = useState([]);
  const [activeChart, setActiveChart] = useState({});
  const [countResponses, setCountResponses] = useState(0);

  const handleSelect = (option) => {
    setSelectedQuestion(option.value);
  };

  const handleChartToggle = (id, type) => {
    setActiveChart((prevState) => ({
      ...prevState,
      [id]: prevState[id] === type ? null : type,
    }));
  };

  const handleSelectResearch = (option) => {
    setSelectedResearch(option.value);
  };

  const getResearchs = async () => {
    try {
      const token = localStorage.getItem("pursToken");
      const resp = await api.get("/research/getResearchs", {
        headers: {
          Authorization: token,
        },
      });

      const newArr = [];

      resp.data.map((item) => {
        newArr.push({ value: item.id, label: item.title });
      });

      setResearchs(newArr);
    } catch (err) {
      toast.error("Não foi possível listar as pesquisas");
    }
  };

  const getQuestions = async () => {
    try {
      if (selectedResearch) {
        const resp = await api.get(
          `/questions/getQuestionsByResearch/${selectedResearch}`
        );

        const newArr = [];

        resp.data.map((item) => {
          newArr.push({ value: item.id, label: item.desc });
        });

        setQuestionsCloud(newArr);
      } else {
        return null;
      }
    } catch (err) {
      toast.error("Não foi possível listar as questões");
    }
  };

  const getQuestionsResponseCloud = async () => {
    try {
      if (selectedQuestion && selectedResearch) {
        const resp = await api.get(
          `/research-response/cloudResp/${selectedResearch}/${selectedQuestion}`
        );

        if (resp.data.length > 1) {
          setWords(resp.data);
        } else {
          toast.error("Essa pergunta ainda não tem respostas cadastradas");
        }
      } else {
        return null;
      }
    } catch (err) {
      toast.error("Não foi possível listar as respostas dessa questão");
    }
  };

  const getResponses = async () => {
    try {
      const resp = await api.get(`/research-response/${selectedResearch}`);
      let respR = await api.get(
        `/questions/getQuestionsByResearch/${selectedResearch}`
      );

      respR = respR.data;

      setCountResponses(respR.length);

      const answersByQuestion = resp.data.reduce((acc, answer) => {
        if (!acc[answer.questionId]) {
          acc[answer.questionId] = [];
        }
        acc[answer.questionId].push(answer.answer);
        return acc;
      }, {});

      const enrichedQuestions = respR.map((question) => {
        return {
          ...question,
          answers: answersByQuestion[question.id] || [],
        };
      });

      const processedQuestions = processQuestions(enrichedQuestions);

      setResponses(processedQuestions);
    } catch (err) {
      toast.error("Não foi possível listar as respostas");
    }
  };

  const processQuestions = (questions) => {
    return questions.map((question) => {
      //   if (question.idQuestionType === 3 || question.idQuestionType === 4) {
      const answerCounts = question.answers.reduce((acc, answer) => {
        acc[answer] = (acc[answer] || 0) + 1;
        return acc;
      }, {});

      const uniqueAnswers = Object.keys(answerCounts);
      const counts = uniqueAnswers.map((answer) => answerCounts[answer]);

      return {
        ...question,
        answers: uniqueAnswers,
        count: counts,
      };
      //   } else {
      //     return question;
      //   }
    });
  };
  useEffect(() => {
    getResearchs();
  }, []);

  useEffect(() => {
    getQuestionsResponseCloud();
  }, [selectedQuestion]);

  useEffect(() => {
    if (mode === "graphs") {
      getResponses();
    } else {
      getQuestions();
    }
  }, [mode]);

  useEffect(() => {
    const initialChartState = responses.reduce((acc, item) => {
      acc[item.id] = "pie";
      return acc;
    }, {});
    setActiveChart(initialChartState);
  }, [responses]);

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-1/6">
        <NavBar path="graph" />
      </div>
      <div className="w-full overflow-y-auto">
        <Header text="Gráficos" />
        <div className="w-full bg-gradient-to-b from-[#8B95CE] to-[#DBF4FA] h-full pt-10 box-border px-4 pb-5">
          <div className="w-full rounded-lg bg-[#fff] p-5 px-8">
            <Dropdown
              text="Selecione uma pesquisa"
              options={researchs}
              onSelect={handleSelectResearch}
            />
            {selectedResearch && (
              <div className="flex mt-5 justify-between w-full">
                <div className="flex">
                  <div
                    className="cursor-pointer border border-blue-purs p-2 rounded-lg"
                    onClick={() => setMode("graphs")}
                  >
                    <p className="text-blue-purs text-2xl">Gráficos</p>
                  </div>
                  <div
                    className="cursor-pointer border border-blue-purs p-2 rounded-lg ml-10"
                    onClick={() => setMode("cloud")}
                  >
                    <p className="text-blue-purs text-2xl">Nuvem de palavras</p>
                  </div>
                </div>
                <div>
                  {mode === "graphs" && (
                    <p className="font-bold text-2xl">
                      Total de respostas: {countResponses}
                    </p>
                  )}
                </div>
              </div>
            )}
            {mode === "cloud" ? (
              <div className="mt-5">
                <Dropdown
                  text="Selecione uma questão"
                  options={questionsCloud}
                  onSelect={handleSelect}
                />
                {selectedQuestion && words.length > 0 && (
                  <div className="mt-3 flex items-center">
                    <WordCloud words={words} options={options} />
                  </div>
                )}
              </div>
            ) : (
              <div className="mt-5">
                {responses.map((item) => {
                  const totalAnswers = item.count.reduce(
                    (acc, current) => acc + current,
                    0
                  );

                  return (
                    <div
                      key={item.id}
                      className="border border-blue-purs rounded-lg p-5 mt-3"
                    >
                      <p className="text-blue-purs text-2xl font-bold">
                        {item.desc}
                      </p>
                      <p className="text-sm text-blue-purs">
                        Quantidade de respostas: {totalAnswers}
                      </p>
                      {item.idQuestionType === 3 ||
                      item.idQuestionType === 4 ? (
                        <div>
                          <div className="flex items-start mt-5 mb-5">
                            <button
                              onClick={() => handleChartToggle(item.id, "pie")}
                              className={`text-blue-purs p-2 text-lg border border-blue-purs rounded-lg 
                              ${
                                activeChart[item.id] === "pie"
                                  ? "font-bold"
                                  : "bg-gray-purs"
                              }`}
                            >
                              Pizza
                            </button>
                            <button
                              onClick={() =>
                                handleChartToggle(item.id, "donut")
                              }
                              className={`text-blue-purs p-2 text-lg border border-blue-purs rounded-lg ml-5
                              ${
                                activeChart[item.id] === "donut"
                                  ? "font-bold"
                                  : "bg-gray-purs"
                              }`}
                            >
                              Donut
                            </button>
                            <button
                              onClick={() => handleChartToggle(item.id, "line")}
                              className={`text-blue-purs p-2 text-lg border border-blue-purs rounded-lg ml-5
                              ${
                                activeChart[item.id] === "line"
                                  ? "font-bold"
                                  : "bg-gray-purs"
                              }`}
                            >
                              Linha
                            </button>
                            <button
                              onClick={() => handleChartToggle(item.id, "bar")}
                              className={`text-blue-purs p-2 text-lg border border-blue-purs rounded-lg ml-5
                              ${
                                activeChart[item.id] === "bar"
                                  ? "font-bold"
                                  : "bg-gray-purs"
                              }`}
                            >
                              Barra
                            </button>
                            <button
                              onClick={() =>
                                handleChartToggle(item.id, "bar horizontal")
                              }
                              className={`text-blue-purs p-2 text-lg border border-blue-purs rounded-lg ml-5
                              ${
                                activeChart[item.id] === "bar horizontal"
                                  ? "font-bold"
                                  : "bg-gray-purs"
                              }`}
                            >
                              Barra horizontal
                            </button>
                          </div>
                          {activeChart[item.id] === "pie" && (
                            <PieChart dataProvider={item} type="pie" />
                          )}
                          {activeChart[item.id] === "donut" && (
                            <PieChart dataProvider={item} type="donut" />
                          )}
                          {activeChart[item.id] === "line" && (
                            <LineChart data={item} />
                          )}
                          {activeChart[item.id] === "bar horizontal" && (
                            <BarChart data={item} type="horizontal" />
                          )}
                          {activeChart[item.id] === "bar" && (
                            <BarChart data={item} type="vertical" />
                          )}
                        </div>
                      ) : (
                        <div>
                          {item.answers.map((subitem, index) => {
                            const percentage =
                              ((item.count[index] + 1) / totalAnswers) * 100;

                            return (
                              <div
                                key={index}
                                className="w-full p-2 mt-2 rounded-md border border-[#000] text-[#fff]"
                                style={{
                                  background: `linear-gradient(to right, #7C5EB1 ${percentage}%, transparent ${percentage}%)`,
                                }}
                                title={`Respostas: ${item.count[index]}`}
                              >
                                {subitem}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Graphs;

import { useContext } from 'react';
import {ResearchesContext} from "~/app/presentation/context";

export const useResearchesContext = () => useContext(ResearchesContext);

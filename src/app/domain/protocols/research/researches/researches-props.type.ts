import {CreateResearch, LoadResearches} from "~/app/domain/usecases";
import {GetStorage, SetStorage} from "~/app/application/protocols";

export interface ResearchesProps {
    loadResearches: LoadResearches;
    createResearch: CreateResearch;
    cookieAdapter: SetStorage & GetStorage;
}
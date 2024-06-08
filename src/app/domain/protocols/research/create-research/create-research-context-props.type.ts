import {Control, UseFormWatch} from "react-hook-form";
import {ResearchValidation} from "~/app/domain/protocols";

export type CreateResearchContextProps = {
    control: Control<ResearchValidation, never>;
    watch: UseFormWatch<ResearchValidation>
}
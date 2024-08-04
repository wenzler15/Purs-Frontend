import { MultipleChoiceTag, OptionTag } from "./components";

function MultipleChoiceComponent() {
    return (
        <div>
            <div className="flex flex-col">
                <OptionTag/>

                <MultipleChoiceTag/>
            </div>
        </div>
    )
}

export default MultipleChoiceComponent;

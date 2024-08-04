import {DragIndicatorIcon} from "~/app/presentation/components/icons";

function DragPanelComponent() {
    return (
        <div className="flex items-center justify-center w-full h-6 cursor-grab">
            <div className="flex flex-col gap-1">
                <DragIndicatorIcon className="w-3.5 rotate-90"/>
            </div>
        </div>
    )
}

export default DragPanelComponent;
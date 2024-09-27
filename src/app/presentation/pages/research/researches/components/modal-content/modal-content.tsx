import TextButton from "~/Components/Button";
import React from "react";
import {generateHeading} from "../../utils";
import {useResearchesContext} from "~/app/presentation/hooks/pages";

function ModalContentComponent() {
    const {action, setAction, onToggle, modalOnClick, hasMultipleIDS} = useResearchesContext();
    const heading = generateHeading(hasMultipleIDS)[action ?? 'delete'];


    const okStyle = {marginTop: "40px", background: "red"}
    const cancelStyle = {
        marginTop: "40px",
        background: "#fff",
        border: "1px solid #000",
        color: "#000"
    }


    function handleClose() {
        onToggle()
        setAction(null)
    }

    return (
        <>
            <p className="font-bold text-xl">{heading.title}</p>
            <p className="mt-2">{heading.subtitle}</p>


            <div className="flex justify-around">
                <TextButton text={heading.cancel} onClick={handleClose} style={cancelStyle}/>
                <TextButton text={heading.confirm} onClick={() => modalOnClick[action ?? 'delete']()} style={okStyle}/>
            </div>
        </>
    )
}

export default ModalContentComponent;
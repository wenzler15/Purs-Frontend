import {EyeIcon, SendIcon} from "~/app/presentation/components/icons";
import React from "react";

function HeaderActionsComponent() {
    return (
        <div className='flex items-center gap-8'>
            <button
                className="inline-flex items-center gap-2 font-medium text-[#455468] px-5 py-2 rounded-lg focus:ring-4 focus:outline-none"
            >
                Visualizar
                <EyeIcon/>
            </button>

            <button
                type="button"
                className="text-[#FFFFFF] bg-[#5B359E] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center gap-2"
            >
                Enviar
                <SendIcon fill="#FFFFFF"/>
            </button>

        </div>
    )
}

export default HeaderActionsComponent;

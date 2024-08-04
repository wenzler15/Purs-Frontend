import {DragPanelTag, PanelIndicatorTag} from "~/app/presentation/pages/research/create-research/components";
import {useCreateResearchContext} from "~/app/presentation/hooks/pages";
import {CopyIcon, TrashIcon} from "~/app/presentation/components/icons";

type SectionPanelProps = {
    id: string;
    title: string;
    description: string;
    index: number;
};

function SectionPanelComponent({id, title, description, index}: SectionPanelProps) {
    const {sections, deleteSection, onChangeSection} = useCreateResearchContext();
    const sectionsLength = sections.length;
    const hasManySections = sectionsLength > 1;

    const borderRadiusPrimaryInfo = hasManySections ? 'rounded-b-md' : 'rounded-md'

    return (
        <div className="flex flex-col items-center w-full">
            {
                hasManySections &&
                <PanelIndicatorTag index={index} length={sectionsLength}/>
            }
            <div
                tabIndex={0}
                className={`flex flex-col gap-2 items-center w-[768px] ${borderRadiusPrimaryInfo} mb-6 bg-[#FFFFFF] shadow-lg`}
            >
                <DragPanelTag/>

                <div className="w-full p-5">
                    <div className="w-full flex justify-between">
                        <div className="w-full max-w-[427px] flex flex-col gap-4">
                            <input
                                value={title}
                                type="text"
                                onChange={e => onChangeSection(e, id, 'title')}
                                placeholder='Título da seção (opcional)'
                                className='h-[46px] px-4 border-b border-[#AFBACA] outline-none focus:border-[#5B359E]'
                            />
                            <input
                                value={description}
                                type="text"
                                onChange={e => onChangeSection(e, id, 'description')}
                                placeholder='Descrição (opcional)'
                                className='h-[30px] px-4 border-dotted border-b border-[#AFBACA] outline-none focus:border-solid focus:border-[#5B359E]'
                            />
                        </div>

                        <div className='flex gap-2'>
                            <button className="flex items-center justify-center w-6 h-6">
                                <CopyIcon/>
                            </button>
                            <button onClick={() => deleteSection(id)} className="flex items-center justify-center w-6 h-6">
                                <TrashIcon/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SectionPanelComponent;
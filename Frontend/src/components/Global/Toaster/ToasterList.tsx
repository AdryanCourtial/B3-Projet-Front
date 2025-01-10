import { toasterArrayAtom } from "../../../atoms/atomToaster"
import { useAtom } from "jotai"
import ToasterItem from "./ToasterItem/ToasterItem"


const ToasterList = () => {
    const [toasterArray] = useAtom(toasterArrayAtom)

    return (
        <div className="absolute top-0 right-0 w-[500px] h-auto flex flex-col gap-4 p-4">
            {
                toasterArray.map((component, index) => (
                    <ToasterItem message={component.message} type={component.type} key={index} />
                ))
            }
        </div>
    )
}

export default ToasterList
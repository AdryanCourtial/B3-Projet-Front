import { toasterArrayAtom } from "../../../atoms/atomToaster"
import useToaster from "../../../hooks/useToaster"
import { useAtom } from "jotai"


const Toaster = () => {
    const [toasterArray, setToasterArray] = useAtom(toasterArrayAtom)

    const { useToast } = useToaster()

    return (
        <div className="absolute top-0 right-0 w-[400px] bg">
            {  }
        </div>
    )
}

export default Toaster
import { useAtom } from "jotai"
import { Toaster, ToasterType } from "../types/Toaster"
import { toasterArrayAtom } from "../atoms/atomToaster"
import { randInt } from "three/src/math/MathUtils.js"

const useToaster = () => {

    const [toasterArray, setToasterArray] = useAtom(toasterArrayAtom)

    const useToast = (type: ToasterType, message: string) => {
        const newToaster: Toaster = {
            message: randInt(1, 20).toString(),
            type: type
        }

        setToasterArray([...toasterArray, newToaster])
        
        setTimeout(() => {
            setToasterArray((toasterArray) => {
                const tab: Toaster[] = [...toasterArray]
                tab.shift()
                return tab
            })
          }, 3000);
    }

    return {
        useToast
    }
}

export default useToaster
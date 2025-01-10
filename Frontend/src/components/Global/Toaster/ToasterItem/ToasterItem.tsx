import { Toaster } from "../../../../types/Toaster"
import { motion } from "motion/react"
import { toasterItemAnimation } from "../../../../animations/toasterAnimation"

const ToasterItem = ({ message, type }:Toaster) => {

    const selectType = () => {
        if (type === "erreur") return "hsl(347, 94%, 67%)"
        if (type === "succes") return "hsl(161, 74%, 62%)"
        if (type === "warning") return "orange"
    }

    return (
        <motion.div className="w-full min-h-[100px] h-auto px-8 flex items-center rounded-[10px]"
        variants={toasterItemAnimation}
        initial="hidden"
        animate="visible"
        transition={{type: "spring"}}
        style={{
            backgroundColor: selectType()
        }}>
            <p className="w-full text-[1.5rem] font-medium whitespace-normal break-words">
                { message }
            </p>
        </motion.div>
    )
}

export default ToasterItem
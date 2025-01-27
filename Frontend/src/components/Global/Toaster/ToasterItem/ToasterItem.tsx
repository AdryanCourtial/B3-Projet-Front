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
        <motion.div className="w-full min-h-[100px] h-auto px-8 flex items-center rounded-[10px] shadow-2xl "
        variants={toasterItemAnimation}
        initial="hidden"
        animate="visible"
        exit="hidden"
        transition={{type: "spring"}}
        style={{
            backgroundColor: selectType()
        }}>
            <div>
                { type === 'succes' ? 
                    <svg width="40px" height="40px" viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg"><g id="Interface / Check"><path id="Vector" d="M6 12L10.2426 16.2426L18.727 7.75732" stroke="#fffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g></svg>
                    :
                    <svg width="40px" height="40px" viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M19.5 12C19.5 16.1421 16.1421 19.5 12 19.5C7.85786 19.5 4.5 16.1421 4.5 12C4.5 7.85786 7.85786 4.5 12 4.5C16.1421 4.5 19.5 7.85786 19.5 12ZM21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM11.25 13.5V8.25H12.75V13.5H11.25ZM11.25 15.75V14.25H12.75V15.75H11.25Z" fill="#fffff"/></svg>
                }
            </div>
            <p className="w-full text-[1.5rem] font-medium whitespace-normal break-words">
                { message }
            </p>
        </motion.div>
    )
}

export default ToasterItem
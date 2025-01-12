import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { isTimeUpAtom, remainingTimeAtom } from "../../../atoms/UserAtoms";


export default function ProgressBar() {

    const [remainingTime] = useAtom(remainingTimeAtom)
    const [isTimeUp] = useAtom(isTimeUpAtom)

    return (
        <div>
             {/* Animation du temps restant */}
      <motion.h3
        key={remainingTime}  
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}    
        transition={{ duration: 0.5 }}
      >
        {isTimeUp ? "Temps écoulé" : `${remainingTime} secondes`}
            </motion.h3> 
            

            <motion.div
        style={{
          width: "100%",
          height: "20px",
          backgroundColor: "#ddd",
          borderRadius: "10px",
        }}
      >
        <motion.div
          style={{
            height: "100%",
            backgroundColor: "#4caf50",
            borderRadius: "10px",
          }}
          animate={{
            width: `${(remainingTime / 30) * 100}%`, 
          }}
          transition={{ duration: 1 }}
        />
      </motion.div>
        </div>
    )
  }
  
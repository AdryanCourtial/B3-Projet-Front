import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { isTimeUpAtom, remainingTimeAtom } from "../../../atoms/UserAtoms";

export default function ProgressBar() {
  const [remainingTime] = useAtom(remainingTimeAtom);
  const [isTimeUp] = useAtom(isTimeUpAtom);

  const progress = remainingTime ? (remainingTime / 30) * 100 : 0;

  return (
    <div>
      <motion.div
        style={{
          width: "100%",
          height: "20px",
          backgroundColor: "#ddd",
          borderRadius: "10px",
          position: "relative",
        }}
      >
        <motion.div
          style={{
            height: "100%",
            backgroundColor: "#4caf50",
            borderRadius: "10px",
            position: "absolute", 
          }}
          animate={{
            width: `${progress}%`, 
          }}
          transition={{ duration: 1 }}
        />
        <motion.div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "#fff", 
            fontWeight: "bold",
          }}
        >
          {isTimeUp ? "Temps écoulé" : `${remainingTime}`}
        </motion.div>
      </motion.div>
    </div>
  );
}
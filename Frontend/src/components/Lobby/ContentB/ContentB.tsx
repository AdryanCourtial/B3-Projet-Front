import LinearGradientText from "../../Global/LinearGradientText/LinearGriadientText"
import Cta from "../../Global/Cta/Cta"
import { useNavigate } from "react-router"

const ContentB = () => {

    const navigate = useNavigate()

    return (
        <div className="flex flex-col justify-around items-center w-full m-auto">
            <img src="/Amie.png" className="max-h-[800px] w-full max-w-[700px]" alt="" />
            <div className="flex flex-col gap-6">
                <h2 className="w-full m-auto"><LinearGradientText colorGradient="linear-gradient(90deg, #37D0FC, #B274EF)"> Plus on est, plus on s’amuse ! </LinearGradientText></h2>
                <p className="w-full max-w-[450px] m-auto text-center">
                Plongez dans une expérience unique grâce à notre mode multijoueur, conçu spécialement pour jouer avec vos amis et rendre chaque partie inoubliable ! Lancez une partie en quelques cliques
                </p>
                <Cta backgroundColor="linear-gradient(90deg, #37D0FC, #B274EF)" fontColor="white" fontSize="1.6rem" action={() => navigate("/qibble/public")}>
                    Play Now ! 
                </Cta>
            </div>
        </div>
    )
}

export default ContentB
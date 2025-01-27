import useToaster from "../../../hooks/useToaster"
import LinearGradientText from "../../Global/LinearGradientText/LinearGriadientText"

const ContentA = () => {

    const { useToast } = useToaster()
    return (
        <div className="flex flex-col justify-around items-center lg:flex-row w-full m-auto">
            <img src="/img-contentA.png" className="max-h-[600px] max-w-[500px]" alt="" 
            onClick={() => useToast('succes', "Baptiste est beau")}
            />
            <div className="flex flex-col gap-6">
                <h2 className="w-[80%] m-auto"> Défiez vos <br /><LinearGradientText colorGradient="#FA5A7C"> connaissances ! </LinearGradientText></h2>
                <p className="w-[80%] max-w-[450px] m-auto">
                Bienvenue dans le quiz ultime pour tester vos connaissances et votre esprit de compétition ! Avec nos défis variés, explorez des thématiques passionnantes tout en montrant de quoi vous êtes capable.
                </p>
            </div>
        </div>
    )
}

export default ContentA
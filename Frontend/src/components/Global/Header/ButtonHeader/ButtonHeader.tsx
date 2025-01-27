import { NavLink } from "react-router"
import './ButtonHEader.css'
import LinearGradientText from "../../LinearGradientText/LinearGriadientText"

interface Props {
    fontColor: string
    to: string
    children: string
}

const ButtonHeader = ( { fontColor, to, children }: Props ) => {
    return (
        <>
            <NavLink
            to={to}
            className="button_header text-[2rem]"
            >
                <LinearGradientText
                colorGradient={fontColor}
                >
                    {children}
                </LinearGradientText>
            </NavLink>
        </>
    )
}

export default ButtonHeader
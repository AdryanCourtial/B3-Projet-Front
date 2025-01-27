interface Props {
    colorGradient: string
    children: string
}

const LinearGradientText = ({ children, colorGradient }: Props) => {
    return (
        <span style={{ background: colorGradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontSize: 'ineterit'}}>
        { children }
        </span>
    )
}

export default LinearGradientText
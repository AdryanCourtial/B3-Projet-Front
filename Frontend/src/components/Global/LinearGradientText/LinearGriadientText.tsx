interface Props {
    colorGradient: string
    children: string
}

const LinearGradientText = ({ children, colorGradient }: Props) => {
    return (
        <span style={{ background: colorGradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"}}>
        { children }
        </span>
    )
}

export default LinearGradientText
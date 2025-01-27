interface Props {
    children: string
    fontColor: string
    fontSize: string
    backgroundColor: string
    action: () => void
}

const Cta = ({ children, fontColor, backgroundColor, fontSize, action }: Props) => {
    return (
        <button className="rounded-[10px] w-fit px-8 py-2 m-auto"
        style={{
            color: fontColor,
            background: backgroundColor,
            fontSize: fontSize
        }}
        onClick={action}
        >
            { children }
        </button>
    )
}

export default Cta
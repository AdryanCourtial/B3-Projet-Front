interface Props {
    children: string
    onAnswerPressed: (answer: string) => void
    id: number
}

export default function AnswerItems({ children, onAnswerPressed, id }: Props) {

    const ColorBorder = () => {

        let object: React.CSSProperties = {}

        switch (id) {
            case 0:
                object = {
                    border: "#57E6B8 3px solid",
                    boxShadow: "4px 4px 4px #37D0FC"
                }
                break;
            case 1:
                object = {
                    border: "#FA5A7C 3px solid",
                    boxShadow: "4px 4px 4px #57E6B8"
                }
                break;
            case 2:
                object = {
                    border: "#B274EF 3px solid",
                    boxShadow: "4px 4px 4px #FA5A7C"
                }
                break;
            case 3:
                object = {
                    border: "#37D0FC 3px solid",
                    boxShadow: "4px 4px 4px #B274EF"
                }
                break;
        } 

        return object
    }

    return (
        <div className="flex flex-row justify-center items-center bg-white max-w-[500px] w-full h-[100%] rounded-[10px] lg:h-[100%] cursor-pointer"
        onClick={() => onAnswerPressed(children)}
        style={ColorBorder()}
        >
            <p>
                { children }
            </p>
        </div>
    )
  }
  
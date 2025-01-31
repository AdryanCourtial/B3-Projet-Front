import { ReactNode } from "react"
import Toaster from "../../components/Global/Toaster/ToasterList"

type Props = {
    children: ReactNode
}

export default function NoLayout({ children }: Props) {
    return (
        <>
            { children }
            <Toaster />
        </>
    )
  }
  
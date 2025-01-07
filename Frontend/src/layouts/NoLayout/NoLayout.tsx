import { ReactNode } from "react"

type Props = {
    children: ReactNode
}

export default function NoLayout({ children }: Props) {
    return (
        <>
            { children }
        </>
    )
  }
  
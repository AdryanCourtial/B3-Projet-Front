import { ReactNode } from "react";
import Footer from "../../components/Global/Footer.tsx/Footer";
import Header from "../../components/Global/Header/Header";
import Toaster from "../../components/Global/Toaster/Toaster";

type Props = {
    children: ReactNode
}

export default function DefaultLayout({ children }: Props) {
    return (
        <>
            <Header />
                { children }
            <Footer />
        </>
    )
  }
  
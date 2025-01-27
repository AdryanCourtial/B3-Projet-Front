import { ReactNode } from "react";
import Header from "../../components/Global/Header/Header";
import Footer from "../../components/Global/Footer/Footer";
import Toaster from "../../components/Global/Toaster/ToasterList"


type Props = {
    children: ReactNode
}

export default function DefaultLayout({ children }: Props) {
    return (
        <div> 
            <Header />
                { children }
            <Footer />
            <Toaster />
        </div>
    )
  }
  
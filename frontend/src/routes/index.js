// Atualizar posterioremente: as rotas irão renderizar os componentes para as páginas: Agendar && GerenciarAgendamentos


import { Fragment } from "react"
import { BrowserRouter, Route, Routes} from "react-router-dom"
import Home from "../pages/Home"
import Signin from "../pages/Signin"
import Signup from "../pages/Signup"

const Private = ({ Item }) => {
    const signed = false

    return signed > 0 ? <Item /> : <Signin />
}

const RoutesApp = () => {
    return (
        <BrowserRouter>
            <Fragment>
                <Routes>
                    <Route path="*" element={<Signin />} />
                    <Route path="/" element={<Signin />} />
                    <Route exact path="/home" element={<Private Item={Home} />} />
                    <Route exact path="/signup" element={<Signup />} />
                </Routes>
            </Fragment>
        </BrowserRouter>
    )
}

export default RoutesApp
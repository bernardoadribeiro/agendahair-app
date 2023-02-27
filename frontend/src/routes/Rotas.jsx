import React, { useState } from "react"
import {Routes, Route, createBrowserRouter, RouterProvider} from 'react-router-dom'

import Agendamento from "../components/Agendamento/Agendamento"
import Signin from "../components/Signin/Signin"
import TabelaAgendamentos from "../components/TabelaAgendamentos/TabelaAgendamentos"

function Rotas() { 
        
    return(

        <Routes>        
            <Route path="/" element={ <Signin /> } />
            <Route exact path="/acompanhar" element= {<TabelaAgendamentos />} />
            <Route exact path="/agendar" component={Agendamento} />
        </Routes>
    )   
}


export default Rotas
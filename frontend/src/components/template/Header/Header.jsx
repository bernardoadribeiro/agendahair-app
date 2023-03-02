import React from "react"
import "./Header.css"

// NavBAR para os componentes de Consulta e Agendamentos

const Header = (props) => {

    return (
      <div id="header">
        <nav className="container-fluid">
        <ul>
          <li><a href="./" className="contrast"><strong>AgendaHair</strong></a></li>
        </ul>
        <ul>
          <li>
              <summary aria-haspopup="listbox" role="link" className="contrast">Agendar</summary>
          </li>
          <li>
              <summary role="link" className="contrast">Agendamentos</summary>
          </li>
        </ul>
      </nav>
    </div>
    )

}


export default Header
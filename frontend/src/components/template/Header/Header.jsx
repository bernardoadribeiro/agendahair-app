import React from "react";
import "./Header.css";
import axios from "axios";

const Header = (props) => {

  function fetchAllAppointments(e) {
    e.preventDefault()

    const data = new FormData()
    data.append('codigo_agendamento', '1')

    try {
      axios.get('http://localhost:5000/api/v1/agendamentos', data, {headers: {'Content-Type': 'multipart/form-data'}})
      .then(res => props.setAgendamentos([...res.data]))
    } catch(e) {
      console.log(e)
    }
  }

  function signOut(e) {
    e.preventDefault()
    axios.post('http://localhost:5000/api/v1/logout')
    props.setDisplay(false)
  }


  return (
    <div id="header">
      <div className="header-left">
        <a href="./home.html" className="contrast">
          <strong>AgendaHair</strong>
        </a>
      </div>
      <div className="header-right">
        <span>
          <p href="#" className="contrast" onClick={() => props.setAgendamentos([])}>
            Agendar
          </p>
        </span>
        <span>
          <p href="#" className="contrast" onClick={(e) => fetchAllAppointments(e)}>
            Agendamentos
          </p>
        </span>
        {props.display ? <span onClick={(e) => signOut(e)}>
          sair
        </span> : ''}
      </div>
    </div>
  );
};

export default Header;

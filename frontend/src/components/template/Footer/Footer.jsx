import React from "react"
import "./Footer.css"
import axios from 'axios'

const Footer = (props) => {

    function getMe(e) {
        e.preventDefault()
        try{
            axios.get('http://localhost:5000/api/v1/usuarios').then(res => console.log(res))
        } catch(e) {
            alert(e.response.mensagem)
        }
    }

    return (
        <footer>
            <div>
                <h2>AgendaHair</h2>
            </div>
    
            <div id="pages">
                <h3>Páginas</h3>
                <span><a href="./home.html">Home</a></span>
                <span onClick={(e) => getMe(e)}>Sobre</span>
            </div>
    
            <div>
                <h3>Repositório do projeto</h3>
                <a href="https://github.com/bernardoadribeiro/agendahair-app">agenda-hair-react-app</a>
            </div>
    
            <div id="allRightsReserved">
                <h6>Todos os direitos reservados &copy; 2023</h6>
                <span>
                    Desenvolvido por alunos para a disciplina de Desenvolvimento Web do curso BSI (IFNMG Campus Januária)
                </span>
                <span>Semestre 02/2022</span>
            </div>
       </footer>
    )
}

export default Footer

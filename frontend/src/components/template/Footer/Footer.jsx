import React from "react"
import "./Footer.css"

const Footer = (props) => {

    return (
        <footer>

            <span><h2>AgendaHair</h2></span>
                
            <div>
                <h3>Acompanhar agendamento</h3>
                <input type="text" placeholder="Código do agendamento" />
                <button type="submit">Verificar</button>
            </div>
    
            <div>
                <h3>Páginas</h3>
                <p><a href="/#">Home</a></p>
                <p><a href="/agendar">Agendar</a></p>
                <p><a href="/sobre">Sobre</a></p>
            </div>
    
            <div>
                <h3>Repositório do projeto</h3>
                <p>agenda-hair-react-app</p>
            </div>
    
            <span>
                <h6>Todos os direitos reservados &copy; 2023</h6>
                Desenvolvido por alunos para a disciplina de Desenvolvimento Web do curso BSI (IFNMG Campus Januária)
                <p>Semestre 02/2022</p>
    
            </span>
    
       </footer>
    )
}

export default Footer
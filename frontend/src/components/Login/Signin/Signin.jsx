import axios from "axios"
import './Signin.css'
// Componente para Entrar no Sistema

const Signin = (props) => {

    async function handleSubmit(e) {

        e.preventDefault()

        const data = new FormData(e.target.form)
        
        try {
            fetch('http://localhost:5000/api/v1/login/', {
                method: 'POST',
                body: data,
                headers: {'Content-Type': 'multipart/form-data'}
            } ).then(res=> res.json()).then((res) => {
                if(res.status === 200)
                    props.setDisplay(true)
            })
        } catch (e) {
            console.log(e)
            document.getElementById('errorCatcher').innerHTML = "Ocorreu um erro, tente novamente!"
        }
    }

    return (
        <>
            <div id="outer">
                <div id="inner">
                    <h1>Entrar no Sistema</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="email"
                            placeholder="email"
                            id="email"
                            required
                        />
                        <br />
                        <input
                            type="password"
                            name="password"
                            placeholder="senha"
                            id="password"
                            required
                        />
                        <button type="submit">Entrar</button>
                    </form>
                        <p onClick={() => props.setSession(true)}>criar conta</p>
                        <h5 id="errorCatcher"></h5>
                </div>
            </div>
        </>
    )
}

export default Signin
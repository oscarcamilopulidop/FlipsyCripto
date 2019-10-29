import React, { useState, useEffect, useContext } from 'react'
import { Input, Button } from 'antd'
import '../Styles/MainLogin.css'
import { withRouter } from 'react-router-dom'
import { Auth } from 'aws-amplify'
import Context from "../GlobalState/context";


const MainLogin = props => {

    const { state, actions } = useContext(Context);

    useEffect(() => {
      Auth.currentAuthenticatedUser().then(() => props.history.push('home'))
    }, [])

    const [loginCredentials, setLoginCredentials] = useState({ email: "", password: "" })

    const Login = async () => {
        // console.log(user.attributes.sub)
        !Object.values(loginCredentials).includes("") ?
      await Auth.signIn(loginCredentials.email, loginCredentials.password)
        .then((user) => {

          const { id } = state.user_credentials;
          console.log(state.user_credentials);
          props.history.push('home');
          actions({
              type: "setState",
              payload: {
                  ...state, user_credentials:
                      { ...state.user_credentials,
                          id: user.attributes.sub,
                      }
              }

          });
      })
          .catch(err => {
              switch (err.name) {
                  case 'UserNotFoundException': alert("El usuario no existe"); break;
                  case 'NotAuthorizedException': alert("La contraseña es incorrecta"); break;
                  case 'UserNotConfirmedException': alert("El usuario no se ha verificado"); break;
                  default: alert(err.name)
              }
          })
            :
            alert("Los Campos no pueden estar vacíos")
      // Auth.currentAuthenticatedUser()


      console.log(state.user_credentials);
      
    }


    return (
        <div className='login-main-container'>
            <div className="img-logo-container">
                <img className="img-logo" src={require('../Assets/LogoLogin.PNG')} alt="" />
            </div>

            <section className="form-container">
                <Input className="input" placeholder="Correo Electrónico" onChange={(e) => setLoginCredentials({ ...loginCredentials, email: e.target.value })} />

                <Input className="input" placeholder="Contraseña" onChange={(e) => setLoginCredentials({ ...loginCredentials, password: e.target.value })} type="password" />

            </section>

            <section className="login-btn-container">
                <Button type="primary" onClick={Login}> Iniciar Sesión </Button>
            </section>

            <section className="final-options">
                <p>¿Olvidaste la contraseña? <a href="#"> Click aquí </a> </p>
                <p>¿No tiene cuenta? <a onClick={() => props.history.push('signup')}> Regístrate aquí </a> </p>
            </section>
        </div>
    )
}

export default withRouter(MainLogin)

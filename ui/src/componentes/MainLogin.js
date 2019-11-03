import React, { useState, useContext } from 'react'
import { Input, Button } from 'antd'
import '../Styles/MainLogin.css'
import { withRouter } from 'react-router-dom'
import { Auth } from 'aws-amplify'
import Context from "../GlobalState/context";
import Swal from 'sweetalert2'


const MainLogin = props => {

    const { state, actions } = useContext(Context);

    const [loginCredentials, setLoginCredentials] = useState({ email: "", password: "" });

    const Login = async () => {

      console.log(loginCredentials);

        !Object.values(loginCredentials).includes("") ?
      await Auth.signIn(loginCredentials.email, loginCredentials.password)
        .then((user) => {

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

                  case 'UserNotFoundException':
                      Swal.fire({
                      type: 'error',
                      title: 'Error',
                      text: `
                            El usuario no existe
                        `,
                      footer: '<i> Inténtalo de nuevo :D </i>'
                      }); break;
                  case 'NotAuthorizedException':
                      Swal.fire({
                          type: 'error',
                          title: 'Error',
                          text: `
                            La contraseña es incorrecta
                        `,
                          footer: '<i> Inténtalo de nuevo :D </i>'
                      }); break;
                  case 'UserNotConfirmedException':
                      Swal.fire({
                          type: 'error',
                          title: 'Error',
                          text: `
                            El usuario no se ha verificado
                        `,
                          footer: '<i> Inténtalo de nuevo :D </i>'
                      }); break;
                  default: Swal.fire({
                      type: 'error',
                      title: 'Error',
                      text:
                            err.name
                        ,
                      footer: '<i> Inténtalo de nuevo :D </i>'
                  });
              }
          })
            :
            Swal.fire({
                type: 'error',
                title: 'Error',
                text:
                    "Los Campos no pueden estar vacíos"
                ,
                footer: '<i> Inténtalo de nuevo :D </i>'
            });
    };


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
                <p>¿Olvidaste la contraseña? <a onClick={() => props.history.push('verification')}> Click aquí </a> </p>
                <p>¿No tiene cuenta? <a onClick={() => props.history.push('signup')}> Regístrate aquí </a> </p>
            </section>
        </div>
    )
};

export default withRouter(MainLogin)

import React, { useState, useEffect, useContext } from 'react';
import regis from '../Assets/icon.png';
import ConfirmCode from './CodConf'
import '../Styles/Signup.css'
import { Auth } from 'aws-amplify'
import { Button, Input, Checkbox } from 'antd'
import Context from '../GlobalState/context'
import { withRouter } from 'react-router-dom'
import Swal from 'sweetalert2'
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';



const Registro = props => {
    const { state, actions } = useContext(Context)
    const [signUpCredentials, setSignUpCredentials] = useState({
        correo: '',
        usuario: '',
        contra: '',
        terminos: false
    })

    const ValidateCredentials = () => {
        signUpCredentials.terminos
            ? handleSubmit()
            : Swal.fire({
                type: 'error',
                title: 'Error',
                text: `
                            Debes aceptar los términos y condiciones
                        `,
                footer: '<i> Inténtalo de nuevo :D </i>'
            })
    }

    const handleSubmit = async () => {
        const { correo, usuario, contra } = signUpCredentials
        try {
            await Auth.signUp({
                username: correo,
                password: contra,
                attributes: {
                    email: correo,
                    nickname: usuario
                }
            })
                .then(async (authUser) => {
                    actions({
                        type: "setState",
                        payload: {
                            user_credentials: {
                                email: correo,
                                nickname: usuario,
                                id: authUser.userSub
                            }
                        }
                    })
                    props.history.push('confirm-code')
                })

        } catch (error) {
            alert(error.name)
            switch (error.name) {
                case 'UsernameExistsException': {
                    Swal.fire({
                        type: 'error',
                        title: 'Error',
                        text: `
                            El correo ingresado ya existe
                        `,
                        footer: '<i> Inténtalo de nuevo :D </i>'
                    })
                }break;
                default: {
                    Swal.fire({
                        type: 'error',
                        title: 'Error',
                        text: `
                            La Contraseña debe contener 8 caracteres, mayúscula y minúscula y al menos un número
                        `,
                        footer: '<i> Inténtalo de nuevo :D </i>'
                    })
                }
            }
        }
    }


    return (
        <div className="Registro">
            <div className="wave">

                <div className="img-container">
                    <img onClick={() => console.log(state)} src={regis} className="img-regis" alt="logo-registro" />
                </div>
            </div>

            <form className="formRegis" onSubmit={handleSubmit}>

                <section className="inputs-container">
                    <Input
                        className="signup-input"
                        onChange={e => setSignUpCredentials({ ...signUpCredentials, correo: e.target.value })}
                        placeholder="Correo Electrónico"
                        onClick={() => console.log(state)}

                    />

                    <Input
                        className="signup-input"
                        onChange={e => setSignUpCredentials({ ...signUpCredentials, usuario: e.target.value })}
                        onClick={() => console.log(signUpCredentials)}
                        placeholder="Nickname"
                    />

                    <Input
                        className="signup-input"
                        onChange={e => setSignUpCredentials({ ...signUpCredentials, contra: e.target.value })}
                        type="password"
                        placeholder="Contraseña"
                    />
                </section>

                <section className="terms-and-conditions">
                    <Checkbox onChange={e => setSignUpCredentials({ ...signUpCredentials, terminos: e.target.checked })} checked={signUpCredentials.terminos} className="input-checkbox" /> <p>Aceptar Términos y Condiciones</p>
                </section>

                <section className="btn-container">
                    <Button onClick={ValidateCredentials} type="primary"> Registrarse </Button>
                </section>

                <section  className="final-options">
                    <p>¿Ya tienes tu cuenta? <a onClick={() => props.history.push('signin')}>Inicia sesión</a> </p>
                </section>

            </form>
        </div>
    )
}

export default withRouter(Registro);

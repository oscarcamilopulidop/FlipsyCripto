import React, { useState, useContext } from 'react';
import regis from '../Assets/icon.png';
import ConfirmCode from '../componentes/CodConf'
import '../Styles/Signup2.css'
import { Auth } from 'aws-amplify'
import { Button, Input, Checkbox, DatePicker } from 'antd'
import Context from '../GlobalState/context'
import { withRouter } from 'react-router-dom'
import Swal from 'sweetalert2'



const SignUp = props => {
    const { state, actions } = useContext(Context);
    const [signUpCredentials, setSignUpCredentials] = useState({
        correo: '',
        usuario: '',
        apellido: '',
        nickname: '',
        contra: '',
        fechaNacimiento: '',
        genero: '',
        notificaciones: false,
        terminos: false
    });

    const ValidateCredentials = () => {
        signUpCredentials.terminos
            ? handleSubmit()
            : alert("Debes aceptar los términos y condiciones")
    };

    const handleSubmit = async () => {
        const { correo, usuario, contra,nickname,apellido,fechaNacimiento,notificaciones,genero } = signUpCredentials
        try {
            let newUser = await Auth.signUp({
                username: correo,
                password: contra,
                nick: nickname,
                name: usuario,
                lastName: apellido,
                birthDate: fechaNacimiento,
                gender: genero,
                emailNotification: notificaciones,
                attributes: {
                    email: correo
                }
            })
                .then(() => {
                    actions({
                        type: "setState",
                        payload: {
                            user_credentials: {
                                email: correo
                            }
                        }
                    })
                    props.history.push('confirm-code')
                })

        } catch (error) {
            Swal.fire({
                type: 'error',
                title: 'Error',
                text: `
                    La Contraseña debe contener 8 caracteres, mayúscula y minúscula y al menos un número
                `,
                footer: '<i> Inténtalo de nuevo :D </i>'
            })
        }
    };

    function onChange(date, dateString) {
        console.log(date, dateString);
    }

    return (
        <div className="Registro2">

            <form className="formRegis2" onSubmit={handleSubmit}>

                <section className="inputs-container2">
                    <Input
                        className="signup-input2"
                        onChange={e => setSignUpCredentials({ ...signUpCredentials, correo: e.target.value })}
                        placeholder="Correo Electrónico"
                    />

                    <Input
                        className="signup-input2"
                        onChange={e => setSignUpCredentials({ ...signUpCredentials, usuario: e.target.value })}
                        placeholder="Nombre de Usuario"
                    />

                    <Input
                        className="signup-input2"
                        onChange={e => setSignUpCredentials({ ...signUpCredentials, apellido: e.target.value })}
                        placeholder="Apellido de Usuario"
                    />

                    <Input
                        className="signup-input2"
                        onChange={e => setSignUpCredentials({ ...signUpCredentials, nickname: e.target.value })}
                        placeholder="Nickname"
                    />

                    <DatePicker
                        className="signup-datepicker2"
                        onChange={e => setSignUpCredentials({...signUpCredentials, fechaNacimiento: e.target.value})}
                        placeholder="Fecha de Nacimiento"
                    />

                    <Input
                        className="signup-input2"
                        onChange={e => setSignUpCredentials({ ...signUpCredentials, contra: e.target.value })}
                        type="password"
                        placeholder="Contraseña"
                    />

                    <div className="signup-gender2">
                        <Checkbox /><p>Maculino</p>
                        <Checkbox /><p>Femenino</p>
                    </div>

                    <div className="signup-notification2">
                        <Checkbox /><p>Desea que le enviemos<br/> notificaciones</p>
                    </div>

                </section>

                <section className="terms-and-conditions2">
                    <Checkbox onChange={e => setSignUpCredentials({ ...signUpCredentials, terminos: e.target.checked })} checked={signUpCredentials.terminos} className="input-checkbox2" /> <p>Aceptar Términos y Condiciones</p>
                </section>

                <section className="btn-container2">
                    <Button onClick={ValidateCredentials} type="primary"> Registrarse </Button>
                </section>

                <section  className="final-options2">
                    <p>¿Ya tienes tu código? <a href="#">Ingrésalo aquí</a> </p>
                    <p>¿Ya tienes tu cuenta? <a onClick={() => props.history.push('signin')}>Inicia sesión</a> </p>
                </section>

            </form>
        </div>
    )
};

export default withRouter(SignUp);

import React, {useContext, useState} from 'react'
import { Input, Button } from 'antd'
import '../Styles/Verification.css'
import { Auth } from 'aws-amplify';
import Swal from "sweetalert2";
import Context from '../GlobalState/context';

const Verification = props => {

    const [verificationCredentials, setVerificationCredentials] = useState({ email: "" });
    const { state, actions } = useContext(Context);

    const Verification = async() => {
        const { email } = verificationCredentials;
        try{
            await Auth.forgotPassword(email)
                .then(
                    actions({
                        type: "setState",
                        payload: {
                            ...state, forgotten_email:
                                { ...state.forgotten_email,
                                    email: verificationCredentials.email,
                                }
                        }
                    })
                )

            Swal.fire({
                type: 'success',
                title: 'Código enviado',
                showConfirmButton: false,
                timer: 1500
            });
            props.history.push('confirm')
        }catch (err) {
            Swal.fire({
                type: 'error',
                title: 'Error',
                text:
                    "Debes ingresar un correo electrónico"
                ,
                footer: '<i> Inténtalo de nuevo :D </i>'
            });
        }

    };

    return (
        <div className='verification-main-container'>
            <div className="img-logo-container">
                <img className="img-logo" src={require('../Assets/LogoVerification.PNG')} alt="" />
            </div>

            <div className="verification-txt-container">
                <h3 className="text-code">Ingresa tu correo electrónico para enviarte el código de verificación</h3>
            </div>

            <section className="form-container">
                <Input className="input" placeholder="Correo Electrónico" onChange={(e) => setVerificationCredentials({ ...verificationCredentials, email: e.target.value })} />
            </section>

            <section className="verification-btn-container">
                <Button type="primary" onClick={Verification}> Enviar </Button>
            </section>

        </div>
    )
};

export default Verification
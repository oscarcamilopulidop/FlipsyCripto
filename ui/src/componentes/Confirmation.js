import React, {useContext, useState} from 'react'
import { Input, Button } from 'antd'
import '../Styles/Confirmation.css'
import { Auth } from 'aws-amplify';
import Swal from "sweetalert2";
import Context from '../GlobalState/context';

const Confirmation = props => {

    const [confirmCredentials, setConfirmCredentials] = useState({ code : "",newPassword: "", password: "" });
    const { state } = useContext(Context);

    const submitPass = async() =>{
        try {
            await Auth.forgotPasswordSubmit(state.forgotten_email.email, confirmCredentials.code, confirmCredentials.newPassword)
                .then(data => console.log(data));

            Swal.fire({
                type: 'success',
                title: "Contraseña cambiada",
                showConfirmButton: false,
                timer: 1500
            });
            props.history.push('signin')

        }catch (e) {
            Swal.fire({
                type: 'error',
                title: 'Error',
                text:
                    "Código inválido"
                ,
                footer: '<i> Inténtalo de nuevo :D </i>'
            })
        }
    };

    const Confirm = () => {
        confirmCredentials.newPassword == confirmCredentials.password ?
            submitPass()
            :   Swal.fire({
                type: 'error',
                title: 'Error',
                text:
                    "La contaseña no coincide"
                ,
                footer: '<i> Inténtalo de nuevo :D </i>'
            });
    };

    return (
        <div className='confirm-main-container'>
            <div className="img-logo-container">
                <img className="img-logo" src={require('../Assets/LogoConfirmation.PNG')} alt="Succes-Icon" />
                <img className="yes-logo" src={require('../Assets/YesIcon.svg')} alt="Succes-Icon" />
            </div>

            <section className="form-container">

                <Input className="input" placeholder="Código de Verificación" onChange={(e) => setConfirmCredentials({ ...confirmCredentials, code: e.target.value })}/>

                <Input className="input" placeholder="Nueva contraseña" onChange={(e) => setConfirmCredentials({ ...confirmCredentials, newPassword: e.target.value })} type="password"/>

                <Input className="input" placeholder="Confirmar contraseña" onChange={(e) => setConfirmCredentials({ ...confirmCredentials, password: e.target.value })} type="password" />

            </section>

            <section className="confirm-btn-container">
                <Button type="primary" onClick={Confirm}> Guardar cambios </Button>
            </section>

        </div>
    )
};

export default Confirmation
import React, { useState, useContext } from 'react';
import regis from '../Assets/icon.png';
import ConfirmCode from '../componentes/CodConf'
import '../Styles/Signup2.css'
import { Auth } from 'aws-amplify'
import { Button, Input, Checkbox, DatePicker } from 'antd'
import Context from '../GlobalState/context'
import { withRouter } from 'react-router-dom'
import Swal from 'sweetalert2'



const WizardNickname = props => {
    const { state, actions } = useContext(Context);
    const [wizardName, setWizardName] = useState({
        first_name: '',
        last_name: '',
    });

    const UpdateName = () => {
        const { first_name, last_name } = state.user_credentials
        actions({
            type: "setState",
            payload: { ...state, user_credentials: { ...state.user_credentials, first_name: wizardName.first_name, last_name: wizardName.last_name } }
        })
        console.log(state.user_credentials);
        console.log(wizardName.first_name);
    }

    return (
        <div className="Registro2">

            <form className="formRegis2">

                <section className="inputs-container2">

                    <section  className="wizard-description">
                        <p>Antes de continuar, solo queremos que completes un par de campos adicionales para mejorar tu experiencia </p>
                    </section>

                    <Input
                        className="signup-input2"
                        onChange={e => setWizardName({ ...wizardName, first_name: e.target.value })}
                        placeholder="Nombre de Usuario"
                        onClick={() => console.log(state.user_credentials)}
                    />

                    <Input
                        className="signup-input2"
                        onChange={e => setWizardName({ ...wizardName, last_name: e.target.value })}
                        placeholder="Apellido de Usuario"
                        onClick={UpdateName}
                    />


                </section>

                <section className="btn-container2">
                    <Button onClick={() => props.history.push('wizard-personal-info')} type="primary"> Siguiente </Button>
                </section>



            </form>
        </div>
    )
};

export default withRouter(WizardNickname);

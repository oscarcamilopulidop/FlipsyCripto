import React, { useState, useContext } from 'react';
import '../Styles/Wizard2.css'
import { Button, Input} from 'antd'
import Context from '../GlobalState/context'
import { withRouter } from 'react-router-dom'



const WizardNickname = props => {
    const { state, actions } = useContext(Context);
    const [wizardName, setWizardName] = useState({
        first_name: '',
        last_name: '',
    });

    const UpdateName = () => {
        actions({
            type: "setState",
            payload: { ...state, user_credentials: { ...state.user_credentials, first_name: wizardName.first_name, last_name: wizardName.last_name } }
        });
        console.log(state.user_credentials);
        console.log(wizardName.first_name);
        props.history.push('wizard-personal-info')
    };

    return (
        <div className="wizard2">

            <form className="formRegis2">

                <section className="inputs-container2">

                    <section  className="wizard-description">
                        <p>Antes de continuar, solo queremos que completes un par de campos adicionales para mejorar tu experiencia </p>
                    </section>

                    <Input
                        className="wizard-input2"
                        onChange={e => setWizardName({ ...wizardName, first_name: e.target.value })}
                        placeholder="Nombre de Usuario"
                        onClick={() => console.log(state.user_credentials)}
                    />

                    <Input
                        className="wizard-input2"
                        onChange={e => setWizardName({ ...wizardName, last_name: e.target.value })}
                        placeholder="Apellido de Usuario"
                    />

                </section>

                <section className="btn-container2">
                    <Button onClick={UpdateName } type="primary"> Siguiente </Button>
                </section>

            </form>
        </div>
    )
};

export default withRouter(WizardNickname);

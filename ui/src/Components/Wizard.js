import React, { useState, useEffect, useContext } from 'react'
import { Button, Input } from 'antd'
import Context from '../GlobalState/context'
import '../Styles/Wizard.css'

const Wizard = () => {
    const { state, actions } = useContext(Context);
    const [nickname, setNickname] = useState("");
    useEffect(() => {
        setNickname(state.user_credentials.nickname || "")
    }, []);

    const UpdateNickname = () => {
        const { nickname} = state.user_credentials;
        actions({
            type: "setState",
            payload: { ...state, user_credentials: { ...state.user_credentials, nickname: nickname } }
        });
        console.log(state.user_credentials);
    };

    return (
        <div className='main-wizard-container'>
            <p> Nombre de usuario </p>
            <Input className="wizard-input" size="large" value={nickname} onChange={e => setNickname(e.target.value)} />
            <i>Recuerda que usarás este nombre para identificarte como usuario en Flipsy</i>

            <Button onClick={UpdateNickname} type="primary" className="wizard-btn">
                Aceptar
            </Button>
        </div>
    )
};

export default Wizard

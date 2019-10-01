import React, { useState, useEffect, useContext } from 'react'
import { Input, Button } from 'antd'
import '../Styles/Confirmation.css'

const Confirmation = () => {

    const [confirmCredentials, setConfirmCredentials] = useState({ newPassword: "", password: "" })

    const Confirm = () => {
        alert("Contraseña cambiada.")
    }

    return (
        <div className='confirm-main-container'>
            <div className="img-logo-container">
                <img className="img-logo" src={require('../Assets/LogoConfirmation.PNG')} alt="" />
            </div>

            <section className="form-container">
                <Input className="input" placeholder="Contraseña" onChange={(e) => setConfirmCredentials({ ...confirmCredentials, newPassword: e.target.value })} type="password"/>

                <Input className="input" placeholder="Confirmar contraseña" onChange={(e) => setConfirmCredentials({ ...confirmCredentials, password: e.target.value })} type="password" />

            </section>

            <section className="confirm-btn-container">
                <Button type="primary" onClick={Confirm}> Guardar cambios </Button>
            </section>
            
        </div>
    )
}

export default Confirmation
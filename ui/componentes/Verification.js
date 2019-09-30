import React, { useState, useEffect, useContext } from 'react'
import { Input, Button } from 'antd'
import '../Styles/Verification.css'

const Verification = () => {

    const [verificationCredentials, setVerificationCredentials] = useState({ email: "" })

    const Verification = () => {
        alert("Link enviado.")
    }

    return (
        <div className='verification-main-container'>
            <div className="img-logo-container">
                <img className="img-logo" src={require('../Assets/LogoVerification.PNG')} alt="" />
            </div>

            <div className="verification-txt-container">
                <h3>Ingresa tu correo electrónico para enviarte el link de verificación</h3>
            </div>

            <section className="form-container">
                <Input className="input" placeholder="Correo Electrónico" onChange={(e) => setVerificationCredentials({ ...verificationCredentials, email: e.target.value })} />
            </section>

            <section className="verification-btn-container">
                <Button type="primary" onClick={Verification}> Enviar </Button>
            </section>

        </div>
    )
}

export default Verification
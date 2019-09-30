import React, { useState, useEffect, useContext } from 'react'
import '../Styles/CodConfirmation.css'
import { Input, Button } from 'antd'
import InputMask from 'react-input-mask';
import Swal from 'sweetalert2'
import { Auth } from 'aws-amplify'
import { withRouter } from 'react-router-dom'
import Context from '../GlobalState/context';



const CodConfirmation = props => {

    const [code, setCode] = useState("")
    const { state, actions } = useContext(Context)

    const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000
    })

    const ValidateCode = () => {
        code.replace(/ /g, "").length === 6
            ? ConfirmCode()
            : Toast.fire({
                type: 'error',
                title: 'El código debe contener 6 dígitos'
            })
    }

    const ConfirmCode = () => {
        Auth.confirmSignUp(state.user_credentials.email, code.replace(/ /g, ""))
            .then(data => props.history.push('home'))
            .catch(error => {
                Toast.fire({
                    type: 'error',
                    title: 'El código es incorrecto'
                })
            })
    }

    return (
        <div className='codconf-container'>
            <section className="code-animation-container">
                <h2 onClick={() => console.log(state.user_credentials)} className="code-title">Inserta el código</h2>
                <InputMask value={code} onChange={e => setCode(e.target.value)} className="code-input" mask="9 9 9 9 9 9" maskChar="" />
                <Button className="code-btn" onClick={ValidateCode} type="primary"> Aceptar </Button>
            </section>
        </div>
    )
}

export default withRouter(CodConfirmation)
import React, { useState, useEffect, useContext } from 'react'
import { Button, Input } from 'antd'
import Context from '../GlobalState/context'
import '../Styles/Wizard.css'
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost';
import { withRouter } from 'react-router-dom'


const Wizard = props => {
    const { state, actions } = useContext(Context)
    const [nickname, setNickname] = useState("")
    // const [CreateUserInNeo4j, { data }] = useMutation(gql`
    //     mutation Create($id: ID!, $nickname: String!, $email: String!){
    //         CreateUSER(idUser: $id, nickname: $nickname, email: $email){
    //             idUser nickname email
    //         }
    //     }
    // `)

    useEffect(() => {
        setNickname(state.user_credentials.nickname || "")
    }, [])

    const UpdateNickname = () => {
        const { nickname, email } = state.user_credentials
        actions({
            type: "setState",
            payload: { ...state, user_credentials: { ...state.user_credentials, nickname: nickname } }
        })
        console.log(state.user_credentials);
        // try {
        //     CreateUserInNeo4j({
        //         variables: {
        //             id: (Math.random() * 1000000).toString(),
        //             nickname: nickname,
        //             email: email
        //         }
        //     }).then(res => {
        //         console.log(res.data)
        //         props.history.push('')
        //     })
        // } catch (error) { console.log("error => ", error) }
    }

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
}

export default Wizard
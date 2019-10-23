import React, { useState, useContext } from 'react';
import '../Styles/Wizard2.css'
import {Button, Input, Checkbox, DatePicker, Select} from 'antd'
import Context from '../GlobalState/context'
import { withRouter } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost';



const WizardPersonalInfo = props => {
    const { state, actions } = useContext(Context);

    const { Option } = Select;

    const [wizardPersonalInfo, setWizardPersonalInfo] = useState({
        date: '',
        gender: '',
        notifications: 0,
    });

    const [CreateUserInNeo4j, { data }] = useMutation(gql`
        mutation Create($id: ID!, $nickname: String!,
            $email: String!, $lastname: String!, $firstname: String!,
            $birthDate: String!, $gender: String!, $emailNotifications: Boolean!
        ){
            CreateUSER(idUser: $id, nickname: $nickname, email: $email,
            lastName: $lastname, name: $firstname, birthDate: $birthDate,
                gender: $gender, emailNotifications: $emailNotifications
            ){
                idUser nickname email lastName name birthDate gender emailNotifications
            }
        }
    `);

    const UpdateInfo = () => {
        const { date, gender, notifications } = state.user_credentials
        actions({
            type: "setState",
            payload: {
                ...state, user_credentials:
                    { ...state.user_credentials,
                        date: wizardPersonalInfo.date,
                        gender: wizardPersonalInfo.gender,
                        notifications: wizardPersonalInfo.notifications} }
        })
        console.log(state.user_credentials);
        try {
            CreateUserInNeo4j({
                variables: {
                    id: state.user_credentials.id,
                    nickname: state.user_credentials.nickname,
                    email: state.user_credentials.email,
                    lastname: state.user_credentials.last_name,
                    firstname: state.user_credentials.first_name,
                    birthDate: state.user_credentials.date,
                    gender: state.user_credentials.gender,
                    emailNotifications: state.user_credentials.notifications
                }
            }).then(res => {
                console.log(res.data)
                props.history.push('')
            })
        } catch (error) { console.log("error => ", error) }
    }


    function onChange(date, dateString) {
        console.log(date, dateString);
    }

    return (
        <div className="wizard2">

            <form className="formRegis2" >

                <section className="inputs-container2">

                    <DatePicker
                        className="wizard-datepicker2"
                        onChange={e => setWizardPersonalInfo({...wizardPersonalInfo, date: e.unix().toString()})}
                        // onChange={e => console.log(typeof (e.unix().toString()))}
                        placeholder="Fecha de Nacimiento"
                    />

                    <p>Sexo</p>
                    <div className="wizard-gender2">

                        <Select placeholder="Seleccionar"
                                className="wizard-datepicker2"
                                onChange={e => setWizardPersonalInfo({...wizardPersonalInfo, gender: e})}
                            // onChange={e => console.log(e)}
                        >
                            <Option value="Male">Masculino</Option>
                            <Option value="Female">Femenino</Option>
                        </Select>
                    </div>

                    <div className="wizard-notification2">
                        <Checkbox
                            onChange={e => setWizardPersonalInfo({...wizardPersonalInfo, notifications: e.target.checked})}
                        />
                        <p >Desea que le enviemos<br/> notificaciones</p>
                    </div>

                </section>

                <section className="btn-container2">
                    <Button onClick={() => props.history.push('wizard-name')} type="primary"> Anterior </Button>
                    <Button onClick={UpdateInfo} type="primary"> Siguiente </Button>
                </section>

            </form>
        </div>
    )
};

export default withRouter(WizardPersonalInfo);

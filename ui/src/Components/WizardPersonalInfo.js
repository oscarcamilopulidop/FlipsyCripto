import React, { useState, useContext } from 'react';
import '../Styles/Wizard2.css'
import {Button, Checkbox, DatePicker, Select} from 'antd'
import Context from '../GlobalState/context'
import { withRouter } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost';



const WizardPersonalInfo = props => {
    const { state } = useContext(Context);
    const [CreateUserInNeo4j] = useMutation(gql`
        mutation Create($idUser: ID!, $nickname: String!, $name: String!, $lastName: String!,
            $birthDate: String!, $email: String!, $gender: String!, $emailNotifications: Boolean!
        ){
            CreateUSER(idUser: $idUser, nickname: $nickname, name: $name, lastName: $lastName,
                birthDate: $birthDate, email: $email, gender: $gender, emailNotifications: $emailNotifications
            ){
                idUser nickname email name lastName birthDate gender emailNotifications
            }
        }
    `);

    const { Option } = Select;

    const [wizardPersonalInfo, setWizardPersonalInfo] = useState({
        date: '',
        gender: '',
        notifications: false,
    });



    const UpdateInfo = () => {
        console.log(state.user_credentials);
        try {
            CreateUserInNeo4j({
                variables: {
                    idUser: state.user_credentials.id,
                    nickname: state.user_credentials.nickname,
                    email: state.user_credentials.email,
                    lastName: state.user_credentials.last_name,
                    name: state.user_credentials.first_name,
                    birthDate: wizardPersonalInfo.date,
                    gender: wizardPersonalInfo.gender,
                    emailNotifications: wizardPersonalInfo.notifications
                }
            }).then(res => {
                console.log(res.data);
                props.history.push('home')
            })
        } catch (error) { console.log("error => ", error) }
    };

    return (
        <div className="wizard2">

            <form className="formRegis2" >

                <section className="inputs-container2">

                    <DatePicker
                        className="wizard-datepicker2"
                        onChange={e => setWizardPersonalInfo({...wizardPersonalInfo, date: e.unix().toString()})}
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

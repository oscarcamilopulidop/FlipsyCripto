import React, { useState, useContext, useEffect } from 'react'
import 'antd/dist/antd.css';
import { Layout, Button, Form,Select, Input, AutoComplete, Icon} from 'antd';
import Context from '../GlobalState/context'
import { withRouter } from 'react-router-dom'
import '../Styles/DeckCreation.css'
import Menu from "./Menu";
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost';
import { Auth } from 'aws-amplify'
import moment from "moment";
import { Badge} from 'antd';

const { Header, Footer, Content } = Layout;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

const types = [
    {value: 'privada', label: 'privada'},
    {value: 'publica', label: 'publica'}
];

const DeckCreation = props => {
    useEffect(() => {
        Auth.currentAuthenticatedUser().then(res => {
            actions({
                type: 'setState',
                payload: {...state, in_session_data: {...state.in_session_data, uid: res.attributes.sub}}
            })
            console.log(res.attributes.sub)
        }).catch(err => {
            props.history.push('');
        })
    }, [])

  const { state, actions } = useContext(Context);

    var currtenDate = moment().unix();
    const [deck_data, set_deck_data] = useState({
      idFcg: (Math.random() * 1000000).toString(),
      idUser: state.in_session_data.uid,
      idCat: "",
      idScat: "",
      title: "",
      public_: true,
      isStudying: true,
      lastModifyDate: moment().unix().toString(),
      creationDate: moment().unix().toString(),
    });
    const dataSource = ['Matematicas', 'Quimica', 'Fisica', 'Biologia'];

    const { Option } = Select;

    const [selected, setSelected] = useState({ page: "Home"});

    const [CreateDeckInNeo4j, { data }] = useMutation(gql`
        mutation Create(
            $idFcg: ID,
            $idUser: String!,
            $idCat: String!,
            $idScat: String!,
            $title: String!,
            $public_: Boolean!,
            $isStudying: Boolean!,
            $lastModifyDate: String!,
            $creationDate: String!,
            $remainingNotifications: Int
        ){
            CreateFCGroup(
                idFcg: $idFcg,
                idUser: $idUser,
                idCat: $idCat,
                idScat: $idScat,
                title: $title,
                public: $public_,
                isStudying: $isStudying,
                lastModifyDate: $lastModifyDate,
                creationDate: $creationDate,
                remainingNotifications: $remainingNotifications,
            ){
                idFcg, idUser, idCat, idScat, title, public, isStudying, lastModifyDate, creationDate, remainingNotifications
            }
        }
    `);

    function onSelect(value) {
        console.log('onSelect', value);
    }

    const show = () => {
        const uid = state.in_session_data.uid
        console.log(uid)
        console.log(state.user_credentials);
        console.log(deck_data)
    };

    const UpdateInfo = () => {
        const uid = state.in_session_data.uid
        console.log(uid)
        try {
            CreateDeckInNeo4j({
                variables: {
                    idFcg: deck_data.idFcg,
                    idUser: deck_data.idUser,
                    idCat: deck_data.idCat,
                    idScat: deck_data.idCat,
                    title: deck_data.title,
                    public_: deck_data.public_,
                    isStudying: deck_data.public_,
                    lastModifyDate: deck_data.lastModifyDate,
                    creationDate: deck_data.creationDate,
                    remainingNotifications: 3,
                }
            }).then(res => {
                console.log(res.data)
                props.history.push('decks')
            })
        } catch (error) { console.log("error => ", error) }

    }

    var flag = false;
    const ShowSideMenu = () => {

        var element = document.getElementById('menu');
        if(flag){
            element.style.transform = 'translate(60vw)';
        }else{
            element.style.transform = 'translate(-60vw)';
        }
        element.style.zIndex = '25';
        element.style.transition = 'transform 500ms';
        flag = !flag;
    }

    return (
        <div className="deck-creation">
            <Layout>
                <Header className = "header">
                    <img className = "logo" src={require("../Assets/FlipsyBlanco.svg")} alt="Notificaciones" onClick={() => props.history.push('home')}/>
                    <img className = "notifications" src={require("../Assets/menu-button.svg")} alt="Notificaciones" onClick={ShowSideMenu}/>
                </Header>
                <div className="home-menu-collapse" id="menu">
                    <Menu/>
                </div>
                <Content className="content">
                    <div className="center">
                        <div className="desk-creation-title">
                            <h1>Crear Baraja</h1>
                        </div>
                        <div className="desk-creation-button">
                            <Button size="large" type="primary" shape="round" icon="plus-circle-o">
                                Foto opcional
                            </Button>
                        </div>
                    </div>

                    <div className="desk-creation-form">
                        <Form {...formItemLayout} >
                            <Form.Item label="Nombre">
                                <Input
                                    className="name-input"
                                    onChange={e => set_deck_data({ ...deck_data, title: e.target.value})}
                                    placeholder="Nombre"
                                    onClick={show}
                                />
                            </Form.Item>
                            <Form.Item label="Tipo">
                                <Select placeholder="Seleccionar tipo"
                                        onChange={e => set_deck_data({ ...deck_data, public_: (e === "publica")})}
                                >
                                    <Option value="publica">Publica</Option>
                                    <Option value="privada">Privada</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="Categoria" >
                                <AutoComplete
                                    className="category-input"
                                    placeholder="Buscar categoría"
                                    onChange={e => set_deck_data({ ...deck_data, idCat: e, idScat: e})}
                                    onSelect={onSelect}
                                    dataSource={dataSource}
                                >
                                    <Input
                                        suffix={
                                            <Button
                                                className="search-btn"
                                                style={{ marginRight: -12 }}
                                                type="primary"
                                            >
                                                <Icon type="search" />
                                            </Button>
                                        }
                                    />
                                </AutoComplete>
                            </Form.Item>
                        </Form>
                        <div className="deck-creation-button-final">
                            <Button size="large" type="primary" onClick={UpdateInfo}>
                                Crear
                            </Button>
                        </div>
                    </div>

                </Content>

                <Footer className="footer">
                    <img className = "footer-item" src={require("../Assets/home.svg")} alt="Home" onClick={() => props.history.push('home')}/>
                    <img className = "footer-item-selected" src={require("../Assets/cards-selected.svg")} alt="Flashcards" onClick={() => props.history.push('decks')}/>
                    <img className = "footer-item" src={require("../Assets/search.svg")} alt="Search" onClick={() => props.history.push('search')}/>
                    <img className = "footer-item" src={require("../Assets/profile.svg")} alt="Profile" onClick={() => props.history.push('')}/>
                    <Badge count={5}> <img className = "footer-item" src={require("../Assets/Notification.svg")} alt="Notificaciones" onClick={() => props.history.push('questionnaires-list')}/> </Badge>
                </Footer>
            </Layout>
        </div>

    )
}

export default withRouter(DeckCreation)

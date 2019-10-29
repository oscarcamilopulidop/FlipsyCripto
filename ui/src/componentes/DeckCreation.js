import React, { useState, useEffect, useContext } from 'react'
import 'antd/dist/antd.css';
import { Layout, Button, Form,Select, Tag, Input, AutoComplete, Icon} from 'antd';
import Context from '../GlobalState/context'
import { withRouter } from 'react-router-dom'
import '../Styles/DeckCreation.css'
import Menu from "./Menu";
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost';
import moment from "moment";

const { Search } = Input;
const { Header, Footer, Sider, Content } = Layout;

function log(e) {
    console.log(e);
}


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

    const { state, actions } = useContext(Context);

    // eslint-disable-next-line no-undef
    var currtenDate = moment().unix();
    const [deck, setDeck] = useState(  {
        id: (Math.random() * 1000000).toString(),
        name: '',
        typeDeck: 0,
        categoryDeck: '',
        dateDeck: currtenDate,
    });
    const dataSource = ['Matematicas', 'Quimica', 'Fisica', 'Biologia'];

    const { Option } = Select;

    const [selected, setSelected] = useState({ page: "Home"});


    const [temp, { data_ }] = useMutation(gql`
        mutation Create($idUser: ID!, $idFcg: ID!){
            AddUSEROwns(from:{
                idUser:$idUser
            },to:{
                idFcg:$idFcg
            }){from{idUser}}
        }
    `)

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
            ){
                idFcg, idUser, idCat, idScat, title, public, isStudying, lastModifyDate, creationDate,
            }
        }
    `);



    function onSelect(value) {
        console.log('onSelect', value);
    }
    const show = () => {
        const {idUser, id, name, typeDeck, categoryDeck, dateDeck } = deck;
        actions({
            type: "setState",
            payload: {
                ...state, user_credentials:
                    { ...state.user_credentials} }
        })
        console.log(state.user_credentials);
        actions({
            type: "setState",
            payload: {
                ...state, deck:
                    { ...state.deck,
                        idUser: state.user_credentials.id,
                        idFcg: deck.id,
                        title: deck.name,
                        public_: deck.typeDeck,
                        idCat: deck.categoryDeck,
                        creationDate: deck.dateDeck.toString(),
                        lastModifiedDate: deck.dateDeck.toString()
                    }
            }
        })
        // console.log(deck);
        console.log(state.deck)
    };
    const UpdateInfo = () => {
        const {idUser, id, name, typeDeck, categoryDeck, dateDeck } = deck;
        actions({
            type: "setState",
            payload: {
                ...state, deck:
                    { ...state.deck,
                        idUser: state.user_credentials.id,
                        idFcg: deck.id,
                        title: deck.name,
                        public_: deck.typeDeck,
                        idCat: deck.categoryDeck,
                        creationDate: deck.dateDeck.toString(),
                        lastModifiedDate: deck.dateDeck.toString()
                    }
            }
        })
        console.log(state.user_credentials);
        try {
            CreateDeckInNeo4j({
                variables: {
                    idFcg: state.deck.idFcg,
                    idUser: state.deck.idUser,
                    idCat: state.deck.idCat,
                    idScat: state.deck.idCat,
                    title: state.deck.title,
                    public_: state.deck.public_,
                    isStudying: true,
                    lastModifyDate: state.deck.lastModifiedDate.toString(),
                    creationDate: state.deck.creationDate.toString(),
                }
            }).then(res => {
                console.log(res.data)
                // props.history.push('decks')
            })
        } catch (error) { console.log("error => ", error) }
        try {
            temp({
                variables: {
                    idUser: state.deck.idUser,
                    idFcg: state.deck.idFcg
                }
            }).then((res => {
                props.history.push('decks');
            }))
        }catch (e) {
            console.log(e);

        }
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
                                    onChange={e => setDeck({ ...deck, name: e.target.value})}
                                    placeholder="Nombre"
                                    onClick={show}
                                />
                            </Form.Item>
                            <Form.Item label="Tipo">
                                <Select placeholder="Seleccionar tipo"
                                        onChange={e => setDeck({ ...deck, typeDeck: (e === "publica")})}
                                >
                                    <Option value="publica">Publica</Option>
                                    <Option value="privada">Privada</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="Categoria" >
                                <AutoComplete
                                    className="category-input"
                                    placeholder="Buscar categoría"
                                    onChange={e => setDeck({ ...deck, categoryDeck: e})}
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
                    <img className = "footer-item" src={require("../Assets/Notification.svg")} alt="Notificaciones" onClick={() => props.history.push('')}/>
                </Footer>
            </Layout>
        </div>

    )
}

export default withRouter(DeckCreation)
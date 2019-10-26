import React, { useState, useEffect, useContext } from 'react'
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Layout, Button, Form,Select, Tag, Input, AutoComplete, Icon} from 'antd';
import Context from '../GlobalState/context'
import { withRouter } from 'react-router-dom'
import '../Styles/DeckCreation.css'
import CardContent from "@material-ui/core/CardContent";
import Menu from "./Menu";

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

    const [deck, setDeck] = useState(  {
        name: '',
        typeDeck: '',
        categoryDeck: '',
    });
    const dataSource = ['Matematicas', 'Quimica', 'Fisica', 'Biologia'];

    const { Option } = Select;

    const [selected, setSelected] = useState({ page: "Home"});



    function onSelect(value) {
        console.log('onSelect', value);
    }
    const show = () => {
        const {name, typeDeck, categoryDeck } = deck;
        actions({
            type: "setState",
            payload: {
                ...state, deck:
                    { ...state.deck,
                        name: deck.name,
                        typeDeck: deck.typeDeck,
                        categoryDeck: deck.categoryDeck
                    }
            }
        })
        // console.log(deck);
        console.log(state.deck)
    };

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
                                        onChange={e => setDeck({ ...deck, typeDeck: e})}
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
                                <Tag closable onClose={log}>
                                    Tag 2
                                </Tag>

                            </Form.Item>
                        </Form>
                        <div className="deck-creation-button-final">
                            <Button size="large" type="primary" onClick={() => props.history.push('decks')}>
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
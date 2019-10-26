import React from 'react'
import {Button, List, Card, Layout, Select} from 'antd'
import '../Styles/Decks.css'
import '../Styles/Home.css'
import Menu from "./Menu";


const { Header, Footer} = Layout;
const { Option } = Select;

const Decks = props => {

    const abrirBaraja = () => {
        props.history.push('cards-creation')
    }

    const handleChange = () => {
        console.log("mostrando barajas ")
    }

    const data = [
        {
            title: 'Matematicas I',
        },
        {
            title: 'Comida',
        },
        {
            title: 'Química',
        },
        {
            title: 'Física',
        },
        {
            title: 'Matematicas I',
        },
        {
            title: 'Comida',
        },
        {
            title: 'Química',
        },
        {
            title: 'Física',
        },
        {
            title: 'Matematicas I',
        },
        {
            title: 'Comida',
        },
        {
            title: 'Química',
        },
        {
            title: 'Física',
        },

    ];

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
        <div className='decks-main-container'>
            <Layout>

                <Header className = "header">
                    <img className = "logo" src={require("../Assets/FlipsyBlanco.svg")} alt="Notificaciones" onClick={() => props.history.push('home')}/>
                    <img className = "notifications" src={require("../Assets/menu-button.svg")} alt="Notificaciones" onClick={ShowSideMenu}/>
                </Header>
                <div className="home-menu-collapse" id="menu">
                    <Menu/>
                </div>
                <div className="decks-container">
                    <h1>Barajas</h1>
                    <div className="select-container">
                        <Select defaultValue="Propias" style={{ width: '60%'}} onChange={handleChange}>
                            <Option value="Propias">Propias</Option>
                            <Option value="Compartidas">Compartidas conmigo</Option>
                        </Select>
                    </div>

                    <Button onClick={() => props.history.push('deck-creation')} className="new-card" type="dashed" ghost>
                        Nueva
                        <br/>
                        Baraja
                        <br/>
                        +
                    </Button>
                    <List
                        grid={{ gutter: 10, column: 3 }}
                        dataSource={data}
                        renderItem={item => (
                            <List.Item>
                                <Card onClick={abrirBaraja} title=" "> <img className = "img-card" src={require("../Assets/logo-cartas.svg")} alt="logo-flipsy-cartas"/> {item.title}</Card>
                            </List.Item>
                        )}
                    />,
                </div>



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

export default Decks
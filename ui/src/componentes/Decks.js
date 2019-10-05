import React, { useState} from 'react'
import {Button, List, Card, Layout} from 'antd'
import '../Styles/Decks.css'
import '../Styles/Home.css'


const { Header, Footer} = Layout;

const Decks = () => {

    const abrirBaraja = () => {
        console.log("abriendo baraja")
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

    return (
        <div className='decks-main-container'>
            <Layout>

                <Header className = "header">
                    <img className = "logo" src={require("../Assets/FlipsyBlanco.svg")} alt="Notificaciones"/>
                    <img className = "notifications" src={require("../Assets/menu-button.svg")} alt="Notificaciones"/>
                </Header>

                <div className="decks-container">
                    <h1>Barajas</h1>
                    <Button className="new-card" type="dashed" ghost>
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
                    <img className = "footer-item" src={require("../Assets/home.svg")} alt="Home" onClick = ""/>
                    <img className = "footer-item" src={require("../Assets/friends.svg")} alt="Friends"/>
                    <img className = "footer-item-selected" src={require("../Assets/search-selected.svg")} alt="Search"/>
                    <img className = "footer-item" src={require("../Assets/profile.svg")} alt="Profile"/>
                    <img className = "footer-item" src={require("../Assets/Notification.svg")} alt="Notificaciones"/>
                </Footer>
            </Layout>
        </div>
    )
}

export default Decks
import React, { useState} from 'react'
import {Button, List, Card, Layout} from 'antd'
import '../Styles/FlashcardsCreation.css'
import '../Styles/Home.css'


const { Header, Footer} = Layout;

const FlascardsCreation = () => {

    const openCard = () => {
        console.log("preguntando")
    }

    const editDeck = () => {
        console.log("editando...")
    }

    const play = () => {
        console.log("jugando...")
    }


    const deck_title ='Matematicas I';

    const data = [
        {
            front: 'Si dividimos 1 entre 0 el resultado es...',
        },
        {
            front: '¿Cuanto es la cuarta parte de la tercera parte?',
        },
        {
            front: '1+1',
        },

    ];

    return (
        <div className='flashcards-main-container'>
            <Layout>

                <Header className = "header">
                    <img className = "logo" src={require("../Assets/FlipsyBlanco.svg")} alt="Notificaciones"/>
                    <img className = "notifications" src={require("../Assets/menu-button.svg")} alt="Notificaciones"/>
                </Header>

                <div className="flashcards-container">
                    <h1> <img onClick={editDeck} className = "edit-deck" src={require("../Assets/editDeck.svg")} alt="edit icon"/>
                        {deck_title}
                        <img onClick={play} className = "play-deck" src={require("../Assets/play.svg")} alt="play icon"/>
                    </h1>
                    <Button className="new-flashcard" type="dashed" ghost>
                        Nueva
                        <br/>
                        Tarjeta
                        <br/>
                        +
                    </Button>
                    <List
                        grid={{ gutter: 10, column: 3 }}
                        dataSource={data}
                        renderItem={item => (
                            <List.Item>
                                <Card onClick={openCard}>{item.front} <img className = "img-flashcard" src={require("../Assets/logo-cartas.svg")} alt="logo-flipsy-cartas"/> </Card>
                            </List.Item>
                        )}
                    />
                </div>



                <Footer className="footer">
                    <img className = "footer-item" src={require("../Assets/home.svg")} alt="Home" onClick = ""/>
                    <img className = "footer-item-selected" src={require("../Assets/cards-selected.svg")} alt="Flashcards"/>
                    <img className = "footer-item" src={require("../Assets/search.svg")} alt="Search"/>
                    <img className = "footer-item" src={require("../Assets/profile.svg")} alt="Profile"/>
                    <img className = "footer-item" src={require("../Assets/Notification.svg")} alt="Notificaciones"/>
                </Footer>
            </Layout>
        </div>
    )
}

export default FlascardsCreation
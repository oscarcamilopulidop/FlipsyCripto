import React, {useState} from 'react';
import CardContent from '@material-ui/core/CardContent';
import { Layout } from 'antd';
import Typography from '@material-ui/core/Typography';
import ReactCardFlip from 'react-card-flip';
import '../Styles/Home.css'
import '../Styles/StudyCards.css'
import { gql } from 'apollo-boost'
import { useMutation } from "@apollo/react-hooks";

import '../App.css';
const { Header, Footer, Sider, Content } = Layout;

const StudyCards = props => {
    const [isFlipped, setIsFlipped] = useState(false)

    const handleClick = (e) => {
        e.preventDefault();
        setIsFlipped(!isFlipped)
    }

        return (
            <Layout className="layout">
                <Header className = "header">
                    <img className = "logo" src={require("../Assets/FlipsyBlanco.svg")} alt="Notificaciones" onClick={() => props.history.push('home')}/>
                    <img className = "notifications" src={require("../Assets/menu-button.svg")} alt="Notificaciones" onClick={() => props.history.push('menu')}/>
                </Header>
                <body className="content" >
                    <div className="cards-list">
                        <img className="arrow" src={require("../Assets/prev-card.svg")} />
                        <div className="mini-card-content"> Texto de prueba del contenido de la primera tarjeta </div>
                        <div className="mini-card-content"> Texto super aleatorio que podria ir en la segunda mini tarjetita </div>
                        <div className="mini-card-content"> Parte frontal de la tercera tarjeta </div>
                        <div className="mini-card-content"> Parte frontal de la tarjeta, aquí puede ir una imagen u otras cosas... </div>
                        <img className="arrow" src={require("../Assets/next-card.svg")} />
                    </div>
                    <div className="flip-card">
                        <div className="card-content" >
                            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                                <CardContent className="fill" key="front" onClick={handleClick}>
                                    <img class="card-content" src="https://source.unsplash.com/random" alt="Front-imsge" height="100" width="100">
                                    </img>
                                    <Typography variant="h6" align="center" paragraph>
                                        Parte frontal de la tarjeta, aquí puede ir una imagen u otras cosas...
                                    </Typography>
                                </CardContent>
                                <CardContent className="fill" key="back" onClick={handleClick}>
                                    <Typography variant="h6" align="center" paragraph>
                                        Contenido de la tarjeta en la parte de atrás, aquí irán los datos y demás.
                                    </Typography>
                                </CardContent>
                            </ReactCardFlip>
                        </div>
                    </div>
                </body>

                <Footer className="footer">
                    <img className = "footer-item-selected" src={require("../Assets/home-selected.svg")} alt="Home" onClick = ""/>
                    <img className = "footer-item" src={require("../Assets/friends.svg")} alt="Friends" />
                    <img className = "footer-item" src={require("../Assets/search.svg")} alt="Search" onClick={() => props.history.push('search')}/>
                    <img className = "footer-item" src={require("../Assets/profile.svg")} alt="Profile"/>
                    <img className = "footer-item" src={require("../Assets/Notification.svg")} alt="Notificaciones"/>
                </Footer>
            </Layout>
        );
}
export default StudyCards
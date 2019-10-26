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
            <div className="cards-list-study">
                <img className="arrow-study" src={require("../Assets/prev-card.svg")} />
                <div className="mini-card-content-study"> Texto de prueba del contenido de la primera tarjeta </div>
                <div className="mini-card-content-study"> Texto super aleatorio que podria ir en la segunda mini tarjetita </div>
                <div className="mini-card-content-study"> Parte frontal de la tercera tarjeta </div>
                <div className="mini-card-content-study"> Parte frontal de la tarjeta, aquí puede ir una imagen u otras cosas... </div>
                <img className="arrow-study" src={require("../Assets/next-card.svg")} />
            </div>
            <div className="flip-card-study" onClick={handleClick}>
                <div className="card-content-study">
                    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                        <CardContent className="fill" key="front">
                            <img class="card-content" src="https://source.unsplash.com/random" alt="Front-imsge" height="100" width="100">
                            </img>
                            <Typography variant="h6" align="center" paragraph>
                                Parte frontal de la tarjeta, aquí puede ir una imagen u otras cosas...
                            </Typography>
                        </CardContent>
                        <CardContent className="fill" key="back">
                            <Typography variant="h6" align="center" paragraph>
                                Contenido de la tarjeta en la parte de atrás, aquí irán los datos y demás.
                            </Typography>
                        </CardContent>
                    </ReactCardFlip>
                </div>
            </div>
            </body>

            <Footer className="footer">
                <img className = "footer-item" src={require("../Assets/home.svg")} alt="Home" onClick={() => props.history.push('home')}/>
                <img className = "footer-item-selected" src={require("../Assets/cards-selected.svg")} alt="Flashcards" onClick={() => props.history.push('decks')}/>
                <img className = "footer-item" src={require("../Assets/search.svg")} alt="Search" onClick={() => props.history.push('search')}/>
                <img className = "footer-item" src={require("../Assets/profile.svg")} alt="Profile" onClick={() => props.history.push('')}/>
                <img className = "footer-item" src={require("../Assets/Notification.svg")} alt="Notificaciones" onClick={() => props.history.push('')}/>
            </Footer>
        </Layout>
    );
}
export default StudyCards
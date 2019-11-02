import React, {useContext, useEffect, useState} from 'react';
import CardContent from '@material-ui/core/CardContent';
import {Card, Layout} from 'antd';
import Typography from '@material-ui/core/Typography';
import ReactCardFlip from 'react-card-flip';
import '../Styles/Home.css'
import '../Styles/StudyCards.css'
import { gql } from 'apollo-boost'
import { useMutation } from "@apollo/react-hooks";

import '../App.css';
import Menu from "./Menu";
import {Auth} from "aws-amplify";
import Context from "../GlobalState/context";
const { Header, Footer, Sider, Content } = Layout;

const StudyCards = props => {

    const { state, actions } = useContext(Context);

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


    const [isFlipped, setIsFlipped] = useState(false)

    const handleClick = (e) => {
        e.preventDefault();
        setIsFlipped(!isFlipped)
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
        <Layout className="layout">
            <Header className = "header">
                <img className = "logo" src={require("../Assets/FlipsyBlanco.svg")} alt="Notificaciones" onClick={() => props.history.push('home')}/>
                <img className = "notifications" src={require("../Assets/menu-button.svg")} alt="Notificaciones" onClick={ShowSideMenu}/>
            </Header>
            <div className="home-menu-collapse" id="menu">
                <Menu/>
            </div>
            <body className="content" >
            <div className="cards-list-study">
                <img className="arrow-study" src={require("../Assets/prev-card.svg")} />
                <div className="mini-card-content-study">
                    <div> Texto de prueba del contenido de la primera tarjeta </div>
                    <span>
                        <img className = "img-flashcard-study" src={require("../Assets/logo-cartas.svg")} alt="logo-flipsy-cartas" height="15" width="15"/>
                    </span>
                </div>
                <div className="mini-card-content-study">
                    <div> Texto super aleatorio que podria ir en la segunda mini tarjetita </div>
                    <span>
                        <img className = "img-flashcard-study" src={require("../Assets/logo-cartas.svg")} alt="logo-flipsy-cartas" height="15" width="15"/>
                    </span>
                </div>
                <div className="mini-card-content-study">
                    <div> Parte frontal de la tercera tarjeta </div>
                    <span>
                        <img className = "img-flashcard-study" src={require("../Assets/logo-cartas.svg")} alt="logo-flipsy-cartas" height="15" width="15"/>
                    </span>
                </div>
                <div className="mini-card-content-study">
                    <div> Parte frontal de la tarjeta, aquí puede ir una imagen u otras cosas... </div>
                    <span>
                        <img className = "img-flashcard-study" src={require("../Assets/logo-cartas.svg")} alt="logo-flipsy-cartas" height="15" width="15"/>
                    </span>
                </div>
                <img className="arrow-study" src={require("../Assets/next-card.svg")} />
            </div>

            <div className="flip-card-study fill-study" onClick={handleClick}>
                <div className="card-content-study">
                    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                        <CardContent className="fill-study" key="front">
                            <center>
                                <img class="card-content" src="https://source.unsplash.com/random" alt="Front-imsge" height="100" width="100">
                                </img>
                            </center>
                            <Typography variant="h6" align="center" paragraph>
                                Paaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                            </Typography>

                        </CardContent>
                        <CardContent className="fill-study" key="back">
                            <Typography variant="h6" align="center" paragraph>
                                Con
                            </Typography>

                        </CardContent>
                    </ReactCardFlip>

                    <span>
                        <img className = "img-flashcard-study" src={require("../Assets/logo-cartas.svg")} alt="logo-flipsy-cartas" height="90" width="90"/>
                    </span>

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
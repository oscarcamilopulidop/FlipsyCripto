import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { Layout } from 'antd';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import ReactCardFlip from 'react-card-flip';
import '../Styles/Home.css'
import '../Styles/StudyCards.css'

import '../App.css';
const { Header, Footer, Sider, Content } = Layout;

class StudyCards extends React.Component {

    constructor() {
        super();
        this.state = {
            isFlipped: false
        };
        this.handleClick = this.handleClick.bind(this);
    }


    handleClick(e) {
        e.preventDefault();
        this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
    }
    render() {

        return (
            <Layout className="layout">
                <Header className = "header">
                    <img className = "logo" src={require("../Assets/FlipsyBlanco.svg")} alt="Notificaciones"/>
                    <img className = "notifications" src={require("../Assets/menu-button.svg")} alt="Notificaciones"/>
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
                            <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="horizontal">
                                <CardContent className="fill" key="front" onClick={this.handleClick}>
                                    <img class="card-content" src="https://source.unsplash.com/random" alt="Front-imsge" height="100" width="100">
                                    </img>
                                    <Typography variant="h6" align="center" paragraph>
                                        Parte frontal de la tarjeta, aquí puede ir una imagen u otras cosas...
                                    </Typography>
                                </CardContent>
                                <CardContent className="fill" key="back" onClick={this.handleClick}>
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
                    <img className = "footer-item" src={require("../Assets/friends.svg")} alt="Friends"/>
                    <img className = "footer-item" src={require("../Assets/search.svg")} alt="Search"/>
                    <img className = "footer-item" src={require("../Assets/profile.svg")} alt="Profile"/>
                    <img className = "footer-item" src={require("../Assets/Notification.svg")} alt="Notificaciones"/>
                </Footer>
            </Layout>
        );
    }
}
export default StudyCards
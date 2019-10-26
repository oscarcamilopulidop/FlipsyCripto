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
import '../Styles/ListCards.css'

import '../App.css';
const { Header, Footer, Sider, Content } = Layout;

class ListCards extends React.Component {

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
                <form className="content" action="" method="post">
                    <div className="cards-list">
                        <div className="new-mini-card"> + <br/> Nueva carta </div>
                        <div className="mini-card-content"> Texto de prueba del contenido de la primera tarjeta </div>
                        <div className="mini-card-content"> Texto super aleatorio que podria ir en la segunda mini tarjetita </div>
                        <div className="mini-card-content"> Parte frontal de la tercera tarjeta </div>
                        <div className="mini-card-content"> Parte frontal de la tarjeta, aquí puede ir una imagen u otras cosas... </div>
                        <div className="mini-card-content"> Otra tarjeta con mucho contenido... </div>
                        <div className="mini-card-content"> Se me están acabando las ideas sobre qué texto poner en estas cosas </div>
                        <div className="mini-card-content"> ¿Es la desaparición de los unicornios un problema real? </div>
                    </div>
                </form>

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
export default ListCards
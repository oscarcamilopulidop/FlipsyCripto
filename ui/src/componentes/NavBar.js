import React from 'react'
import '../Styles/NavBar.css'
import {Menu, Badge, Input} from 'antd';
import { withRouter } from 'react-router-dom'

const { Search } = Input;

const NavBar = props => {
    return (
        <div className="menu-container">
            <Menu mode="horizontal">
                <Menu.Item >
                    <img className = "logo" src={require("../Assets/FlipsyBlanco.svg")} alt="Notificaciones" onClick={() => props.history.push('home')} />
                </Menu.Item>
                <Menu.Item >
                    <img className = "footer-item" src={require("../Assets/cards.svg")} alt="Flashcards" onClick={() => props.history.push('decks')}/>
                </Menu.Item>
                <Menu.Item>
                    <img className = "footer-item" src={require("../Assets/search.svg")} alt="Search" onClick={() => props.history.push('search-category')}/>
                </Menu.Item>
                <Menu.Item>
                    <Badge count={5}> <img className = "footer-item" src={require("../Assets/Notification.svg")} alt="Notificaciones" onClick={() => props.history.push('questionnaires-list')}/> </Badge>
                </Menu.Item>
                <Menu.Item className="search-menu">
                    <Search
                        placeholder="Busca una baraja..."
                        onSearch={value => console.log(value)}
                    />
                </Menu.Item>
            </Menu>
        </div>
    );

};

export default withRouter(NavBar);
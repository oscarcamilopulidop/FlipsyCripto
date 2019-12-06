import React from 'react'
import '../Styles/NavBar.css'
import {Menu, Badge} from 'antd';

const NavBar = props => {
    return (
        <div className="menu-container">
            <Menu mode="horizontal">
                <Menu.Item onClick={() => props.history.push('home')}>
                    <img className = "logo" src={require("../Assets/FlipsyBlanco.svg")} alt="Notificaciones" />
                </Menu.Item>
                <Menu.Item onClick={() => props.history.push('decks')}>
                    <img className = "footer-item" src={require("../Assets/cards.svg")} alt="Flashcards" />
                </Menu.Item>
                <Menu.Item>
                    <img className = "footer-item" src={require("../Assets/search.svg")} alt="Search" onClick={() => props.history.push('search-category')}/>
                </Menu.Item>
                <Menu.Item>
                    <Badge count={5}> <img className = "footer-item" src={require("../Assets/Notification.svg")} alt="Notificaciones" onClick={() => props.history.push('questionnaires-list')}/> </Badge>
                </Menu.Item>
                <Menu.Item className="search-menu">

                </Menu.Item>
            </Menu>
        </div>
    );

};

export default NavBar;
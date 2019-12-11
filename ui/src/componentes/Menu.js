import React from 'react'
import '../Styles/Menu.css'
import { withRouter } from 'react-router-dom'
import {Auth} from "aws-amplify";

const Menu = props => {

    const logout = () => {
        Auth.signOut();
        props.history.push("/")
    };

    return (
        <div className='menu-main-container'>
            <div className="menu-logo-user">
                <img className="menu-img-logo" src={require('../Assets/icon.png')} alt="" />
            </div>

            <div className="menu-main-menu">                
                <p onClick={() => props.history.push({pathname: 'decks', state: {decks_type : "owned"}})}> Barajas </p>
                <p onClick={() => props.history.push('search')}> Comunidad </p>
                <p> Perfil </p>
                <p onClick={() => props.history.push('questionnaires-list')}> Retos </p>
                <p onClick={logout}> Cerrar Sesión </p>
            </div>
        </div>

        
    )
};

export default withRouter(Menu)

import React from 'react'
import '../Styles/Menu.css'
import { withRouter } from 'react-router-dom'
import {Auth} from "aws-amplify";

const Menu = props => {

    const logout = () => {
        Auth.signOut()
        props.history.push("/")
    }

    return (
        <div className='menu-main-container'>
            <div className="menu-logo-user">
                <img className="menu-img-logo" src={require('../Assets/icon.png')} alt="" />
            </div>

            <div className="menu-main-menu">                
                <p onClick={() => props.history.push('decks')}> Barajas </p>
                <p> Comunidad </p>
                <p> Perfil </p>
                <p> Retos </p>
                <p onClick={logout}> Cerrar Sesión </p>
                <div className="center-hr">
                    <hr className="menu-separator"/>
                </div>
            </div>
            
            
   
            <div className="menu-friends">
                <p> Amigos </p>
                <p> Amigo 1 </p>
                <p> Amigo 2 </p>
                <p> Amigo 3 </p>
            </div>
        </div>

        
    )
}

export default withRouter(Menu)

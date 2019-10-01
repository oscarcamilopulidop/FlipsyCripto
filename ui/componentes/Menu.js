import React, { useState, useEffect, useContext } from 'react'
import { Input, Button } from 'antd'
import '../Styles/Menu.css'
import { withRouter } from 'react-router-dom'

const Menu = props => {

    return (
        <div className='menu-main-container'>
            <div className="menu-logo-user">
                <img className="menu-img-logo" src={require('../Assets/icon.png')} alt="" />
            </div>

            <div className="menu-main-menu">                
                <p> Barajas </p>
                <p> Comunidad </p>
                <p> Perfil </p>
                <p> Retos </p>
                <p> Cerrar Sesión </p>
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

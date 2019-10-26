import React, { useState, useEffect, useContext } from 'react'
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import Context from '../GlobalState/context'
import { withRouter } from 'react-router-dom'
import '../Styles/HomeMenu.css'
import '../Styles/Home.css'
import '../Styles/Menu.css'
import { Input } from 'antd';
import Menu  from './Menu';
import CardContent from "@material-ui/core/CardContent";
import transitions from "@material-ui/core/styles/transitions";

const { Search } = Input;
const { Header, Footer, Sider, Content } = Layout;

const HomeMenu = props => {



    function select(id) {

    }

    const [selected, setSelected] = useState({ page: "Home"})

    const { state, actions } = useContext(Context)
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
        <Layout>
            <div className="home-container">
                <Header className = "header">
                    <img className = "logo" src={require("../Assets/FlipsyBlanco.svg")} alt="Notificaciones"/>
                    <img className = "notifications" src={require("../Assets/menu-button.svg")} alt="Notificaciones"
                        onClick={ShowSideMenu}
                    />
                </Header>
                <div className="home-menu-collapse" id="menu">
                    <Menu/>
                </div>
                <Content className="content">
                    <div className = "search">
                        <Search
                            placeholder="Busca una baraja..."
                            onSearch={value => console.log(value)}
                        />
                    </div>

                    <div className="add-deck">
                        + Nueva baraja
                    </div>

                    <div className="deck">
                        <div className="bottom">
                            Barajas
                        </div>
                    </div>

                    <div className="outside-container">
                        <div className="card">
                        </div>
                        <img className="circular" src ="https://www.dzoom.org.es/wp-content/uploads/2011/08/insp-cuadradas-13.jpg" height="100" width="100"/>
                        <div className="text-container">
                            <span className="text"> <span className="link"> Juanita suarez </span> ha creado una nueva baraja <span className="link"> Matemáticas </span> </span>
                        </div>
                    </div>

                    <div className="outside-container">
                        <img className="circular" src ="https://static.ellahoy.es/ellahoy/fotogallery/845X0/459517/cortes-de-cabello-apra-cara-cuadrada-2017.jpg" height="100" width="100"/>
                        <div className="text-container">
                            <span className="text"> <span className="link"> Andrés Felipe Ortíz </span> ha aceptado tu invitación de amistad</span>
                        </div>
                    </div>

                    <div className="outside-container">
                        <div className="card">
                        </div>
                        <img className="circular" src ="http://cdn3.upsocl.com/wp-content/uploads/2016/05/18-24.jpg" height="100" width="100"/>
                        <div className="text-container">
                            <span className="text"> <span className="link"> Juan Carlos Castellanos </span> ha compartido contigo su baraja <span className="link"> Música Instrumental </span> </span>
                        </div>
                    </div>

                </Content>

                <Footer className="footer">
                    <img className = "footer-item-selected" src={require("../Assets/home-selected.svg")} alt="Home" onClick = ""/>
                    <img className = "footer-item" src={require("../Assets/cards.svg")} alt="Flashcards"/>
                    <img className = "footer-item" src={require("../Assets/search.svg")} alt="Search"/>
                    <img className = "footer-item" src={require("../Assets/profile.svg")} alt="Profile"/>
                    <img className = "footer-item" src={require("../Assets/Notification.svg")} alt="Notificaciones"/>
                </Footer>
            </div>
            {/*<div className='home-menu-main-container'>*/}
            {/*    <div className="menu-logo-user">*/}
            {/*        <img className="menu-img-logo" src={require('../Assets/icon.png')} alt="" />*/}
            {/*    </div>*/}

            {/*    <div className="menu-main-menu">*/}
            {/*        <p> Barajas </p>*/}
            {/*        <p> Comunidad </p>*/}
            {/*        <p> Perfil </p>*/}
            {/*        <p> Retos </p>*/}
            {/*        <p> Cerrar Sesión </p>*/}
            {/*        <div className="center-hr">*/}
            {/*            <hr className="menu-separator"/>*/}
            {/*        </div>*/}
            {/*    </div>*/}



            {/*    <div className="menu-friends">*/}
            {/*        <p> Amigos </p>*/}
            {/*        <p> Amigo 1 </p>*/}
            {/*        <p> Amigo 2 </p>*/}
            {/*        <p> Amigo 3 </p>*/}
            {/*    </div>*/}
            {/*</div>*/}

        </Layout>
    )
}

export default withRouter(HomeMenu)
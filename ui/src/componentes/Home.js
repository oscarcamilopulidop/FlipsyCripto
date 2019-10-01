import React, { useState, useEffect, useContext } from 'react'
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import Context from '../GlobalState/context'
import { withRouter } from 'react-router-dom'
import '../Styles/Home.css'
import { Input } from 'antd';
import CardContent from "@material-ui/core/CardContent";

const { Search } = Input;
const { Header, Footer, Sider, Content } = Layout;

const Home = props => {



    function select(id) {

    }

    const [selected, setSelected] = useState({ page: "Home"})

    const { state, actions } = useContext(Context)

    return (
        <Layout>
            <Header className = "header">
                <img className = "logo" src={require("../Assets/Logo-blanco.PNG")} alt="Notificaciones"/>
                <img className = "notifications" src={require("../Assets/menu-button.svg")} alt="Notificaciones"/>
            </Header>
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

                <div className="user-content-wrapper">
                    <img className="circular" src ="https://www.dzoom.org.es/wp-content/uploads/2011/08/insp-cuadradas-13.jpg" height="100" width="100"/>
                    <div className="notice-header">
                        <h1 className="name"> Juanita Suarez </h1>
                        <h1 className="date"> Ayer </h1>
                    </div>
                    Cambié mi baraja de Cálculo, Quieres verla?
                </div>

                <div className="user-content-wrapper">
                    <img className="circular" src ="https://www.dzoom.org.es/wp-content/uploads/2011/08/insp-cuadradas-1.jpg" height="100" width="100"/>
                    <div className="notice-header">
                        <h1 className="name"> Pepito Díaz </h1>
                        <h1 className="date"> Hace dos días </h1>
                    </div>
                    Agregué algunas tarjetas a mi baraja de Música Instumental
                </div>

                <div className="user-content-wrapper">
                    <img className="circular" src ="https://www.dzoom.org.es/wp-content/uploads/2011/08/insp-cuadradas-10.jpg" height="100" width="100"/>
                    <div className="notice-header">
                        <h1 className="name"> Andrés Jiménez </h1>
                        <h1 className="date"> Hace un año </h1>
                    </div>
                    Estoy creando una nueva baraja sobre perritos, alguien me ayuda?
                </div>

            </Content>

            <Footer className="footer">
                <img className = "footer-item-selected" src={require("../Assets/home-selected.svg")} alt="Home" onClick = ""/>
                <img className = "footer-item" src={require("../Assets/friends.svg")} alt="Friends"/>
                <img className = "footer-item" src={require("../Assets/search.svg")} alt="Search"/>
                <img className = "footer-item" src={require("../Assets/profile.svg")} alt="Profile"/>
                <img className = "footer-item" src={require("../Assets/Notification.svg")} alt="Notificaciones"/>
            </Footer>
        </Layout>
    )
}

export default withRouter(Home)
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
                <img className = "logo" src={require("../Assets/FlipsyBlanco.svg")} alt="Notificaciones"/>
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
                <img className = "footer-item" src={require("../Assets/friends.svg")} alt="Friends"/>
                <img className = "footer-item" src={require("../Assets/search.svg")} alt="Search"/>
                <img className = "footer-item" src={require("../Assets/profile.svg")} alt="Profile"/>
                <img className = "footer-item" src={require("../Assets/Notification.svg")} alt="Notificaciones"/>
            </Footer>
        </Layout>
    )
}

export default withRouter(Home)
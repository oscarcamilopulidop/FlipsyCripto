import React, { useState, useEffect, useContext } from 'react'
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import Context from '../GlobalState/context'
import { withRouter } from 'react-router-dom'
import '../Styles/Home.css'
import { Input } from 'antd';
import CardContent from "@material-ui/core/CardContent";
import Menu from "./Menu";
import Deck from './Decks'
import { Auth } from 'aws-amplify'

const { Search } = Input;
const { Header, Footer, Sider, Content } = Layout;

const Home = props => {
    const [userId, setUserId] = useState("")
    const [show, setShow] = useState(false)
    const { state, actions } = useContext(Context)

    useEffect(() => {
        Auth.currentAuthenticatedUser().then(res => {
            actions({
                type: 'setState',
                payload: {...state, in_session_data: {...state.in_session_data, uid: res.attributes.sub}}
            })
            console.log(res.attributes.sub)
        }).catch(err => {
          props.history.push('');
        })
    }, [])

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
        <Layout className="home-container">
            <Header className = "header">
                <img className = "logo" src={require("../Assets/FlipsyBlanco.svg")} alt="Notificaciones" onClick={() => props.history.push('home')}/>
                <img className = "notifications" src={require("../Assets/menu-button.svg")} alt="Notificaciones" onClick={ShowSideMenu}/>
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

                <div className="add-deck"  onClick={() => props.history.push('deck-creation')}>
                    + Nueva baraja
                </div>

                <div className="deck" onClick={() => props.history.push('decks')}>
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
                        <span className="text"> <span className="link" onClick={() => console.log(state.in_session_data.uid)} > Andrés Felipe Ortíz </span> ha aceptado tu invitación de amistad</span>
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
                <img className = "footer-item-selected" src={require("../Assets/home-selected.svg")} alt="Home" onClick={() => props.history.push('home')}/>
                <img className = "footer-item" src={require("../Assets/cards.svg")} alt="Flashcards" onClick={() => props.history.push('decks')}/>
                <img className = "footer-item" src={require("../Assets/search.svg")} alt="Search" onClick={() => props.history.push('search')}/>
                <img className = "footer-item" src={require("../Assets/profile.svg")} alt="Profile" onClick={() => props.history.push('')}/>
                <img className = "footer-item" src={require("../Assets/Notification.svg")} alt="Notificaciones" onClick={() => props.history.push('')}/>
            </Footer>
        </Layout>
    )
}

export default withRouter(Home)

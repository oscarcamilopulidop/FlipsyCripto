import React, { useState, useEffect, useContext } from 'react'
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import Context from '../GlobalState/context'
import { withRouter } from 'react-router-dom'
import '../Styles/Home.css'
import '../Styles/CardsPreview.css'
import { Button, Modal, Input } from 'antd';
import Menu from "./Menu";
import { Auth } from 'aws-amplify'
import { Badge} from 'antd';
import ReactCardFlip from "react-card-flip";
import Swal from "sweetalert2";
import {gql} from "apollo-boost";
import {useQuery} from "@apollo/react-hooks";
import NavBar from "./NavBar.js";


const { Search } = Input;
const { Header, Footer, Content } = Layout;

const Home = props => {
    const [userId, setUserId] = useState("")
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
            <NavBar className = "nav-web"></NavBar>
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

                <div className="deck" onClick={() => props.history.push({pathname: 'decks', state: {decks_type : "owned"}})}>
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
                    <div className="card">
                    </div>
                    <img className="circular" src ="https://www.dzoom.org.es/wp-content/uploads/2011/08/insp-cuadradas-13.jpg" height="100" width="100"/>
                    <div className="text-container">
                        <span className="text"> <span className="link"> Simon El Gran Varon </span> ha creado una nueva baraja <span className="link"> Química </span> </span>
                    </div>
                </div>

                <div className="outside-container">
                    <div className="card">
                    </div>
                    <img className="circular" src ="https://www.dzoom.org.es/wp-content/uploads/2011/08/insp-cuadradas-13.jpg" height="100" width="100"/>
                    <div className="text-container">
                        <span className="text"> <span className="link"> Juanito Alimaña </span> ha creado una nueva baraja <span className="link"> Biología </span> </span>
                    </div>
                </div>

            </Content>
            <Footer className="footer">
                <img className = "footer-item-selected" src={require("../Assets/home-selected.svg")} alt="Home" onClick={() => props.history.push('home')}/>
                <img className = "footer-item" src={require("../Assets/cards.svg")} alt="Flashcards" onClick={() => props.history.push({pathname: 'decks', state: {decks_type : "owned"}})}/>
                <img className = "footer-item" src={require("../Assets/search.svg")} alt="Search" onClick={() => props.history.push('search-category')}/>
                <Badge count={5}> <img className = "footer-item" src={require("../Assets/Notification.svg")} alt="Notificaciones" onClick={() => props.history.push('questionnaires-list')}/> </Badge>
            </Footer>
        </Layout>
    )
}

export default withRouter(Home)

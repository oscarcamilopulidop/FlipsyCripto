import React, {useContext, useEffect} from 'react'
import {Layout} from 'antd'
import '../Styles/Home.css'
import '../Styles/Congratulations.css'
import Menu from "./Menu";
import Context from "../GlobalState/context";
import {Auth} from "aws-amplify";
import { Button, Badge } from 'antd';
import { Statistic } from 'antd';
import NavBar from "./NavBar";

const { Header, Footer} = Layout;

const Congratulations = props => {

    const { state, actions } = useContext(Context);

    useEffect(() => {
        Auth.currentAuthenticatedUser().then(res => {
            actions({
                type: 'setState',
                payload: {...state, in_session_data: {...state.in_session_data, uid: res.attributes.sub}}
            });
            console.log(res.attributes.sub)
        }).catch(() => {
            props.history.push('');
        })
    }, []);

    let flag = false;
    const ShowSideMenu = () => {

        let element = document.getElementById('menu');
        if(flag){
            element.style.transform = 'translate(60vw)';
        }else{
            element.style.transform = 'translate(-60vw)';
        }
        element.style.zIndex = '25';
        element.style.transition = 'transform 500ms';
        flag = !flag;
    };

    const question_title = "Sumas";
    const success_rate= ( 5 / 6 )*100;

    const color_rate = (number) => {
      if (number > 50){
          return '#3f8600'
      } else {
          return '#cf1322'
      }
    };

    return (
        <div className='congratulations-main-container'>
            <Layout>
                <NavBar className = "nav-web"></NavBar>
                <Header className = "header">
                    <img className = "logo" src={require("../Assets/FlipsyBlanco.svg")} alt="Notificaciones" onClick={() => props.history.push('home')}/>
                    <img className = "notifications" src={require("../Assets/menu-button.svg")} alt="Notificaciones" onClick={ShowSideMenu}/>
                </Header>
                <div className="home-menu-collapse" id="menu">
                    <Menu/>
                </div>

                <div className="congratulations-container">
                    <h1> ¡Felicitaciones! </h1>
                    <h2> Tu resultado fue:</h2>
                    <Statistic
                        className="result"
                        value={success_rate}
                        precision={2}
                        valueStyle={{ color: color_rate(success_rate) }}
                        suffix="%"
                    />
                    <h3> Te notificaremos cuando necesites estudiar de nuevo acerca de {question_title} </h3>

                    <Button className="btn-back" type="primary" size="large" onClick={() => props.history.push('questionnaires-list')}> Volver </Button>
                </div>

                <Footer className="footer">
                    <img className = "footer-item" src={require("../Assets/home.svg")} alt="Home" onClick={() => props.history.push('home')}/>
                    <img className = "footer-item" src={require("../Assets/cards.svg")} alt="Flashcards" onClick={() => props.history.push({pathname: 'decks', state: {decks_type : "owned"}})}/>
                    <img className = "footer-item" src={require("../Assets/search.svg")} alt="Search" onClick={() => props.history.push('search')}/>
                    <Badge count={5}> <img className = "footer-item-selected" src={require("../Assets/Notification-selected.svg")} alt="Notifications" onClick={() => props.history.push('questionnaires-list')}/> </Badge>
                </Footer>
            </Layout>
        </div>
    )
};

export default Congratulations

import React, {useContext, useEffect} from 'react'
import {Layout} from 'antd'
import '../Styles/Home.css'
import '../Styles/Question.css'
import Menu from "./Menu";
import Context from "../GlobalState/context";
import {Auth} from "aws-amplify";
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import { Button, Badge } from 'antd';

const { Header, Footer} = Layout;

const Question = props => {

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
    const front = "1+1";
    const back = "2";

    const remember = ()=>{
        console.log("si recuerdo esta pregunta");
        props.history.push({
            pathname: 'congratulations'
        })
    };

    const dontRemember = ()=>{
        console.log("no recuerdo esta pregunta");
        props.history.push({
            pathname: 'congratulations'

        })
    };

    return (
        <div className='question-main-container'>
            <Layout>
                <Header className = "header">
                    <img className = "logo" src={require("../Assets/FlipsyBlanco.svg")} alt="Notificaciones" onClick={() => props.history.push('home')}/>
                    <img className = "notifications" src={require("../Assets/menu-button.svg")} alt="Notificaciones" onClick={ShowSideMenu}/>
                </Header>
                <div className="home-menu-collapse" id="menu">
                    <Menu/>
                </div>

                <div className="question-container">
                    <h1>{question_title}</h1>
                    <div className="flashcard-container">
                        <Flippy
                            flipDirection="horizontal"
                            style={{ width: '229px', height: '319px', margin:'auto' }}
                        >
                            <FrontSide
                                style={{ backgroundColor: 'white', border:'solid 7px #00558c', color:'#00558c' }}
                            >
                                {front}
                                <img className = "logo-flashcard" src={require("../Assets/logo-cartas.svg")} alt="logo-flipsy-cartas"/>
                            </FrontSide>
                            <BackSide
                                style={{ backgroundColor: 'white', border:'solid 7px #00558c', color:'#00558c'}}
                            >
                                {back}
                                <img className = "logo-flashcard" src={require("../Assets/logo-cartas.svg")} alt="logo-flipsy-cartas"/>
                            </BackSide>
                        </Flippy>

                        <div className="rta-container">
                            <h2>¿Recuerdas la respuesta?</h2>
                            <Button className="btn-yes" type="danger" size="large" onClick={remember}> SI </Button>
                            <Button className="btn-no" type="danger" size="large" onClick={dontRemember}> NO </Button>
                        </div>
                    </div>
                </div>

                <Footer className="footer">
                    <img className = "footer-item" src={require("../Assets/home.svg")} alt="Home" onClick={() => props.history.push('home')}/>
                    <img className = "footer-item" src={require("../Assets/cards.svg")} alt="Flashcards" onClick={() => props.history.push('decks')}/>
                    <img className = "footer-item" src={require("../Assets/search.svg")} alt="Search" onClick={() => props.history.push('search-category')}/>
                    <img className = "footer-item" src={require("../Assets/profile.svg")} alt="Profile" onClick={() => props.history.push('')}/>
                    <Badge count={5}> <img className = "footer-item-selected" src={require("../Assets/Notification-selected.svg")} alt="Notifications" onClick={() => props.history.push('questionnaires-list')}/> </Badge>
                </Footer>
            </Layout>
        </div>
    )
};

export default Question
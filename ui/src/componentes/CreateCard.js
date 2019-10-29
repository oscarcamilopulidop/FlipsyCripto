import React, {Component, useContext, useState} from 'react';
import CardContent from '@material-ui/core/CardContent';
import { Layout, Button } from 'antd';
import ReactCardFlip from 'react-card-flip'
import '../Styles/Home.css'
import '../Styles/CreateCard.css'
import '../App.css';
import Menu from "./Menu";
import Context from "../GlobalState/context";
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost';

const { Header, Footer, Sider, Content } = Layout;

const CreateCard  = props => {

    const { state, actions } = useContext(Context);

    const [flashCard, setFlashCard] = useState(  {
        front: '',
        back: '',
    });

    const constructor = () => {
        this.state = {
            isFlipped: false
        };
        this.handleClick = this.handleClick.bind(this);
    }


    const handleClick = (e) => {
        e.preventDefault();
        this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
    }

    const handleChange = value => {
        this.setState({ mdeValue: value });
    };
    const [CreateCardInNeo4j, { data }] = useMutation(gql`
        mutation Create(
            $idFc: ID
            $front: String!
            $back: String!
            $lastModifyDate: String!
            $creationDate: String!
            $idFCG: String!        
        ){
            CreateFCGroup(
                idFc: $idFc,
                front: $front,
                back: $back,
                lastModifyDate: $lastModifyDate,
                creationDate: $creationDate,
                idFCG: $idFCG,
            ){
                idFcg, front, back, lastModifyDate, creationDate, idFCG
            }
        }
    `);

    const show = () => {
        const { front, back } = flashCard;
        const { id } = state.user_credentials;
        const { idFcg } = state.deck;
        console.log(state.user_credentials);
        actions({
            type: "setState",
            payload: {
                ...state, flashCard:
                    { ...state.flashCard,
                        front: flashCard.front,
                        back: flashCard.back,
                    }
            }
        });

        console.log(state.flashCard);
    };


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
            <Layout className="layout">
                <Header className = "header">
                    <img className = "logo" src={require("../Assets/FlipsyBlanco.svg")} alt="Notificaciones" onClick={() => props.history.push('home')}/>
                    <img className = "notifications" src={require("../Assets/menu-button.svg")} alt="Notificaciones" onClick={ShowSideMenu}/>
                </Header>
                <div className="home-menu-collapse" id="menu">
                    <Menu/>
                </div>
                <form className="content" action="" method="post">
                    <div className="add-deck" onClick={show}>
                        Matemáticas I
                    </div>
                    <div className="">
                        Parte Frontal:
                        <br/>
                        <textarea  className="text-area flip-card"
                                   onChange={e => setFlashCard({ ...flashCard, front: e.target.value})}
                        />
                        Parte posterior:
                        <br/>
                        <textarea  className="text-area flip-card"
                                   onChange={e => setFlashCard({ ...flashCard, back: e.target.value})}
                        />
                    </div>
                    <Button onClick={() => props.history.push('home')}>
                        Aceptar
                    </Button>
                </form>

                <Footer className="footer">
                    <img className = "footer-item" src={require("../Assets/home.svg")} alt="Home" onClick={() => props.history.push('home')}/>
                    <img className = "footer-item-selected" src={require("../Assets/cards-selected.svg")} alt="Flashcards" onClick={() => props.history.push('decks')}/>
                    <img className = "footer-item" src={require("../Assets/search.svg")} alt="Search" onClick={() => props.history.push('search')}/>
                    <img className = "footer-item" src={require("../Assets/profile.svg")} alt="Profile" onClick={() => props.history.push('')}/>
                    <img className = "footer-item" src={require("../Assets/Notification.svg")} alt="Notificaciones" onClick={() => props.history.push('')}/>
                </Footer>
            </Layout>
        );

}
export default CreateCard
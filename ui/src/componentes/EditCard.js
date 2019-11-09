import React, {Component, useContext, useEffect, useState} from 'react';
import { Layout, Button } from 'antd';
import ReactCardFlip from 'react-card-flip'
import '../Styles/Home.css'
import '../Styles/CreateCard.css'
import '../App.css';
import Menu from "./Menu";
import Context from "../GlobalState/context";
import {useMutation, useQuery} from '@apollo/react-hooks'
import { gql } from 'apollo-boost';
import moment from "moment";
import { Auth } from 'aws-amplify'


const { Header, Footer, Sider, Content } = Layout;

const GET_CARD_DATA = gql`
    query Seacrh($id: ID! ) {
        FC(idFc: $id)  {
            front, back
        }
    }`;

const EditCard  = props => {

    const [localData, setLocalData] = useState([])

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

    const { state, actions } = useContext(Context);

    const [flashCard_data, setFlashCard_data] = useState(  {
        idFc: props.location.state.item,
        front: '',
        back: '',
        lastModifyDate: moment().unix().toString(),
        creationDate: moment().unix().toString(),
        // idFCG: props.location.state[0].idFcg,
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

    const { loading, error, data } = useQuery(GET_CARD_DATA,
        {variables:{
                id: props.location.state.item //"8e472c4b-0e05-4d81-b017-01dc7a1be9f3"
                // id: 'ss'
            },
            pollInterval: 500,
        });
    // if(!loading){ console.log(data)}
    useEffect( () => {
        !loading && setLocalData(data.FC[0])

    }, [loading])
    const [UpdateCardInNeo4j] = useMutation(gql`
        mutation Update(
            $idFc: ID!
            $front: String!
            $back: String!
            $lastModifyDate: String!
        ){
            UpdateFC(
                idFc: $idFc,
                front: $front,
                back: $back,
                lastModifyDate: $lastModifyDate
            ){
                idFc, front, back, lastModifyDate
            }
        }
    `);

    const UpdateInfo = () => {
        console.log(flashCard_data);
    };

    const SendQuery = () => {
      try {
          UpdateCardInNeo4j({
              variables: {
                  idFc: props.location.state.item,
                  front: localData.front,
                  back: localData.back,
                  lastModifyDate: moment().unix().toString(),
              }
          }).then(res => {
              console.log(res.data)
              // props.history.push('cards-creation')
          })
      }catch (err) {
          console.log(err);
      }
    }


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
            loading ?
                <div />
                :
            <Layout className="layout">
                <Header className = "header">
                    <img className = "logo" src={require("../Assets/FlipsyBlanco.svg")} alt="Notificaciones" onClick={() => props.history.push('home')}/>
                    <img className = "notifications" src={require("../Assets/menu-button.svg")} alt="Notificaciones" onClick={ShowSideMenu}/>
                </Header>c
                <div className="home-menu-collapse" id="menu">
                    <Menu/>
                </div>
                 <form className="content" action="" method="post">
                    <div className="center">
                        <div className="desk-creation-title">
                            <h1>Editar Carta</h1>
                        </div>
                    </div>
                    <div className="cart-side">
                        <h3 onClick={() => console.log(localData)}>
                            Parte Frontal:
                        </h3>
                        {/*
                        <Button size="large" type="primary" shape="round" icon="plus-circle-o">
                            Imagen opcional
                        </Button>
                        */}
                        <textarea  className="text-area flip-card"
                                   onChange={e => setLocalData({ ...localData, front: e.target.value})}
                                   value={localData.front}
                            /*value={data.FC[0].front}*/
                        />
                    </div>
                    <div className="cart-side">
                        <h3>Parte Posterior:</h3>
                        {/*
                        <Button size="large" type="primary" shape="round" icon="plus-circle-o">
                            Imagen opcional
                        </Button>
                        */}
                        <textarea  className="text-area flip-card"
                                   onChange={e => setLocalData({ ...localData, back: e.target.value})}
                                   value={localData.back}
                            /*value={data.FC[0].back}*/
                        />
                    </div>]
                    <div className="deck-creation-button-final">
                        <Button size="large" type="primary" onClick={SendQuery}>
                            Editar
                        </Button>
                    </div>
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
export default EditCard

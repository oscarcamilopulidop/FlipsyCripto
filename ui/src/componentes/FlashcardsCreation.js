import React, {useContext, useEffect, useState} from 'react'
import {Button, List, Card, Layout} from 'antd'
import '../Styles/FlashcardsCreation.css'
import '../Styles/Home.css'
import Menu from "./Menu";
import Context from "../GlobalState/context";
import { Auth } from 'aws-amplify'
import Swal from 'sweetalert2'
import {useQuery} from "@apollo/react-hooks";
import {gql} from "apollo-boost";



const { Header, Footer} = Layout;

const FlascardsCreation = props => {

    const GET_FLASHCARDS = gql`
        query Seacrh($id: String!) {
            FC(idFCG: $id)  {
                idFc, front
        }        
    }`;

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

    const { loading, error, data } = useQuery(GET_FLASHCARDS,
        {variables:{
                id: state.current_deck.id //"8e472c4b-0e05-4d81-b017-01dc7a1be9f3"
            },
            pollInterval: 500,
    });
    if (!loading) { console.log(data) }
    const openCard= idFc => {
        console.log(idFc);
        actions({
            type: "setState",
            payload: {
                ...state, current_flashcard:
                    { ...state.current_flashcard,
                        id: idFc} }
        });

        props.history.push('study')
    };

    const editDeck = () => {
        props.history.push('createCard')
    }

    const deleteCard = idFc => {
        Swal.fire({
            title: 'Seguro que desea eliminar la carta?',
            type: 'warning',
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                console.log("AQUÍ DEBERÍA BORRAR LA CARTA "+idFc);
                Swal.fire(
                    '',
                    'Su carta ha sido eliminada.',
                    'success'
                )
            }
        })
    }

    const play = () => {
        props.history.push('study')
    }


    const deck_title ='Matematicas I';

    const dataL = [
        {
            front: 'Si dividimos 1 entre 0 el resultado es...',
        },
        {
            front: '¿Cuanto es la cuarta parte de la tercera parte?',
        },
        {
            front: '1+1',
        },

    ];

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
        <div className='flashcards-main-container'>
            <Layout>

                <Header className = "header">
                    <img className = "logo" src={require("../Assets/FlipsyBlanco.svg")} alt="Notificaciones" onClick={() => props.history.push('home')}/>
                    <img className = "notifications" src={require("../Assets/menu-button.svg")} alt="Notificaciones" onClick={ShowSideMenu}/>
                </Header>
                <div className="home-menu-collapse" id="menu">
                    <Menu/>
                </div>
                <div className="flashcards-container">
                    <h1> <img onClick={editDeck} className = "edit-deck" src={require("../Assets/editDeck.svg")} alt="edit icon"/>
                        {deck_title}
                        <img onClick={play} className = "play-deck" src={require("../Assets/play.svg")} alt="play icon"/>
                    </h1>
                    <Button onClick={() => props.history.push('createCard')} className="new-flashcard" type="dashed" ghost>
                        Nueva
                        <br/>
                        Tarjeta
                        <br/>
                        +
                    </Button>
                    <List
                        grid={{ gutter: 10, column: 3 }}
                        dataSource={data.FC}
                        renderItem={item => (
                            <List.Item>
                                <img className = "edit-card-button" src={require("../Assets/edit-blue.svg")}  onClick={() => props.history.push('deck-creation')} alt="delete-button"/>
                                <img className = "delete-card-button" src={require("../Assets/delete-blue.svg")}  onClick={() => deleteCard(item.idFcg)} alt="delete-button"/>
                                <Card onClick={() => openCard(item.idFc)}>{item.front} <img className = "img-flashcard" src={require("../Assets/logo-cartas.svg")} alt="logo-flipsy-cartas"/> </Card>
                            </List.Item>
                        )}
                    />
                </div>



                <Footer className="footer">
                    <img className = "footer-item" src={require("../Assets/home.svg")} alt="Home" onClick={() => props.history.push('home')}/>
                    <img className = "footer-item-selected" src={require("../Assets/cards-selected.svg")} alt="Flashcards" onClick={() => props.history.push('decks')}/>
                    <img className = "footer-item" src={require("../Assets/search.svg")} alt="Search" onClick={() => props.history.push('search')}/>
                    <img className = "footer-item" src={require("../Assets/profile.svg")} alt="Profile" onClick={() => props.history.push('')}/>
                    <img className = "footer-item" src={require("../Assets/Notification.svg")} alt="Notificaciones" onClick={() => props.history.push('')}/>
                </Footer>
            </Layout>
        </div>
    )
}

export default FlascardsCreation

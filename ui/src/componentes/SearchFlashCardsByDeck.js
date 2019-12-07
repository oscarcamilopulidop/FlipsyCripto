import React, {useContext, useEffect, useState} from 'react'
import {Avatar, Button, Card, Input, Layout, List, Modal} from 'antd'
import '../Styles/SearchFlashCardsByDecks.css'
import '../Styles/Home.css'
import Menu from "./Menu";
import Context from "../GlobalState/context";
import {Auth} from "aws-amplify";
import {useMutation, useQuery} from "@apollo/react-hooks";
import {gql} from "apollo-boost";
import Swal from "sweetalert2";
import { Badge} from 'antd';
import ReactCardFlip from "react-card-flip";
import NavBar from "./NavBar";


const { Header, Footer} = Layout;

const GET_FLASHCARDS = gql`
    query Seacrh($id: String!) {
        FC(idFCG: $id)  {
            idFc, front
        }
}`;

const ADD_DECKS = gql `mutation ADD_FCG_TO_WATCH_LIST($id :ID!, $idFcg: ID!) {
    AddUSERObserving( from: {
        idUser: $id
    }, to: {
        idFcg: $idFcg
    }
    ) {from{idUser}}
}`;


const SearchFlashCardsByDecks = props => {
    const { state, actions } = useContext(Context);

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

    const [show, setShow] = useState(false)
    const [isFlipped, setIsFlipped] = useState(false);
    const [current, setCurrent] = useState(0)


    const { loading, data } = useQuery(GET_FLASHCARDS,
        {variables:{
                id: props.location.state.idFcg //"8e472c4b-0e05-4d81-b017-01dc7a1be9f3"
            },
            pollInterval: 500,
        });
    if (!loading) { console.log(data) }

    const { Search } = Input;

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

    const Cancel = () => {
        setShow(false)
    }


    const dataFCg = {name: 'Matematicas'};
    const dataFC = [{front: 'Texto de prueba frontal 1', back: 'Texto de prueba posterior 1'},
        {front: 'Texto de prueba frontal 2', back: 'Texto de prueba posterior 2'},
        {front: 'Texto de prueba frontal 3', back: 'Texto de prueba posterior 3'},
        {front: 'Texto de prueba frontal 4', back: 'Texto de prueba posterior 4'},
    ];

    const addDeck = idFcg => {
        Swal.fire({
            title: 'Seguro que deseas agregar la baraja?',
            type: 'warning',
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: 'Agregar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                addDeckRelation(idFcg);
                console.log("Aqui deberia agregar la baraja " + idFcg)
                Swal.fire(
                    '',
                    'Esta baraja ha sido agregada.',
                    'success'
                )
            }
        })
    }
    const [addRelation] = useMutation(ADD_DECKS);

    const addDeckRelation = idFcg => {
        try {
            addRelation({
                variables: {
                    id: state.in_session_data.uid,
                    idFcg : idFcg
                }
            }).then(res => {
                console.log(res.data)
                // props.history.push('decks')
            })
        } catch (error) { console.log("error => ", error) }
    }

    const nextCard = () => {
        console.log('current card: '+current);
        console.log('current len: '+data.FC.length);
        if(current + 1 < data.FC.length){
            setCurrent((1+current));
        }
        console.log('next card: '+current)
    };

    const prevCard = () => {
        console.log('current card: '+current);
        if(current > 0){
            setCurrent(current-1);
        }
        console.log('prev card: '+current)
    };

    const getLeftArrow = () => {
        if(current == 0){
            return require("../Assets/prev-card-gray.svg");
        }else{
            return require("../Assets/prev-card.svg");
        }
    };

    const getRightArrow = () => {
        if(current == data.FC.length-1){
            return require("../Assets/next-card-gray.svg");
        }else{
            return require("../Assets/next-card.svg");
        }
    };

    const handleClick = (e) => {
        e.preventDefault();
        setIsFlipped(!isFlipped)
    };

    return (
        loading ?
            <div />
            :
            <Layout className="layout">
                <NavBar className = "nav-web"></NavBar>
                <Header className = "header">
                    <img className = "logo" src={require("../Assets/FlipsyBlanco.svg")} alt="Notificaciones" onClick={() => props.history.push('home')}/>
                    <img className = "notifications" src={require("../Assets/menu-button.svg")} alt="Notificaciones" onClick={ShowSideMenu}/>
                </Header>
                <div className="home-menu-collapse" id="menu">
                    <Menu/>
                </div>
                <body className="content" >
                <div className="study-header">
                    <img className="arrow-study" src={getLeftArrow()} onClick={prevCard}/>
                    <h2 variant="h6" align="center" paragraph>
                        {current+1} / {data.FC.length}
                    </h2>
                    <img className="arrow-study-right" src={getRightArrow()} onClick={nextCard}/>
                </div>
                <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                    <div className="flip-card-study" onClick={handleClick} key="front">
                        <div className="card-content-study" >
                            <center>
                                {//<img class="card-content" src="https://source.unsplash.com/random" alt="Front-imsge" height="100" width="100"></img>
                                }
                            </center>
                            <h2 variant="h6" align="center" paragraph>
                                {data.FC[current].front}
                            </h2>

                        </div>
                        <span>
                                <img className = "img-flashcard-study" src={require("../Assets/logo-cartas.svg")} alt="logo-flipsy-cartas" height="80" width="80"/>
                            </span>
                    </div>
                    <div className="flip-card-study" onClick={handleClick} key="back">
                        <div className="card-content-study" >
                            <h2 variant="h6" align="center" paragraph>
                                {data.FC[current].back}
                            </h2>
                            <span>
                                    <img className = "img-flashcard-study" src={require("../Assets/logo-cartas.svg")} alt="logo-flipsy-cartas" height="80" width="80"/>
                                </span>
                        </div>
                    </div>
                </ReactCardFlip>
                </body>

                <Footer className="footer">
                    <img className = "footer-item" src={require("../Assets/home.svg")} alt="Home" onClick={() => props.history.push('home')}/>
                    <img className = "footer-item-selected" src={require("../Assets/cards-selected.svg")} alt="Flashcards" onClick={() => props.history.push({pathname: 'decks', state: {decks_type : "owned"}})}/>
                    <img className = "footer-item" src={require("../Assets/search.svg")} alt="Search" onClick={() => props.history.push('search')}/>
                    <img className = "footer-item" src={require("../Assets/Notification.svg")} alt="Notificaciones" onClick={() => props.history.push('questionnaires-list')}/>
                </Footer>
            </Layout>
    )
}

export default SearchFlashCardsByDecks

import React, {useContext, useEffect, useState} from 'react'
import {Avatar, Button, Card, Input, Layout, List, Modal} from 'antd'
import '../Styles/SearchDecks.css'
import '../Styles/Home.css'
import Menu from "./Menu";
import Context from "../GlobalState/context";
import {Auth} from "aws-amplify";
import {useMutation, useQuery} from "@apollo/react-hooks";
import {gql} from "apollo-boost";
import Swal from "sweetalert2";
import { Badge} from 'antd';
import ReactCardFlip from "react-card-flip";


const { Header, Footer} = Layout;

const GET_DECKS = gql`
    query Search($id: String) {
        CAT(name: $id) {
            fcg {
                title
                idFcg
                idUser
                observing_users {
                  idUser
                }
            }
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

const SearchDecks = props => {
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
    const [isFlipped0, setFlipped0] = useState(true)
    const [isFlipped1, setFlipped1] = useState(true)
    const [isFlipped2, setFlipped2] = useState(true)
    const [current, setCurrent] = useState(0)


    const[searchDeck, setSearchDeck] = useState({
        category: "",
    })

    const { loading, error, data } = useQuery(GET_DECKS,
        {variables:{
                    id:  props.location.state.category
        },
        pollInterval: 500,
    });

    if (!loading) {
        console.log(data)
    }

    function isBeingObserved(deck) {
      var observingFlag = false
      deck.observing_users.forEach((user) => {
              // console.log(user);
              if (Object.values(user).indexOf(state.in_session_data.uid) > -1)
                  observingFlag = true
          })
      // console.log(deck.observing_users)
      console.log(observingFlag)
      return observingFlag
    }

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
    const AddDeck = () =>{

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

    const nextCard = () => {
        if(current + 1 < dataFC.length){
            setCurrent(current+1);
        }
        console.log(current)
    };

    const prevCard = () => {
        if(current > 0){
            setCurrent(current-1);
        }
        console.log(current)
    };

    const getFirstCards = () => {
        if(current == 0){
            return(
                <ReactCardFlip isFlipped={isFlipped0} flipDirection="horizontal">
                    <div className="primary-card-preview"  key="front" onClick={() => setFlipped0(true)}>
                        {dataFC[current].front}
                    </div>
                    <div className="primary-card-preview"  key="back" onClick={() => setFlipped0(false)}>
                        {dataFC[current].back}
                    </div>
                </ReactCardFlip>);
        }else if(current+1 == dataFC.length){
            if(current-2 >= 0) {
                return (
                    <ReactCardFlip isFlipped={isFlipped0} flipDirection="horizontal">
                        <div className="secundary-card-preview" key="front" onClick={() => setFlipped0(true)}>
                            {dataFC[current-2].front}
                        </div>
                        <div className="secundary-card-preview" key="back" onClick={() => setFlipped0(false)}>
                            {dataFC[current-2].back}
                        </div>
                    </ReactCardFlip>);
            }
        } else {
            return(
                <ReactCardFlip isFlipped={isFlipped0} flipDirection="horizontal">
                    <div className="secundary-card-preview"  key="front" onClick={() => setFlipped0(true)}>
                        {dataFC[current-1].front}
                    </div>
                    <div className="secundary-card-preview"  key="back" onClick={() => setFlipped0(false)}>
                        {dataFC[current-1].back}
                    </div>
                </ReactCardFlip>
            );
        }
    };

    const getSecondCard = () => {
        if(current == 0){
            if(dataFC.length >= 2){
                return(
                    <ReactCardFlip isFlipped={isFlipped1} flipDirection="horizontal">
                        <div className="secundary-card-preview"  key="front" onClick={() => setFlipped1(true)}>
                            {dataFC[current+1].front}
                        </div>
                        <div className="secundary-card-preview"  key="back" onClick={() => setFlipped1(false)}>
                            {dataFC[current+1].back}
                        </div>
                    </ReactCardFlip>);
            }
        }else if(current+1 == dataFC.length){
            if(current-1 >= 0 ) {
                return (
                    <ReactCardFlip isFlipped={isFlipped1} flipDirection="horizontal">
                        <div className="secundary-card-preview" key="front" onClick={() => setFlipped1(true)}>
                            {dataFC[current - 1].front}
                        </div>
                        <div className="secundary-card-preview" key="back" onClick={() => setFlipped1(false)}>
                            {dataFC[current - 1].back}
                        </div>
                    </ReactCardFlip>);
            }
        }else {
            return(
                <ReactCardFlip isFlipped={isFlipped1} flipDirection="horizontal">
                    <div className="primary-card-preview"  key="front" onClick={() => setFlipped1(true)}>
                        {dataFC[current].front}
                    </div>
                    <div className="primary-card-preview"  key="back" onClick={() => setFlipped1(false)}>
                        {dataFC[current].back}
                    </div>
                </ReactCardFlip>
            );
        }
    };

    const getdThirdCard = () => {
        if(current == 0){
            if(dataFC.length >= 3){
                return(
                    <ReactCardFlip isFlipped={isFlipped2} flipDirection="horizontal">
                        <div className="secundary-card-preview"  key="front" onClick={() => setFlipped2(true)}>
                            {dataFC[current+2].front}
                        </div>
                        <div className="secundary-card-preview"  key="back" onClick={() => setFlipped2(false)}>
                            {dataFC[current+2].back}
                        </div>
                    </ReactCardFlip>);
            }
        }else if(current+1 == dataFC.length){
            return (
                <ReactCardFlip isFlipped={isFlipped2} flipDirection="horizontal">
                    <div className="primary-card-preview" key="front" onClick={() => setFlipped2(true)}>
                        {dataFC[current].front}
                    </div>
                    <div className="primary-card-preview" key="back" onClick={() => setFlipped2(false)}>
                        {dataFC[current].back}
                    </div>
                </ReactCardFlip>
            );
        }else {
            if(current+1 < dataFC.length) {
                return(
                    <ReactCardFlip isFlipped={isFlipped2} flipDirection="horizontal">
                        <div className="secundary-card-preview"  key="front" onClick={() => setFlipped2(true)}>
                            {dataFC[current+1].front}
                        </div>
                        <div className="secundary-card-preview"  key="back" onClick={() => setFlipped2(false)}>
                            {dataFC[current+1].back}
                        </div>
                    </ReactCardFlip>);
            }
        }
    };

    return (
        loading ?
            <div />
            :
        <div className='searcher-main-container'>
            <Modal
                className = "modal-preview"
                title={null}
                closable = {false}
                visible={show}
                centered
                footer={null}
            >
                <div className="title-preview">
                    {dataFCg.name} {current+1} / {dataFC.length}
                </div>
                <div className="preview-cards-container">
                    <img className="arrow-study" src={require("../Assets/prev-card.svg")} onClick={prevCard} />
                    {getFirstCards()}
                    {getSecondCard()}
                    {getdThirdCard()}
                    <img className="arrow-study" src={require("../Assets/next-card.svg")} onClick={nextCard} />
                </div>
                <div className="preview-cards-container">
                    <Button onClick={Cancel}>
                        Cancelar
                    </Button>
                    <Button type="primary" icon="plus" onClick={AddDeck}>
                        Agregar
                    </Button>
                </div>
            </Modal>
            <Layout>

                <Header className = "header">
                    <img className = "logo" src={require("../Assets/FlipsyBlanco.svg")} alt="Notificaciones" onClick={() => props.history.push('home')}/>
                    <img className = "notifications" src={require("../Assets/menu-button.svg")} alt="Notificaciones" onClick={ShowSideMenu}/>
                </Header>
                <div className="home-menu-collapse" id="menu">
                    <Menu/>
                </div>

                <div className='list-main-container'>
                    <List
                        itemLayout="horizontal"
                        dataSource={data.CAT[0].fcg}
                        renderItem={item => (
                            item.idUser == state.in_session_data.uid || isBeingObserved(item)
                                ?
                            <div />
                                :
                            <List.Item>
                                <List.Item.Meta
                                    color="white"
                                    avatar={
                                        <div className="mini-deck" onClick={() => setShow(true)}>
                                            <img className = "search-img-card"  src={require("../Assets/logo-cartas.svg")} alt="logo-flipsy-cartas" />
                                        </div>
                                    }
                                    title={item.title}
                                />
                                <Button
                                    type="primary"
                                    shape="circle"
                                    size={"large"}
                                    onClick={() => addDeck(item.idFcg) }>
                                    +
                                </Button>
                            </List.Item>
                        )}
                    />
                </div>

                <Footer className="footer">
                    <img className = "footer-item" src={require("../Assets/home.svg")} alt="Home" onClick={() => props.history.push('home')}/>
                    <img className = "footer-item" src={require("../Assets/cards.svg")} alt="Flashcards" onClick={() => props.history.push('decks')}/>
                    <img className = "footer-item-selected" src={require("../Assets/search-selected.svg")} alt="Search" onClick={() => props.history.push('search-category')}/>
                    <img className = "footer-item" src={require("../Assets/profile.svg")} alt="Profile" onClick={() => props.history.push('')}/>
                    <Badge count={5}> <img className = "footer-item" src={require("../Assets/Notification.svg")} alt="Notificaciones" onClick={() => props.history.push('questionnaires-list')}/> </Badge>
                </Footer>
            </Layout>
        </div>
    )
}

export default SearchDecks

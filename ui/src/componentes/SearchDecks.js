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
import NavBar from "./NavBar";
import ModalFlashCard from "./ModalFlashCard";


const { Header, Footer} = Layout;

const GET_DECKS = gql`
    query Search($id: String) {
        CAT(name: $id) {
            fcg {
                title
                idFcg
                idUser
                public
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
                payload: {...state, in_session_data: {...state.in_session_data, uid: res.attributes.sub}, actually_deck: {...state.actually_deck,show:false}}
            })
            console.log(res.attributes.sub)
        }).catch(err => {
            props.history.push('');
        })
    }, [])

    const [show, setShow] = useState(false)

    const[searchDeck, setSearchDeck] = useState({
        category: "",
    })

    const { loading, error, data } = useQuery(GET_DECKS,
        {variables:{
                    id:  props.location.state.category
        },
        pollInterval: 500,
    });

    var filteredData;

    if (!loading) {
        console.log(data)
        filteredData = filterData(data.CAT[0].fcg)
        console.log(filteredData)
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



    function filterData(rawData) {
      var temp = [];
      rawData.forEach((deck) => {
          if (!((deck.idUser == state.in_session_data.uid || isBeingObserved(deck)) || (!deck.public))) {
            temp.push(deck);
          }
      })

      return temp
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

    const Cancel = () => {
        setShow(false)
    }

    const openDeck = (idFcg, title) => {
        console.log(idFcg)
        setShow(true);
        actions({
            type: 'setState',
            payload: {...state, actually_deck: {...state.actually_deck, idFcg: idFcg, title: title,show:true}}
        })
    }

    return (
        loading ?
            <div />
            :
        <div className='searcher-main-container'>
            <Modal
                className = "modal-preview"
                title={null}
                closable = {false}
                visible={state.actually_deck.show}
                centered
                footer={null}
            >
                <ModalFlashCard/>
            </Modal>
            <Layout>
                <NavBar className = "nav-web"></NavBar>
                <Header className = "header">
                    <img className = "logo" src={require("../Assets/FlipsyBlanco.svg")} alt="Notificaciones" onClick={() => props.history.push('home')}/>
                    <img className = "notifications" src={require("../Assets/menu-button.svg")} alt="Notificaciones" onClick={ShowSideMenu}/>
                </Header>
                <div className="home-menu-collapse" id="menu">
                    <Menu/>
                </div>

                {(filteredData.length == 0)?
                  <div className="not-found">
                      <img className="not-found-image" src={require("../Assets/not_found.png")}
                           alt="logo-flipsy-cartas"/>
                  </div>
                  :
                <div className='list-main-container'>
                    <List
                        itemLayout="horizontal"
                        dataSource={filteredData}
                        renderItem={item => (
                            (item.idUser == state.in_session_data.uid || isBeingObserved(item)) || (!item.public)
                                ?
                            <div />
                                :
                            <List.Item>
                                <List.Item.Meta
                                    color="white"
                                    avatar={
                                        <div className="mini-deck" onClick={() => openDeck(item.idFcg, item.title)}>
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
              }

                <Footer className="footer">
                    <img className = "footer-item" src={require("../Assets/home.svg")} alt="Home" onClick={() => props.history.push('home')}/>
                    <img className = "footer-item" src={require("../Assets/cards.svg")} alt="Flashcards" onClick={() => props.history.push({pathname: 'decks', state: {decks_type : "owned"}})}/>
                    <img className = "footer-item-selected" src={require("../Assets/search-selected.svg")} alt="Search" onClick={() => props.history.push('search-category')}/>
                    <Badge count={5}> <img className = "footer-item" src={require("../Assets/Notification.svg")} alt="Notificaciones" onClick={() => props.history.push('questionnaires-list')}/> </Badge>
                </Footer>
            </Layout>
        </div>
    )
}

export default SearchDecks

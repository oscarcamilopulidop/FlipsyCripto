import React, {useContext, useEffect, useState} from 'react'
import {Avatar, Button, Card, Input, Layout, List} from 'antd'
import '../Styles/SearchDecks.css'
import '../Styles/Home.css'
import Menu from "./Menu";
import Context from "../GlobalState/context";
import {Auth} from "aws-amplify";
import {useMutation, useQuery} from "@apollo/react-hooks";
import {gql} from "apollo-boost";
import Swal from "sweetalert2";

const { Header, Footer} = Layout;

const GET_DECKS = gql`
    query Search($id: String) {
        CAT(name: $id) {
            fcg {
                title
                idFcg
                idUser
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

    const[searchDeck, setSearchDeck] = useState({
        category: "",
    })

    const { loading, error, data } = useQuery(GET_DECKS,
        {variables:{
                    id:  props.location.state.category//"8e472c4b-0e05-4d81-b017-01dc7a1be9f3"
        },
        pollInterval: 500,


    });

    if (!loading) {
        // data.filter((item,i) => {
        //     console.log(item)
        // })
        console.log(typeof (data))
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

    return (
        loading ?
            <div />
            :
        <div className='searcher-main-container'>
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
                            item.idUser == state.in_session_data.uid
                                ?
                            <div />
                                :
                            <List.Item>
                                <List.Item.Meta
                                    color="white"
                                    avatar={
                                        <div className="mini-deck">
                                            <img className = "img-card"  src={require("../Assets/logo-cartas.svg")} alt="logo-flipsy-cartas"/>
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
                    <img className = "footer-item" src={require("../Assets/Notification.svg")} alt="Notificaciones" onClick={() => props.history.push('')}/>
                </Footer>
            </Layout>
        </div>
    )
}

export default SearchDecks

import React, {useContext, useEffect} from 'react'
import {Button, List, Card, Layout, Select} from 'antd'
import '../Styles/Decks.css'
import '../Styles/Home.css'
import Menu from "./Menu";
import Context from "../GlobalState/context";
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost';
import { Auth } from 'aws-amplify'
import Swal from 'sweetalert2'

const { Header, Footer} = Layout;
const { Option } = Select;

const GET_DECKS = gql`
  query Search($id: String!) {
      FCGroup(idUser: $id)  {
            idFcg, title
      }
  }`;



const Decks = (props) => {
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

    const { state, actions } = useContext(Context);
    const uid = state.in_session_data.uid;
    console.log(uid);
    const { loading, data } = useQuery(GET_DECKS,
        {variables:{
                id: uid //"8e472c4b-0e05-4d81-b017-01dc7a1be9f3"
            },
            pollInterval: 500,
    });

    if (!loading) { console.log(data) }

    const show = () => {
        console.log(state.user_credentials);
        console.log(data.USER[0]);
    };

    const openDeck = (idFcg,title) => {
        console.log(idFcg);
        actions({
            type: "setState",
            payload: {
                ...state, current_deck:
                    { ...state.current_deck,
                        id: idFcg,
                        title: title
                    }
            }
        });

        props.history.push('cards-creation')
    };


    const deleteDeck = idFcg => {
        Swal.fire({
            title: 'Seguro que desea eliminar la baraja?',
            type: 'warning',
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                console.log("AQUÍ DEBERÍA BORRAR LA BAEAJA "+idFcg);
                Swal.fire(
                    '',
                    'Su baraja ha sido eliminada.',
                    'success'
                )
            }
        })
    };

    const handleChange = () => {
        console.log("mostrando barajas ")
    };

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

    return (
        loading ?
            <div />
            :
        <div className='decks-main-container'>
            <Layout>

                <Header className = "header">
                    <img className = "logo" src={require("../Assets/FlipsyBlanco.svg")} alt="Notificaciones" onClick={() => props.history.push('home')}/>
                    <img className = "notifications" src={require("../Assets/menu-button.svg")} alt="Notificaciones" onClick={ShowSideMenu}/>
                </Header>
                <div className="home-menu-collapse" id="menu">
                    <Menu/>
                </div>
                <div className="decks-container">
                    <h1 onClick={show}>Barajas</h1>

                    <div className="select-container">
                        <Select defaultValue="Propias" style={{ width: '60%'}} onChange={handleChange}>
                            <Option value="Propias">Propias</Option>
                            <Option value="Compartidas">Compartidas conmigo</Option>
                        </Select>
                    </div>

                    <Button onClick={() => props.history.push('deck-creation')} className="new-card" type="dashed" ghost>
                        Nueva
                        <br/>
                        Baraja
                        <br/>
                        +
                    </Button>
                    <List
                        grid={{ gutter: 10, column: 3 }}
                        dataSource={data.FCGroup}
                        renderItem={item => (
                            <List.Item>
                                <img className = "edit-button" src={require("../Assets/edit-white.svg")}  onClick={() => props.history.push('deck-creation')} alt="delete-button"/>
                                <img className = "delete-button" src={require("../Assets/delete.svg")}  onClick={() => deleteDeck(item.idFcg)} alt="delete-button"/>
                                <Card title=" " onClick={() => openDeck(item.idFcg,item.title)}>
                                    <img className = "img-card"  src={require("../Assets/logo-cartas.svg")} alt="logo-flipsy-cartas"/>
                                    {item.title}
                                </Card>
                            </List.Item>
                        )}
                    />
                    ,
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
};

export default Decks

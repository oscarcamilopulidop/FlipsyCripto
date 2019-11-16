import React, {useContext, useEffect, useState} from 'react'
import {Avatar, Button, Card, Input, Layout, List} from 'antd'
import '../Styles/SearchFlashCards.css'
import '../Styles/Home.css'
import ProfileList from "./ProfileList";
import Menu from "./Menu";
import Context from "../GlobalState/context";
import {Auth} from "aws-amplify";
import {useQuery} from "@apollo/react-hooks";
import {gql} from "apollo-boost";

const { Header, Footer} = Layout;

// const GET_DECKS = gql`
//     query Search($id: String) {
//         CAT(name: $id) {
//             fcg {
//                 title
//             }
//     }
// }`;

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

    // const { loading, error, data } = useQuery(GET_DECKS,
    //     {variables:{
    //                 id:  searchDeck.category//"8e472c4b-0e05-4d81-b017-01dc7a1be9f3"
    //     },
    //     pollInterval: 500,
    // });
    //
    // if (!loading) { console.log(data) }

    const toSearch = () => {
        dataTemp1.push({
            name: 'testing',
        })
        console.log(searchDeck.category);
        console.log(dataTemp1);

    }

    const dataTemp1 = [
        {
            name: 'Baraja de Ronald',
        },
        {
            name: 'Baraja de Organista',
        },
        {
            name: 'Baraja de Maria',
        },
    ];

    const dataTemp2 = [
        {
            name: 'Baraja de Cristian'
        },
        {
            name: 'Baraja de Brayan',
        },
    ]
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
        <div className='searcher-main-container'>
            <Layout>

                <Header className = "header">
                    <img className = "logo" src={require("../Assets/FlipsyBlanco.svg")} alt="Notificaciones" onClick={() => props.history.push('home')}/>
                    <img className = "notifications" src={require("../Assets/menu-button.svg")} alt="Notificaciones" onClick={ShowSideMenu}/>
                </Header>
                <div className="home-menu-collapse" id="menu">
                    <Menu/>
                </div>
                <div className="search-container">
                    <Search
                        placeholder="Tema"
                        onSearch={toSearch}
                        onChange={e=>setSearchDeck({...searchDeck,category: e.target.value})}
                        size="large"
                        enterButton />
                </div>

                <div className='list-main-container'>
                    <List
                        itemLayout="horizontal"
                        dataSource={dataTemp1}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    color="white"
                                    avatar={
                                        <Card title=" " onClick={() => console.log("baraja ...")}>
                                            <img className = "img-card"  src={require("../Assets/logo-cartas.svg")} alt="logo-flipsy-cartas" height="15" width="15"/>
                                        </Card>
                                    }
                                    title={item.name}
                                />
                                <Button
                                    type="primary"
                                    shape="circle"
                                    size={"large"}
                                    onClick={() => console.log("wait") }>
                                    +
                                </Button>
                            </List.Item>
                        )}
                    />
                </div>

                <Footer className="footer">
                    <img className = "footer-item" src={require("../Assets/home.svg")} alt="Home" onClick={() => props.history.push('home')}/>
                    <img className = "footer-item" src={require("../Assets/cards.svg")} alt="Flashcards" onClick={() => props.history.push('decks')}/>
                    <img className = "footer-item-selected" src={require("../Assets/search-selected.svg")} alt="Search" onClick={() => props.history.push('search')}/>
                    <img className = "footer-item" src={require("../Assets/profile.svg")} alt="Profile" onClick={() => props.history.push('')}/>
                    <img className = "footer-item" src={require("../Assets/Notification.svg")} alt="Notificaciones" onClick={() => props.history.push('')}/>
                </Footer>
            </Layout>
        </div>
    )
}

export default SearchDecks
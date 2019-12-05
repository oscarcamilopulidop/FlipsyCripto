import React, {useContext, useEffect} from 'react'
import {Avatar, Layout, List} from 'antd'
import '../Styles/CategoryDecks.css'
import '../Styles/Home.css'
import Menu from "./Menu";
import Context from "../GlobalState/context";
import {Auth} from "aws-amplify";
import { Badge} from 'antd';

const { Header, Footer} = Layout;

const CategoryDecks = props => {

    const data = [
        {
            cat: 'Matematicas',
            title: 'Matemáticas'
        },
        {
            cat: 'Quimica',
            title: 'Química'
        },
        {
            cat: 'Fisica',
            title: 'Física'
        },
        {
            cat: 'Biologia',
            title: 'Biología'
        }
    ];

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

    const open = (cat,name) => {
        console.log("abriendo " + name +" " + cat)
        props.history.push({
            pathname: 'search-deck',
            search: cat,
            state: {
                category: cat,
            }
        });
    };

    const selectImg =(cat) => {
        switch (cat) {
            case 'Matemáticas':
                return require("../Assets/pi-blue.svg");
                break;
            case 'Química':
                return require("../Assets/chemistry-blue.svg");
                break;
            case 'Física':
                return require("../Assets/physics-blue.svg");
                break;
            case 'Biología':
                return require("../Assets/biology-blue.svg");
            default:

        }
    };

    return (
        <div className='category-main-container'>
            <Layout>

                <Header className = "header">
                    <img className = "logo" src={require("../Assets/FlipsyBlanco.svg")} alt="Notificaciones" onClick={() => props.history.push('home')}/>
                    <img className = "notifications" src={require("../Assets/menu-button.svg")} alt="Notificaciones" onClick={ShowSideMenu}/>
                </Header>
                <div className="home-menu-collapse" id="menu">
                    <Menu/>
                </div>

                <div className='list-main-container-category'>

                    <List
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={item => (
                            <List.Item className="item-quest-category" onClick={()=>open(item.cat,item.title)}>
                                <List.Item.Meta
                                    color="white"
                                    avatar={<Avatar size={64} src={selectImg(item.title)} />}
                                    title={item.title}
                                />
                                <img className = "play-questionnaire-category" src={require("../Assets/play-blue.svg")} alt="play"/>
                            </List.Item>
                        )}
                    />
                </div>

                <Footer className="footer">
                    <img className = "footer-item" src={require("../Assets/home.svg")} alt="Home" onClick={() => props.history.push('home')}/>
                    <img className = "footer-item" src={require("../Assets/cards.svg")} alt="Flashcards" onClick={() => props.history.push('decks')}/>
                    <img className = "footer-item-selected" src={require("../Assets/search-selected.svg")} alt="Search" onClick={() => props.history.push('search-category')}/>
                    <Badge count={5}> <img className = "footer-item" src={require("../Assets/Notification.svg")} alt="Notificaciones" onClick={() => props.history.push('questionnaires-list')}/> </Badge>
                </Footer>
            </Layout>
        </div>
    )
};

export default CategoryDecks

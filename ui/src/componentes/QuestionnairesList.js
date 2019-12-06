import React, {useContext, useEffect} from 'react'
import {Avatar, Layout, List} from 'antd'
import '../Styles/QuestionnairesList.css'
import '../Styles/Home.css'
import Menu from "./Menu";
import Context from "../GlobalState/context";
import {Auth} from "aws-amplify";
import { Badge} from 'antd';
import NavBar from "./NavBar";

const { Header, Footer} = Layout;

const QuestionnairesList = props => {

    const data = [
        {
            cat: 'Matemáticas',
            title: 'Sumas'
        },
        {
            cat: 'Química',
            title: 'Quirales'
        },
        {
            cat: 'Física',
            title: 'Newton'
        },
        {
            cat: 'Biología',
            title: 'Reinos'
        },
        {
            cat: 'Matemáticas',
            title: 'Multiplicaciones'
        },
        {
            cat: 'Química',
            title: 'Reacciones'
        },
        {
            cat: 'Física',
            title: 'Hooke'
        },
        {
            cat: 'Biología',
            title: 'Celula'
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
        props.history.push('question')
    };

    const selectImg =(cat) => {
        switch (cat) {
            case 'Matemáticas':
                return require("../Assets/pi.svg");
                break;
            case 'Química':
                return require("../Assets/chemistry.svg");
                break;
            case 'Física':
                return require("../Assets/physics.svg");
                break;
            case 'Biología':
                return require("../Assets/biology.svg");
            default:

        }
    };

    return (
        <div className='questionnaires-main-container'>
            <Layout>

                <NavBar className = "nav-web"></NavBar>
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
                        dataSource={data}
                        renderItem={item => (
                            <List.Item className="item-quest" onClick={()=>open(item.cat,item.title)}>
                                <List.Item.Meta
                                    color="white"
                                    avatar={<Avatar size={64} src={selectImg(item.cat)} />}
                                    title={item.title}
                                />
                                 <img className = "play-questionnaire" src={require("../Assets/play-white.svg")} alt="play"/>
                            </List.Item>
                        )}
                    />
                </div>

                <Footer className="footer">
                    <img className = "footer-item" src={require("../Assets/home.svg")} alt="Home" onClick={() => props.history.push('home')}/>
                    <img className = "footer-item" src={require("../Assets/cards.svg")} alt="Flashcards" onClick={() => props.history.push('decks')}/>
                    <img className = "footer-item" src={require("../Assets/search.svg")} alt="Search"onClick={() => props.history.push('search-category')}/>
                    <Badge count={5}> <img className = "footer-item-selected" src={require("../Assets/Notification-selected.svg")} alt="Notificaciones" onClick={() => props.history.push('questionnaires-list')}/> </Badge>
                </Footer>
            </Layout>
        </div>
    )
};

export default QuestionnairesList

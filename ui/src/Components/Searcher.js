import React from 'react'
import {Input, Layout} from 'antd'
import '../Styles/Searcher.css'
import '../Styles/Home.css'
import ProfileList from "./ProfileList";
import Menu from "./Menu";

const { Header, Footer} = Layout;

const Searcher = props => {

    const toSearch = () => {

    };

    const { Search } = Input;

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
                        placeholder="Busca a tus amigos"
                        onSearch={toSearch}
                        size="large"
                        enterButton />
                </div>

                <ProfileList />

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
};

export default Searcher
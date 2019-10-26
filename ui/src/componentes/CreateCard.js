import React, {Component} from 'react';
import CardContent from '@material-ui/core/CardContent';
import { Layout } from 'antd';
import ReactCardFlip from 'react-card-flip'
import '../Styles/Home.css'
import '../Styles/CreateCard.css'
import '../App.css';

const { Header, Footer, Sider, Content } = Layout;

const CreateCard  = props => {

    const constructor = () => {
        this.state = {
            isFlipped: false
        };
        this.handleClick = this.handleClick.bind(this);
    }


    const handleClick = (e) => {
        e.preventDefault();
        this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
    }

    const handleChange = value => {
        this.setState({ mdeValue: value });
    };

        return (
            <Layout className="layout">
                <Header className = "header">
                    <img className = "logo" src={require("../Assets/FlipsyBlanco.svg")} onClick={() => props.history.push('home')}/>
                    <img className = "notifications" src={require("../Assets/menu-button.svg")} alt="Notificaciones"onClick={() => props.history.push('menu')} />
                </Header>
                <form className="content" action="" method="post">
                    <div className="add-deck">
                        Matemáticas I
                    </div>
                    <div className="cart-header">
                        <img className="delete" src={require("../Assets/add-icon.svg")} height="17" width="17"/>
                        <img className="delete" src={require("../Assets/add-image.svg")} height="17" width="17"/>
                        <div className="text-styles">
                            <img className="delete" src={require("../Assets/center-alignment.svg")} height="17" width="17"/>
                            <img className="delete" src={require("../Assets/left-align.svg")} height="17" width="17"/>
                        </div>
                        <div className="text-styles">
                            <img className="delete" src={require("../Assets/bold.svg")} height="17" width="17"/>
                            <img className="delete" src={require("../Assets/italic.svg")} height="17" width="17"/>
                            <img className="delete" src={require("../Assets/underline.svg")} height="17" width="17"/>
                        </div>
                        <img className="delete" src={require("../Assets/delete-gray.svg")} height="17" width="17"/>
                    </div>
                    <div className="">
                        Parte Frontal:
                        <textarea  class="textarea text-area flip-card"
                            onChange={handleChange}
                        />
                        <br/>
                        Parte posterior:
                        <textarea  class="textarea text-area flip-card"
                                   onChange={handleChange}
                        />
                    </div>
                </form>

                <Footer className="footer">
                    <img className = "footer-item-selected" src={require("../Assets/home-selected.svg")} alt="Home" onClick = "" onClick={() => props.history.push('home')}/>
                    <img className = "footer-item" src={require("../Assets/friends.svg")} alt="Friends"/>
                    <img className = "footer-item" src={require("../Assets/search.svg")} alt="Search" onClick={() => props.history.push('search')}/>
                    <img className = "footer-item" src={require("../Assets/profile.svg")} alt="Profile"/>
                    <img className = "footer-item" src={require("../Assets/Notification.svg")} alt="Notificaciones"/>
                </Footer>
            </Layout>
        );

}
export default CreateCard
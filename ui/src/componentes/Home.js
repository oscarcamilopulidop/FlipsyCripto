import React, { useState, useEffect, useContext } from 'react'
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import Context from '../GlobalState/context'
import { withRouter } from 'react-router-dom'
import '../Styles/Home.css'
import '../Styles/CardsPreview.css'
import { Button, Modal, Input } from 'antd';
import Menu from "./Menu";
import { Auth } from 'aws-amplify'
import { Badge} from 'antd';
import ReactCardFlip from "react-card-flip";

const { Search } = Input;
const { Header, Footer, Content } = Layout;

const Home = props => {
    const [userId, setUserId] = useState("")
    const [show, setShow] = useState(true)
    const [isFlipped0, setFlipped0] = useState(true)
    const [isFlipped1, setFlipped1] = useState(true)
    const [isFlipped2, setFlipped2] = useState(true)
    const [current, setCurrent] = useState(0)
    const { state, actions } = useContext(Context)

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
        <Layout className="home-container">
            <Header className = "header">
                <img className = "logo" src={require("../Assets/FlipsyBlanco.svg")} alt="Notificaciones" onClick={() => props.history.push('home')}/>
                <img className = "notifications" src={require("../Assets/menu-button.svg")} alt="Notificaciones" onClick={ShowSideMenu}/>
            </Header>
            <div className="home-menu-collapse" id="menu">
                <Menu/>
            </div>
            <Content className="content">
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

                <div className = "search">
                    <Search
                        placeholder="Busca una baraja..."
                        onSearch={value => console.log(value)}
                    />
                </div>

                <div className="add-deck"  onClick={() => props.history.push('deck-creation')}>
                    + Nueva baraja
                </div>

                <div className="deck" onClick={() => props.history.push('decks')}>
                   <div className="bottom">
                       Barajas
                   </div>
                </div>

                <div className="outside-container">
                    <div className="card">
                    </div>
                    <img className="circular" src ="https://www.dzoom.org.es/wp-content/uploads/2011/08/insp-cuadradas-13.jpg" height="100" width="100"/>
                    <div className="text-container">
                        <span className="text"> <span className="link"> Juanita suarez </span> ha creado una nueva baraja <span className="link"> Matemáticas </span> </span>
                    </div>
                </div>

                <div className="outside-container">
                    <img className="circular" src ="https://static.ellahoy.es/ellahoy/fotogallery/845X0/459517/cortes-de-cabello-apra-cara-cuadrada-2017.jpg" height="100" width="100"/>
                    <div className="text-container">
                        <span className="text"> <span className="link" onClick={() => console.log(state.in_session_data.uid)} > Andrés Felipe Ortíz </span> ha aceptado tu invitación de amistad</span>
                    </div>
                </div>

                <div className="outside-container">
                    <div className="card">
                    </div>
                    <img className="circular" src ="http://cdn3.upsocl.com/wp-content/uploads/2016/05/18-24.jpg" height="100" width="100"/>
                    <div className="text-container">
                        <span className="text"> <span className="link"> Juan Carlos Castellanos </span> ha compartido contigo su baraja <span className="link"> Música Instrumental </span> </span>
                    </div>
                </div>
                <div className="outside-container">

                </div>

            </Content>
            <Footer className="footer">
                <img className = "footer-item-selected" src={require("../Assets/home-selected.svg")} alt="Home" onClick={() => props.history.push('home')}/>
                <img className = "footer-item" src={require("../Assets/cards.svg")} alt="Flashcards" onClick={() => props.history.push('decks')}/>
                <img className = "footer-item" src={require("../Assets/search.svg")} alt="Search" onClick={() => props.history.push('search')}/>
                <img className = "footer-item" src={require("../Assets/profile.svg")} alt="Profile" onClick={() => props.history.push('')}/>
                <Badge count={5}> <img className = "footer-item" src={require("../Assets/Notification.svg")} alt="Notificaciones" onClick={() => props.history.push('questionnaires-list')}/> </Badge>
            </Footer>
        </Layout>
    )
}

export default withRouter(Home)

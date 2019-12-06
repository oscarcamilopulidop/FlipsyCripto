import React, { useContext, useEffect, useState} from 'react';
import { Layout, Button } from 'antd';
import '../Styles/Home.css'
import '../Styles/CreateCard.css'
import '../App.css';
import Menu from "./Menu";
import Context from "../GlobalState/context";
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost';
import moment from "moment";
import { Auth } from 'aws-amplify'
import { Badge } from 'antd';
import NavBar from "./NavBar";


const { Header, Footer } = Layout;

const CreateCard  = props => {
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

    const { state, actions } = useContext(Context);

    const [flashCard_data, setFlashCard_data] = useState(  {
        idFc: (Math.random() * 1000000).toString(),
        front: '',
        back: '',
        lastModifyDate: moment().unix().toString(),
        creationDate: moment().unix().toString(),
        idFCG: props.location.state.idFcg,
    });

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

    const [CreateCardInNeo4j] = useMutation(gql`
        mutation Create(
            $idFc: ID
            $front: String!
            $back: String!
            $lastModifyDate: String!
            $creationDate: String!
            $idFCG: String!
        ){
            CreateFC(
                idFc: $idFc,
                front: $front,
                back: $back,
                lastModifyDate: $lastModifyDate,
                creationDate: $creationDate,
                idFCG: $idFCG,
            ){
                idFc, front, back, lastModifyDate, creationDate, idFCG
            }
        }
    `);

    const UpdateInfo = () => {
        console.log(flashCard_data);
    };

    const SendQuery = () => {
      UpdateInfo();
      console.log(flashCard_data)
      try {
          CreateCardInNeo4j({
              variables: {
                  idFc: flashCard_data.idFc,
                  front: flashCard_data.front,
                  back: flashCard_data.back,
                  lastModifyDate: flashCard_data.lastModifyDate,
                  creationDate: flashCard_data.creationDate,
                  idFCG: flashCard_data.idFCG,
              }
          }).then(res => {
              console.log(res.data)
              console.log(props)

              props.history.push({
                pathname: 'cards-creation',
                search: props.location.state.idFcg,
                state: {
                  idFcg: flashCard_data.idFCG,
                  title: props.location.state.title
                }
              })
          })
      }catch (err) {
          console.log(err);
      }
    };


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
            <Layout className="layout">
                <NavBar className = "nav-web"></NavBar>
                <Header className = "header">
                    <img className = "logo" src={require("../Assets/FlipsyBlanco.svg")} alt="Notificaciones" onClick={() => props.history.push('home')}/>
                    <img className = "notifications" src={require("../Assets/menu-button.svg")} alt="Notificaciones" onClick={ShowSideMenu}/>
                </Header>
                <div className="home-menu-collapse" id="menu">
                    <Menu/>
                </div>
                 <form className="content" action="" method="post">
                    <div className="center">
                        <div className="desk-creation-title">
                            <h1>Crear Carta</h1>
                        </div>
                    </div>
                    <div className="cart-side">
                        <h3 onClick={() => console.log(props.location.state)}>Parte Frontal:</h3>
                        {/*
                        <Button size="large" type="primary" shape="round" icon="plus-circle-o">
                            Imagen opcional
                        </Button>
                        */}
                        <textarea  className="text-area flip-card"
                                   onChange={e => setFlashCard_data({ ...flashCard_data, front: e.target.value})}
                        />
                    </div>
                    <div className="cart-side">
                        <h3>Parte Posterior:</h3>
                        {/*
                        <Button size="large" type="primary" shape="round" icon="plus-circle-o">
                            Imagen opcional
                        </Button>
                        */}
                        <textarea  className="text-area flip-card"
                                   onChange={e => setFlashCard_data({ ...flashCard_data, back: e.target.value})}
                        />
                    </div>]
                    <div className="deck-creation-button-final">
                        <Button size="large" type="primary" onClick={SendQuery}>
                            Crear
                        </Button>
                    </div>
                </form>

                <Footer className="footer">
                    <img className = "footer-item" src={require("../Assets/home.svg")} alt="Home" onClick={() => props.history.push('home')}/>
                    <img className = "footer-item-selected" src={require("../Assets/cards-selected.svg")} alt="Flashcards" onClick={() => props.history.push('decks')}/>
                    <img className = "footer-item" src={require("../Assets/search.svg")} alt="Search" onClick={() => props.history.push('search-category')}/>
                    <Badge count={5}> <img className = "footer-item" src={require("../Assets/Notification.svg")} alt="Notificaciones" onClick={() => props.history.push('questionnaires-list')}/> </Badge>
                </Footer>
            </Layout>
        );

};
export default CreateCard

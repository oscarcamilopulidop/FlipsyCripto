import React, {Component, useContext, useEffect, useState} from 'react';
import CardContent from '@material-ui/core/CardContent';
import { Layout, Button } from 'antd';
import ReactCardFlip from 'react-card-flip'
import '../Styles/Home.css'
import '../Styles/CreateCard.css'
import '../App.css';
import Menu from "./Menu";
import Context from "../GlobalState/context";
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost';
import moment from "moment";
import { Auth } from 'aws-amplify'


const { Header, Footer, Sider, Content } = Layout;

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

    const [flashCard, setFlashCard] = useState(  {
        front: '',
        back: '',
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

        // from: _FCGroupInput!
        // to: _FCInput!

    const [temp, { data_ }] = useMutation(gql`
        mutation Create($idFcg: ID!, $idFc: ID!){
            AddFCContatins(from:{
                idFcg:$idFcg
            },to:{
                idFc:$idFc
            }){from{idUser}}
        }
    `)

    const [CreateCardInNeo4j, { data }] = useMutation(gql`
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
                idFcg: $idFCG,
            ){
                idFcg, front, back, lastModifyDate, creationDate, idFcg
            }
        }
    `);

    const UpdateInfo = () => {
        const { idFc, front, back } = flashCard;
        const { id } = state.user_credentials;
        console.log(state.user_credentials);
        actions({
            type: "setState",
            payload: {
                ...state, flashCard:
                    { ...state.flashCard,
                        idFc: (Math.random() * 1000000).toString(),
                        front: flashCard.front,
                        back: flashCard.back,
                    }
            }
        });

        //console.log(state.current_deck.id);
    };

    const SendQuery = () => {
      UpdateInfo()
      console.log(state.flashCard)
      console.log(state.current_deck)
      props.history.push('cards-creation')

      try {
          CreateCardInNeo4j({
              variables: {
                  idFc: state.flashCard.idFc,
                  front: state.flashCard.front,
                  back: state.flashCard.back,
                  lastModifyDate: moment().unix().toString(),
                  creationDate: moment().unix().toString(),
                  idFCG: state.current_deck.id.toString(),
              }
          }).then(res => {
              console.log(res.data)

              // props.history.push('decks')
          })
      }catch (e) {

      }try {
          temp({
              variables: {
                  idFcg: state.current_deck.id.toString(),
                  idFc: state.flashCard.idFc,
              }
          }).then((res => {
              // props.history.push('decks');
          }))
      }catch (e) {
          console.log(e);
      }
    }


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
                <Header className = "header">
                    <img className = "logo" src={require("../Assets/FlipsyBlanco.svg")} alt="Notificaciones" onClick={() => props.history.push('home')}/>
                    <img className = "notifications" src={require("../Assets/menu-button.svg")} alt="Notificaciones" onClick={ShowSideMenu}/>
                </Header>
                <div className="home-menu-collapse" id="menu">
                    <Menu/>
                </div>
                <form className="content" action="" method="post">
                    <div className="add-deck" onClick={UpdateInfo}>
                        Matemáticas I
                    </div>
                    <div className="">
                        Parte Frontal:
                        <br/>
                        <textarea  className="text-area flip-card"
                                   onChange={e => setFlashCard({ ...flashCard, front: e.target.value})}
                        />
                        Parte posterior:
                        <br/>
                        <textarea  className="text-area flip-card"
                                   onChange={e => setFlashCard({ ...flashCard, back: e.target.value})}
                        />
                    </div>
                    <Button onClick={SendQuery}>
                        Aceptar
                    </Button>
                </form>

                <Footer className="footer">
                    <img className = "footer-item" src={require("../Assets/home.svg")} alt="Home" onClick={() => props.history.push('home')}/>
                    <img className = "footer-item-selected" src={require("../Assets/cards-selected.svg")} alt="Flashcards" onClick={() => props.history.push('decks')}/>
                    <img className = "footer-item" src={require("../Assets/search.svg")} alt="Search" onClick={() => props.history.push('search')}/>
                    <img className = "footer-item" src={require("../Assets/profile.svg")} alt="Profile" onClick={() => props.history.push('')}/>
                    <img className = "footer-item" src={require("../Assets/Notification.svg")} alt="Notificaciones" onClick={() => props.history.push('')}/>
                </Footer>
            </Layout>
        );

}
export default CreateCard

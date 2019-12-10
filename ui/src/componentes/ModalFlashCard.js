import React, {useContext, useEffect, useState} from 'react'
import {Avatar, Button, Card, Input, Layout, List, Modal} from 'antd'
import '../Styles/Home.css'
import Menu from "./Menu";
import Context from "../GlobalState/context";
import {Auth} from "aws-amplify";
import {useMutation, useQuery} from "@apollo/react-hooks";
import {gql} from "apollo-boost";
import Swal from "sweetalert2";
import { Badge} from 'antd';
import ReactCardFlip from "react-card-flip";
import NavBar from "./NavBar";


const { Header, Footer} = Layout;

const GET_FLASHCARDS = gql`
    query Seacrh($id: String!) {
        FC(idFCG: $id)  {
            idFc, front, back
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


const ModalFlashCard = props => {
    const { state, actions } = useContext(Context);

    const [show, setShow] = useState(false)
    const [isFlipped, setIsFlipped] = useState(false);
    const [current, setCurrent] = useState(0)

    const dataFC = [{front: 'Texto de prueba frontal 1', back: 'Texto de prueba posterior 1'},
        {front: 'Texto de prueba frontal 2', back: 'Texto de prueba posterior 2'},
        {front: 'Texto de prueba frontal 3', back: 'Texto de prueba posterior 3'},
        {front: 'Texto de prueba frontal 4', back: 'Texto de prueba posterior 4'},
    ];

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


    const { loading, data } = useQuery(GET_FLASHCARDS,
        {variables:{
                id: state.actually_deck.idFcg//"8e472c4b-0e05-4d81-b017-01dc7a1be9f3" //props.location.state.idFcg //
            },
            pollInterval: 500,
        });
    if (!loading) { console.log(data) }

    const { Search } = Input;

    var flag = false;

    const Cancel = () => {
        actions({
            type: 'setState',
            payload: {...state, actually_deck: {...state.actually_deck,show:false}}
        })
    }


    const getFirstCards = () => {
        return(
            data.FC.length == 0 ? <div/>:
            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                <div className="primary-card-preview"  key="front" onClick={() => setIsFlipped(true)}>
                    {data.FC[current].front}
                </div>
                <div className="primary-card-preview"  key="back" onClick={() => setIsFlipped(false)}>
                    {data.FC[current].back}
                </div>
            </ReactCardFlip>);
    };

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

    const nextCard = () => {
        console.log('current card: '+current);
        console.log('current len: '+data.FC.length);
        if(current + 1 < data.FC.length){
            setCurrent((1+current));
        }
        console.log('next card: '+current)
    };

    const prevCard = () => {
        console.log('current card: '+current);
        if(current > 0){
            setCurrent(current-1);
        }
        console.log('prev card: '+current)
    };

    const getLeftArrow = () => {
        if(current == 0){
            return require("../Assets/prev-card-gray.svg");
        }else{
            return require("../Assets/prev-card.svg");
        }
    };

    const getRightArrow = () => {
        if(current == data.FC.length-1){
            return require("../Assets/next-card-gray.svg");
        }else{
            return require("../Assets/next-card.svg");
        }
    };

    const handleClick = (e) => {
        e.preventDefault();
        setIsFlipped(!isFlipped)
    };

    return (
        loading ?
            <div />
            :
            <div>
                <div className="title-preview">
                    {state.actually_deck.title} {current+1} / {data.FC.length}
                </div>
                <div className="preview-cards-container">
                    <img className="arrow-study" src={require("../Assets/prev-card.svg")} onClick={prevCard} />
                    {getFirstCards()}
                    <img className="arrow-study" src={require("../Assets/next-card.svg")} onClick={nextCard} />
                </div>
                <div className="preview-cards-container">
                    <Button onClick={Cancel}>
                        Cancelar
                    </Button>
                    <Button type="primary" icon="plus" onClick={() => addDeck(123)}>
                        Agregar
                    </Button>
                </div>
            </div>
    )
};

export default ModalFlashCard

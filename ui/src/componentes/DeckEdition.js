import React, { useState, useEffect, useContext } from 'react'
import 'antd/dist/antd.css';
import { Layout, Button, Form,Select, Input, AutoComplete, Icon} from 'antd';
import Context from '../GlobalState/context'
import '../Styles/DeckCreation.css'
import Menu from "./Menu";
import { useMutation } from '@apollo/react-hooks'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost';
import moment from "moment";
import { Badge} from 'antd';

const { Header, Footer, Content } = Layout;

const GET_DECKS_INFO = gql`
  query Search($id: ID!) {
      FCGroup(idFcg: $id)  {
            idFcg, title, public, idCat, creationDate
      }
  }`;

function log(e) {
    console.log(e);
}

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

const types = [
    {value: 'privada', label: 'privada'},
    {value: 'publica', label: 'publica'}
];

const DeckEdition = props => {

  const [localData, setLocalData] = useState([])

  const [UpdateDeckInNeo4j, { variables }] = useMutation(gql`
      mutation Update(
          $idFcg: ID!,
          $idCat: String!,
          $idScat: String!,
          $title: String!,
          $public_: Boolean!,
          $lastModifyDate: String!,
      ){
          UpdateFCGroup(
              idFcg: $idFcg,
              idCat: $idCat,
              idScat: $idScat,
              title: $title,
              public: $public_,
              lastModifyDate: $lastModifyDate,
          ){
              idFcg, idUser, idCat, idScat, title, public, lastModifyDate
          }
      }
  `);

  const { state, actions } = useContext(Context);
  const uid = state.in_session_data.uid
  const { loading, error, data } = useQuery(GET_DECKS_INFO,
        {variables:{
                id:  props.location.state.idFcg
            }
    });

    useEffect( () => {
      !loading && setLocalData(data.FCGroup[0])

    }, [loading])

    var currtenDate = moment().unix();
    const dataSource = ['Matematicas', 'Quimica', 'Fisica', 'Biologia'];

    const { Option } = Select;

    const [selected, setSelected] = useState({ page: "Home"});

    function onSelect(value) {
        console.log('onSelect', value);
    }

    const show = () => {
        const uid = state.in_session_data.uid
        console.log(uid)
        console.log(state.user_credentials);
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

    const UpdateInfo = () => {
        try {
            UpdateDeckInNeo4j({
                variables: {
                    idFcg: localData.idFcg,
                    idCat: localData.idCat,
                    idScat: localData.idCat,
                    title: localData.title,
                    public_: localData.public_,
                    lastModifyDate: moment().unix().toString(),
                }
            }).then(res => {
                console.log(res.data)
                props.history.push('decks')
            })
        } catch (error) { console.log("error => ", error) }

    }

    return (
      loading ?
          <div />
          :
        <div className="deck-creation">
            <Layout>
                <Header className = "header">
                    <img className = "logo" src={require("../Assets/FlipsyBlanco.svg")} alt="Notificaciones" onClick={() => props.history.push('home')}/>
                    <img className = "notifications" src={require("../Assets/menu-button.svg")} alt="Notificaciones" onClick={ShowSideMenu}/>
                </Header>
                <div className="home-menu-collapse" id="menu">
                    <Menu/>
                </div>
                <Content className="content">
                    <div className="center">
                        <div className="desk-creation-title">
                            <h1>Actualizar Baraja</h1>
                        </div>
                        <div className="desk-creation-button">
                            <Button size="large" type="primary" shape="round" icon="plus-circle-o">
                                Foto opcional
                            </Button>
                        </div>
                    </div>

                    <div className="desk-creation-form">
                        <Form {...formItemLayout} >
                            <Form.Item label="Nombre">
                                <Input
                                    className="name-input"
                                    onChange={e => setLocalData({ ...localData, title: e.target.value})}
                                    placeholder="Nombre"
                                    value = {localData.title}
                                    onClick={show}
                                />
                            </Form.Item>
                            <Form.Item label="Tipo">
                                <Select placeholder="Seleccionar tipo"
                                        onChange={e => setLocalData({ ...localData, public_: (e === "publica")})}
                                >
                                    <Option value="publica">Publica</Option>
                                    <Option value="privada">Privada</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="Categoria" >
                                <AutoComplete
                                    className="category-input"
                                    placeholder="Buscar categoría"
                                    onChange={e => setLocalData({ ...localData, idCat: e, idScat: e})}
                                    onSelect={onSelect}
                                    dataSource={dataSource}
                                    value={localData.idCat}
                                >
                                    <Input
                                        suffix={
                                            <Button
                                                className="search-btn"
                                                style={{ marginRight: -12 }}
                                                type="primary"
                                            >
                                                <Icon type="search" />
                                            </Button>
                                        }
                                    />
                                </AutoComplete>
                            </Form.Item>
                        </Form>
                        <div className="deck-creation-button-final">
                           { <Button size="large" type="primary" onClick={UpdateInfo}>
                                Actualizar
                                    </Button>}
                        </div>
                    </div>

                </Content>

                <Footer className="footer">
                    <img className = "footer-item" src={require("../Assets/home.svg")} alt="Home" onClick={() => props.history.push('home')}/>
                    <img className = "footer-item-selected" src={require("../Assets/cards-selected.svg")} alt="Flashcards" onClick={() => props.history.push({pathname: 'decks', state: {decks_type : "owned"}})}/>
                    <img className = "footer-item" src={require("../Assets/search.svg")} alt="Search" onClick={() => props.history.push('search-category')}/>
                    <Badge count={5}> <img className = "footer-item" src={require("../Assets/Notification.svg")} alt="Notificaciones" onClick={() => props.history.push('questionnaires-list')}/> </Badge>
                </Footer>
            </Layout>
        </div>

    )
}

export default DeckEdition

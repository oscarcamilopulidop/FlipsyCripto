import React, { useState, useEffect, useContext } from 'react'
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Layout, Button, Form,Select, Tag, Input, AutoComplete, Icon} from 'antd';
import Context from '../GlobalState/context'
import { withRouter } from 'react-router-dom'
import '../Styles/DeckCreation.css'
import CardContent from "@material-ui/core/CardContent";

const { Search } = Input;
const { Header, Footer, Sider, Content } = Layout;
const data = [

];

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

const DeckCreation = props => {

    // const { state, actions } = useContext(Context);

    const [nameDesk, setName] = useState(  {
        nombre: '',
    });

    const [typeDesk, setTypeDesk] = useState({
        typeDesk: '',
    });

    const [categoryDesk, setCategoryDesk] = useState({
        categoryDesk: '',
    });

    const dataSource = ['Matematicas', 'Quimica', 'Fisica', 'Biologia'];

    function select(id) {

    }

    const { Option } = Select;

    const [selected, setSelected] = useState({ page: "Home"});

    const { state, actions } = useContext(Context);

    function onSelect(value) {
        console.log('onSelect', value);
    }

    return (
        <Layout>
            <Header className = "header">
                <img className = "logo" src={require("../Assets/FlipsyBlanco.svg")} alt="Notificaciones"/>
                <img className = "notifications" src={require("../Assets/menu-button.svg")} alt="Notificaciones"/>
            </Header>
            <Content className="content">
                <div className="center">
                    <div className="desk-creation-title">
                        <h1>Crear Baraja</h1>
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
                                onChange={e => setName({ ...nameDesk, nombre: e.target.value})}
                                placeholder="Nombre"
                            />
                        </Form.Item>
                        <Form.Item label="Tipo">
                            <Select placeholder="Seleccionar tipo">
                                <Option value="publica">Publica</Option>
                                <Option value="privada">Privada</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Categoria" >
                            <AutoComplete
                                className="category-input"
                                placeholder="Buscar categoría"
                                onSelect={onSelect}
                                dataSource={dataSource}
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
                            <Tag closable onClose={log}>
                                Tag 2
                            </Tag>

                        </Form.Item>
                    </Form>
                    <div className="desk-creation-button-final">
                        <Button size="large" type="primary" onClick={() => props.history.push('decks')}>
                            Crear
                        </Button>
                    </div>
                </div>

            </Content>

            <Footer className="footer">
                <img className = "footer-item-selected" src={require("../Assets/home-selected.svg")} alt="Home" onClick = ""/>
                <img className = "footer-item" src={require("../Assets/friends.svg")} alt="Friends"/>
                <img className = "footer-item" src={require("../Assets/search.svg")} alt="Search"/>
                <img className = "footer-item" src={require("../Assets/profile.svg")} alt="Profile"/>
                <img className = "footer-item" src={require("../Assets/Notification.svg")} alt="Notificaciones"/>
            </Footer>
        </Layout>
    )
}

export default withRouter(DeckCreation)
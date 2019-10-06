import React, { useState, useEffect, useContext } from 'react'
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Layout, Button, Form,Select, Tag, Input, AutoComplete} from 'antd';
import Context from '../GlobalState/context'
import { withRouter } from 'react-router-dom'
import '../Styles/DeskCreation.css'
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
const DeskCreation = props => {

    const [nameDesk, setName] = useState(  {
        nombre: '',
    })

    const [typeDesk, setTypeDesk] = useState({
        typeDesk: '',
    })

    const [categoryDesk, setCategoryDesk] = useState({
        categoryDesk: '',
    })

    function select(id) {

    }

    const { Option } = Select;

    const [selected, setSelected] = useState({ page: "Home"})

    const { state, actions } = useContext(Context)

    return (
        <Layout>
            <Header className = "header">
                <img className = "logo" src={require("../Assets/Logo-blanco.PNG")} alt="Notificaciones"/>
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
                            <Select>
                                <Option value="publica">Publica</Option>
                                <Option value="privada">Privada</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Categoria" >
                            <Search
                                className="category-input"
                                onChange={e => setCategoryDesk({ ...categoryDesk, categoria: e.target.value})}
                            />
                            <Tag closable onClose={log}>
                                Tag 2
                            </Tag>
                        </Form.Item>
                    </Form>
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

export default withRouter(DeskCreation)
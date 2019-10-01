import {List,Avatar,Button} from 'antd'
import React from 'react'
import '../Styles/ProfileList.css'
import Swal from 'sweetalert2'

const ProfileList = () => {

    const data = [
        {
            name: 'Ronald',
        },
        {
            name: 'Juan',
        },
        {
            name: 'Organista',
        },
        {
            name: 'Camilo',
        },
        {
            name: 'Maria',
        },
        {
            name: 'Cristian'
        },
        {
            name: 'Brayan',
        },
    ];

    const addFiend = (friendName) => {
        Swal.fire({
            type: 'success',
            text: "Has agregado a " + friendName,
        })
    }

    return (
        <div className='list-main-container'>

            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            color="white"
                            avatar={<Avatar size={64} icon="user" />}
                            title={item.name}
                        />
                        <Button
                            type="primary"
                            shape="circle"
                            size={"large"}
                            onClick={() => addFiend(item.name) }>
                            +
                        </Button>
                    </List.Item>
                )}
            />
        </div>
    )
};
export default ProfileList
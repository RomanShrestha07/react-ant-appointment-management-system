import {Table, Popconfirm, Button, Card, Col, Divider} from 'antd';
import AddUser from "./AddUser";

const Users = ({users, onUserDelete, onAddUser}) => {
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'Username',
            dataIndex: 'username',
            sortDirections: ['ascend'],
            sorter: (a, b) => a.username.localeCompare(b.username),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Actions',
            render: (text, record) => {
                return (
                    <Popconfirm title="Delete?" onConfirm={() => onUserDelete(record.id)}>
                        <Button>Delete</Button>
                    </Popconfirm>
                );
            },
        },
    ];

    return (
        <div style={{margin: 'auto'}}>
            <Col style={{margin: 'auto'}}>
                <Card title='Users'>
                    <AddUser onAddUser={onAddUser}/>

                    <Divider>List of Users</Divider>

                    <Table
                        columns={columns}
                        dataSource={users}
                        rowKey={record => record.id}
                        expandable={{
                            expandedRowRender: record => <p style={{margin: 0}}>{record.description}</p>,
                            rowExpandable: record => record.name !== 'Not Expandable',
                        }}
                    />
                </Card>
            </Col>
        </div>
    );
};

export default Users;
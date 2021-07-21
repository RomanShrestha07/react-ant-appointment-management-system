import {Table, Popconfirm, Button, Card, Col, Divider} from 'antd';
import AddAccount from "./AddAccount";

const Accounts = ({accounts, onAddAccount, onDelete}) => {
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            sortDirections: ['ascend'],
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Type',
            dataIndex: 'type',
            filters: [
                { text: 'Private', value: 'private' },
                { text: 'Public', value: 'public' },
            ]
        },
        {
            title: 'Start',
            dataIndex: `start_date`,
        },
        {
            title: 'End',
            dataIndex: 'end_date',
        },
        {
            title: 'Actions',
            render: (text, record) => {
                return (
                    <Popconfirm title="Delete?" onConfirm={() => onDelete(record.id)}>
                        <Button>Delete</Button>
                    </Popconfirm>
                );
            },
        },
    ]

    const expandedRowRender = () => {
        const columns2 = [
            {
                title: 'URL',
                dataIndex: 'url',
            },
            {
                title: 'Owner',
                dataIndex: 'owner',
            },
            {
                title: 'Approver',
                dataIndex: 'approver',
            },
            {
                title: 'Description',
                dataIndex: 'description',
            }
        ];

        return (
            <Table
                columns={columns2}
                dataSource={accounts || []}
                pagination={false}
                rowKey={record => record.id}
            />
        );
    };

    return (
        <div style={{margin: 'auto'}}>
            <Col style={{margin: 'auto'}}>
                <Card title='Accounts'>
                    <AddAccount onAddAccount={onAddAccount}/>

                    <Divider>List of Accounts</Divider>

                    <Table
                        columns={columns}
                        dataSource={accounts}
                        rowKey={record => record.id}
                        expandable={{ expandedRowRender }}
                    />
                </Card>
            </Col>
        </div>
    );
};

export default Accounts;
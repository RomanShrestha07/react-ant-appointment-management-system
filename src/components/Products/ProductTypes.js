import {Button, Card, Col, Divider, Popconfirm, Table, Tag} from "antd";
import AddProductTypes from "./AddProductTypes";

const ProductTypes = ({productTypes, onDelete, onEdit, onAddProductType, onAddAttribute, attributes}) => {
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'Product Type Name',
            dataIndex: 'name',
        },
        {
            title: 'Required',
            dataIndex: 'required',
            render: required => {
                let text;
                let color;
                if (required === true) {
                    text = 'TRUE'
                    color = 'green'
                } else {
                    text = 'FALSE'
                    color = 'red'
                }
                return (
                    <Tag color={color}>
                        {text}
                    </Tag>
                );
            },
        },
        {
            title: 'Actions',
            render: (text, record) => {
                return (
                    <div>
                        <Popconfirm title="Edit?" onConfirm={() => onEdit(record.id)}>
                            <Button>Edit</Button>
                        </Popconfirm>
                        <Popconfirm title="Delete?" onConfirm={() => onDelete(record.id)}>
                            <Button style={{marginLeft: 10}} danger>Delete</Button>
                        </Popconfirm>
                    </div>
                );
            },
        },
    ]

    return (
        <div style={{margin: 'auto'}}>
            <Col style={{margin: 'auto'}}>
                <Card title='Product Types'>
                    <AddProductTypes
                        onAddProductType={onAddProductType}
                        onAddAttribute={onAddAttribute}
                        attributes={attributes}
                    />

                    <Divider>List of Product Types</Divider>

                    <Table
                        columns={columns}
                        dataSource={productTypes}
                        rowKey={record => record.id}
                        expandable={{
                            expandedRowRender: record => <p style={{margin: 0}}>{record.description}</p>
                        }}
                    />
                </Card>
            </Col>
        </div>
    );
};

export default ProductTypes;
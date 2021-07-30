import {Button, Card, Col, Divider, Popconfirm, Table} from "antd";
import AddProducts from "./AddProducts";

const Products = ({products, productTypes, onDelete, onEdit, onAddProduct}) => {
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'Product Name',
            dataIndex: 'name',
        },
        {
            title: 'Product Type',
            dataIndex: 'type',
        },
        {
            title: 'Product Price ($)',
            dataIndex: 'price',
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
                            <Button style={{marginLeft:10}} danger>Delete</Button>
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
                    <AddProducts onAddProduct={onAddProduct} productTypes={productTypes}/>

                    <Divider>List of Product Types</Divider>

                    <Table
                        columns={columns}
                        dataSource={products}
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

export default Products;
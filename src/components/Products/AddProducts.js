import React, {useState} from 'react';
import {
    Button,
    Card,
    Col,
    Divider,
    Form,
    Input,
    InputNumber,
    Row,
    Drawer,
    Select
} from "antd";
import {PlusOutlined} from "@ant-design/icons";

const {Option} = Select;

const AddProducts = ({productTypes, onAddProduct}) => {
    const [drawer, setDrawer] = useState(false)
    const [types, setTypes] = useState([])
    const [form] = Form.useForm();

    const showDrawer = () => {
        setDrawer(true)
    };

    const closeDrawer = () => {
        setDrawer(false)
    };

    const onFinish = (values) => {
        console.log('Success: ', values);
        onAddProduct(values)
        form.resetFields();
        closeDrawer()
    };

    const handleOptionChange = (value) => {
        console.log('Selected Type: ', value)

        productTypes.map(productType => {
            if (value === productType.name) {
                return (
                    setTypes(productType.attributes)
                )
            }
        })

        console.log(types)
    }

    return (
        <Col span={24} style={{margin: 'auto'}}>
            <Card>
                <Button type="primary" onClick={showDrawer}>
                    <PlusOutlined/> Add Product
                </Button>
            </Card>

            <Drawer
                title="Add New Product"
                width={710}
                onClose={closeDrawer}
                visible={drawer}
            >
                <Form
                    layout="vertical"
                    form={form}
                    hideRequiredMark
                    initialValues={{remember: true}}
                    onFinish={onFinish}
                >
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="name"
                                label="Name"
                                rules={[{required: true, message: 'Please enter name'}]}
                            >
                                <Input placeholder="Please enter name"/>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={9}>
                            <Form.Item
                                name="price"
                                label="Price"
                                rules={[{required: true, message: 'Please enter product price'}]}
                            >
                                <InputNumber placeholder="Please enter product price" style={{width: '100%'}}/>
                            </Form.Item>
                        </Col>

                        <Col span={15}>
                            <Form.Item name="type" label="Product Type" rules={[{required: true}]}>
                                <Select placeholder="Please choose the type" onChange={handleOptionChange}>
                                    {
                                        productTypes.map(type => {
                                            return (
                                                <Option value={type.name}>{type.name}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="description"
                                label="Description"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter product description',
                                    },
                                ]}
                            >
                                <Input.TextArea rows={4} placeholder="Please enter product description"/>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Divider>Attributes</Divider>
                    <Row gutter={16}>
                        <Col span={24}>
                            {
                                types.map(
                                    type => {
                                        switch (type.attribute_type) {
                                            case "text":
                                                return (
                                                    <Form.Item name={type.attribute_name} label={type.attribute_label}>
                                                        <Input/>
                                                    </Form.Item>
                                                )
                                            case "number":
                                                return (
                                                    <Form.Item name={type.attribute_name} label={type.attribute_label}
                                                               rules={[{type: type.attribute_type}]}>
                                                        <InputNumber/>
                                                    </Form.Item>
                                                )
                                            case "textarea":
                                                return (
                                                    <Form.Item name={type.attribute_name} label={type.attribute_label}>
                                                        <Input.TextArea/>
                                                    </Form.Item>
                                                )
                                            default:
                                                return (
                                                    <Form.Item name={type.attribute_name} label={type.attribute_label}>
                                                        <Input/>
                                                    </Form.Item>
                                                )
                                        }
                                    }
                                )
                            }
                        </Col>
                    </Row>

                    <Divider/>

                    <Row gutter={16}>
                        <Col span={24}>
                            <div style={{textAlign: 'right',}}>
                                <Button onClick={closeDrawer} style={{marginRight: 8}}>
                                    Cancel
                                </Button>
                                <Button htmlType="submit" type="primary">
                                    Add
                                </Button>
                            </div>
                        </Col>
                    </Row>

                </Form>
            </Drawer>
        </Col>
    );
};

export default AddProducts;
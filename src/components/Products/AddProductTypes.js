import React, {useEffect, useState} from "react";
import {
    Button,
    Card,
    Col,
    Divider,
    Drawer,
    Form,
    Input,
    InputNumber,
    Row,
    Select,
    Switch,
    Space
} from "antd";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";

const {Option} = Select;

const AddProductTypes = ({onAddProductType, onAddAttribute, attributes}) => {
    const [drawer, setDrawer] = useState(false)
    const [childDrawer, setChildDrawer] = useState(false)
    const [types, setTypes] = useState([])
    const [form] = Form.useForm();
    const [childForm] = Form.useForm();

    useEffect(() => {
        const getFormSet = async () => {
            const typesFromServer = await fetchTypes()
            setTypes(typesFromServer)
        }
        getFormSet().then(r => console.log(r, 'Hello'))
    }, [])

    const fetchTypes = async () => {
        const response = await fetch('http://localhost:5000/types/')
        const data = await response.json()
        console.log(data)

        return data
    }

    const showDrawer = () => {
        setDrawer(true)
    };

    const closeDrawer = () => {
        setDrawer(false)
    };

    const showChildDrawer = () => {
        setChildDrawer(true)
    };

    const closeChildDrawer = () => {
        setChildDrawer(false)
    };

    const onFinish = (values) => {
        console.log('Success: ', values);
        onAddProductType(values)
        form.resetFields();
        closeDrawer()
    };

    const onChildFinish = (values) => {
        console.log('Success: ', values);
        onAddAttribute(values)
        childForm.resetFields();
        closeChildDrawer()
    };

    const handleOptionChange = (value) => {
        console.log('Selected Type: ', value)
    }

    return (
        <Col span={24} style={{margin: 'auto'}}>
            <Card>
                <Button type="primary" onClick={showDrawer}>
                    <PlusOutlined/> Add Product Type
                </Button>
            </Card>

            <Drawer
                title="Add New Product Type"
                width={720}
                onClose={closeDrawer}
                visible={drawer}
                bodyStyle={{paddingBottom: 80}}
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
                                label="Product Type Name"
                                rules={[{required: true, message: 'Please enter name'}]}
                            >
                                <Input placeholder="Please enter name"/>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="description"
                                label="Product Type Description"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter product type description',
                                    },
                                ]}
                            >
                                <Input.TextArea rows={4} placeholder="Please enter product type description"/>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item name="required" label="Required">
                                <Switch/>
                            </Form.Item>
                        </Col>
                    </Row>

                    {
                        attributes.map(
                            field => {
                                switch (field.type) {
                                    case "text":
                                        return (
                                            <Row gutter={16}>
                                                <Col span={24}>
                                                    <Form.Item
                                                        name={field.name}
                                                        label={field.label}
                                                    >
                                                        <Input/>
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        )
                                    case "number":
                                        return (
                                            <Row gutter={16}>
                                                <Col span={24}>
                                                    <Form.Item
                                                        name={field.name}
                                                        label={field.label}
                                                        rules={[{type: field.type}]}
                                                    >
                                                        <InputNumber/>
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        )
                                    default:
                                        return (
                                            <Form.Item
                                                name={field.name}
                                                label={field.label}
                                                rules={[{
                                                    required: field.required,
                                                    type: field.type,
                                                },]}
                                            >
                                                <Input/>
                                            </Form.Item>
                                        )
                                }
                            }
                        )
                    }

                    <Row gutter={16}>
                        <Col span={24}>
                            <Button type="dashed" style={{width: '100%', marginBottom: 24}} icon={<PlusOutlined/>}
                                    onClick={showChildDrawer}>
                                Add Attribute
                            </Button>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.List name='attributes'>
                                {(fields, {add, remove}) => (
                                    <>
                                        {fields.map(({key, name, fieldKey, ...restField}) => (
                                            <Space key={key} style={{display: 'flex'}} align="baseline">
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'attribute_name']}
                                                    fieldKey={[fieldKey, 'attribute_name']}
                                                    rules={[{required: true, message: 'Missing Attribute Name'}]}
                                                >
                                                    <Input placeholder="Enter attribute name"/>
                                                </Form.Item>

                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'attribute_label']}
                                                    fieldKey={[fieldKey, 'attribute_label']}
                                                    rules={[{required: true, message: 'Missing Attribute Label'}]}
                                                >
                                                    <Input placeholder="Enter attribute label"/>
                                                </Form.Item>

                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'attribute_type']}
                                                    fieldKey={[fieldKey, 'attribute_type']}
                                                    rules={[{required: true, message: 'Missing Attribute Type'}]}
                                                >
                                                    <Select
                                                        placeholder="Please enter attribute type"
                                                        onChange={handleOptionChange}
                                                    >
                                                        {
                                                            types.map(type => {
                                                                return (
                                                                    <Option value={type.value}>{type.text}</Option>
                                                                )
                                                            })
                                                        }
                                                    </Select>
                                                </Form.Item>

                                                <MinusCircleOutlined onClick={() => remove(name)}/>
                                            </Space>
                                        ))}

                                        <Form.Item>
                                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}>
                                                Add Attribute 2
                                            </Button>
                                        </Form.Item>
                                    </>
                                )}
                            </Form.List>
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

                <Drawer
                    title="Add New Attribute"
                    width={480}
                    onClose={closeChildDrawer}
                    visible={childDrawer}
                >
                    <Form
                        layout="vertical"
                        form={childForm}
                        hideRequiredMark
                        initialValues={{remember: true}}
                        onFinish={onChildFinish}
                    >
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="name"
                                    label="Attribute Name"
                                    rules={[{required: true, message: 'Please enter attribute name'}]}
                                >
                                    <Input placeholder="Please enter attribute name"/>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="label"
                                    label="Attribute Label"
                                    rules={[{required: true, message: 'Please enter attribute label'}]}
                                >
                                    <Input placeholder="Please enter attribute label"/>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item name="type" label="Attribute Type" rules={[{required: true}]}>
                                    <Select placeholder="Please choose the type" onChange={handleOptionChange}>
                                        <Option value="text">Text</Option>
                                        <Option value="email">Email</Option>
                                        <Option value="number">Number</Option>
                                        <Option value="text-area">Text Area</Option>
                                        <Option value="date-picker">Date Picker</Option>
                                        <Option value="time-picker">Time Picker</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Divider/>
                        <Row gutter={16}>
                            <Col span={24}>
                                <div style={{textAlign: 'right',}}>
                                    <Button onClick={closeChildDrawer} style={{marginRight: 8}}>
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

            </Drawer>
        </Col>
    );
};

export default AddProductTypes;
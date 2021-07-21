import React from 'react';
import {Button, Card, Col, Form, Input, InputNumber} from "antd";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
// import {MailOutlined, PhoneOutlined, UserAddOutlined, UserOutlined} from "@ant-design/icons";

const DynamicForm = () => {
    const layout = {
        labelCol: {span: 5},
        wrapperCol: {span: 16},
    };

    const withoutLabel = {
        wrapperCol: {span: 16, offset: 5},
    };

    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };

    const onFinish = (values) => {
        console.log('Success: ', values);
    };

    return (
        <div style={{margin: 'auto'}}>
            <Col style={{margin: 'auto'}}>
                <Card title='Dynamic Form'>
                    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>

                        <Form.Item name={['user', 'name']} label="Name" rules={[{required: true,},]}>
                            <Input placeholder='Please enter a name'/>
                        </Form.Item>

                        <Form.Item name={['user', 'email']} label="Email" rules={[{type: 'email',},]}>
                            <Input placeholder='Please enter an email address'/>
                        </Form.Item>

                        <Form.Item name={['user', 'age']} label="Age" rules={[{type: 'number', min: 0, max: 99,},]}>
                            <InputNumber/>
                        </Form.Item>

                        <Form.Item name={['user', 'website']} label="Website">
                            <Input placeholder='Please enter a website url'/>
                        </Form.Item>

                        <Form.Item name={['user', 'introduction']} label="Introduction">
                            <Input.TextArea placeholder='Please give an introduction'/>
                        </Form.Item>

                        <Form.List name={['user', 'address']}>
                            {(fields, {add, remove}, {errors}) => (
                                <>
                                    {fields.map((field, index) => (
                                        <Form.Item
                                            {...(index === 0 ? layout : withoutLabel)}
                                            label={index === 0 ? 'Address' : ''}
                                            required={false}
                                            key={field.key}
                                        >
                                            <Form.Item
                                                {...field}
                                                validateTrigger={['onChange', 'onBlur']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        whitespace: true,
                                                        message: "Please input address or delete this field.",
                                                    },
                                                ]}
                                                noStyle
                                            >
                                                <Input placeholder="Address" style={{width: '96%', marginRight: 10}}/>
                                            </Form.Item>

                                            <MinusCircleOutlined
                                                className="dynamic-delete-button"
                                                onClick={() => remove(field.name)}
                                            />
                                        </Form.Item>
                                    ))}

                                    <Form.Item wrapperCol={{...layout.wrapperCol, offset: 5}}>
                                        <Button type="dashed" onClick={() => add()} style={{width: '100%'}}
                                                icon={<PlusOutlined/>}>
                                            Add address field
                                        </Button>

                                        <Form.ErrorList errors={errors}/>
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>

                        <Form.List name={['user', 'contact']}>
                            {(fields, {add, remove}, {errors}) => (
                                <>
                                    {fields.map((field, index) => (
                                        <Form.Item
                                            {...(index === 0 ? layout : withoutLabel)}
                                            label={index === 0 ? 'Contact' : ''}
                                            required={false}
                                            key={field.key}
                                        >
                                            <Form.Item
                                                {...field}
                                                validateTrigger={['onChange', 'onBlur']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        whitespace: true,
                                                        message: "Please input contact number or delete this field.",
                                                        type: 'number'
                                                    },
                                                ]}
                                                noStyle
                                            >
                                                <InputNumber placeholder="Contact" style={{width: '60%', marginRight: 10}}/>
                                            </Form.Item>

                                            <MinusCircleOutlined
                                                className="dynamic-delete-button"
                                                onClick={() => remove(field.name)}
                                            />
                                        </Form.Item>
                                    ))}

                                    <Form.Item wrapperCol={{...layout.wrapperCol, offset: 5}}>
                                        <Button type="dashed" onClick={() => add()} style={{width: '100%'}}
                                                icon={<PlusOutlined/>}>
                                            Add contact field
                                        </Button>

                                        <Form.ErrorList errors={errors}/>
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>

                        <Form.Item wrapperCol={{...layout.wrapperCol, offset: 5}}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>

                    </Form>
                </Card>
            </Col>
        </div>
    );
};

export default DynamicForm;
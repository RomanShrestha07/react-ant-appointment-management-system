import React from 'react';
import {Button, Card, Col, Form, Input} from "antd";
import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';

const DynamicFormTest = () => {
    const formItemLayout = {
        labelCol: {
            xs: {span: 24},
            sm: {span: 4},
        },
        wrapperCol: {
            xs: {span: 24},
            sm: {span: 20},
        },
    };

    const formItemLayoutWithOutLabel = {
        wrapperCol: {
            xs: {span: 24, offset: 0},
            sm: {span: 20, offset: 4},
        },
    };

    const onFinish = values => {
        console.log('Received values of form:', values);
    };

    return (
        <div style={{margin: 'auto', textAlign: 'initial'}}>
            <Col style={{margin: 'auto'}}>
                <Card title='Dynamic Form Test'>
                    <Form {...formItemLayoutWithOutLabel} onFinish={onFinish}>

                        <Form.List name="names">
                            {(fields, {add, remove}, {errors}) => (
                                <>
                                    {fields.map((field, index) => (
                                        <Form.Item
                                            {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                            label={index === 0 ? 'Passengers' : ''}
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
                                                        message: "Please input passenger's name or delete this field.",
                                                    },
                                                ]}
                                                noStyle
                                            >
                                                <Input placeholder="Passenger Name"
                                                       style={{width: '60%', marginRight: 10}}/>
                                            </Form.Item>

                                            {fields.length > 1 ? (
                                                <MinusCircleOutlined
                                                    className="dynamic-delete-button"
                                                    onClick={() => remove(field.name)}
                                                />
                                            ) : null}
                                        </Form.Item>
                                    ))}

                                    <Form.Item>
                                        <Button
                                            type="dashed"
                                            onClick={() => add()}
                                            style={{width: '60%'}}
                                            icon={<PlusOutlined/>}
                                        >
                                            Add field
                                        </Button>
                                        <Button
                                            type="dashed"
                                            onClick={() => {
                                                add('The head item', 0);
                                            }}
                                            style={{width: '60%', marginTop: '20px'}}
                                            icon={<PlusOutlined/>}
                                        >
                                            Add field at head
                                        </Button>

                                        <Form.ErrorList errors={errors}/>

                                    </Form.Item>
                                </>
                            )}
                        </Form.List>

                        <Form.Item>
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

export default DynamicFormTest;
import {Form, Input, Button, Card, Col, Row} from 'antd';
import {UserAddOutlined, UserOutlined, MailOutlined, PhoneOutlined} from '@ant-design/icons';

const AddUser = ({onAddUser}) => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Success: ', values);
        onAddUser(values)
        form.resetFields();
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed: ', errorInfo);
    };

    return (
        <Col span={24} style={{margin: 'auto'}}>
            <Card>
                <Form
                    name="basic"
                    form={form}
                    initialValues={{remember: true}}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Row gutter={12}>
                        <Col span={7}>
                            <Form.Item
                                label="Username"
                                name="username"
                                rules={[{required: true, message: 'Please input your username!'}]}
                            >
                                <Input placeholder="Enter username" addonBefore={<UserOutlined/>}/>
                            </Form.Item>
                        </Col>

                        <Col span={7}>
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{required: true, message: 'Please input email!'}]}
                            >
                                <Input placeholder="Enter your email" addonBefore={<MailOutlined/>}/>
                            </Form.Item>
                        </Col>

                        <Col span={6}>
                            <Form.Item
                                label="Phone"
                                name="phone"
                                rules={[{required: true, message: 'Please input phone number!'}]}
                            >
                                <Input placeholder="Enter phone" addonBefore={<PhoneOutlined/>}/>
                            </Form.Item>
                        </Col>

                        <Col>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" shape="round" icon={<UserAddOutlined/>}>
                                    Add User
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </Col>
    );
};

export default AddUser;
import {useState} from "react";
import {Form, Input, Button, Card, Col, Row, Drawer, Select, DatePicker, Divider} from 'antd';
import {PlusOutlined} from '@ant-design/icons';

const {Option} = Select;

const AddAccount = ({onAddAccount}) => {
    const [drawer, setDrawer] = useState(false)
    const [form] = Form.useForm();

    const showDrawer = () => {
        setDrawer(true)
    };

    const closeDrawer = () => {
        setDrawer(false)
    };

    const onFinish = (values) => {
        console.log('Success: ', values);
        onAddAccount(values)
        form.resetFields();
        closeDrawer()
    };

    return (
        <Col span={24} style={{margin: 'auto'}}>
            <Card>
                <Button type="primary" onClick={showDrawer}>
                    <PlusOutlined/> New account
                </Button>
            </Card>

            <Drawer
                title="Add an account"
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
                        <Col span={12}>
                            <Form.Item
                                name="name"
                                label="Name"
                                rules={[{required: true, message: 'Please enter user name'}]}
                            >
                                <Input placeholder="Please enter user name"/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="url"
                                label="Url"
                                rules={[{required: true, message: 'Please enter url'}]}
                            >
                                <Input
                                    style={{width: '100%'}}
                                    addonBefore="https://"
                                    addonAfter=".com"
                                    placeholder="Please enter url"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="owner"
                                label="Owner"
                                rules={[{required: true, message: 'Please select an owner'}]}
                            >
                                <Select placeholder="Please select an owner">
                                    <Option value="xiao">Xiaoxiao Fu</Option>
                                    <Option value="mao">Maomao Zhou</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="type"
                                label="Type"
                                rules={[{required: true, message: 'Please choose the type'}]}
                            >
                                <Select placeholder="Please choose the type">
                                    <Option value="private">Private</Option>
                                    <Option value="public">Public</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="approver"
                                label="Approver"
                                rules={[{required: true, message: 'Please choose the approver'}]}
                            >
                                <Select placeholder="Please choose the approver">
                                    <Option value="jack">Jack Ma</Option>
                                    <Option value="tom">Tom Liu</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="dateTime"
                                label="DateTime"
                                rules={[{required: true, message: 'Please choose the dateTime'}]}
                            >
                                <DatePicker.RangePicker
                                    style={{width: '100%'}}
                                    getPopupContainer={trigger => trigger.parentElement}
                                />
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
                                        message: 'please enter url description',
                                    },
                                ]}
                            >
                                <Input.TextArea rows={4} placeholder="please enter url description"/>
                            </Form.Item>
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
                                    Add Account
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </Col>
    );
};

export default AddAccount;
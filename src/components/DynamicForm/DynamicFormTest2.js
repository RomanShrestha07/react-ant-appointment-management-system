import React, {useEffect, useState} from 'react';
import {
    Button,
    Card,
    Col,
    DatePicker,
    Divider,
    Drawer,
    Form,
    Input,
    InputNumber,
    Row,
    Select,
    Switch,
    TimePicker,
    Upload,
} from "antd";
import {UploadOutlined} from "@ant-design/icons"

const {RangePicker} = DatePicker;
const {Option} = Select;

const DynamicFormTest2 = () => {
    const [form] = Form.useForm();
    const [formSet, setFormSet] = useState([])
    const [types, setTypes] = useState([])
    const [typ, setTyp] = useState('')
    const [drawer, setDrawer] = useState(false)

    const layout = {
        labelCol: {span: 5},
        wrapperCol: {span: 16},
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

    useEffect(() => {
        const getFormSet = async () => {
            const formSetFromServer = await fetchFormSet()
            const typesFromServer = await fetchTypes()
            setFormSet(formSetFromServer)
            setTypes(typesFromServer)
        }
        getFormSet().then(r => console.log(r, 'Hello'))
    }, [])

    const fetchFormSet = async () => {
        const response = await fetch('http://localhost:5000/form-set-1/')
        const data = await response.json()
        console.log(data)

        return data
    }

    const fetchTypes = async () => {
        const response = await fetch('http://localhost:5000/types/')
        const data = await response.json()
        console.log(data)

        return data
    }

    const onFinish = (values) => {
        const rangeValue = values['range-picker']; // these names should be the same names as the fields
        const rangeTimeValue = values['range-time-picker'];
        if (values['date-picker']) {
            values['date-picker'] = values['date-picker'].format('YYYY-MM-DD')
        }
        if (values['time-picker']) {
            values['time-picker'] = values['time-picker'].format('HH:mm:ss')
        }
        if (values['date-time-picker']) {
            values['date-time-picker'] = values['date-time-picker'].format('YYYY-MM-DD HH:mm:ss')
        }
        if (rangeValue[0].format('YYYY-MM-DD')) {
            values['range-picker'] = rangeValue[0].format('YYYY-MM-DD') + ', ' + rangeValue[1].format('YYYY-MM-DD')
        }
        if (rangeTimeValue[0].format('YYYY-MM-DD HH:mm:ss')) {
            values['range-time-picker'] = rangeTimeValue[0].format('YYYY-MM-DD HH:mm:ss') + ', ' + rangeTimeValue[1].format('YYYY-MM-DD HH:mm:ss')
        }
        console.log('Success: ', values);
    };

    const onFinish2 = (values) => {
        values['date-picker'] = values['date-picker'].format('YYYY-MM-DD')
        console.log('Success: ', values);
    };

    const showDrawer = () => {
        setDrawer(true)
    };

    const closeDrawer = () => {
        setDrawer(false)
    };

    const handleAddField = async (values) => {
        console.log(values)

        const response = await fetch('http://localhost:5000/form-set-1/', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(values)
        })

        const data = await response.json()
        console.log('Added Field - ', data)

        setFormSet([...formSet, data])
        form.resetFields();
        setTyp('')
        closeDrawer()
    }

    function LoadExtra() {
        if (typ === 'number') {
            return (
                <Row gutter={16}>
                    <Col span={4}>
                        <Form.Item name='max' label="Max" rules={[{type: 'number'}]}>
                            <InputNumber/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name='min' label="Min" rules={[{type: 'number'}]}>
                            <InputNumber/>
                        </Form.Item>
                    </Col>
                </Row>
            )
        } else if (typ === 'textarea') {
            return (
                <Form.Item name='maxlength' label="Max Length" rules={[{type: 'number'}]}>
                    <InputNumber/>
                </Form.Item>
            )
        } else if (typ === 'upload') {
            return (
                <Form.Item name='extra' label="Extra">
                    <Input/>
                </Form.Item>
            )
        } else {
            return ('')
        }
    }

    const handleOptionChange = (value) => {
        console.log('Selected Type: ', value)
        if (value === 'number') {
            setTyp('number')
        } else if (value === 'textarea') {
            setTyp('textarea')
        } else if (value === 'upload') {
            setTyp('upload')
        } else {
            setTyp('')
        }
    }

    const normFile = (e) => {
        console.log('Upload event:', e);

        if (Array.isArray(e)) {
            return e;
        }

        return e && e.fileList;
    };

    return (
        <div style={{margin: 'auto'}}>
            <Col style={{margin: 'auto'}}>
                <Card title='Json Form' extra={<Button type='primary' onClick={showDrawer}>Add Field</Button>}>

                    <Form {...layout} onFinish={onFinish} validateMessages={validateMessages}>

                        {
                            formSet.map(
                                field => {
                                    switch (field.type) {
                                        case "text":
                                            return (
                                                <Form.Item
                                                    name={field.name}
                                                    label={field.label}
                                                    rules={[{
                                                        required: field.required,
                                                    },]}
                                                >
                                                    <Input/>
                                                </Form.Item>
                                            )
                                        case "number":
                                            return (
                                                <Form.Item
                                                    name={field.name}
                                                    label={field.label}
                                                    rules={[{type: field.type, min: field.min, max: field.max}]}
                                                    style={{textAlign: 'initial'}}
                                                >
                                                    <InputNumber/>
                                                </Form.Item>
                                            )
                                        case "textarea":
                                            return (
                                                <Form.Item
                                                    name={field.name}
                                                    label={field.label}
                                                    rules={[{
                                                        required: field.required,
                                                    },]}
                                                >
                                                    <Input.TextArea showCount maxLength={field.maxlength}/>
                                                </Form.Item>
                                            )
                                        case "options":
                                            return (
                                                <Form.Item
                                                    name={field.name}
                                                    label={field.label}
                                                    rules={[{required: field.required}]}
                                                >
                                                    <Select placeholder="Please choose the type">
                                                        {
                                                            types.map(type => {
                                                                return (
                                                                    <Option value={type.value}>{type.text}</Option>
                                                                )
                                                            })
                                                        }
                                                    </Select>
                                                </Form.Item>
                                            )
                                        case "upload":
                                            return (
                                                <Form.Item
                                                    name={field.name}
                                                    label={field.label}
                                                    rules={[{
                                                        required: field.required,
                                                    }]}
                                                    getValueFromEvent={normFile}
                                                    extra={field.extra}
                                                >
                                                    <Upload name="logo" action="/upload" listType="picture">
                                                        <Button icon={<UploadOutlined/>}>Click to upload</Button>
                                                    </Upload>
                                                </Form.Item>
                                            )
                                        case "date-picker":
                                            return (
                                                <Form.Item
                                                    name={field.name}
                                                    label={field.label}
                                                    rules={[{
                                                        required: field.required,
                                                    }]}
                                                    style={{textAlign: 'initial'}}
                                                >
                                                    <DatePicker/>
                                                </Form.Item>
                                            )
                                        case "time-picker":
                                            return (
                                                <Form.Item
                                                    name={field.name}
                                                    label={field.label}
                                                    rules={[{
                                                        required: field.required,
                                                    }]}
                                                    style={{textAlign: 'initial'}}
                                                >
                                                    <TimePicker/>
                                                </Form.Item>
                                            )
                                        case "date-time-picker":
                                            return (
                                                <Form.Item
                                                    name={field.name}
                                                    label={field.label}
                                                    rules={[{
                                                        required: field.required,
                                                    }]}
                                                    style={{textAlign: 'initial'}}
                                                >
                                                    <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
                                                </Form.Item>
                                            )
                                        case "range-picker":
                                            return (
                                                <Form.Item
                                                    name={field.name}
                                                    label={field.label}
                                                    rules={[{
                                                        required: field.required,
                                                    }]}
                                                    style={{textAlign: 'initial'}}
                                                >
                                                    <RangePicker/>
                                                </Form.Item>
                                            )
                                        case "range-time-picker":
                                            return (
                                                <Form.Item
                                                    name={field.name}
                                                    label={field.label}
                                                    rules={[{
                                                        required: field.required,
                                                    }]}
                                                    style={{textAlign: 'initial'}}
                                                >
                                                    <RangePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
                                                </Form.Item>
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

                        <Form.Item wrapperCol={{offset: 5}}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>

                <Card title='Dynamic Form Test 2' style={{marginTop: 20}}>
                    <Form {...layout} name="nest-messages" onFinish={onFinish2} validateMessages={validateMessages}>

                        <Form.Item name='name' label="Name" rules={[{required: true,},]}>
                            <Input placeholder='Please enter a name'/>
                        </Form.Item>

                        <Form.Item name='email' label="Email" rules={[{type: 'email',},]}>
                            <Input placeholder='Please enter an email address'/>
                        </Form.Item>

                        <Form.Item name='age' label="Age" rules={[{type: 'number', min: 0, max: 99,},]}
                                   style={{textAlign: 'initial'}}>
                            <InputNumber/>
                        </Form.Item>

                        <Form.Item name="type" label="Type" rules={[{required: true}]}>
                            <Select placeholder="Please choose the type">
                                {
                                    types.map(type => {
                                        return (
                                            <Option value={type.value}>{type.text}</Option>
                                        )
                                    })
                                }
                            </Select>
                        </Form.Item>

                        <Form.Item name='website' label="Website">
                            <Input placeholder='Please enter a website url'/>
                        </Form.Item>

                        <Form.Item name="upload" label="Upload" valuePropName="fileList" getValueFromEvent={normFile}
                                   extra="extra">
                            <Upload name="logo" action="/upload" listType="picture">
                                <Button icon={<UploadOutlined/>}>Click to upload</Button>
                            </Upload>
                        </Form.Item>

                        <Form.Item name='introduction' label="Introduction">
                            <Input.TextArea placeholder='Please give an introduction'/>
                        </Form.Item>

                        <Form.Item name="date-picker" label="DatePicker" rules={[{required: true}]}
                                   style={{textAlign: 'initial'}}>
                            <DatePicker/>
                        </Form.Item>

                        <Form.Item wrapperCol={{offset: 5}}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>

                    </Form>
                </Card>
            </Col>

            <Drawer
                title="Add a Field"
                width={720}
                onClose={closeDrawer}
                visible={drawer}
                bodyStyle={{paddingBottom: 80}}
            >
                <Form
                    layout="vertical"
                    hideRequiredMark
                    form={form}
                    initialValues={{remember: true}}
                    onFinish={handleAddField}
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="name"
                                label="Name"
                                rules={[{required: true, message: 'Please enter the Name'}]}
                            >
                                <Input/>
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                name="label"
                                label="Label"
                                rules={[{required: true, message: 'Please enter the Label'}]}
                            >
                                <Input/>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item name="type" label="Type" rules={[{required: true}]}>
                                <Select placeholder="Please choose the type" onChange={handleOptionChange}>
                                    {
                                        types.map(type => {
                                            return (
                                                <Option value={type.value}>{type.text}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={24}>
                            <LoadExtra/>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item name="required" label="Required">
                                <Switch/>
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
                                    Add Field
                                </Button>
                            </div>
                        </Col>
                    </Row>
                    <Divider/>
                </Form>
            </Drawer>
        </div>
    );
};

export default DynamicFormTest2;
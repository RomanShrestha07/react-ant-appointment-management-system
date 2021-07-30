import {useState} from 'react';
import {Button, Card, Col, DatePicker, Divider, Drawer, Form, Input, Row, TimePicker} from "antd";
import moment from "moment";
import Select from 'react-select'

const AddAppointment = ({doctorOptions, patientOptions, selectedDate, drawerState, onAddAppointment, closeDrawer}) => {
    const [momentObj, setMomentObj] = useState(moment(selectedDate))
    const [existing, setExisting] = useState(true)
    const [form] = Form.useForm();

    // console.log('the selected date: ', selectedDate)

    const existingPatient = () => {
        setExisting(true)
    }

    const newPatient = () => {
        setExisting(false)
    }

    function LoadForNewPatient() {
        if (existing === false) {
            return (
                <>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name='first_name' label="First Name" rules={[{required: true}]}>
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name='last_name' label="Last Name" rules={[{required: true}]}>
                                <Input/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item name='phone_number' label="Phone Number" rules={[{required: true}]}>
                                <Input/>
                            </Form.Item>
                        </Col>
                    </Row>
                </>
            )
        } else {
            return ('')
        }
    }

    const patientButtonStyle = {
        backgroundColor: '#096dd9', borderColor: '#096dd9', color: 'white'
    }

    function PatientButtons() {
        if (existing === false) {
            return (
                <Row>
                    <Col span={12}>
                        <Button type='primary' block onClick={existingPatient}>Existing Patient</Button>
                    </Col>
                    <Col span={12}>
                        <Button style={patientButtonStyle} block onClick={newPatient}>New Patient</Button>
                    </Col>
                </Row>
            )
        } else {
            return (
                <Row>
                    <Col span={12}>
                        <Button style={patientButtonStyle} block onClick={existingPatient}>Existing Patient</Button>
                    </Col>
                    <Col span={12}>
                        <Button type='primary' block onClick={newPatient}>New Patient</Button>
                    </Col>
                </Row>
            )
        }
    }

    let initial = {
        date: momentObj
    }

    if (drawerState === false) {
        form.resetFields()
    }

    return (
        <div>
            <Drawer
                title="Add Appointment"
                width={560}
                form={form}
                onClose={closeDrawer}
                visible={drawerState}
            >
                <Card style={{marginBottom: 24}}>
                    <PatientButtons/>
                </Card>

                <Form
                    layout="vertical"
                    hideRequiredMark
                    form={form}
                    onFinish={onAddAppointment}
                    initialValues={initial}
                >
                    <LoadForNewPatient/>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="doctor" label="Doctor"
                                       rules={[{required: true, message: 'Please select a doctor'}]}>

                                <Select options={doctorOptions} placeholder='Select Doctor'/>
                            </Form.Item>

                        </Col>

                        <Col span={12}>
                            <Form.Item name="patient" label="Patient"
                                       rules={[{required: true, message: 'Please select a patient'}]}>
                                <Select options={patientOptions} placeholder='Select Patient'/>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={7}>
                            <Form.Item name="date" label="Date"
                                       rules={[{required: true, message: 'Please set the date'}]}>
                                <DatePicker placeholder='Select Date' format='YYYY-MM-DD'/>
                            </Form.Item>
                        </Col>

                        <Col span={9}>
                            <Form.Item name="time" label="Time"
                                       rules={[{required: true, message: 'Please set the time'}]}>
                                <TimePicker format='HH:mm' style={{width: '100%'}}/>
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item name="duration" label="Duration"
                                       rules={[{required: true, message: 'Please set the duration'}]}>
                                <TimePicker format='HH:mm' style={{width: '100%'}}/>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item name="remarks" label="Remarks">
                                <Input.TextArea/>
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
                                    Add Appointment
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

export default AddAppointment;
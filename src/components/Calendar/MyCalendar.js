import {Card, Calendar, Alert, Badge, Modal, Popover, Input, Form, DatePicker, Col, Button, Row, Divider} from 'antd';
import moment from 'moment';
import {useState} from "react";

const events = {
    margin: 0,
    padding: 0,
    listStyle: 'none',
}

const events_ant_badge = {
    width: '100%',
    overflow: 'hidden',
    fontSize: '12px',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
}

const notes_month = {
    fontSize: '20px',
    textAlign: 'center',
}

const notes_month_section = {
    fontSize: '20px',
}

const MyCalendar = () => {
    const [date, setDate] = useState('')
    const [date2, setDate2] = useState('')
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisible2, setIsModalVisible2] = useState(false);
    const [element, setElement] = useState({type: '', content: ''})

    const onSelect = (value) => {
        console.log(value.format('YYYY-MM-DD'));
        setDate(value.format('YYYY-MM-DD'));
        setDate2(value.format('YYYY-MM-DD'))
        showModal2()
    };

    function ItemModal2() {
        const dateFormat = 'YYYY-MM-DD';
        return (
            <Modal title={`Add Event on ${date2}`} visible={isModalVisible2} footer={''} onCancel={handleCancel2}>
                <Form labelCol={{span: 6,}} wrapperCol={{span: 18,}} onFinish={handleOk2}>
                    <Form.Item name="event_name" label="Event Name">
                        <Input placeholder='Add Event'/>
                    </Form.Item>

                    <Form.Item name="event_date" label="Event Date">
                        {/*<DatePicker defaultValue={moment(date2, 'YYYY-MM-DD')} value={moment('2020-05-05')} disabled/>*/}
                        <DatePicker defaultValue={moment(date2, dateFormat)} format={dateFormat}/>
                    </Form.Item>

                    <Form.Item name="event_description" label="Event Description">
                        <Input.TextArea placeholder='Add Event Description'/>
                    </Form.Item>

                    <Divider/>

                    <Row gutter={16}>
                        <Col span={24}>
                            <div style={{textAlign: 'right',}}>
                                <Button onClick={handleCancel2} style={{marginRight: 8}}>
                                    Cancel
                                </Button>
                                <Button htmlType="submit" type="primary">
                                    Add
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        )
    }

    const onPanelChange = (value) => {
        console.log(value.format('YYYY-MM-DD'));
        setDate(value.format('YYYY-MM-DD'));
    };

    function getListData(value) {
        let listData;
        switch (value.date()) {
            case 7:
                listData = [
                    {type: 'warning', content: 'This is warning event.'},
                    {type: 'success', content: 'This is usual event.'},
                ];
                break;
            case 10:
                listData = [
                    {type: 'warning', content: 'This is warning event.'},
                    {type: 'success', content: 'This is usual event.'},
                    {type: 'error', content: 'This is error event.'},
                ];
                break;
            case 15:
                listData = [
                    {type: 'warning', content: 'This is warning event'},
                    {type: 'success', content: 'This is very long usual event。。....'},
                    {type: 'error', content: 'This is error event 1.'},
                    {type: 'error', content: 'This is error event 2.'},
                    {type: 'error', content: 'This is error event 3.'},
                    {type: 'error', content: 'This is error event 4.'},
                ];
                break;
            default:
        }
        return listData || [];
    }

    const handleClick = (item) => {
        setElement(item)
        showModal()
    }

    function ItemModal() {
        return (
            <Modal title={element.type} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <h3>{element.content}</h3>
            </Modal>
        )
    }

    function dateCellRender(value) {
        const listData = getListData(value);

        const popContent = (item) => {
            return (
                <div>
                    <p>{item.content}</p>
                </div>
            )
        }

        return (
            <ul style={events}>
                {listData.map(item => (
                    <li key={item.content}>
                        <Popover content={popContent(item)} title={item.type}>
                            <Badge status={item.type} style={events_ant_badge} text={item.content}
                                   onClick={() => handleClick(item)}/>
                        </Popover>
                    </li>
                ))}
            </ul>
        );
    }

    function getMonthData(value) {
        if (value.month() === 8) {
            return 1394;
        }
    }

    function monthCellRender(value) {
        const num = getMonthData(value);
        return num ? (
            <div style={notes_month}>
                <section style={notes_month_section}>{num}</section>
                <span>Backlog Number</span>
            </div>
        ) : null;
    }

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const showModal2 = () => {
        setIsModalVisible2(true);
    };

    const handleOk2 = (value) => {
        setIsModalVisible2(false);
        console.log(value)
        console.log(moment('2015-01-01', 'YYYY-MM-DD'))
        console.log(value.event_date)
    };

    const handleCancel2 = () => {
        setIsModalVisible2(false);
    };

    return (
        <div>
            <Card title='Calendar'>
                <Alert style={{marginBottom: 24}} message={`You selected date: ${date}`}/>

                <Card>
                    <Calendar onSelect={onSelect} onPanelChange={onPanelChange} dateCellRender={dateCellRender}
                              monthCellRender={monthCellRender}
                    />
                </Card>
            </Card>

            <ItemModal/>

            <ItemModal2/>
        </div>
    );
};

export default MyCalendar;
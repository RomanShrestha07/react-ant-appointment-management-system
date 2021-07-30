import {useState} from "react";
import {Button, Card, Col, DatePicker, Divider, Form, Input, message, Modal, Row} from 'antd'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import listPlugin from '@fullcalendar/list';
import './cal_style.css'
import moment from "moment";

const MyFullCalendar = () => {
    const [date, setDate] = useState('')
    const [isModalVisible, setIsModalVisible] = useState(false);

    const events = [
        {title: "All Day Event", start: getDate("YEAR-MONTH-01")},
        {
            title: "Long Event",
            start: getDate("YEAR-MONTH-07"),
            end: getDate("YEAR-MONTH-10")
        },
        {
            groupId: "999",
            title: "Repeating Event",
            start: getDate("YEAR-MONTH-09T16:00:00+00:00")
        },
        {
            groupId: "999",
            title: "Repeating Event",
            start: getDate("YEAR-MONTH-16T16:00:00+00:00")
        },
        {
            title: "Conference",
            start: "YEAR-MONTH-17",
            end: getDate("YEAR-MONTH-19")
        },
        {
            title: "Meeting",
            start: getDate("YEAR-MONTH-18T10:30:00+00:00"),
            end: getDate("YEAR-MONTH-18T12:30:00+00:00")
        },
        {title: "Lunch", start: getDate("YEAR-MONTH-18T12:00:00+00:00")},
        {title: "Birthday Party", start: getDate("YEAR-MONTH-19T07:00:00+00:00")},
        {title: "Meeting", start: getDate("YEAR-MONTH-18T14:30:00+00:00")},
        {title: "Happy Hour", start: getDate("YEAR-MONTH-18T17:30:00+00:00")},
        {title: "Dinner", start: getDate("YEAR-MONTH-18T20:00:00+00:00")}
    ];

    function getDate(dayString) {
        const today = new Date();
        const year = today.getFullYear().toString();
        let month = (today.getMonth() + 1).toString();

        if (month.length === 1) {
            month = "0" + month;
        }

        return dayString.replace("YEAR", year).replace("MONTH", month);
    }

    const handleDateClick = (value) => {
        console.log(value)
        message.info(`Selected Date: ${value ? value.dateStr : 'None'}`)
        setDate(value.dateStr)
        console.log('dasdsad', moment(date))
        console.log(typeof (moment(date)))
        showModal()
    }

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleFinish = (value) => {
        setIsModalVisible(false);
        console.log('Event: ', value)
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    function ItemModal() {
        return (
            <Modal title={`Add Event on ${date}`} visible={isModalVisible} footer={''} onCancel={handleCancel}>
                <Form labelCol={{span: 6,}} wrapperCol={{span: 18,}} onFinish={handleFinish}>
                    <Form.Item name="event_name" label="Event Name">
                        <Input placeholder='Add Event'/>
                    </Form.Item>

                    <Form.Item name="event_date" label="Event Date">
                        <DatePicker
                            defaultValue={moment(date, 'YYYY-MM-DD')}
                            format='YYYY-MM-DD'
                        />
                    </Form.Item>

                    <Form.Item name="event_description" label="Event Description">
                        <Input.TextArea placeholder='Add Event Description'/>
                    </Form.Item>

                    <Divider/>

                    <Row gutter={16}>
                        <Col span={24}>
                            <div style={{textAlign: 'right',}}>
                                <Button onClick={handleCancel} style={{marginRight: 8}}>
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

    return (
        <Card title='Full Calendar' style={{textAlign: 'center'}}>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin]}
                dateClick={handleDateClick}
                initialView="dayGridMonth"
                events={events}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                }}
                eventDurationEditable={true}
                editable={true}
                droppable={true}
                selectable={true}
                weekends={true}
            />

            <ItemModal/>
        </Card>
    );
};

export default MyFullCalendar;
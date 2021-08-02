import {useState, useEffect} from 'react';
import AddAppointment from "./AddAppointment";
import {Card, Form, message, Spin} from 'antd'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import listPlugin from '@fullcalendar/list';
import moment from "moment";
import Select from 'react-select'

const Appointments = () => {
    const [doctors, setDoctors] = useState([])
    const [doctorOptions, setDoctorOptions] = useState([])

    const [patients, setPatients] = useState([])
    const [patientOptions, setPatientOptions] = useState([])

    const [appointments, setAppointments] = useState([])
    const [events, setEvents] = useState([])
    const [allEvents, setAllEvents] = useState([])

    const [selectedDate, setSelectedDate] = useState(moment(getDateToday()))
    const [selectedTime, setSelectedTime] = useState(moment('00:00:00', 'HH:mm:ss'))

    const [drawerState, setDrawerState] = useState(false)
    const [editDrawerState, setEditDrawerState] = useState(false)

    const [editValues, setEditValues] = useState({})
    const [editID, setEditID] = useState('')
    const [spinState, setSpinState] = useState(false)

    const apiURL = 'http://144.91.93.161:8004/api/desktop'

    useEffect(() => {
        const getEverything = async () => {
            toggleSpinOn()
            const appointmentsFromServer = await fetchAppointments()
            const processedEvents = await fetchEvents()
            const doctorsFromServer = await fetchDoctors()
            const doctorOptionsFromServer = await fetchDoctorOptions()
            const patientsFromServer = await fetchPatients()
            const patientOptionsFromServer = await fetchPatientOptions()
            setAppointments(appointmentsFromServer)
            setEvents(processedEvents)
            toggleSpinOff()
            setAllEvents(processedEvents)
            setDoctors(doctorsFromServer)
            setDoctorOptions(doctorOptionsFromServer)
            setPatients(patientsFromServer)
            setPatientOptions(patientOptionsFromServer)
        }
        getEverything().then(r => console.log(r, 'Hello2'))
    }, [])

    function getDateToday() {
        const today = new Date();
        const year = today.getFullYear().toString();
        let month = (today.getMonth() + 1).toString();
        let day = today.getDate().toString()

        if (month.length === 1) {
            month = "0" + month;
        }

        return year + '-' + month + '-' + day;
    }

    const fetchDoctors = async () => {
        const response = await fetch(`${apiURL}/list-doctors/`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-type': 'application/json'
            },
        })
        const data = await response.json()
        console.log('Doctors:', data)
        return data
    }

    const fetchDoctorOptions = async () => {
        const response = await fetch(`${apiURL}/list-doctors/`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-type': 'application/json'
            },
        })
        const data = await response.json()

        const doctor_options = []
        data.map(d => {
            const dt = {value: d.id, label: `Dr. ${d.first_name} ${d.last_name}`}
            doctor_options.push(dt)
        })

        return doctor_options
    }

    const fetchPatients = async () => {
        const response = await fetch(`${apiURL}/list-patients-preview/`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-type': 'application/json'
            },
        })
        const data = await response.json()
        console.log('Patients:', data)
        return data
    }

    const fetchPatientOptions = async () => {
        const response = await fetch(`${apiURL}/list-patients-preview/`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-type': 'application/json'
            },
        })
        const data = await response.json()

        const patient_options = []

        {
            data.map(d => {
                patient_options.push(
                    {value: d.reg_no, label: `${d.first_name} ${d.last_name}, ${d.phone_number}`}
                )
            })
        }
        return patient_options
    }

    const fetchAppointments = async () => {
        const response = await fetch(`${apiURL}/appointments/`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-type': 'application/json'
            },
        })
        const data = await response.json()
        console.log('Appointments:', data)
        const processed_data = []

        data.map(d => {
            let start = d.date + 'T' + d.time
            let duration = moment.duration(d.duration)
            let end = moment(d.date + 'T' + d.time).add(duration).format().split("+")[0]
            let patient = d.patient.first_name + ' ' + d.patient.last_name

            processed_data.push(
                {
                    id: d.id,
                    date: d.date,
                    time: d.time,
                    start: start,
                    end: end,
                    patient: patient,
                    doctor: d.doctor,
                    remarks: d.remarks
                }
            )
        })
        return processed_data
    }

    const fetchEvents = async () => {
        const response = await fetch(`${apiURL}/appointments/`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-type': 'application/json'
            },
        })
        const data = await response.json()
        console.log('Appointments:', data)

        const all_events = []
        data.map(d => {
            let start = d.date + 'T' + d.time
            let duration = moment.duration(d.duration)
            let end = moment(d.date + 'T' + d.time).add(duration).format().split("+")[0]
            let patient = d.patient.first_name + ' ' + d.patient.last_name

            all_events.push(
                {
                    id: d.id,
                    title: `${patient} (${d.doctor})`,
                    start: start,
                    end: end,
                    doctor: d.doctor
                }
            )
        })
        console.log('The Events:', all_events)
        return all_events
    }

    const doctor_options = [
        {value: 0, label: 'All'}
    ]

    doctors.map(doctor => {
        doctor_options.push({value: doctor.id, label: `Dr. ${doctor.first_name} ${doctor.last_name}`})
    })

    const handleDateClick = (value) => {
        console.log('Ini Selected Time:', selectedTime)

        const time = moment(value.dateStr).format('HH:mm:ss')
        if (time === '00:00:00') {
            console.log('time is 0')
            setSelectedTime(moment('00:00:00', 'HH:mm:ss'))
        } else {
            console.log('the time is', time)
            setSelectedTime(moment(time, 'HH:mm:ss'))
        }

        console.log('Ini Selected Date:', value.dateStr)
        setSelectedDate(moment(value.dateStr))

        console.log('selected date obj', selectedDate)
        console.log('selected time obj', selectedTime)

        openDrawer()
    }

    const filterByDoctor = async (data) => {
        console.log('all events', allEvents)

        console.log('Doctor: ', data)
        console.log('Doctor Name: ', data.label)
        console.log('Doctor ID: ', data.value)

        if (data.label === 'All') {
            setEvents(allEvents)
        } else {
            setEvents(
                allEvents.filter((event) => event.doctor === data.label)
            )
        }
    }

    const openDrawer = () => {
        setDrawerState(true)
    }

    const openDrawer2 = () => {
        setDrawerState(true)
        setSelectedDate(moment(getDateToday()))
        setSelectedTime(moment('00:00:00', 'HH:mm:ss'))
    }

    const openEditDrawer = () => {
        setEditDrawerState(true)
    }

    const closeDrawer = () => {
        setDrawerState(false)
        setEditDrawerState(false)
    }

    const handleAddAppointment = async (values) => {
        console.log('Appointment Added:', values)
        console.log('Appointment Date:', values['date'].format('YYYY-MM-DD'))
        console.log('Appointment Time:', values['time'].format('HH:mm'))
        console.log('Appointment Duration:', values['duration'].format('HH:mm:ss'))

        const newAppointment = {
            date: values['date'].format('YYYY-MM-DD'),
            time: values['time'].format('HH:mm'),
            duration: values['duration'].format('HH:mm:ss'),
            patient: values['patient'].value,
            doctor: values['doctor'].value,
            remarks: values['remarks']
        }

        // http://localhost:5000/appointments/ ${apiURL}/create-appointment/

        const response = await fetch(`${apiURL}/create-appointment/`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newAppointment)
        })

        const data = await response.json()
        console.log('Added Appointment 2 - ', data)
        console.log('Add Appointment Response Status - ', response.status)

        if (response.status === 201) {
            message.success(`Added Appointment: ${newAppointment ? `On ${newAppointment.date} at ${newAppointment.time}` : 'Error'}`);
            closeDrawer()
        } else {
            message.error(`An error has occurred. Error Status: ${response.status}`);
        }

        let start = data.date + 'T' + data.time
        let duration = moment.duration(data.duration)
        let end = moment(data.date + 'T' + data.time).add(duration).format().split("+")[0]
        console.log(':::::', start, duration, end)

        const newEvent = {
            id: data.id,
            title: `${values['patient'].label} (${values['doctor'].label})`,
            start: start,
            end: end,
            doctor: values['doctor'].label
        }

        setEvents([...events, newEvent])
    }

    const handleEventClick = async (value) => {
        console.log('Appointment ID:', value.event._def.publicId)
        const ID = value.event._def.publicId

        const response = await fetch(`${apiURL}/appointment/${ID}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-type': 'application/json'
            },
        })
        const data = await response.json()
        console.log('Selected Appointment:', data)
        setEditValues(data)
        setEditID(ID)
        openEditDrawer()
    }

    const handleEditAppointment = async (values) => {
        console.log('Edit Appointment:', values)
        const ID = editID

        const editedAppointment = {
            id: editID,
            date: values['date'].format('YYYY-MM-DD'),
            time: values['time'].format('HH:mm'),
            duration: values['duration'].format('HH:mm:ss'),
            remarks: values['remarks']
        }

        console.log('Edited Appointment:', editedAppointment)

        const response = await fetch(`${apiURL}/appointment/${ID}`, {
            method: 'PATCH',
            mode: 'cors',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(editedAppointment)
        })
        const data = await response.json()

        console.log('Edited Appointment 2:', data)
        console.log('Edit Appointment Response Status - ', response.status)

        if (response.status === 200) {
            message.success(`Edited Appointment: ${editedAppointment ? `For ${data.patient.first_name} ${data.patient.last_name}, To ${editedAppointment.date} at ${editedAppointment.time}` : 'Error'}`);
            closeDrawer()
        } else {
            message.error(`An error has occurred. Error Status: ${response.status}`);
        }

        let start = data.date + 'T' + data.time
        let duration = moment.duration(data.duration)
        let end = moment(data.date + 'T' + data.time).add(duration).format().split("+")[0]

        setEvents(
            events.map((event) => event.id === data.id ? {...event, start: start} : event),
            events.map((event) => event.id === data.id ? {...event, end: end} : event)
        )

        setEditID('')
    }

    const toggleSpinOn = () => {
        setSpinState(true)
    }

    const toggleSpinOff = () => {
        setSpinState(false)
    }

    const handleDeleteAppointment = async () => {
        console.log('Appointment ID to Delete:', editValues.id)
        let ID = editValues.id

        // await fetch(``, {
        //     method: 'DELETE',
        //     headers: {
        //         'Content-type': 'application/json'
        //     }
        // })

        closeDrawer()
        setEvents(events.filter((event) => event.id !== ID))
    }

    return (
        <Card title='All Appointments'>
            <Spin tip='Loading...' spinning={spinState} delay={500}>
                <Form wrapperCol={{span: 8,}}>
                    <Form.Item name="filter_doctor">
                        <Select options={doctor_options} menuPlacement='top' onChange={filterByDoctor}
                                placeholder='Filter by Doctor'/>
                    </Form.Item>
                </Form>

                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin]}
                    initialView="dayGridMonth"
                    customButtons={
                        {
                            AddAppointmentButton: {
                                text: 'Add Appointment',
                                click: openDrawer2
                            },
                        }
                    }
                    headerToolbar={{
                        left: 'prev,next today AddAppointmentButton',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                    }}
                    selectable={true}
                    dateClick={handleDateClick}
                    events={events}
                    eventClick={handleEventClick}
                    dayMaxEvents={2}
                    navLinks={true}
                    dayHeaderFormat={{weekday: 'long'}}
                />

                <AddAppointment
                    doctors={doctors}
                    doctorOptions={doctorOptions}
                    patients={patients}
                    patientOptions={patientOptions}
                    selectedDate={selectedDate}
                    selectedTime={selectedTime}
                    appointments={appointments}
                    drawerState={drawerState}
                    editDrawerState={editDrawerState}
                    onAddAppointment={handleAddAppointment}
                    onEditAppointment={handleEditAppointment}
                    closeDrawer={closeDrawer}
                    editValues={editValues}
                    onDeleteAppointment={handleDeleteAppointment}
                />
            </Spin>
        </Card>
    );
};

export default Appointments;
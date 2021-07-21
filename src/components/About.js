import {useState} from "react";
import {Button, Card, DatePicker, message} from "antd";

const About = () => {
    const [date, setDate] = useState(null);

    const handleChange = value => {
        message.info(`Selected Date: ${value ? value.format('YYYY-MM-DD') : 'None'}`);
        setDate(value);
    };

    return (
        <div style={{margin: 'auto', textAlign: 'center', height: 382}}>
            <Card>
                <h2>Here is the <strong>About</strong>.</h2>

                <DatePicker onChange={handleChange}/>
                <Button type="primary" style={{marginLeft: 8}}>
                    Primary Button
                </Button>

                <div style={{marginTop: 16}}>
                    Selected Date: {date ? date.format('YYYY-MM-DD') : 'None'}
                </div>
            </Card>
        </div>
    );
};

export default About;
import {useState} from "react";
import {DatePicker, Alert, Card} from 'antd';

const Home = () => {
    const [date, setDate] = useState(null);

    const handleChange = value => {
        setDate(value);
    };

    return (
        <div style={{margin: 'auto', textAlign: 'center', height: 382}}>
            <Card>
                <h2>This is the <strong>Home</strong>.</h2>
                <DatePicker onChange={handleChange}/>
                <div style={{marginTop: 16}}>
                    <Alert message="Selected Date" description={date ? date.format('YYYY-MM-DD') : 'None'}/>
                </div>
            </Card>
        </div>
    );
};

export default Home;
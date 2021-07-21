import {Link} from "react-router-dom";
import {Card} from "antd";

const Navbar = () => {
    const gridStyle = {
        width: '20%',
        textAlign: 'center',
    };

    return (
        <Card>
            <Link to="/">
                <Card.Grid style={gridStyle}>Home</Card.Grid>
            </Link>

            <Link to="/about">
                <Card.Grid style={gridStyle}>About</Card.Grid>
            </Link>

            <Link to="/users">
                <Card.Grid style={gridStyle}>Users</Card.Grid>
            </Link>

            <Link to="/accounts">
                <Card.Grid style={gridStyle}>Accounts</Card.Grid>
            </Link>

            <Link to="/dynamic-form-2">
                <Card.Grid style={gridStyle}>Form</Card.Grid>
            </Link>
        </Card>
    );
};

export default Navbar;
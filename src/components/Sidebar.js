import {Layout, Menu} from "antd";
import {HomeOutlined, InfoCircleOutlined, FolderOpenOutlined, FormOutlined, UserOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {useState} from "react";

const {SubMenu} = Menu;
const {Sider} = Layout;

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false)

    const onCollapse = () => {
        setCollapsed(!collapsed)
    }

    return (
        <Sider width={200} collapsible collapsed={collapsed} onCollapse={onCollapse}>
            <Menu
                mode="inline"
                defaultSelectedKeys={['home']}
                defaultOpenKeys={['home']}
                style={{height: '100%', borderRight: 0}}
            >
                <Menu.Item key="home" icon={<HomeOutlined/>}>
                    <Link to='/'>Home</Link>
                </Menu.Item>

                <Menu.Item key="about" icon={<InfoCircleOutlined/>}>
                    <Link to='/about'>About</Link>
                </Menu.Item>

                <Menu.Item key="users" icon={<UserOutlined/>}>
                    <Link to='/users'>Users</Link>
                </Menu.Item>

                <Menu.Item key="accounts" icon={<FolderOpenOutlined/>}>
                    <Link to='/accounts'>Accounts</Link>
                </Menu.Item>

                <SubMenu key="forms" icon={<FormOutlined/>} title="Forms">
                    <Menu.Item key="1"><Link to="/dynamic-form/1">Form 1</Link></Menu.Item>
                    <Menu.Item key="2"><Link to="/dynamic-form/2">Form 2</Link></Menu.Item>
                    <Menu.Item key="3"><Link to="/dynamic-form/3">Form 3</Link></Menu.Item>
                </SubMenu>
            </Menu>
        </Sider>
    );
};

export default Sidebar;
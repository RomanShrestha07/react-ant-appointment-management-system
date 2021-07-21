import './App.css';
import {useEffect, useState} from "react";
import {BrowserRouter as Router, Link, Route, Switch, withRouter} from "react-router-dom";
import Sidebar from "./components/Sidebar";
// import Navbar from "./components/Navbar";
import Home from './components/Home';
import About from "./components/About";
import Users from "./components/Users/Users";
import Accounts from "./components/Accounts/Accounts";
import DynamicForm from "./components/DynamicForm/DynamicForm";
import DynamicFormTest from "./components/DynamicForm/DynamicFormTest";
import DynamicFormTest2 from "./components/DynamicForm/DynamicFormTest2";
import {message, Layout, Breadcrumb, BackTop} from "antd";
import {AntDesignOutlined, ArrowUpOutlined} from '@ant-design/icons';

const {Header, Content, Footer} = Layout;

function App() {
    const [users, setUsers] = useState([])
    const [accounts, setAccounts] = useState([])

    useEffect(() => {
        const getUsers = async () => {
            const usersFromServer = await fetchUsers()
            const accountsFromServer = await fetchAccounts()
            setUsers(usersFromServer)
            setAccounts(accountsFromServer)
        }
        getUsers().then(r => console.log(r, 'Hello'))
    }, [])

    const fetchUsers = async () => {
        const response = await fetch('http://localhost:5000/users/')
        const data = await response.json()
        console.log(data)
        return data
    }

    const fetchAccounts = async () => {
        const response = await fetch('http://localhost:5000/accounts/')
        const data = await response.json()
        console.log(data)

        return fixAccountsDate(data)
    }

    const fixAccountsDate = (data) => {
        const list = []
        data.map(
            (d1) => list.push(
                {
                    id: d1.id,
                    name: d1.name,
                    url: d1.url,
                    owner: d1.owner,
                    type: d1.type,
                    approver: d1.approver,
                    description: d1.description,
                    start_date: d1.dateTime[0],
                    end_date: d1.dateTime[1],
                }
            )
        )
        return list
    }

    const handleAddUser = async (newUser) => {
        console.log('Added User - ', newUser);

        const response = await fetch('http://localhost:5000/users/', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })

        const data = await response.json()
        console.log('Added User 2 - ', data)
        console.log('Add User Response Status - ', response.status)

        if (response.status === 201) {
            message.success(`Added user: ${newUser ? newUser.username : 'Error'}`);
        } else {
            message.warning(`An error has occurred. Error Status: ${response.status}`);
        }

        setUsers([...users, data])
    }

    const handleUserDelete = async (id) => {
        console.log('Deleted User -', id)

        const response = await fetch(`http://localhost:5000/users/${id}/`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        })
        console.log('Delete User Response Status - ', response.status)

        if (response.status === 200) {
            message.success(`User has been successfully deleted.`);
        } else {
            message.error(`An error has occurred. Error Status: ${response.status}`);
        }

        setUsers(users.filter((user) => user.id !== id))
    }

    const handleAccountAdd = async (newAccount) => {
        console.log('Added Account - ', newAccount);

        const response = await fetch('http://localhost:5000/accounts/', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newAccount)
        })

        const data = await response.json()
        console.log('Added Account 2 - ', data)
        console.log('Add Account Response Status - ', response.status)

        message.success(`Added account: ${newAccount ? newAccount.name : 'Error'}`);

        setAccounts([...accounts, fixAccountDate(data)])
    }

    const fixAccountDate = (d1) => {
        return {
            id: d1.id,
            name: d1.name,
            url: d1.url,
            owner: d1.owner,
            type: d1.type,
            approver: d1.approver,
            description: d1.description,
            start_date: d1.dateTime[0],
            end_date: d1.dateTime[1],
        }
    }

    const handleAccountDelete = async (id) => {
        console.log('Deleted Account -', id)

        const response = await fetch(`http://localhost:5000/accounts/${id}/`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        })
        console.log('Delete Account Response Status - ', response.status)

        if (response.status === 200) {
            message.success(`Account has been successfully deleted.`);
        } else {
            message.error(`An error has occurred. Error Status: ${response.status}`);
        }
        setAccounts(accounts.filter((account) => account.id !== id))
    }

    const breadcrumbNameMap = {
        '/': 'Home',
        '/about': 'About',
        '/users': 'Users',
        '/accounts': 'Accounts',
        '/dynamic-form': 'Forms',
        '/dynamic-form/1': 'Form 1',
        '/dynamic-form/2': 'Form 2',
        '/dynamic-form/3': 'Form 3',
    };

    const Bread = withRouter(props => {
        const {location} = props;
        const pathSnippets = location.pathname.split('/').filter(i => i);
        console.log('pathSnippets:', pathSnippets)

        const extraBreadcrumbItems = pathSnippets.map((_, index) => {
            const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
            console.log('url:', url)
            return (
                <Breadcrumb.Item key={url}>
                    <Link to={url}>{breadcrumbNameMap[url]}</Link>
                </Breadcrumb.Item>
            );
        });

        const breadcrumbItems = [
            <Breadcrumb.Item>React</Breadcrumb.Item>,
            <Breadcrumb.Item>Ant</Breadcrumb.Item>,
            <Breadcrumb.Item key="home">
                <Link to="/">Home</Link>
            </Breadcrumb.Item>,
        ].concat(extraBreadcrumbItems);

        return (
            <div>
                <Breadcrumb style={{margin: '16px 0'}}>{breadcrumbItems}</Breadcrumb>
            </div>
        );
    });

    const back_top_style = {
        height: 40,
        width: 40,
        lineHeight: '40px',
        borderRadius: 4,
        backgroundColor: '#1088e9',
        color: '#fff',
        textAlign: 'center',
        fontSize: 14,
    };

    return (
        <div>
            <Router>
                <Layout>
                    <Header>
                        <div className="logo"><h2 style={{color: "white"}}><AntDesignOutlined/> React with Ant</h2>
                        </div>
                        {/*<Menu theme="dark" mode="horizontal">*/}
                        {/*    <Menu.Item key="1"><h1>React with Ant</h1></Menu.Item>*/}
                        {/*</Menu>*/}
                    </Header>

                    <Layout>
                        <Sidebar/>

                        <Layout style={{padding: '0 24px 24px'}}>

                            {/*<Breadcrumb style={{margin: '16px 0'}}>*/}
                            {/*    <Breadcrumb.Item>React</Breadcrumb.Item>*/}
                            {/*    <Breadcrumb.Item>Ant</Breadcrumb.Item>*/}
                            {/*    <Breadcrumb.Item>Home</Breadcrumb.Item>*/}
                            {/*</Breadcrumb>*/}

                            <Bread/>

                            <Content style={{padding: 24, margin: 0, minHeight: 280,}}>
                                <Switch>
                                    <Route path="/" exact component={Home}/>

                                    <Route path="/about" component={About}/>

                                    <Route path='/users'>
                                        <Users users={users} onAddUser={handleAddUser}
                                               onUserDelete={handleUserDelete}/>
                                    </Route>

                                    <Route path='/accounts'>
                                        <Accounts accounts={accounts} onDelete={handleAccountDelete}
                                                  onAddAccount={handleAccountAdd}/>
                                    </Route>

                                    <Route path="/dynamic-form/1" component={DynamicForm}/>

                                    <Route path="/dynamic-form/2" component={DynamicFormTest}/>

                                    <Route path="/dynamic-form/3" component={DynamicFormTest2}/>
                                </Switch>
                            </Content>

                            <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>

                            <BackTop>
                                <div style={back_top_style}><ArrowUpOutlined/></div>
                            </BackTop>
                        </Layout>
                    </Layout>
                </Layout>
            </Router>
        </div>
    );
}

export default App;

import './App.css';
import {useEffect, useState} from "react";
import {BrowserRouter as Router, Link, Route, Switch, withRouter} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from './components/Home';
import About from "./components/About";
import Users from "./components/Users/Users";
import Accounts from "./components/Accounts/Accounts";
import Products from "./components/Products/Products";
import ProductTypes from "./components/Products/ProductTypes";
import DynamicForm from "./components/DynamicForm/DynamicForm";
import DynamicFormTest from "./components/DynamicForm/DynamicFormTest";
import DynamicFormTest2 from "./components/DynamicForm/DynamicFormTest2";
import MyCalendar from "./components/Calendar/MyCalendar";
import MyFullCalendar from "./components/Calendar/MyFullCalendar";
import Appointments from "./components/Appointments/Appointments";
import {message, Layout, Breadcrumb, BackTop} from "antd";
import {AntDesignOutlined, ArrowUpOutlined} from '@ant-design/icons';

const {Header, Content, Footer} = Layout;

function App() {
    const [users, setUsers] = useState([])
    const [accounts, setAccounts] = useState([])
    const [products, setProducts] = useState([])
    const [productTypes, setProductTypes] = useState([])
    const [attributes, setAttributes] = useState([])

    useEffect(() => {
        const getUsers = async () => {
            const usersFromServer = await fetchUsers()
            const accountsFromServer = await fetchAccounts()
            const productsFormServer = await fetchProducts()
            const productTypesFormServer = await fetchProductTypes()
            setUsers(usersFromServer)
            setAccounts(accountsFromServer)
            setProducts(productsFormServer)
            setProductTypes(productTypesFormServer)
        }
        getUsers().then(r => console.log(r, 'Hello'))
    }, [])

    const fetchUsers = async () => {
        const response = await fetch('http://localhost:5000/users/')
        const data = await response.json()
        console.log('Users:', data)
        return data
    }

    const fetchAccounts = async () => {
        const response = await fetch('http://localhost:5000/accounts/')
        const data = await response.json()
        // console.log('Accounts', data)
        return fixAccountsDate(data)
    }

    const fetchProducts = async () => {
        const response = await fetch('http://localhost:5000/products/')
        const data = await response.json()
        console.log('Products:', data)
        return data
    }

    const fetchProductTypes = async () => {
        const response = await fetch('http://localhost:5000/product-types/')
        const data = await response.json()
        console.log('Product Types', data)
        return data
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
        '/products': 'Products',
        '/products/product-types': 'Product Types',
        '/dynamic-form': 'Forms',
        '/dynamic-form/1': 'Form 1',
        '/dynamic-form/2': 'Form 2',
        '/dynamic-form/3': 'Form 3',
        '/calendar': 'Calendar',
        '/fullcalendar': 'Full Calendar',
        '/appointments': 'Appointments'
    };

    const Bread = withRouter(props => {
        const {location} = props;
        const pathSnippets = location.pathname.split('/').filter(i => i);
        // console.log('pathSnippets:', pathSnippets)

        const extraBreadcrumbItems = pathSnippets.map((_, index) => {
            const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
            // console.log('url:', url)
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

    const handleAddProduct = async (newProduct) => {
        console.log('Added Product - ', newProduct);

        const response = await fetch('http://localhost:5000/products/', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        })

        const data = await response.json()
        console.log('Added Product 2 - ', data)
        console.log('Add Product Response Status - ', response.status)

        if (response.status === 201) {
            message.success(`Added Product Type: ${newProduct ? newProduct.name : 'Error'}`);
        } else {
            message.error(`An error has occurred. Error Status: ${response.status}`);
        }

        setProducts([...products, data])
    }

    const handleAddProductType = async (newProductType) => {
        console.log('Added Product Type - ', newProductType);

        const response = await fetch('http://localhost:5000/product-types/', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newProductType)
        })

        const data = await response.json()
        console.log('Added Product Type 2 - ', data)
        console.log('Add Product Type Response Status - ', response.status)

        if (response.status === 201) {
            message.success(`Added Product Type: ${newProductType ? newProductType.name : 'Error'}`);
        } else {
            message.error(`An error has occurred. Error Status: ${response.status}`);
        }

        setProductTypes([...productTypes, data])

        const attr_response = await fetch('http://localhost:5000/attributes/')
        const attr_data = await attr_response.json()
        console.log('Attributes: ', attr_data)

        attr_data.map(
            attr => (
                fetch(`http://localhost:5000/attributes/${attr.id}/`, {
                    method: 'DELETE',
                    headers: {
                        'Content-type': 'application/json'
                    }
                })
            )
        )
        setAttributes([])
    }

    const handleAddAttribute = async (newAttribute) => {
        console.log('Added Attribute - ', newAttribute);

        const response = await fetch('http://localhost:5000/attributes/', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newAttribute)
        })

        const data = await response.json()
        console.log('Added Attribute 2 - ', data)
        console.log('Add Attribute Response Status - ', response.status)

        if (response.status === 201) {
            message.success(`Added Attribute: ${newAttribute ? newAttribute.label : 'Error'}`);
        } else {
            message.error(`An error has occurred. Error Status: ${response.status}`);
        }

        setAttributes([...attributes, data])
    }

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

                                    <Route path="/products" exact>
                                        <Products
                                            products={products}
                                            productTypes={productTypes}
                                            onAddProduct={handleAddProduct}
                                        />
                                    </Route>

                                    <Route path="/products/product-types" exact>
                                        <ProductTypes productTypes={productTypes}
                                                      onAddProductType={handleAddProductType}
                                                      onAddAttribute={handleAddAttribute}
                                                      attributes={attributes}
                                        />
                                    </Route>

                                    <Route path="/dynamic-form/1" component={DynamicForm}/>

                                    <Route path="/dynamic-form/2" component={DynamicFormTest}/>

                                    <Route path="/dynamic-form/3" component={DynamicFormTest2}/>

                                    <Route path="/calendar" component={MyCalendar}/>

                                    <Route path="/fullcalendar" component={MyFullCalendar}/>

                                    <Route path="/appointments">
                                        <Appointments/>
                                    </Route>
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

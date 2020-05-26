import React, { useContext } from 'react';
import _ from "lodash";
import history from '../../history'
import { Link } from 'react-router-dom'
import UserProvider from '../../context/UserProvider';
import config from '../../config/default';
import './MenuBar.css'
//component
import { Navbar, Nav, NavDropdown, Form } from 'react-bootstrap'
import { Avatar } from 'antd';
console.log("config = ", config)

const MenuBar = () => {
   const user = useContext(UserProvider.context);
   const isLogin = !_.isEmpty(user) ? true : false;

   return (
      <Navbar bg="dark" expand="lg" className="navbar-dark">
         <Navbar.Brand href="#home">Logo</Navbar.Brand>
         <Navbar.Toggle aria-controls="basic-navbar-nav" />
         <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
               {isLogin &&
                  <React.Fragment>
                     <Nav.Link onClick={() => history.push('/home')}>首頁</Nav.Link>
                     <Nav.Link onClick={() => history.push('/document')}>文件</Nav.Link>
                  </React.Fragment>
               }
            </Nav>
            <Form inline>
               {isLogin ?
                  <Nav>
                     <Avatar src={user.avatarsUrl} />
                     <NavDropdown title={user.displayName} style={{ marginRight: "1rem" }} id="nav-dropdown" >
                        <NavDropdown.Item><Link style={{ color: "black" }} to="/profile">個人資料</Link></NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href={`${config.serverUrl}/api/auth/logout`} style={{ color: "black" }}>登出</NavDropdown.Item>
                     </NavDropdown>

                  </Nav>
                  :
                  <Nav>
                     <Nav.Link onClick={() => history.push("/login")}>登入</Nav.Link>
                     <Nav.Link onClick={() => history.push("/register")}>註冊</Nav.Link>
                  </Nav>
               }
            </Form>
         </Navbar.Collapse>
      </Navbar>
   );
};

export default MenuBar;
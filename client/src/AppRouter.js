import React, { Component } from 'react';

import { Router, Route, HashRouter, Switch, BrowserRouter } from "react-router-dom";
import UserProvider from "./context/UserProvider";
import history from "./history";

import MenuBar from './components/MenuBar/MenuBar'
import Home from "./pages/Home/Home";
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Document from './pages/Document/Document'
import OpenApp from './pages/OpenApp/OpenApp';

class AppRouter extends Component {
  state = {
    isLogin: false,
    user: {}
  }

  componentDidMount() {
    fetch("/api/auth/login/success", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    })
      .then(response => {
        if (response.status === 200) return response.json();
        throw new Error("failed to authenticate user");
      })
      .then(responseJson => {
        this.setState({
          user: responseJson.user,
          isLogin: true
        })
      })
      .catch(error => {
        console.log(error)
      });
  }

  render() {

    return (
      <Router history={history}>
        <Switch>
          <UserProvider>
            <Route path="/" component={MenuBar} />
            <Route path="/home" component={Home} />
            <Route exact path="/document" component={Document} />
          </UserProvider>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route path="/:url" component={OpenApp}></Route>
        </Switch>
      </Router>
    )
  }
}


export default AppRouter;
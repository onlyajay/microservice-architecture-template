import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import DashboardPage from "./components/dashboard/DashboardPage"
import LoginPage from "./components/login/LoginForm";
import SignUpPage from "./components/login/SignUpPage";
import history from './history';


import UsersPage from "./components/users/UsersPage"
import UsersAddUpdatePage from "./components/users/UsersAddUpdatePage"


export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={LoginPage} />
                    {/* <Route path="/signup" exact component={SignUpPage} />
                    <Route path="/dashboard" exact component={DashboardPage} /> */}
                    <Route path="/users" exact component={UsersPage} />
                    <Route path="/users/add" exact component={UsersAddUpdatePage} />
                    <Route path="/users/update/:id" exact component={UsersAddUpdatePage} />
                </Switch>
            </Router>
        )
    }
}

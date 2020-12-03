import React, { Component } from 'react'
import {HashRouter,Route,Redirect,Switch} from 'react-router-dom'
import Login from '../views/login/Login'
import DashBoard from '../views/dashBoard/DashBoard'
export default class ThisRouter extends Component {
    render() {
        return (
                <HashRouter>
                    <Switch>
                        <Route path='/login' component={Login}></Route>
                        <Route path='/' render={()=>localStorage.getItem('token')?<DashBoard/>:<Redirect to="/login"></Redirect>}></Route>
                    </Switch>
                </HashRouter>
        )
    }
}

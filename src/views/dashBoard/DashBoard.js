import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import Home from '../home/Home'
import Attendance from '../personnel/Attendance'
import Demand from '../purchase/Demand'
import Today from '../profit/Today'
import SideMenu from '../sideMenu/SideMenu'
import TopHeader from '../topHeader/TopHeader'
import Operation from '../food/Operation'
import List from '../food/List'
import Permissions from '../permissions/Permissions'
import NoPermission from '../nopermission/NoPermission'
import InformationEntry from '../informationEntry/InformationEntry'
import { Layout, Breadcrumb } from 'antd';

const { Content, Footer } = Layout;
const routes=[
    {
        path:"/home",
        component:Home,
        permissions:[0,1,2,3]
    },
    {
        path:"/personnel/attendance",
        component:Attendance,
        permissions:[0,1,2,3]
    },
    {
        path:"/purchase/demand",
        component:Demand,
        permissions:[0,2,3]
    },
    {
        path:"/purchase/InformationEntry",
        component:InformationEntry,
        permissions:[0,1,2,3]
    },
    {
        path:"/profit/today",
        component:Today,
        permissions:[0,3]
    },
    {
        path:"/food/operation",
        component:Operation,
        permissions:[0,2,3]
    },
    {
        path:"/personnel/permissions",
        component:Permissions,
        permissions:[0,3]
    },
    {
        path:"/food/list",
        component:List,
        permissions:[0,1,2,3]
    },
]
export default class DashBoard extends Component {
    state = {
        collapsed: false,
    };
    render() {
        let {level} = JSON.parse(localStorage.getItem("token"))
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <SideMenu></SideMenu>
                <Layout className="site-layout">
                    <TopHeader></TopHeader>
                    <Content style={{ margin: '16px' ,padding:'10px',background:'#fff'}}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item> {JSON.parse(localStorage.getItem('token')).permission}</Breadcrumb.Item>
                            <Breadcrumb.Item> {JSON.parse(localStorage.getItem('token')).username}</Breadcrumb.Item>
                        </Breadcrumb>
                        <Switch>
                            {/* <Route path='/home' component={Home}></Route>
                            <Route path='/personnel/attendance' component={Attendance}></Route>
                            <Route path='/purchase/demand' component={Demand}></Route>
                            <Route path='/profit/today' component={Today}></Route>
                            <Route path='/food/operation' component={Operation}></Route>
                            <Route path='/personnel/permissions' component={Permissions} ></Route> */}
                            {
                                routes.map(item=>
                                    item.permissions.includes(level) && <Route path={item.path} component={item.component} key={item.path}/>    
                                )
                            }
                            <Redirect from="/" to="/home" exact/>
                            <Route path="*" component={NoPermission}/>
                        </Switch>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>BlackGoat Design ©2020 Created by Ivan Shi</Footer>

                </Layout>
            </Layout>
        )
    }
}

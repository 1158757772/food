import React, { Component } from 'react'
import { Layout,Menu, Dropdown} from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
  } from '@ant-design/icons';
  import {withRouter} from 'react-router'
import css from './topHeader.module.css'
import {CollapsedAction} from '../../redux/actions/CollapsedAction'
import {connect} from 'react-redux'
const { Header} = Layout;



class TopHeader extends Component {
    
    // state={
    //     collapsed:store.getState().Collapsed.collapsed
    // }
    componentDidMount() {
      // store.subscribe(()=>{
      //   this.setState({
      //     collapsed:store.getState().Collapsed.collapsed
      //   })
      // })
    }
    
    render() {
      const menu = (
        <Menu>
          <Menu.Item disabled>
            {JSON.parse(localStorage.getItem('token')).permission}
          </Menu.Item>
          <Menu.Item danger onClick={this.leave}>退出</Menu.Item>
        </Menu>
      );
        return (
            <div>
                <Header className={css.siteLayoutBackground} style={{ padding: 0 ,background:'#fff'}} >
                {React.createElement(this.props.isCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: css.trigger,
                onClick: this.toggle,
                })}
                
                <Dropdown overlay={menu}>
                <div className={css.personCenter} onClick={e => e.preventDefault()}>
                欢迎你，{JSON.parse(localStorage.getItem('token')).username} <UserOutlined></UserOutlined>
                </div>
                </Dropdown>
                </Header>
            </div>
        )
    }
    toggle=()=>{
        // this.setState({
        //     collapsed:!this.state.collapsed
        // })
        // store.dispatch(CollapsedAction())
        this.props.CollapsedAction()
    }
    leave=()=>{
      localStorage.removeItem('token'); 
      this.props.history.push('/')
    }
}
const mapStateToProps=(state)=>{
  return {
    isCollapsed:state.Collapsed.collapsed,
    User:state.UserReducer.user
  }
}
const mapDispatchToProps={
  CollapsedAction
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(TopHeader))
import React, { Component } from 'react'
import { Layout, Menu } from 'antd';
import {withRouter} from 'react-router'
import {
    UserOutlined,
    SmileOutlined,
    PieChartOutlined ,
    CheckOutlined,
    MehOutlined,
    UnlockOutlined,
    ShoppingCartOutlined,
    PullRequestOutlined,
    RedEnvelopeOutlined ,
    PropertySafetyOutlined,
    InsertRowAboveOutlined,
    SelectOutlined, 
    TableOutlined
} from '@ant-design/icons';
import {CollapsedAction} from '../../redux/actions/CollapsedAction'
import {connect} from 'react-redux'
const { Sider } = Layout;
const { SubMenu } = Menu;
const menus=  [
    {
        path:"/home",
        title:"首页",
        icon:<PieChartOutlined />,
        permissions:[0,1,2,3]
    },
    {
        path:"/personnel",
        title:"人员管理",
        icon:<UserOutlined/>,
        permissions:[0,1,2,3],
        children:[
            {
                path:"/personnel/attendance",
                title:"人员考勤",
                icon:<CheckOutlined />,
                permissions:[0,1,2,3]
            },
            {
                path:"/personnel/permissions",
                title:"权限管理",
                icon:<UnlockOutlined />,
                permissions:[0,3]
            }
        ]
    },
    {
        path:"/purchase",
        title:"采购",
        icon:<ShoppingCartOutlined />,
        permissions:[0,1,2,3],
        children:[
            {
                path:"/purchase/demand",
                title:"仓库管理",
                icon:<MehOutlined/>,
                permissions:[0,2,3]
            },
            {
                path:"/purchase/InformationEntry",
                title:"采购信息录入",
                icon:<PullRequestOutlined />,
                permissions:[0,1,2,3]
            }
        ]
    },
    {
        path:"/profit",
        title:"利润",
        icon:<RedEnvelopeOutlined />,
        permissions:[0,3],
        children:[
            {
                path:"/profit/today",
                title:"今日利润",
                icon:<PropertySafetyOutlined />,
                permissions:[0,3]
            }
        ]
    },
    {
        path:"/food",
        title:"菜品",
        icon:<InsertRowAboveOutlined />,
        permissions:[0,1,2,3],
        children:[
            {
                path:"/food/operation",
                title:"操作菜品",
                icon:<SelectOutlined />,
                permissions:[0,2,3]
            },
            {
                path:"/food/list",
                title:"菜品列表",
                icon:<TableOutlined />,
                permissions:[0,1,2,3]
            }
        ]
    }
]
class SideMenu extends Component {
    // state = {
    //     collapsed: store.getState().Collapsed.collapsed,
    // };

    onCollapse = collapsed => {
        // this.setState({ collapsed });
        // store.dispatch(CollapsedAction())
        this.props.CollapsedAction()
    };
    componentDidMount(){
        // store.subscribe(()=>{
        //     this.setState({
        //         collapsed:store.getState().Collapsed.collapsed
        //     })
        // })
    }
    render() {
        const selKey=this.props.location.pathname
        const opItem='/'+selKey.split('/')[1]
        return (
            <div>
                <Sider collapsible collapsed={this.props.isCollapsed} onCollapse={this.onCollapse} >
                    <div className="logo"><SmileOutlined rotate={180} /></div>
                    <Menu theme="dark" selectedKeys={[selKey]} defaultOpenKeys={[opItem]} mode="inline">
                        {/* <Menu.Item key="1" icon={<PieChartOutlined />}>
                            Option 1
                            </Menu.Item>
                        <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                            <Menu.Item key="3">Tom</Menu.Item>
                            <Menu.Item key="4">Bill</Menu.Item>
                            <Menu.Item key="5">Alex</Menu.Item>
                        </SubMenu>
                         */}
                        {
                            this.getItem(menus)
                        }
                    </Menu>
                </Sider>
            </div>
        )
    }
    getItem(menu){
        let {level}  = JSON.parse(localStorage.getItem("token"))
        return menu.map(item => {
            if(item.children){
                if(!(item.permissions.includes(level))){
                    return null
                }
                return <SubMenu key={item.path} icon={item.icon} title={item.title}>
                          {this.getItem(item.children)}
                </SubMenu>
            }
            if(!(item.permissions.includes(level))){
                return null
            }
            return <Menu.Item key={item.path} icon={item.icon} onClick={()=>{
                this.props.history.push(item.path);
            }}>
                            {item.title}
            </Menu.Item>
            
        })
    }
}
const mapStateToProps=(state)=>{
    return {
        isCollapsed:state.Collapsed.collapsed
    }
}
const mapDispatchToProps={
    CollapsedAction
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(SideMenu))

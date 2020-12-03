import { Form, Input, Button,message } from 'antd';
import React, { Component } from 'react'
import scss from './Login.module.scss'
import Particles from 'react-particles-js';
import axios from 'axios'
import store from '../../redux/store'
import { ChangeUserAction } from '../../redux/actions/UserAction'
import {connect} from 'react-redux'
 class Login extends Component {
    render() {

        const layout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 },
        };
        const tailLayout = {
            wrapperCol: { offset: 8, span: 16 },
        };
        const onFinish = values => {
            this.props.ChangeUserAction(values).then(res=>{
                console.log("同步redux",res);
                localStorage.setItem('token',JSON.stringify(res.payLoad[0]))
                this.props.history.push('/');
            })
            // console.log(values);
            // axios.get(`http://localhost:5000/user?username=${values.username}&password=${values.password}`).then(data=>{
            //     if(data.data.length){
            //         localStorage.setItem('token',JSON.stringify(data.data[0]))
            //         console.log(this);
            //         // this.props.store.dispatch(actions.login(data.data[0]))
            //         // console.log(this.props.store.getState());
            //         this.props.history.push('/');
            //     }else{
            //         message.info('Incorrect user name or password');
            //     }
            // })
        };
        return (
            <div>
                <Particles style={{
                    background: '#000',
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    zIndex: '-20'
                }} params={{
                    "particles": {
                        "number": {
                            "value": 160,
                            "density": {
                                "enable": false
                            }
                        },
                        "size": {
                            "value": 10,
                            "random": true
                        },
                        "move": {
                            "direction": "bottom",
                            "out_mode": "out"
                        },
                        "line_linked": {
                            "enable": false
                        }
                    },
                    "interactivity": {
                        "events": {
                            "onclick": {
                                "enable": true,
                                "mode": "remove"
                            }
                        },
                        "modes": {
                            "remove": {
                                "particles_nb": 10
                            }
                        }
                    }
                }} />
                <h1 style={{ textAlign: 'center', paddingTop: '150px', color: '#fff' }}>
                    欢迎来到伟大的后台系统
                </h1>
                <div className={scss.loginCard}>


                    <Form
                        {...layout}
                        name={scss.basic}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        labelAlign='left'
                    >

                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>


                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit" style={{ background: '#000', border: 'none' }}>
                                Submit
                           </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}
const mapStateToProps=(state)=>{
    return{}
}
const mapDispatchToProps={
    ChangeUserAction
}
export default connect(mapStateToProps,mapDispatchToProps)(Login)

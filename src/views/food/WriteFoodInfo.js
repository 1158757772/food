import React, { Component } from 'react'
import { Form, Input,Cascader } from 'antd';
import css from  './WriteFoodInfo.module.css'
import axios from 'axios'
import MkFood from './Mkfood'
const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 16,
    },
  };
  
    
export default class writeFoodInfo extends Component {
    state={
      options:[],
      mkFoodInfo:[],
      allV:{},
      select:[]
    }
    componentDidMount(){
      axios.get('http://localhost:5000/foodType').then(data=>{
        this.setState({
          options:data.data
        })
      })
      if(this.props.foodInfo.mkFoodInfo){
        
        setTimeout(()=>{
          this.setState({
            select:this.props.foodInfo.mkFoodInfo.map(item=>item.key)
          })
        },0)
      }
    }
    onFinish = (values,allValues) => {
        // console.log('Success:', values);
        this.setState({
          allV:allValues
        })
        this.props.setInfo(allValues)
      };
      
    render() {
        return (
            <div>
                 <Form
      {...layout}
      name="basic"
      initialValues={
        this.props.foodInfo
      }
      onValuesChange={this.onFinish}
      name={css.writeFoodInfo}
    >
      <Form.Item
        label="菜品名称"
        name="name"
        rules={[
          {
            required: true,
            message: '请输入菜品名称',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="菜品种类"
        name="type"
        rules={[
          {
            required: true,
            message: '请选择菜品类型',
          },
        ]}
      >
        <Cascader options={this.state.options}  placeholder="请选择菜品种类" />
      </Form.Item>
      <Form.Item
         label="菜品原料"
         name="name"
         rules={[
           {
             required: true,
             message: '请选择菜品原料',
           },
         ]}
       >
         
         <MkFood mkFoodInfo={this.setMkFoodInfo} sub={this.onSub} haveSelectedKeys={this.state.select} orgCom={this.props.foodInfo.mkFoodInfo}/>
      </Form.Item>
    </Form>
            </div>
        )
    }
    
    setMkFoodInfo=(arr)=>{
      
        this.setState({
          mkFoodInfo:arr
        },()=>{
          this.props.setInfo({...this.state.allV,mkFoodInfo:this.state.mkFoodInfo})
        })
      
      
    }
    
}

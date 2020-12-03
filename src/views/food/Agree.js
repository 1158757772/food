import {  useState } from "react"
import React from 'react'
import { Form, Input,Cascader } from 'antd';
import css from './FoodMenuInfo.module.css'
const layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 16,
    },
  };
  
  
export default function Agree(props) {
    const [datalist] =useState(props.foodInfo)
    //datalist.foodInfo.map(item=>item.title+"-"+item.count+"千克")
    //proveDataList是经过处理的渲染页面的数据列表，datalist是数据源
    const proveDataList={...datalist}
    proveDataList.mkFoodInfo=proveDataList.mkFoodInfo.map(item=>item.title+"-"+item.count+"千克")
    return (
            <Form
      {...layout}
      name={css.basic}
      initialValues={{
        remember: true,
      }}
      initialValues={proveDataList}
    >
      <Form.Item
        label="菜品名称"
        name="name"
      >
        <Input disabled/>
      </Form.Item>

      <Form.Item
        label="定价"
        name="price"
      >
         <Input prefix="￥" suffix="RMB" disabled/>
      </Form.Item>
      <Form.Item
        label="配料"
        name="mkFoodInfo"
      >
         <Cascader  disabled/>
      </Form.Item>
      <Form.Item
        label="类型"
        name="type"
      >
         <Cascader  disabled/>
      </Form.Item>


    </Form>
    )
}

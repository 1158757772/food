import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import css from './FoodMenuInfo.module.css'
import Loadimg from './loadImg'
const layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };
  
export default function FoodMenuInfo(props) {
    const onFinish = (values) => {
        props.setInfo({...props.foodInfo,...values})
      };
    
    return (
        <div>
            <Form
      {...layout}
      name={css.basic}
      initialValues={
        props.foodInfo
      }
      onValuesChange={onFinish}
    >
      <Form.Item
        label="价格"
        name="price"
        rules={[
          {
            required: true,
            message: '请输入本菜品价格!',
          },
        ]}
        
      >
          
          <Input prefix="￥" suffix="RMB" />
      </Form.Item>

      <Form.Item
        label="显示在菜单的图片"
        name="img"
        rules={[
          {
            required: false,
            message: '未添加图片',
          },
        ]}
      >
        <Loadimg></Loadimg>
      </Form.Item>

    </Form>
        </div>
    )
}

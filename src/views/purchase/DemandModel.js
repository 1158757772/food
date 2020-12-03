import React, { useState,useEffect } from 'react';
import {  Modal, Form, Input, Radio } from 'antd';
import axios from 'axios'
const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    return (
      <Modal
        visible={visible}
        title="更新仓库"
        okText="确认"
        cancelText="取消"
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onCreate(values);
            })
        }}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{
            modifier: 'public',
          }}
        >
          <Form.Item
            name="title"
            label="原料名称"
            rules={[
              {
                required: true,
                message: '请输入原料名称',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="inventory"
            label="更新数量"
            rules={[
              {
                required: true,
                message: '请输入数量',
              },
            ]}
          >
            <Input suffix="千克" />
          </Form.Item>
          
        </Form>
      </Modal>
    );
  };
export default function DemandModel(props) {
    const [visible, setVisible] = useState(props.visible);
    useEffect(()=>{
         setVisible(props.visible)
    },[props.visible])
    const onCreate = (values) => {
        values={title:values.title,inventory:parseInt(values.inventory)}
        console.log('Received values of form: ', values)
        axios(`http://localhost:5000/MkFood?title=${values.title}`).then((res)=>{
           if(res.data.length){
            axios.put(`http://localhost:5000/MkFood/${res.data[0].id}`,{
                title:res.data[0].title,
                inventory:res.data[0].inventory+values.inventory,
            }).then((res)=>{
                console.log('修改数据成功',res.data);
                props.closeModel()
            })
           }else{
            axios.post("http://localhost:5000/MkFood",values).then(res=>{
                console.log(res.data);
                props.closeModel()
            })
           }
        })
        setVisible(false);
       
      };
    return (
        <div>
            <CollectionCreateForm
            visible={visible}
            onCreate={onCreate}
            onCancel={() => {
            setVisible(false);
            props.closeModel()
            }}
        />
        </div>
    )
}

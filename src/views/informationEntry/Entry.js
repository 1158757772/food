import React, { Component } from 'react'
import { Form, Input, Button, DatePicker, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import Axios from 'axios';
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};


export default class Entry extends Component {
    state={
        time:''
    }
    onFinish = values => {
        let purchaseEntryData={
            name:values.name,
            time:this.state.time,
            mkFood:values.mkFood,
            state:0
        }
        
        console.log('Success:', purchaseEntryData);
        Axios.post('http://localhost:5000/purchaseEntry',purchaseEntryData).then((res)=>{
            this.props.tableReload(res.data)
        })
        //更新原料表
        for(var i=0;i<values.mkFood.length;i++){
            let addMkFood={
                title:values.mkFood[i].title,
                inventory:values.mkFood[i].inventory
            }
            Axios(`http://localhost:5000/MkFood?title=${values.mkFood[i].title}`).then((res)=>{
                if(res.data.length){
                 Axios.put(`http://localhost:5000/MkFood/${res.data[0].id}`,{
                     title:res.data[0].title,
                     inventory:parseInt(res.data[0].inventory)+parseInt(addMkFood.inventory)
                 })
                }else{
                 Axios.post("http://localhost:5000/MkFood",addMkFood)
                }
             })
        }
       
    };

    render() {
        return (
            <div style={{width:'50%',margin:"20px 25%"}}>
                <h3>采购信息录入</h3>

                <Form
                    {...layout}
                    name="basic"
                    onFinish={this.onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="采购人姓名"
                        name="name"
                        rules={[{ required: true, message: '请输入采购人姓名' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="采购时间"
                        name="time"
                        rules={[{ required: true, message: '请输入采购时间' }]}
                    >
                        <DatePicker onChange={(data, dateString) => {
                            this.setState({
                                time:dateString
                            })
                        }} />
                    </Form.Item>
                    
                    {/* 表单列表 */}
                    <Form.List name="mkFood">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(field => (
                                    <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'title']}
                                            fieldKey={[field.fieldKey, '食材名称']}
                                            rules={[{ required: true, message: '请填写食材名称' }]}
                                        >
                                            <Input placeholder="食材名称" />
                                        </Form.Item>
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'inventory']}
                                            fieldKey={[field.fieldKey, '数量（千克）']}
                                            rules={[{ required: true, message: '请填写数量' }]}
                                        >
                                            <Input placeholder="食材数量" />
                                        </Form.Item>
                                        <MinusCircleOutlined onClick={() => remove(field.name)} />
                                    </Space>
                                ))}
                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                        添加一个食材
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>



                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

import React, { Component  } from 'react'
import { Table,Button ,Modal, Form, Input, Select } from 'antd';
import axios from 'axios'

const {Option} = Select;
export default class Permissions extends Component {
    state = {
        data: [],
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
        filteredInfo:[],
        visibleAdd: false,
        roleList:[],
        columns :[
            {
                title: 'Name',
                dataIndex: 'username',
                key: 'username',
                render: text => <b>{text}</b>,
            },
            {
                title: 'Level',
                dataIndex: 'level',
                key: 'level',
                defaultSortOrder: 'descend',
                sorter: (a, b) => parseInt(a.level) - parseInt(b.level)
            },
            {
                title: 'permission',
                dataIndex: 'permission',
                key: 'permission',
                filters: [],
                onFilter: (value, record) => record.permission=== value,
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
            },
            {
                title: '操作',
                dataIndex: '操作',
                key: 'do',
                render: (text, record) => {
                    if(parseInt(record.level)===0){
                        return <Button type="primary" danger disabled={true} onClick={()=>{this.del(record.id)}}>删除</Button>
                    }
                    return <Button type="primary" danger disabled={false} onClick={()=>{this.del(record.id)}}>删除</Button>
                },
            }
        ]
    };
    myAddForm = React.createRef()
    del(id){
        var newlist = [...this.state.data]
        newlist.splice()
        this.setState({
            data:this.state.data.filter(item=>item.id!==id),
            loading:true
        })
        axios.delete(`http://localhost:5000/user/${id}`).then((data)=>{
            console.log(data);
            setTimeout(()=>{
                        this.setState({
                            loading:false
                        })
                    },1000)
        })
    }
    start = () => {
        this.setState({ loading: true });
        // ajax request after empty completing
        setTimeout(() => {
          this.setState({
            selectedRowKeys: [],
            loading: false,
          });
        }, 1000);
      };
      onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
      };
    componentDidMount() {
        axios.get(`http://localhost:5000/user?`).then(data => {
            this.setState({
                data: data.data
            });
        })
        axios.get(`http://localhost:5000/role?`).then(data => {
            this.setState({
                roleList: data.data
            })
            let result=this.state.columns.filter(data=>data.filters)[0]
            result.filters=data.data.map(item=>{
                    return {text:item.roleName,value:item.roleName}
            })
            
            this.setState({
                columns: [...this.state.columns.filter(data=>!data.filters),result]
            })
        })
        
    }
    render() {
        const { data, loading,selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            {
                key: 'odd',
                text: 'Select Odd Row',
                onSelect: changableRowKeys => {
                let newSelectedRowKeys = [];
                newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                    if (index % 2 !== 0) {
                    return false;
                    }
                    return true;
                });
                this.setState({ selectedRowKeys: newSelectedRowKeys });
                },
            },
            {
                key: 'even',
                text: 'Select Even Row',
                onSelect: changableRowKeys => {
                let newSelectedRowKeys = [];
                newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                    if (index % 2 !== 0) {
                    return true;
                    }
                    return false;
                });
                this.setState({ selectedRowKeys: newSelectedRowKeys });
                },
            },
            ],
        };
        const hasSelected = selectedRowKeys.length > 0;
        
       
  
 
        return (
            <div>
                <div style={{ marginBottom: 16 }}>
                
               
                <span style={{ marginLeft: 8 }}>
                    {hasSelected ? `已选 ${selectedRowKeys.length} 项` : ''}
                </span>
                <Button type="primary"  style={{background:'#000',border:'#000',color:'#fff',float:'right'}} onClick={() => {
                    this.setState({
                        visibleAdd: true
                    })}}>
                    添加员工
                </Button>
                
                </div>
                
            <Table
                columns={this.state.columns}
                dataSource={data}
                rowKey={record => record.id}
                rowSelection={rowSelection}
                loading={this.state.loading}
            />
            <Modal
                    visible={this.state.visibleAdd} //visible是否可见
                    title="添加用户信息"
                    okText="创建"
                    cancelText="取消"
                    onCancel={() => {
                        this.setState({
                            visibleAdd: false
                        })
                    }}
                    onOk={this.addOk}
                >
                    <Form
                        layout="vertical"
                        name="form_in_modal"
                        ref={this.myAddForm} //通过this.myAddForm 就饿可以访问form组件实例上的所有方法
                    >
                        <Form.Item
                            name="username"
                            label="用户名"
                            rules={[{ required: true, message: 'Please input the title of collection!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label="密码"
                            rules={[{ required: true, message: 'Please input the title of collection!' }]}
                        >
                            <Input type="password" />
                        </Form.Item>
                        <Form.Item
                            name="permission"
                            label="角色"
                            rules={[{ required: true, message: 'Please input the title of collection!' }]}
                        >
                            <Select
                                showSearch
                                placeholder="Select a role"
                            >
                                {
                                    this.state.roleList.map( (item,index)=>
                                    <Option value={item.roleName} key={index}>{item.roleName}</Option>    
                                    )
                                }
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
                
    }
    addOk = ()=>{
        // console.log(this.myAddForm.current)
        //校验表单
        this.myAddForm.current.validateFields().then(value=>{
            let perList=["开发人员","员工","经理","总经理"]
            let level=perList.indexOf(value.permission)
            let work;
            let data2={};
            if(level===1){
                work=1
                data2={
                    who:value.username,
                    money:0
                }
            }else{
                work=0
            }
            //组装数据
            let data = {
                ...value,
                "email": 'xxx@xx.com',
                "level": level,
                "work":work
            }
            
            // console.log(data)
            return {data,data2}
        }).catch(error=>{
            console.log(error)
        }).then(value=>{
            // console.log(value)

            axios.post("http://localhost:5000/user",value.data).then(res=>{
                // console.log(res.data)

                this.setState({
                    data:[...this.state.data,res.data],
                    visibleAdd:false
                })
            })
            if(value.data2.who){
                axios.post("http://localhost:5000/Performance",value.data2)
            }
            

            this.myAddForm.current.resetFields() //reset
        })
    }
}

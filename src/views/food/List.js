import React,{useState,useEffect}from 'react'
import axios from 'axios'
import { Table, Tag,Button } from 'antd';
export default function List(props) {
    const [datalist,setDatalist] =useState([])
    const [del,setDel] =useState(0)
    const columns = [
        {
          title: '菜名',
          dataIndex: 'name',
          key: 'name',
          render: text => <b>{text}</b>,
        },
        {
          title: '分类',
          dataIndex: 'type',
          key: 'type',
        },
        {
            title: '原料',
            key: 'mkFoodInfo',
            dataIndex: 'mkFoodInfo',
            render: tags => (
              <>
              {
                
              
                tags.map(tag => {
                  let color
                  if(tag.mkName){
                     color = tag.mkName.length > 2 ? 'geekblue' : 'green';
                  }
                  if(tag.mkName ==='毛肚'){
                    color = 'geekblue';
                  }
                  if (tag.mkName === '辣椒') {
                    color = 'volcano';
                  }
                  return (
                    <Tag color={color} key={tag.mkName}>
                      {tag.mkName}
                    </Tag>
                  );
                })
            }
              </>
            ),
          },
        {
          title: '操作',
          key: 'do',
          render: (text, record) => (
            <Button type="primary" danger  onClick={()=>{setDel(record.id)}}>删除</Button>
          ),
        },
      ];
    useEffect(()=>{
        axios.get(`http://localhost:5000/foodList`).then(res=>{
            setDatalist(res.data)
        })
    },[])
    useEffect(()=>{
        var newlist = [...datalist]
        newlist.splice()
        setDatalist(datalist.filter(item=>item.id!==del))
        if(del!==0){
        axios.delete(`http://localhost:5000/foodList/${del}`)
        }
    },[del,setDel])
    
    return (
        <div>
            <Button type="primary"  style={{background:'#000',border:'#000',color:'#fff',float:'right'}} onClick={()=>{
              props.history.push('/food/operation')
            }}>
                      添加菜品
                  </Button>
            <Table columns={columns} dataSource={datalist} rowKey={record => record.id}/>
            
        </div>
    )
}

import React, { Component } from 'react'
import { Table, Button, message ,Tag} from 'antd';
import Axios from 'axios';
export default class InfomationTable extends Component {
    state={
        dataList:[],
        level:JSON.parse((localStorage.getItem('token'))).level
    }
    componentDidMount(){
        Axios.get('http://localhost:5000/purchaseEntry').then(res=>{
            
            let arr=res.data.map(item=>{
                return{
                    key:item.id,
                    name:item.name,
                    time:item.time,
                    mkFood:item.mkFood,
                    state:item.state
                }
            })
            this.setState({
                dataList:arr
            })
        })
    }
    UNSAFE_componentWillReceiveProps(newprops){
        let newobj={
                name:newprops.newItem.name,
                key:newprops.newItem.id,
                time:newprops.newItem.time,
                mkFood:newprops.newItem.mkFood,
                state:0
            
        }
        if(newprops.newItem.name){
            this.setState({
                dataList:[...this.state.dataList,newobj]
            })
        }
        
    }
    columns = [
        {
          title: '采购人姓名',
          dataIndex: 'name',
          key: 'name',
          render: text => <b>{text}</b>,
        },
        {
          title: '采购时间',
          dataIndex: 'time',
          key: 'time',
        },
        {
          title: '采购原料',
          key: 'mkFood',
          dataIndex: 'mkFood',
          render: item => (
            <>
              {item.map((food,index) => {
                return <span  key={index}>{food.title}-{food.inventory}千克 </span>
              })}
            </>
          ),
        },
        {
          title: '状态',
          key: 'state',
          dataIndex: 'state',
          render: state => {
            let infoArr=["待审核，待报销","已审核并报销，待采购人确认","已确认完成","已驳回"]
            let colorList=['blue','orange','green','magenta']
            return(
            <Tag color={colorList[parseInt(state)]}>{infoArr[parseInt(state)]}</Tag>
            )
          },
        },
        {
            title: '操作',
            dataIndex: 'do',
            render: (text,record )=> {
                let isNeedauid=true;
                let isCanBack=true;
                let isNeedCon=true
                if(record.state===0){
                    isNeedauid=false
                    isCanBack=false
                }
                if(record.state===1){
                    isNeedCon=false
                }
             return  (
                 
                     this.state.level===1?(
                     <Button type="primary" onClick={()=>{this.audit(record,2,"确认")}} disabled={isNeedCon}>确认</Button>)
                     :
                     (<span>
                        <Button type="primary" onClick={()=>{this.audit(record,1,"审核")}} disabled={isNeedauid}>
                             审核
                        </Button>
                        <Button type="primary" danger  disabled={isCanBack} onClick={()=>{this.audit(record,3,"驳回")}}>
                            驳回
                        </Button>
                    </span>)
                 
                 ) 
                 
            }
          }
      ];
    render() {
        return (
            <div>
               <Table columns={this.columns} dataSource={this.state.dataList}/>
            </div>
        )
    }
    audit(record,sta,msg){
        Axios.put(`http://localhost:5000/purchaseEntry/${record.key}`,{
            id:record.key,
            name:record.name,
            time:record.time,
            mkFood:record.mkFood,
            state:sta
        }).then((data)=>{
            //this.reload(data,msg,record)
            let item=data.data
        let newobj={
                key:item.id,
                name:item.name,
                time:item.time,
                mkFood:item.mkFood,
                state:item.state
            }
        
        let newlist=[]
        for(var i=0;i<this.state.dataList.length;i++){
            if(this.state.dataList[i].key===record.key){
                newlist.push(newobj)
            }else{
                newlist.push(this.state.dataList[i])
            }
        }
        this.setState({
            dataList:newlist
        },()=>{
            message.success(msg+'成功');
        })
        
        })
        // reload(){

        // }
    }
    
}

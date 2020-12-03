import React, { Component } from 'react'
import { Calendar, Badge } from 'antd';
import './attendance.css'
import locale from 'antd/lib/calendar/locale/zh_CN.js'
import Axios from 'axios';


  
  
  
  function getMonthData(value) {
      //每个月份的回调，这里查每个月信息
    return 15
  }
  
  function monthCellRender(value) {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  }
  
export default class PersonnelManage extends Component {
    state={
        sData:[],
        DData:[]
    }
    componentDidMount() {
       
            Axios.get('http://localhost:5000/user?level=1&work=1').then((res)=>{
                this.setState({
                    sData:res.data.map(item=>{return{
                        type:'success',
                        content:item.username
                    }})
                })
            })
        
        
            Axios.get('http://localhost:5000/user?level=1&work=2').then((res)=>{
                this.setState({
                    DData:res.data.map(item=>{return{
                        type:'success',
                        content:item.username
                    }})
                })
            })
    }
    
    getListData=(value)=>{
        //在这里查每一天的信息
        
       
        let listData;
        if(value.date()%2===0){
            listData=this.state.sData
            
        }else{
          listData=this.state.DData
        }
        
        return listData ;
        
    
      }
      dateCellRender=(value)=>{
        console.log(value.valueOf(),(new Date()).getTime());
        const listData = this.getListData(value)
        //listData是每一天渲染表格的信息
        return (
          <ul className={value.valueOf()<(new Date()).getTime()?"have event":"no event"}>
            {listData.map(item => (
              <li key={item.content}>
                <Badge status={item.type} text={item.content} />
              </li>
            ))}
          </ul>
        );
      }
    render() {
        return (
            <div>
              {this.state.sData.length&&this.state.sData.length? <Calendar dateCellRender={this.dateCellRender} monthCellRender={monthCellRender} locale={locale}/>:""}
                
            </div>
        )
    }
}

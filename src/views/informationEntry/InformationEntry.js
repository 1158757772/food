
import React, {Component}from 'react';
import InfomationTable from  './InfomationTable'
import Entry from './Entry'
export default class InformationEntry extends Component {
    state={
        newItem:{},
        level:JSON.parse(localStorage.getItem('token')).level
    }
    render() {
        return (
                 <div>
                    <h3>采购记录</h3>
                    <InfomationTable newItem={this.state.newItem}></InfomationTable>
                    {this.state.level<=1?<Entry tableReload={this.tableReload} ></Entry>:""}
                    
                </div>
        )
    }
    //添加采购信息以后重新渲染表格
    tableReload=(newItem)=>{
        this.setState({newItem:newItem})
    }
}


import React, { Component } from 'react'
import { Card } from 'antd';
import Axios from 'axios';

export default class card extends Component {
    state={
        datalist:[]
    }
    componentDidMount() {
        Axios.get(' http://localhost:5000/message').then((res)=>{
            this.setState({
                datalist:res.data
            })
        })
    }
    
    
    render() {
        let {datalist}=this.state
        return (datalist.length?<Card title="今日注意">
            <Card type="inner" title={datalist[datalist.length-2].who}>
            {datalist[datalist.length-2].talk}
            </Card>
            <Card
              style={{ marginTop: 16 }}
              type="inner"
              title={datalist[datalist.length-1].who}
            >
              {datalist[datalist.length-1].talk}
            </Card>
          </Card>:"")
            
        
    }
}

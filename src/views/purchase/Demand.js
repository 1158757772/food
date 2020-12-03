import React, { Component } from 'react'
import axios from 'axios'
import _ from 'lodash'
import Echarts from "echarts"
import { Button } from 'antd';
import scss from './demand.module.scss'
import DemandModel from './DemandModel'
export default class Demand extends Component {
    
    myChart = null
    componentDidMount(){
        axios.get('http://localhost:5000/MkFood').then((res)=>{
            let arr=_.groupBy(res.data, 'title')
            this.setState({
                xAxisData:Object.keys(arr),
                yAxisData:Object.values(arr).map(item => item[0].inventory)
            },()=>{
                this.renderEchart()
            })
        })
        window.onresize = ()=>{
            // console.log(11)
            this.myChart && this.myChart.resize()
        }
    }
    componentWillUnmount(){
        window.onresize = null
    }
    state={
        xAxisData:[],
        yAxisData:[],
        seeModel:false
    }
    
    renderEchart() {
        this.myChart = Echarts.init(document.getElementById('Demand'));
        // 指定图表的配置项和数据
        var option = {
            title: {
                text: '仓库剩余'
            },
            tooltip: {},
            xAxis: {
                data: this.state.xAxisData,
                axisLabel:{
                    
                    rotate:30 //旋转
                }
            },
            yAxis: {
                minInterval: 1
            },
            series: [{
                name: '数量(千克)',
                type: 'bar',
                data: this.state.yAxisData,
                itemStyle: {
                    normal: {
                        color: function (params) {
                            if(params.data<400){
                                return "rgb(141, 20, 20)"
                            }else if(params.data>=400&&params.data<800){
                                return "rgb(235, 232, 86)"
                            }else{
                                return "rgb(8, 141, 26)"
                            }
                        }
                    }
                },
            }]
        };
        this.myChart.setOption(option);
    }
    render() {

        return (
            <div>
                <Button type="primary" className={scss.btn} onClick={
                    ()=>{
                        this.setState({
                            seeModel:true
                        })
                    }
                }>更新仓库信息</Button>
                
                <div id="Demand" style={{ width: "100%", height: '400px' }}></div>
                <DemandModel visible={this.state.seeModel} closeModel={this.closeModel}></DemandModel>
            </div>
        )
    }
    closeModel=()=>{
        this.setState({
            seeModel:false
        })
        axios.get('http://localhost:5000/MkFood').then((res)=>{
            let arr=_.groupBy(res.data, 'title')
            this.setState({
                xAxisData:Object.keys(arr),
                yAxisData:Object.values(arr).map(item => item[0].inventory)
            },()=>{
                this.renderEchart()
                
            })
        })
    }
}

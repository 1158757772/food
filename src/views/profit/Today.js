import React, { Component } from 'react'
import axios from 'axios'
import _ from 'lodash'
import Echarts from "echarts"
export default class Today extends Component {
    myChart = null
    componentDidMount(){
        axios.get('http://localhost:5000/profits').then((res)=>{
            let arr=_.groupBy(res.data, 'date')
            console.log(Object.keys(arr));
            this.setState({
                xAxisData:Object.keys(arr),
                yAxisData:Object.values(arr).map(item => item[0].money),
                y2AxisData:Object.values(arr).map(item => item[0].realMoney)
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
        y2AxisData:[],
        seeModel:false
    }
    renderEchart() {
        this.myChart = Echarts.init(document.getElementById('Demand'));
        // 指定图表的配置项和数据
        var option = {
            title: {
                text: '今日利润'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['当日营业额', '净利润']
            },
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
                name: '当日营业额',
                type: 'line',
                data: this.state.yAxisData,
                // itemStyle: {
                //     normal: {
                //         color: function (params) {
                //             if(params.data<400){
                //                 return "rgb(141, 20, 20)"
                //             }else if(params.data>=400&&params.data<800){
                //                 return "rgb(235, 232, 86)"
                //             }else{
                //                 return "rgb(8, 141, 26)"
                //             }
                //         }
                //     }
                // },
            },{
                name: '净利润',
                type: 'line',
                data: this.state.y2AxisData,
                // itemStyle: {
                //     normal: {
                //         color: function (params) {
                //             if(params.data<400){
                //                 return "rgb(141, 20, 20)"
                //             }else if(params.data>=400&&params.data<800){
                //                 return "rgb(235, 232, 86)"
                //             }else{
                //                 return "rgb(8, 141, 26)"
                //             }
                //         }
                //     }
                // },
            }
        ]
        };
        this.myChart.setOption(option);
    }
    render() {

        return (
            <div>
                
                
                <div id="Demand" style={{ width: "100%", height: '400px' }}></div>
                
            </div>
        )
    }
}

import React, { Component } from 'react'
import axios from 'axios'
import _ from 'lodash'
import Echarts from "echarts"
export default class HomeTarget extends Component {
    myChart = null
    componentDidMount(){
        axios.get(' http://localhost:5000/Performance').then((res)=>{
            let arr=_.groupBy(res.data, 'who')
            this.setState({
                xAxisData:Object.keys(arr),
                yAxisData:Object.values(arr).map(item => {return{
                    value:item[0].money,
                    name:item[0].who
                }})
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
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',
                left: 10,
                data: this.state.xAxisData
            },
            series: [
                {
                    name: '上个月业绩',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: this.state.yAxisData
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

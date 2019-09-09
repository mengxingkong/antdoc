import React from 'react'
import {Card} from 'antd'
import echartTheme from './../echartTheme'
// 按需加载
import echarts from 'echarts/lib/echarts'
//倒入柱形图
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import ReactEcharts from 'echarts-for-react'
export default class Bar extends React.Component{

    componentWillMount(){
        // 主题需要提前注入
        echarts.registerTheme('mxkstar', echartTheme);
    }


    getOptions = ()=>{
        let option = {
            title:{
                text:'用户骑行订单'
            },
            tooltip:{
                trigger:'axis'
            },
            xAxis:{
                data:['周一','周二','周三','周四','周五','周六','周日',]
            },
            yAxis:{
                type:'value'
            },
            series:[
                 {
                     name:'订单梁',
                     type:'bar',
                     data:[1000,2000,3000,1500,4000,800,4600]
                 }
            ]
        }
        return option;
    }

    getOption2 = () =>{
        let option = {
            title:{
                text:'用户骑行订单'
            },
            legend:{
                data:['OFO','摩拜','小蓝']
            },
            tooltip:{
                trigger:'axis'
            },
            xAxis:{
                data:['周一','周二','周三','周四','周五','周六','周日',]
            },
            yAxis:{
                type:'value'
            },
            series:[
                 {
                     name:'OFO',
                     type:'bar',
                     data:[1000,2000,3000,5000,7000,10000,12000]
                 },
                 {
                    name:'摩拜',
                    type:'bar',
                    data:[1500,2500,3000,5000,8000,12000,14000]
                },
                {
                    name:'小蓝',
                    type:'bar',
                    data:[1000,2000,3000,4000,5000,6000,7000]
                }
            ]
        }
        return option;
    }

    render(){
        return(
            <div>
                <Card title="柱形图1">
                    <ReactEcharts option={this.getOptions()} theme="mxkstar" style={{height:500}} />
                </Card>
                <Card title="柱形图2" style={{marginTop:10}}>
                    <ReactEcharts option={this.getOption2()} theme="mxkstar" style={{height:500}} />
                </Card>
            </div>
        );
    }
}
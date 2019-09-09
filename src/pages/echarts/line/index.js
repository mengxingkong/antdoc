import React from 'react'
import {Card} from 'antd'
import echartTheme from './../themeLight'
// 按需加载
import echarts from 'echarts/lib/echarts'
//倒入饼图
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import ReactEcharts from 'echarts-for-react'
export default class Line extends React.Component{

    componentWillMount(){
        // 主题需要提前注入
        echarts.registerTheme('mxkstar', echartTheme);
    }


    getOptions = ()=>{
        let option = {
           title:{
               text:'用户骑行订单',
           },
           tooltip:{
                trigger:'axis'
           },
           xAxis:{
                data:[
                    '周一','周二','周三','周四','周五','周六','周日'
                ]
           },
           yAxis:{
                type:'value'
           },
           series:[
                {
                    name:'订单量',
                    type:'line',
                    data:[
                        1000,
                        2000,
                        3000,
                        2500,
                        3600,
                        4000,
                        2000
                    ]
                }
           ]
        }
        return option;
    }

    getOption2 = () =>{
        let option = {
            title:{
                text:'用户骑行订单',
            },
            tooltip:{
                 trigger:'axis'
            },
            xAxis:{
                 data:[
                     '周一','周二','周三','周四','周五','周六','周日'
                 ]
            },
            yAxis:{
                 type:'value'
            },
            series:[
                 {
                     name:'订单量',
                     type:'line',
                     data:[
                         1000,
                         2000,
                         3000,
                         2500,
                         3600,
                         4000,
                         2000
                     ],
                     areaStyle:{}
                 }
            ]
         }
         return option;
    }

    getOption3 = () =>{
        let option = {
            title:{
                text:'用户骑行订单',
            },
            legend:{
                data:['OFO订单量','膜拜订单量']
            },
            tooltip:{
                 trigger:'axis'
            },
            xAxis:{
                 data:[
                     '周一','周二','周三','周四','周五','周六','周日'
                 ]
            },
            yAxis:{
                 type:'value'
            },
            series:[
                 {
                     name:'OFO订单量',
                     type:'line',
                     data:[
                         1000,
                         2000,
                         3000,
                         2500,
                         3600,
                         4000,
                         2000
                     ]
                 },
                 {
                    name:'膜拜订单量',
                    type:'line',
                    data:[
                        1200,
                        2500,
                        3600,
                        2800,
                        3800,
                        4200,
                        2300
                    ]
                }
            ]
         }
         return option;
    }

    render(){
        return(
            <div>
                <Card title="折线图1">
                    <ReactEcharts option={this.getOptions()} theme="mxkstar" style={{height:500}} />
                </Card>
                <Card title="折线图2" style={{marginTop:10}}>
                    <ReactEcharts option={this.getOption2()} theme="mxkstar" style={{height:500}} />
                </Card>
                <Card title="折线图3" style={{marginTop:10}}>
                    <ReactEcharts option={this.getOption3()} theme="mxkstar" style={{height:500}} />
                </Card>
            </div>
        );
    }
}
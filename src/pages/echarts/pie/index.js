import React from 'react'
import {Card} from 'antd'
import echartTheme from './../themeLight'
// 按需加载
import echarts from 'echarts/lib/echarts'
//倒入饼图
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import ReactEcharts from 'echarts-for-react'
export default class Pie extends React.Component{

    componentWillMount(){
        // 主题需要提前注入
        echarts.registerTheme('mxkstar', echartTheme);
    }


    getOptions = ()=>{
        let option = {
           title:{
               text:'用户骑行订单',
               x:'center'
           },
           tooltip:{
                trigger:'item',
                formatter:'{a}<br/>{b}:{c}({d}%)'
           },
           legend:{
               orient:'vertical',
               right:10,
               top:20,
               data:['周一','周二','周三','周四','周五','周六','周日']
           },
           series:[
                {
                    name:'订单量',
                    type:'pie',
                    data:[
                        {
                            value:1000,
                            name:'周一'
                        },
                        {
                            value:2000,
                            name:'周二'
                        },
                        {
                            value:3000,
                            name:'周三'
                        },
                        {
                            value:4000,
                            name:'周四'
                        },
                        {
                            value:7000,
                            name:'周五'
                        },
                        {
                            value:1000,
                            name:'周六'
                        },
                        {
                            value:1000,
                            name:'周日'
                        }
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
                x:'center'
            },
            tooltip:{
                 trigger:'item',
                 formatter:'{a}<br/>{b}:{c}({d}%)'
            },
            legend:{
                orient:'vertical',
                right:10,
                top:20,
                data:['周一','周二','周三','周四','周五','周六','周日']
            },
            series:[
                 {
                     name:'订单量',
                     type:'pie',
                     center:['50%', '60%'],
                     data:[
                         {
                             value:1000,
                             name:'周一'
                         },
                         {
                             value:2000,
                             name:'周二'
                         },
                         {
                             value:3000,
                             name:'周三'
                         },
                         {
                             value:3500,
                             name:'周四'
                         },
                         {
                             value:4000,
                             name:'周五'
                         },
                         {
                             value:1000,
                             name:'周六'
                         },
                         {
                             value:1000,
                             name:'周日'
                         }
                     ].sort((a,b)=>{
                            return a.value-b.value
                     }),
                     roseType:'radius'
                 }
            ]
         }
         return option;
    }

    getOption3 = () =>{
        let option = {
            title:{
                text:'用户骑行订单',
                x:'center'
            },
            tooltip:{
                 trigger:'item',
                 formatter:'{a}<br/>{b}:{c}({d}%)'
            },
            legend:{
                orient:'vertical',
                right:10,
                top:20,
                data:['周一','周二','周三','周四','周五','周六','周日']
            },
            series:[
                 {
                     name:'订单量',
                     type:'pie',
                     radius:['50%','80%'],
                     center:['50%', '60%'],
                     data:[
                         {
                             value:1000,
                             name:'周一'
                         },
                         {
                             value:2000,
                             name:'周二'
                         },
                         {
                             value:3000,
                             name:'周三'
                         },
                         {
                             value:4000,
                             name:'周四'
                         },
                         {
                             value:7000,
                             name:'周五'
                         },
                         {
                             value:1000,
                             name:'周六'
                         },
                         {
                             value:1000,
                             name:'周日'
                         }
                     ]
                 }
            ]
         }
         return option;
    }

    render(){
        return(
            <div>
                <Card title="饼图1">
                    <ReactEcharts option={this.getOptions()} theme="mxkstar" style={{height:500}} />
                </Card>
                <Card title="饼图2" style={{marginTop:10}}>
                    <ReactEcharts option={this.getOption2()} theme="mxkstar" style={{height:500}} />
                </Card>
                <Card title="饼图3" style={{marginTop:10}}>
                    <ReactEcharts option={this.getOption3()} theme="mxkstar" style={{height:500}} />
                </Card>
            </div>
        );
    }
}
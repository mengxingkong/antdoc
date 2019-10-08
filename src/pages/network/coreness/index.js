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
export default class Coreness extends React.Component{

    state = {}

    componentWillMount(){
        // 主题需要提前注入
        echarts.registerTheme('mxkstar', echartTheme);
        fetch("/data/coreness/coreness_distribution.json")
            .then(res => res.json())
            .then( (data) => {
                this.setState({
                    x:data['x'],
                    y:data['y']
                })
            })
    }

    getOptions = ()=>{
        let option = {
           title:{
               text:'网络度分布',
           },
           tooltip:{
                trigger:'axis'
           },
           xAxis:{
               type:'category',
               data:this.state.x
           },
           yAxis:{
                type:'value'
           },
           series:[
                {
                    name:'N(C)/N',
                    type:'line',
                    data:this.state.y
                }
           ]
        }
        return option;
    }


    render(){
        return(
            <div>
                 <Card title="coreness 分布">
                    <ReactEcharts option={this.getOptions()} theme="mxkstar" style={{height:500}} />
                </Card>

                {/* <Card title="Coreness 分布" className="card-wrap">
                    <img src="/network_img/degree_distribution.png" style={{width:'80%'}}/>
                </Card> */}
            </div>
        );
    }
}
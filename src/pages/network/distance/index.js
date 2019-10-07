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
export default class Distance extends React.Component{

    state = {}

    componentWillMount(){
        // 主题需要提前注入
        echarts.registerTheme('mxkstar', echartTheme);
        fetch("/data/distance/distance_distribution.json")
            .then(res => res.json())
            .then( (data) => {
                this.setState({
                    x_data:data["x"],
                    y:data["y"]
                })
                // console.log(this.state.x_data)
                console.log(data["y"])
            })
    }

    getOptions = ()=>{
        let option = {
            title:{
                text:'最短距离分布'
            },
            tooltip:{
                trigger:'axis'
            },
            xAxis:{
                type:'category',
                data:this.state.x_data
            },
            yAxis:{
                type:'value'
            },
            series:[
                 {
                     name:'N(path_length)/N',
                     type:'bar',
                     data:this.state.y
                 }
            ]
        }
        return option;
    }

    render(){
        return(
            <div>
                <Card title="最短距离分布图">
                    <ReactEcharts option={this.getOptions()} theme="mxkstar" style={{height:500}} />
                </Card>
                {/* <Card title="最短路径分布" className="card-wrap">
                    <img src="/network_img/distance.png" style={{width:'80%'}}/>
                </Card> */}
            </div>
        );
    }
}
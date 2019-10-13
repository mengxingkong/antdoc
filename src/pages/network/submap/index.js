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
export default class Submap extends React.Component{

    state = {
        x:[],
        y:{}
    }

    componentWillMount(){
        // 主题需要提前注入
        echarts.registerTheme('mxkstar', echartTheme);
        fetch("/data/submap/submap_counts.json")
            .then(res => res.json())
            .then( (data) => {
                this.setState({
                    x_data:data["x"],
                    y:data["y"]
                })
                // console.log(this.state.x_data)
                console.log(data["y"]["0"])
            })
    }

    getOptions = ()=>{
        // console.log(this.state.y["0"])
        // let a = JSON.parse(this.state.y)
        // console.log(a["0"])
        let option = {
           title:{
               text:'网络度分布',
           },
           tooltip:{
                trigger:'axis'
           },
           xAxis:{
               type:'category',
               data:this.state.x_data 
           },
           yAxis:{
                name:"联通子图个数",
                type:'value'
           },
           series:[
                {
                    name:"第0次",
                    type:'line',
                    data:this.state.y["0"]
                },
                {
                    name:"第1次",
                    type:'line',
                    data:this.state.y["1"]
                },
                {
                    name:"第2次",
                    type:'line',
                    data:this.state.y["2"]
                },
                {
                    name:"第3次",
                    type:'line',
                    data:this.state.y["3"]
                },
                {
                    name:"第4次",
                    type:'line',
                    data:this.state.y["4"]
                },
                {
                    name:"第5次",
                    type:'line',
                    data:this.state.y["5"]
                },
                {
                    name:"第6次",
                    type:'line',
                    data:this.state.y["6"]
                },
                {
                    name:"第7次",
                    type:'line',
                    data:this.state.y["7"]
                },
                {
                    name:"第8次",
                    type:'line',
                    data:this.state.y["8"]
                },
                {
                    name:"第9次",
                    type:'line',
                    data:this.state.y["9"]
                }
           ]
        }
        return option;
    }

    render(){
        return(
            <div>
                <Card title="联通子图个数">
                    <ReactEcharts option={this.getOptions()} theme="mxkstar" style={{height:500}} />
                </Card>
                {/* <Card title="网络节点度分布" className="card-wrap">
                    <img src="/network_img/degree_distribution.png" style={{width:'80%'}}/>
                </Card> */}
            </div>
        );
    }
}
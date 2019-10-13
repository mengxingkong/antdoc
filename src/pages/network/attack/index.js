import React from 'react'
import {Card, Button} from 'antd'
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
import { type } from '../../../redux/action'
export default class Attack extends React.Component{

 
    constructor(){
        super()
        this.state = {
            degree:{},
            distance:{},
            coreness:{}
        }
        // this.getLocalJson = this.getLocalJson.bind(this)
        this.test = this.test.bind(this)
    }
    

    componentWillMount(){
        // 主题需要提前注入
        echarts.registerTheme('mxkstar', echartTheme);
    }

    test(){
        this.setState({
            test:"test"
        })
        console.log("tets")
    }

    getLocalJson = (id) => {
        // console.log("/data/attack/"+item+"_distribution_"+ e.target.value+".json")
        fetch("/data/attack/degree_distribution_"+ id+".json")
            .then(res => res.json())
            .then( (data) => {
                this.setState({
                    degree:data
                })
            })
        fetch("/data/attack/coreness_distribution_"+ id+".json")
            .then(res => res.json())
            .then( (data) => {
                this.setState({
                    coreness:data
                })
            })
        fetch("/data/attack/distance_distribution_"+ id+".json")
            .then(res => res.json())
            .then( (data) => {
                this.setState({
                    distance:data
                })
            })
        
        // console.log(degree)
    }

    getDegreeOptions = ()=>{
        let option = {
            title:{
                text:'网络度分布',
            },
            tooltip:{
                 trigger:'axis'
            },
            xAxis:{
                type:'category',
                data:this.state.degree['x'] 
            },
            yAxis:{
                 type:'value'
            },
            series:[
                 {
                     name:'N(k)/N',
                     type:'line',
                     data:this.state.degree['y']
                 }
            ]
         }
         return option;
    }
    getCorenessOptions = ()=>{
        let option = {
            title:{
                text:'网络度分布',
            },
            tooltip:{
                 trigger:'axis'
            },
            xAxis:{
                type:'category',
                data:this.state.coreness['x']
            },
            yAxis:{
                 type:'value'
            },
            series:[
                 {
                     name:'N(C)/N',
                     type:'line',
                     data:this.state.coreness['y']
                 }
            ]
         }
         return option;
    }
    getDistanceOptions = () =>{
        let option = {
            title:{
                text:'最短距离分布'
            },
            tooltip:{
                trigger:'axis'
            },
            xAxis:{
                type:'category',
                data:this.state.distance['x']
            },
            yAxis:{
                type:'value'
            },
            series:[
                 {
                     name:'N(path_length)/N',
                     type:'bar',
                     data:this.state.distance['y']
                 }
            ]
        }
        return option;
    }

    render(){
        return(
            <div>
                <Card title="删除节点" className="card-wrap">
                    <Button type="primary" value="0.001" onClick={() => this.getLocalJson(0.001)}>0.001</Button>
                    <Button type="primary" value="0.01" onClick={() => this.getLocalJson(0.01)}>0.01</Button>
                    <Button type="primary" value="0.1" onClick={() => this.getLocalJson(0.1)}>0.1</Button>
                    <Button type="primary" value="0.2" onClick={() => this.getLocalJson(0.2)}>0.2</Button>
                    <Button type="primary" value="0.3" onClick={() => this.getLocalJson(0.3)}>0.3</Button>
                    <Button type="primary" value="0.4" onClick={() => this.getLocalJson(0.4)}>0.4</Button>
                    <Button type="primary" value="0.5" onClick={() => this.getLocalJson(0.5)}>0.5</Button>
                    <Button type="primary" value="0.6" onClick={() => this.getLocalJson(0.6)}>0.6</Button>
                    <Button type="primary" value="0.7" onClick={() => this.getLocalJson(0.7)}>0.7</Button>
                    <Button type="primary" value="0.8" onClick={() => this.getLocalJson(0.8)}>0.8</Button>
                    <Button type="primary" value="0.9" onClick={() => this.getLocalJson(0.9)}>0.9</Button>
                </Card>
                <Card title="节点度分布">
                    <ReactEcharts option={this.getDegreeOptions()} theme="mxkstar" style={{height:500}} />
                </Card>
                <Card title="coreness 分布">
                    <ReactEcharts option={this.getCorenessOptions()} theme="mxkstar" style={{height:500}} />
                </Card>
                <Card title="最短距离分布图">
                    <ReactEcharts option={this.getDistanceOptions()} theme="mxkstar" style={{height:500}} />
                </Card>
            </div>
        )
    }
}
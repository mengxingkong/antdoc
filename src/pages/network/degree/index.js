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
export default class Degree extends React.Component{

    state = {}

    componentWillMount(){
        // 主题需要提前注入
        // echarts.registerTheme('mxkstar', echartTheme);
        // fetch("/data/all_node_link.json")
        //     .then(res => res.json())
        //     .then( (data) => {
        //         this.setState({
        //             data
        //         })
        //     })
    }

    render(){
        return(
            <div>
                <Card title="网络节点度分布" className="card-wrap">
                    <img src="/network_img/degree_distribution.png" style={{width:'80%'}}/>
                </Card>
            </div>
        );
    }
}
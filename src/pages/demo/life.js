import React from 'react'
import './index.less'
import {Button} from 'antd'
export default class Life extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            count:0
        };
    }

    handleAdd=()=>{
        this.setState({
            count: this.state.count + 1
        });
    }

    handleClick(){
         this.setState({
             count: this.state.count + 1
         });
    }

    render(){

        let style = {
            padding:50
        }

        return <div className="content">
            <p>
                React 生命周期

            </p>
            <Button type="primary" onClick={this.handleAdd}>
                点击一下
            </Button>
            <Button type="primary" onClick={this.handleClick.bind(this)}>
                点击一下
            </Button>
            <p>
                {this.state.count}
            </p>
        </div>
    }
} 
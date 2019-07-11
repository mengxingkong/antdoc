import React from 'react'
import {HashRouter, Route, Link} from 'react-router-dom'
export default class Info extends React.Component{

    render(){
        return(
            <div>
                动态路由参数
                {this.props.match.params.mainId}
            </div>
        );
    }
}
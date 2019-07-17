import React from 'react'
import {Card, Button,message} from 'antd'
import './ui.less'
export default class Message extends React.Component{

    showMesssage = (type)=>{
        message[type]("恭喜您， React 学习成功");
    }

    render(){
        return(
            <div>
                <Card title="全局提示框" className="card-wrap">
                    <Button type="primary" onClick={()=>this.showMesssage('success')}>Success</Button>
                    <Button type="primary" onClick={()=>this.showMesssage('info')}>Info</Button>
                    <Button type="primary" onClick={()=>this.showMesssage('warning')}>Warning</Button>
                    <Button type="primary" onClick={()=>this.showMesssage('error')}>Error</Button>
                    <Button type="primary" onClick={()=>this.showMesssage('loading')}>Loading</Button>
                </Card>
            </div>
        );
    }
}
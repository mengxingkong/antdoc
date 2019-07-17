import React from 'react'
import {Card, Button, Spin, Icon, Alert} from 'antd'
import './ui.less'
export default class loadings extends React.Component{
    render(){
        const icon = <Icon type="loading" style={{fontSize:24}}/> 
        return(
            <div>
                <Card title="Spin用法" className="card-wrap">
                    <Spin size="small"/>
                    <Spin style={{margin:'0 20px'}}/>
                    <Spin size="large"/>
                    <Spin indicator={icon} style={{marginLeft:20}}/>
                </Card>

                <Card title="内容遮掩" className="card-wrap">
                    <Alert
                        message="React"
                        description="欢迎学习React" 
                        type="info"
                    />
                    <Alert
                        message="React"
                        description="欢迎学习React" 
                        type="warning"
                    />
                    {/* loading 组件 包裹 */}
                    <Spin>
                        <Alert
                            message="React"
                            description="欢迎学习React" 
                            type="info"
                        />
                    </Spin>
                    <Spin tip="加载中">
                        <Alert
                            message="React"
                            description="欢迎学习React" 
                            type="info"
                        />
                    </Spin>
                    <Spin indicator={icon} tip="加载中">
                        <Alert
                            message="React"
                            description="欢迎学习React" 
                            type="info"
                        />
                    </Spin>
                </Card>
            </div>
        );
    }
}
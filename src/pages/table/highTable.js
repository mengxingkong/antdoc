import React from 'react'
import {Card, Table, Modal,Button,message, Badge} from 'antd'
import Axios from './../../axios'
import utils from './../../utils/utils'
export default class  HighTable extends React.Component{

    state = {

    }
    params = {
        page:1
    }

    componentDidMount(){
        this.request();
    }

    request = ()=>{
        let _this = this;
       Axios.ajax({
           url:'/table/high/list',
           data:{
               params:{
                   page:this.params.page
               },
               showLoading:true
           }
       }).then((res)=>{
            if(res.data.code == '0'){
                res.data.result.list.map((item, index)=>{
                    item.key = index;
                });
                this.setState({
                    dataSource:res.data.result.list,
                    selectedRowKeys:[],
                    selectedRows:null,
                })
            }
       })
    }

    handleChange =(pagination, filter, sorter)=>{
        this.setState({
            sortOrder:sorter.order
        })
    }

    handleDelete = (item) => {
        let id = item.id;
        Modal.confirm({
            title:"确认",
            content:"您确认要删除该数据吗",
            onOk:()=>{
                message.success("删除成功");
                this.request();
            }
        })
    }

    render(){
        const columns = [
            {
                title:'id',
                dataIndex:'id',
                width:80
            },
            {
                title:'用户名',
                dataIndex:'userName',
                width:80
            },
            {
                title:'性别',
                dataIndex:'sex',
                width:80,
                render:sex => {
                    return sex == 1 ? '男':'女'
                }
            },
            {
                title:'状态',
                dataIndex:'state',
                width:80,
                render(state){
                    let config = {
                        '1':'咸鱼',
                        '2':'天才',
                        '3':'才子',
                        '4':'CEO',
                        '5':'废物'
                    };
                    return config[state];
                }
            },
            {
                title:'爱好',
                dataIndex:'interest',
                width:80,
                render(dataIndex){
                    let config = {
                        '1':'游泳',
                        '2':'打架',
                        '3':'篮球',
                        '4':'足球',
                        '5':'爬山',
                        '6':'爬山',
                        '7':'爬山',
                        '8':'爬山',
                        '9':'爬山',
                        '10':'爬山'
                    };
                    return config[dataIndex];
                }
            },
            {
                title:'生日',
                dataIndex:'birthday',
                width:120
            },
            {
                title:'地址',
                dataIndex:'address',
                width:80
            },
            {
                title:'早期时间',
                dataIndex:'time',
                width:80
            },
        ]
        const columns2 = [
            {
                title:'id',
                dataIndex:'id',
                width:80,
                fixed:'left'
            },
            {
                title:'用户名',
                dataIndex:'userName',
                width:80,
                fixed:'left'
            },
            {
                title:'性别',
                dataIndex:'sex',
                width:80,
                render:sex => {
                    return sex == 1 ? '男':'女'
                }
            },
            {
                title:'状态',
                dataIndex:'state',
                width:80,
                render(state){
                    let config = {
                        '1':'咸鱼',
                        '2':'天才',
                        '3':'才子',
                        '4':'CEO',
                        '5':'废物'
                    };
                    return config[state];
                }
            },
            {
                title:'爱好',
                dataIndex:'interest',
                width:80,
                render(dataIndex){
                    let config = {
                        '1':'游泳',
                        '2':'打架',
                        '3':'篮球',
                        '4':'足球',
                        '5':'爬山',
                        '6':'爬山',
                        '7':'爬山',
                        '8':'爬山',
                        '9':'爬山',
                        '10':'爬山'
                    };
                    return config[dataIndex];
                }
            },
            {
                title:'生日',
                dataIndex:'birthday',
                width:120
            },
            {
                title:'生日',
                dataIndex:'birthday1',
                width:120
            },
            {
                title:'生日',
                dataIndex:'birthday2',
                width:120
            },
            {
                title:'生日',
                dataIndex:'birthday3',
                width:120
            },
            {
                title:'生日',
                dataIndex:'birthday4',
                width:120
            },
            {
                title:'生日',
                dataIndex:'birthday5',
                width:120
            },
            {
                title:'生日',
                dataIndex:'birthday6',
                width:120
            },
            {
                title:'生日',
                dataIndex:'birthday7',
                width:120
            },
            {
                title:'生日',
                dataIndex:'birthday8',
                width:120
            },
            {
                title:'生日',
                dataIndex:'birthday9',
                width:120
            },
            {
                title:'生日',
                dataIndex:'birthday10',
                width:120
            },
            {
                title:'生日',
                dataIndex:'birthday11',
                width:120
            },
            {
                title:'生日',
                dataIndex:'birthday12',
                width:120
            },
            {
                title:'生日',
                dataIndex:'birthday13',
                width:120
            },
            {
                title:'生日',
                dataIndex:'birthday14',
                width:120
            },
            {
                title:'生日',
                dataIndex:'birthday15',
                width:120
            },
            {
                title:'生日',
                dataIndex:'birthday16',
                width:120
            },
            {
                title:'生日',
                dataIndex:'birthday17',
                width:120
            },
            {
                title:'生日',
                dataIndex:'birthday18',
                width:120
            },
            {
                title:'地址',
                dataIndex:'address',
                width:80
            },
            {
                title:'早期时间',
                dataIndex:'time',
                width:120,
                fixed:'right'
            },
        ]
        const columns3 = [
            {
                title:'id',
                dataIndex:'id',
                width:80
            },
            {
                title:'用户名',
                dataIndex:'userName',
                width:80
            },
            {
                title:'性别',
                dataIndex:'sex',
                width:80,
                render:sex => {
                    return sex == 1 ? '男':'女'
                }
            },
            {
                title:'年龄',
                dataIndex:'age',
                width:80,
                key:'age',
                sorter:(a,b)=>{
                    return a.age-b.age
                },
                sortOrder:this.state.sortOrder
            },
            {
                title:'状态',
                dataIndex:'state',
                width:80,
                render(state){
                    let config = {
                        '1':'咸鱼',
                        '2':'天才',
                        '3':'才子',
                        '4':'CEO',
                        '5':'废物'
                    };
                    return config[state];
                }
            },
            {
                title:'爱好',
                dataIndex:'interest',
                width:80,
                render(dataIndex){
                    let config = {
                        '1':'游泳',
                        '2':'打架',
                        '3':'篮球',
                        '4':'足球',
                        '5':'爬山',
                        '6':'爬山',
                        '7':'爬山',
                        '8':'爬山',
                        '9':'爬山',
                        '10':'爬山'
                    };
                    return config[dataIndex];
                }
            },
            {
                title:'生日',
                dataIndex:'birthday',
                width:120
            },
            {
                title:'地址',
                dataIndex:'address',
                width:80
            },
            {
                title:'早期时间',
                dataIndex:'time',
                width:80
            },
        ]
        const columns4 = [
            {
                title:'id',
                dataIndex:'id',
                width:80
            },
            {
                title:'用户名',
                dataIndex:'userName',
                width:80
            },
            {
                title:'性别',
                dataIndex:'sex',
                width:80,
                render:sex => {
                    return sex == 1 ? '男':'女'
                }
            },
            {
                title:'状态',
                dataIndex:'state',
                width:80,
                render(state){
                    let config = {
                        '1':'咸鱼',
                        '2':'天才',
                        '3':'才子',
                        '4':'CEO',
                        '5':'废物'
                    };
                    return config[state];
                }
            },
            {
                title:'爱好',
                dataIndex:'interest',
                width:80,
                render(dataIndex){
                    let config = {
                        '1':<Badge status="success" text="游泳"/>,
                        '2':<Badge status="warning" text="打架"/>,
                        '3':<Badge status="success" text="篮球"/>,
                        '4':<Badge status="success" text="足球"/>,
                        '5':<Badge status="success" text="爬山"/>,
                        '6':<Badge status="success" text="篮球"/>,
                        '7':<Badge status="success" text="篮球"/>,
                        '8':<Badge status="success" text="篮球"/>,
                        '9':<Badge status="success" text="篮球"/>,
                        '10':<Badge status="success" text="篮球"/>
                    };
                    return config[dataIndex];
                }
            },
            {
                title:'生日',
                dataIndex:'birthday',
                width:120
            },
            {
                title:'地址',
                dataIndex:'address',
                width:80
            },
            {
                title:'早期时间',
                dataIndex:'time',
                width:80
            },
            {
                title:'操作',
                width:80,
                render:(text, item)=>{
                    return <Button type="danger" size="small" onClick={(item)=>this.handleDelete(item)}>删除</Button>
                }
            },
        ]
        return(
            <div>
                <Card title="头部固定" style={{margin:'10px, 0'}}>
                    <Table 
                        columns={columns}
                        bordered
                        pagination={false}
                        dataSource={this.state.dataSource}
                        scroll={{y:240}}
                    />
                </Card>
                <Card title="左侧固定" style={{margin:'10px, 0'}}>
                    <Table 
                        columns={columns2}
                        bordered
                        pagination={false}
                        dataSource={this.state.dataSource}
                        scroll={{x:2880,y:240}}
                    />
                </Card>
                <Card title="表格排序" style={{margin:'10px, 0'}}>
                    <Table 
                        columns={columns3}
                        bordered
                        pagination={false}
                        dataSource={this.state.dataSource}
                        onChange={this.handleChange}
                    />
                </Card>
                <Card title="操作按钮" style={{margin:'10px, 0'}}>
                    <Table 
                        columns={columns4}
                        bordered
                        pagination={false}
                        dataSource={this.state.dataSource}
                    />
                </Card>
            </div>
        );
    }
}
import React from 'react'
import {Card, Table, Modal,Button,message} from 'antd'
import Axios from './../../axios'
import utils from './../../utils/utils'
export default class  BasicTable extends React.Component{

    state = {
        dataSource2:[]
    }

    params = {
        page : 1
    }

    componentDidMount(){
        const dataSource =[
            {
                id:'0',
                userName:'Jack',
                sex:'1',
                state:'1',
                interest:'1',
                birthday:'2000-1-1',
                address:'北京陕西',
                time:'09:00'
            },
            {
                id:'0',
                userName:'Jack',
                sex:'1',
                state:'1',
                interest:'1',
                birthday:'2000-1-1',
                address:'北京陕西',
                time:'09:00'
            },
            {
                id:'0',
                userName:'Jack',
                sex:'1',
                state:'1',
                interest:'1',
                birthday:'2000-1-1',
                address:'北京陕西',
                time:'09:00'
            },
            {
                id:'0',
                userName:'Jack',
                sex:'1',
                state:'1',
                interest:'1',
                birthday:'2000-1-1',
                address:'北京陕西',
                time:'09:00'
            },
            {
                id:'0',
                userName:'Jack',
                sex:'1',
                state:'1',
                interest:'1',
                birthday:'2000-1-1',
                address:'北京陕西',
                time:'09:00'
            }
        ];
        dataSource.map((item, index)=>{
            item.key = index;
        })
        this.setState({
            dataSource
        });
        this.request();
    }

    request = ()=>{
        let _this = this;
       Axios.ajax({
           url:'/table/list',
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
                    dataSource2:res.data.result.list,
                    selectedRowKeys:[],
                    selectedRows:null,
                    pagination:utils.pagination(res,(current)=>{
                        //to-do
                        _this.params.page = current;
                        this.request();
                    })
                })
            }
       })
    }

    onRowClick = (record, index) => {
        let selectKey = [index];
        Modal.info({
            title:'信息',
            content:`用户名:${record.userName},用户爱好：${record.interest}`
        });
        this.setState({
            selectedRowKeys:selectKey,
            selectedItem:record
        })
    }

    handleDelete = ()=>{
        let rows = this.state.selectedRows;
        let ids = [];
        rows.map((item) => {
            ids.push(item.id);
        })
        Modal.confirm({
            title:'删除提示',
            content:`确定要删除这些数据吗?${ids.join(',')}`,
            onOk:()=>{
                message.success('删除成功');
                this.request();
            }
        })
    }


    render(){
        const columns = [
            {
                title:'id',
                dataIndex:'id'
            },
            {
                title:'用户名',
                dataIndex:'userName'
            },
            {
                title:'性别',
                dataIndex:'sex',
                render:sex => {
                    return sex == 1 ? '男':'女'
                }
            },
            {
                title:'状态',
                dataIndex:'state',
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
                dataIndex:'birthday'
            },
            {
                title:'地址',
                dataIndex:'address'
            },
            {
                title:'早期时间',
                dataIndex:'time'
            },
        ]
        const selectedRowKeys = this.state.selectedRowKeys;
        const rowSelection = {
            type:'radio',
            selectedRowKeys
        }
        const rowCheckSelection = {
            type: 'checkbox',
            selectedRowKeys,
            onChange:(selectedRowKeys,selectedRows)=>{
                this.setState({
                    selectedRowKeys,
                    selectedRows
                })
            }
        }
        return(
            <div>
                <Card title="基础表格" style={{margin:'10px, 0'}}>
                    <Table 
                        columns={columns}
                        bordered
                        pagination={false}
                        dataSource={this.state.dataSource}
                    />
                </Card>
                <Card title="动态数据渲染表格" style={{margin:'10px, 0'}}>
                    <Table 
                        columns={columns}
                        bordered
                        pagination={false}
                        dataSource={this.state.dataSource2}
                    />
                </Card>
                <Card title="Mock-单选" style={{margin:'10px, 0'}}>
                    <Table 
                        columns={columns}
                        bordered
                        pagination={false}
                        dataSource={this.state.dataSource2}
                        rowSelection={rowSelection}
                        onRow={(record, index)=>{
                            return {
                                onClick:()=>{ 
                                    this.onRowClick(record, index);
                                 },
                            }
                        }}
                    />
                </Card>
                <Card title="Mock-多选" style={{margin:'10px, 0'}}>
                    <div>
                        <Button style={{marginBottom:10}} onClick={this.handleDelete}>
                            删除
                        </Button>
                    </div>
                    <Table 
                        columns={columns}
                        bordered
                        pagination={false}
                        dataSource={this.state.dataSource2}
                        rowSelection={rowCheckSelection}
                    />
                </Card>
                <Card title="Mock-表格分页" style={{margin:'10px, 0'}}>
                    <Table 
                        columns={columns}
                        bordered
                        dataSource={this.state.dataSource2}
                        pagination={this.state.pagination}
                    />
                </Card>
            </div>
        );
    }
}
import React from 'react'
import {Card, Table, Button, Modal, Form, Radio, DatePicker, Select, Input} from 'antd'
import axios from './../../axios'
import utils from './../../utils/utils'
import ETable from './../../components/eTabel'
import BaseForm from './../../components/baseForm'
import moment from 'moment'
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const TextArea = Input.TextArea;
export default class User extends React.Component{

    params = {
        page:1
    }

    state = {
        isvisible:false
    }

    formList = [
        {
            type:'INPUT',
            label:'用户名',
            field:'user_name',
            placeholder:'请输入用户名',
            width:100
        },
        {
            type:'DATEPICKER',
            label:'入职日期',
            field:'user_date',
            placeholder:'请选择日期'
        }
    ]

    handleFilter = (params)=>{
        this.params = params;
        this.requestList();
    }

    componentDidMount(){
        this.requestList();
    }

    requestList = ()=>{
        axios.requestList(this, '/user/list', this.params, false)
    }

    handleOpreate=(type)=>{
        let item = this.state.selectedItem;
        if(type == 'create'){
            this.setState({
                type,
                isvisible:true,
                title:'创建员工'
            })
        }else if(type == 'edit'){
            if(!item){
                Modal.info({
                    title:"提示",
                    content:"清选择一个用户信息"
                });
                return;
            }
            this.setState({
                type,
                isvisible:true,
                title:'编辑员工',
                userInfo:item
            })
            
        }else if(type == 'detail'){
            this.setState({
                type,
                isvisible:true,
                title:'用户详情',
                userInfo:item
            })
        }else if(type == 'delete'){
            if(!item){
                Modal.info({
                    title:"提示",
                    content:"清选择一个用户信息"
                });
                return;
            }
            let _this = this;
            Modal.confirm({
                title:'确认删除',
                content:'是否删除当前选中的员工',
                onOk(){
                    axios.ajax({
                        url:'/user/delete',
                        data:{
                            params:{
                                id:item.id,
                            },
                            isMock:true
                        }
                    }).then((res)=>{
                        if(res.data.code == '0'){
                            _this.setState({
                                isvisible:false
                            })
                            _this.requestList();
                        }
                    })
                }
            })
        }
    }

    // 创建员工提交
    handleSubmit = ()=>{
        let type = this.state.type;
        let data = this.userForm.props.form.getFieldsValue();
        axios.ajax({
            url:'/user/add',
            data:{
                params:data,
                isMock:true
            }
        }).then((res)=>{
            if(res.data.code == '0'){
                this.setState({
                    isvisible:false
                });
                this.requestList();
            }
        });
        this.userForm.props.form.resetFields();
    }

    render(){
        const columns = [
            {
                title:'id',
                dataIndex:'id'
            },
            {
                title:'用户名',
                dataIndex:'username'
            },
            {
                title:'性别',
                dataIndex:'sex',
                render(sex){
                    return sex == 1?'男':'女'
                }
            },
            {
                title:'状态',
                dataIndex:'state'
            },
            {
                title:'爱好',
                dataIndex:'interest'
            },
            {
                title:'生日',
                dataIndex:'birthday'
            },
            {
                title:'联系地址',
                dataIndex:'address'
            },
            {
                title:'早起时间',
                dataIndex:'time'
            }
        ]
        const selectedRowKeys = this.state.selectedRowKeys;
        const rowSelection={
            type:'radio',
            selectedRowKeys
        }
        //通过结构的方法实现
        let footer = {};
        if(this.state.type == 'detail'){
            footer = {
                footer:null
            }
        }
        return(
            <div>
                <Card>
                    <BaseForm formList={this.formList}/>
                </Card>
                <Card style={{marginTop:10}} className="opreate-wrap">
                        <Button type="primary" icon="plus" onClick={()=>this.handleOpreate('create')}>创建员工</Button>
                        <Button type="dashed" icon="edit" onClick={()=>this.handleOpreate('edit')} style={{marginLeft:10}} >编辑员工</Button>
                        <Button type="" onClick={()=>this.handleOpreate('detail')} style={{marginLeft:10}} >员工详情</Button>
                        <Button type="danger" onClick={()=>this.handleOpreate('delete')} icon="delete" style={{marginLeft:10}} >删除员工</Button>
                </Card>
                <div className="content-wrap">
                    <ETable 
                            updateSelectedItem={utils.updateSelectedItem.bind(this)}
                            columns={columns}
                            dataSource={this.state.list}
                            pagination={this.state.pagination}
                            rowSelection={rowSelection}
                            selectedRowKeys={this.state.selectedRowKeys}
                    />
                </div>
                <Modal
                    title={this.state.title}
                    visible={this.state.isvisible}
                    onOk={this.handleSubmit}
                    onCancel={()=>{
                        this.setState({
                            isvisible:false
                        });
                        this.userForm.props.form.resetFields();
                    }}
                    width={600}
                    {...footer}
                >
                    <UserForm  type={this.state.type} userInfo={this.state.userInfo} wrappedComponentRef={(inst)=>this.userForm=inst}/>
                </Modal>
            </div>
        );
    }
}

class UserForm extends React.Component{

    render(){
        let type = this.props.type;
        let userInfo = this.props.userInfo || '';
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol:{span:5},
            wrapperCol:{span:19}
        }
        return(
            <div>
                <Form layout="horizontal" {...formItemLayout}>
                    <FormItem label="用户名">
                        {
                            type == 'detail'?userInfo.username:
                            getFieldDecorator('user_name',{
                                initialValue:userInfo.username
                            })(
                                <Input type="text" placeholder="请输入用户名 " />
                            )
                        }
                    </FormItem>
                    <FormItem label="性别" {...formItemLayout}>
                        {
                            type == 'detail'?userInfo.sex==1?'男':'女':
                            getFieldDecorator('sex',{
                                initialValue:userInfo.sex
                            })(
                               <RadioGroup>
                                   <Radio value={1}>男</Radio>
                                   <Radio value={2}>女</Radio>
                               </RadioGroup>
                            )
                        }
                    </FormItem>
                    <FormItem label="状态" {...formItemLayout}>
                        {
                            type == 'detail'?userInfo.state:
                            getFieldDecorator('state',{
                                initialValue:userInfo.state
                            })(
                                <Select>
                                    <Option value={1}>咸鱼一条</Option>
                                    <Option value={2}>蠢材</Option>
                                    <Option value={3}>天才</Option>
                                    <Option value={4}>创业者</Option>
                                    <Option value={5}>终结者</Option>
                                </Select>
                            )
                        } 
                    </FormItem>
                    <FormItem label="生日" {...formItemLayout}>
                        {
                            type == 'detail'?userInfo.birthday:
                            getFieldDecorator('birthday',{
                                initialValue:moment(userInfo.birthday)
                            })(
                                <DatePicker showTime={true} format="YYYY-MM-DD HH:mm:ss" />
                            )
                        } 
                    </FormItem>
                    <FormItem label="地址" {...formItemLayout}>
                        {
                            type == 'detail'?userInfo.address:
                            getFieldDecorator('address',{
                                initialValue:userInfo.address
                            })(
                                <TextArea rows={3} placeholder="请输入联系地址"/>
                            )
                        } 
                    </FormItem>
                </Form>
            </div>
        );
    }
}
UserForm = Form.create({})(UserForm);
import React from 'react'
import {Card, Button, Modal,Table, Form, Input,Select,message, Tree,Transfer} from 'antd'
import ETable from './../../components/eTabel'
import utils from './../../utils/utils'
import axios from './../../axios'
import menuConfig from './../../config/menuConfig'
const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = Tree.TreeNode;
export default class PermissionUser extends React.Component{

    state={
        isvisible:false,
        isPerVisible:false
    }
    
    componentWillMount(){
        this.requestList()
    }

    requestList=()=>{
        axios.requestList(this, "/role/list", {}, true)
    }

    handleRole=()=>{
        this.setState({
            isvisible:true
        })
    }

    handleSubmit=()=>{
        let data = this.roleForm.props.form.getFieldsValue();
        axios.ajax({
            url:'/role/create',
            data:{
                params:data,
                isMock:true
            }
        }).then((res)=>{
            if(res.data.code == '0'){
                this.setState({
                    isvisible:false
                });
                this.roleForm.props.form.resetFields();
                this.requestList();
                message.success(`建角色${data.role_name}成功`);
            }
        })
    }

    // 权限 设置
    handlePermission=()=>{
        let item = this.state.selectedItem;
        if(!item){
            Modal.info({
                title:'提示',
                content:'请选择一个角色'
            })
            return;
        }
        this.setState({
            isPerVisible:true,
            detailInfo:item,
            menuInfo:item.menus
        })
    }

    handlePerEditSubmit=()=>{
        let data = this.permForm.props.form.getFieldsValue();
        data.role_id = this.state.selectedItem.id;
        data.menus = this.state.menuInfo;
        axios.ajax({
            url:'/permission/edit',
            data:{
                params:{
                    data
                },
                isMock:true
            }
        }).then((res)=>{
            if(res){
                this.setState({
                    isPerVisible:false
                });
                this.requestList();
            }
        })
    }

    //用户授权
    handleUserAuth=()=>{ 
        let item = this.state.selectedItem;
        if(!item){
            Modal.info({
                title:'提示',
                content:'请选择一个角色'
            })
            return;
        }
        this.getRoleUserList(item);
    }

    getRoleUserList=(item)=>{
        axios.ajax({
            url:'/role/user_list',
            data:{
                params:{
                    id:item.id
                },
                isMock:true
            }
        }).then((res)=>{
            if(res){
                this.setState({
                    isUserVisible:true,
                    detailInfo:item
                })
                this.getAuthUserList(res.data.result);
            }
        })
    }

    // 筛选目标用户
    getAuthUserList=(dataSource)=>{
        const mockData= [];
        const targetKeys = [];
        if(dataSource && dataSource.length >0){
            for(let i=0;i<dataSource.length;i++){
                const data ={
                    key:dataSource[i].user_id,
                    title:dataSource[i].user_name,
                    status:dataSource[i].status
                }
                if(data.status == 1){
                    targetKeys.push(data.key);
                }
                mockData.push(data); 
            }
            this.setState({
                mockData,
                targetKeys
            })
        }
    }

    // 用户授权提交
    handleUserSubmit=()=>{
        let data = {}
        data.user_ids = this.state.targetKeys;
        data.role_id = this.state.selectedItem.id;
        axios.ajax({
            url:'/role/user_role_edit',
            data:{
                params:{
                    data
                },
                isMock:true
            }
        }).then((res)=>{
            if(res){
                this.setState({
                    isUserVisible:false
                })
                this.requestList();
            }
        })
    }

    render(){
        const columns = [
            {
                title:'角色Id',
                dataIndex:'id'
            },
            {
                title:'角色名称',
                dataIndex:'role_name'
            },
            {
                title:'创建时间',
                dataIndex:'create_time',
                render:utils.formatDate
            },
            {
                title:'使用状态',
                dataIndex:'status',
                render(status){
                    return status==1?'启用':'停用'
                }
            },
            {
                title:'授权时间',
                dataIndex:'authorize_time',
                render:utils.formatDate
            },
            {
                title:'授权人',
                dataIndex:'authorize_user_name'
            },
        ]
        return(
            <div>
                <Card>
                    <Button type="primary" onClick={this.handleRole} style={{marginLeft:10,marginRight:10}}>创建角色</Button>
                    <Button type="primary" onClick={this.handlePermission} style={{marginLeft:10,marginRight:10}}>设置权限</Button>
                    <Button type="primary" onClick={this.handleUserAuth} style={{marginLeft:10,marginRight:10}}>用户授权</Button>
                </Card>
                <div className="content-wrap">
                    <ETable
                        updateSelectedItem={utils.updateSelectedItem.bind(this)}
                        columns={columns}
                        dataSource={this.state.list}
                        selectedRowKeys={this.state.selectedRowKeys}
                    /> 
                </div>
                <Modal
                    title='创建角色'
                    visible={this.state.isvisible}
                    onOk={this.handleSubmit}
                    onCancel={()=>{
                        this.roleForm.props.form.resetFields();
                        this.setState({
                            isvisible:false
                        })
                    }}
                >
                    <RoleForm wrappedComponentRef={(inst)=>this.roleForm=inst}/>
                </Modal>
                <Modal
                    title='设置权限'
                    visible={this.state.isPerVisible}
                    onOk={this.handlePerEditSubmit}
                    onCancel={()=>{
                        this.setState({
                            isPerVisible:false
                        })
                    }}
                >
                    <PerEditForm 
                        patchMenuInfo={(checkedKeys)=>{
                            this.setState({
                                menuInfo:checkedKeys
                            })
                        }} 
                        menuInfo={this.state.menuInfo}
                        detailInfo={this.state.detailInfo} 
                        wrappedComponentRef={(inst)=>this.permForm=inst}
                    />
                </Modal>
                <Modal
                    title="用户授权"
                    visible={this.state.isUserVisible}
                    width={800}
                    onOk={this.handleUserSubmit}
                    onCancel={()=>{
                        this.setState({
                            isUserVisible:false
                        })
                    }}
                >
                    <RoleAuthForm
                        targetKeys={this.state.targetKeys}
                        mockData={this.state.mockData}
                        detailInfo={this.state.detailInfo} 
                        wrappedComponentRef={(inst)=>this.userAuthForm=inst}
                        patchUserInfo={(targetKeys)=>{
                            this.setState({
                                targetKeys
                            })
                        }}
                    />
                </Modal>
            </div>
        );
    }
}

class RoleForm extends React.Component{

    render(){
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol:{span:5},
            wrapperCol:{span:19}
        }
        return(
            <div>
                <Form layout="horizontal" {...formItemLayout}>
                    <FormItem label="角色名">
                        {
                            getFieldDecorator('role_name',{
                            })(
                                <Input type="text" placeholder="请输入角色名称 " />
                            )
                        }
                    </FormItem>
                    <FormItem label="角色状态" {...formItemLayout}>
                        {
                            getFieldDecorator('state',{
                            })(
                                <Select>
                                    <Option value={0}>开启</Option>
                                    <Option value={1}>关闭</Option>
                                </Select>
                            )
                        } 
                    </FormItem>
                </Form>
            </div>
        );
    }
}
RoleForm = Form.create({})(RoleForm);

class PerEditForm extends React.Component{

    renderTreeNode=(data)=>{
        return data.map((item)=>{
            if(item.children){
                return <TreeNode title={item.title} key={item.key}>
                    {this.renderTreeNode(item.children)}
                </TreeNode>
            }
            return <TreeNode title={item.title} key={item.key} />
        })
    }

    oncheck=(checkedKeys)=>{
        this.props.patchMenuInfo(checkedKeys);
    }

    render(){
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol:{span:5},
            wrapperCol:{span:19}
        }
        const detailInfo = this.props.detailInfo;
        const menuInfo = this.props.menuInfo;
        return(
            <Form layout="horizontal">
                <FormItem label="角色名称" {...formItemLayout}>
                    <Input disabled placeholder={detailInfo.role_name} />
                </FormItem>
                <FormItem label="角色状态" {...formItemLayout}>
                    {
                        getFieldDecorator('status',{
                            initialValue:detailInfo.status
                        })(
                            <Select>
                                <Option value={0}>开启</Option>
                                <Option value={1}>关闭</Option>
                            </Select>
                        )
                    } 
                </FormItem>
                <Tree
                    checkable
                    defaultExpandAll
                    onCheck={(checkedKeys)=>{
                        this.oncheck(checkedKeys)
                    }}
                    checkedKeys={menuInfo}
                >
                    <TreeNode title="平台权限" key="platform_all">
                        {this.renderTreeNode(menuConfig)}
                    </TreeNode>
                </Tree>
            </Form>
        );
    }
        
}
PerEditForm = Form.create({})(PerEditForm);

class RoleAuthForm extends React.Component{

    filterOption=(inputValue, option)=>{ 
        return option.title.indexOf(inputValue) >= -1;
    }
        
    handleChange=(targetKeys)=>{
        this.props.patchUserInfo(targetKeys);
    }

    render(){
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol:{span:5},
            wrapperCol:{span:19}
        }
        const targetKeys = this.props.targetKeys;
        const mockData = this.props.mockData;
        return(
            <Form layout="horizontal">
                <FormItem label="角色名称" {...formItemLayout}>
                    <Input disabled placeholder={this.props.detailInfo.role_name} />
                </FormItem>
                <FormItem label="选择用户" {...formItemLayout}>
                    <Transfer
                        listStyle={{width:200,height:600}}
                        dataSource={this.props.mockData}
                        titles={['待选用户','已选用户']}
                        showSearch
                        filterOption={this.filterOption}
                        targetKeys={this.props.targetKeys}
                        render={(item)=>item.title}
                        onChange={this.handleChange}
                    />
                </FormItem>
            </Form>
        );
    }
        
}
RoleAuthForm = Form.create({})(RoleAuthForm);


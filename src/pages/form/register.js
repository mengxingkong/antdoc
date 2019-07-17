import React from 'react'
import moment from 'moment'
import {Card, Form, Input, Button, Icon,message, Checkbox,Radio,Select,Switch,DatePicker,TimePicker, InputNumber, Upload} from 'antd'
const FormItem = Form.Item;
const { Option } = Select;
const TextArea = Input.TextArea;
class FormRegister extends React.Component{

    state={}

    getBase64 = (img, callback)=>{
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
      }

    handleChange = info => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
            this.getBase64(info.file.originFileObj, imageUrl =>
            this.setState({
              userImg:imageUrl,
              loading: false,
            }),
          );
        }
    };
    
    handleSubmit = ()=>{
        let userInfo = this.props.form.getFieldsValue();
        console.log("nihao");
        console.log(JSON.stringify(userInfo));
    }

    render(){
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol:{
                xs:24,
                sm:4
            },
            wrapperCol:{
                xs:24,
                sm:8
            }
        }
        const rowObject = {
            minRows:4,maxRows:8
        }
        const offestLayout ={
            wrapperCol:{
                xs:24,
                sm:{
                    span:12,
                    offset:4
                }
            }
        }
        return( 
            <div>
                <Card title="注册表单">
                    <Form layout="horizontal">
                        <FormItem label="用户名" {...formItemLayout}>
                            {
                                getFieldDecorator('userName',{
                                    initialValue:'',
                                    rules:[
                                        {
                                            required:true,
                                            message:"用户名不能为空"
                                        },
                                        {
                                            min:5,max:10,
                                            message:"长度不再范围内"
                                        }
                                    ]
                                })(
                                    <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Username"
                                    />
                                )
                            }
                        </FormItem>
                        <FormItem label="密码" {...formItemLayout}>
                        {
                                getFieldDecorator('passwWord',{
                                    initialValue:'',
                                    rules:[
                                        {
                                            required:true,
                                            message:"用户名不能为空"
                                        },
                                        {
                                            min:5,max:10,
                                            message:"长度不再范围内"
                                        }
                                    ]
                                })(
                                    <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="password"
                                    />
                                )
                            }
                        </FormItem>
                        <FormItem label="性别" {...formItemLayout}>
                            {
                                getFieldDecorator('sex',{
                                    initialValue:'2'
                                })(
                                    <Radio.Group>
                                        <Radio value="1">男</Radio>
                                        <Radio value="2">女</Radio>
                                    </Radio.Group>
                                )
                            }
                        </FormItem>
                        <FormItem label="年龄" {...formItemLayout}>
                            {
                                getFieldDecorator('age',{
                                    initialValue:'18'
                                })(
                                    <InputNumber />
                                )
                            }
                        </FormItem> 
                        <FormItem label="当前状态" {...formItemLayout}>
                           {
                               getFieldDecorator('status',{
                                   initialValue:'1'
                               })(
                                <Select>
                                    <Option value="1">咸鱼</Option>
                                    <Option value="2">浪子</Option>
                                    <Option value="3">天才</Option>
                                    <Option value="4">平庸</Option>
                                </Select>
                               )
                           }
                        </FormItem>
                        <FormItem label="爱好" {...formItemLayout}>
                            {
                                getFieldDecorator('interest',{
                                    initialValue:['1','2']
                                })(
                                    <Select mode="multiple">
                                        <Option value="1">游泳</Option>
                                        <Option value="2">网球</Option>
                                        <Option value="3">羽毛球</Option>
                                        <Option value="4">足球</Option>
                                        <Option value="5">篮球</Option>
                                        <Option value="6">乒乓球</Option>
                                        <Option value="7">排球</Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem label="是否已婚" {...formItemLayout}>
                            {
                                getFieldDecorator('isMarried',{
                                    valuePropName:'checked',
                                    initialValue:true
                                })(
                                    <Switch />
                                )
                            }
                        </FormItem>
                        <FormItem label="生日" {...formItemLayout}>
                            {
                                getFieldDecorator('birthday',{
                                    initialValue:moment('2018-8-8 12:00:59')
                                })(
                                    <DatePicker 
                                        showTime
                                        format="YYYY-MM-DD HH:mm:ss"
                                    />
                                )
                            }
                        </FormItem>
                        <FormItem label="联系地址" {...formItemLayout}>
                            {
                                getFieldDecorator('address',{
                                    initialValue:''
                                })(
                                    <TextArea 
                                        autosize={rowObject}
                                    />
                                )
                            }
                        </FormItem>
                        <FormItem label="早起时间" {...formItemLayout}>
                            {
                                getFieldDecorator('time')(
                                    <TimePicker />
                                )
                            }
                        </FormItem>
                        <FormItem label="头像" {...formItemLayout}>
                            {
                                getFieldDecorator('useImg',{
                                    initialValue:''
                                })(
                                    <Upload
                                        listType="picture-card"
                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                        onChange={this.handleChange}
                                    >
                                    {this.state.userImg?<img src={this.state.userImg}/>:<Icon type="plus"/>}
                                    </Upload>
                                )
                            }
                        </FormItem>
                        <FormItem {...offestLayout}>
                            {
                                getFieldDecorator('useImg',{
                                    initialValue:''
                                })(
                                   <Checkbox>我同意木克协议<a href="#"></a></Checkbox>
                                )
                            }
                        </FormItem>
                        <FormItem {...offestLayout}>
                            <Button type="primary" onClick={this.handleSubmit}>注册</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        );
    }
}
export default Form.create()(FormRegister);
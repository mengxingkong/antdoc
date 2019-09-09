import React from 'react'
import {Input, Select, Form, Button, Checkbox, Radio,DatePicker} from 'antd'
import utils from './../../utils/utils'
import moment from 'moment'
const FormItem = Form.Item;
const Option = Select.Option;

class FilterForm extends React.Component{


    initFormList=()=>{
        const {getFieldDecorator} =this.props.form;
        const formList =  this.props.formList;
        const formItemList = [];
        if(formList && formList.length > 0){
            formList.forEach((item,i)=>{
                let label = item.label;
                let field = item.field;
                let initialValue = item.initialValue || '';
                let placeholder = item.placeholder;
                let width = item.width;
                if(item.type == '时间查询'){
                    const begin_time = <FormItem label="订单时间" key='begin_time'>
                        {
                            getFieldDecorator('begin_time',{
                                initialValue:moment('2018-8-8 12:00:59')
                            })(
                                <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss" />
                            )
                        }
                    </FormItem>
                    const end_time = <FormItem label="~" colon={false} key='end_time'>
                    {
                        getFieldDecorator('end_time',{
                            initialValue:moment('2018-8-8 12:00:59')
                        })(
                            <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss" />
                        )
                    }
                    </FormItem>
                    formItemList.push(begin_time);
                    formItemList.push(end_time);
                }else if(item.type == 'INPUT'){
                    const INPUT = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator(field,{
                                initialValue:initialValue
                            })(
                                <Input type="text" placeholder={placeholder} />
                            )
                        }
                    </FormItem>
                    formItemList.push(INPUT);
                } else if(item.type == 'SELECT'){
                    const SELECT = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator(field,{
                                initialValue:initialValue
                            })(
                                <Select
                                    style={{width:width}}
                                    placeholder={placeholder}
                                >
                                    {utils.getOptionList(item.list)}
                                </Select>
                            )
                        }
                    </FormItem>
                     formItemList.push(SELECT);
                }else if(item.type == 'CHECKBOX'){
                    const CHECKBOX = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator(field,{
                                valuePropName:'checked',
                                initialValue:initialValue
                            })(
                                <Checkbox>
                                    {label}
                                </Checkbox>
                            )
                        }
                    </FormItem>
                    formItemList.push(CHECKBOX);
                }else if(item.type == 'DATEPICKER'){
                    const DATEPICKER = <FormItem label={label} key={field}>
                    {
                        getFieldDecorator(field,{
                            initialValue:moment('2018-8-8 12:00:59')
                        })(
                            <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss" />
                        )
                    }
                    </FormItem>
                    formItemList.push(DATEPICKER);
                }
            })
        }
        return formItemList;
    }

    handleFilterSubmit=()=>{
        let fieldsValue = this.props.form.getFieldsValue();
        this.props.filterSubmit(fieldsValue);
    }   

    handleFilterReset=()=>{
        this.props.form.resetFields();  
    } 

    render(){
        return(
            <div>
                <Form layout="inline">
                    {this.initFormList()}
                    <FormItem>
                        <Button type="primary" style={{margin: '0 20px'}} onClick={this.handleFilterSubmit}>查询</Button>
                        <Button onClick={this.handleFilterReset}>重置</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

export default Form.create({})(FilterForm);
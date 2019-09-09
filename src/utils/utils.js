import {Select} from 'antd'
import React from 'react'
const Option = Select.Option;
export default {
    formatDate(time){
        if(!time){
            return '';
        }
        let date = new Date(time);
        return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
    },

    // 表格分页 公共机制
    pagination(res, callback){
        let page = {
            onChange:(current)=>{
                callback(current)
            },
            current:res.data.result.page,
            pageSize:res.data.result.page_size,
            total:res.data.result.total_count,
            showTotal:()=>{
                return `共${res.data.result.total_count}条`
            },
            showQuickJumper:true
        }
        return page;
    },
    getOptionList(data){
        if(!data){
            return [];
        }
        let options = [];
        data.map((item)=>{
            options.push(<Option value={item.id} key={item.id}>{item.name}</Option>)
        })
        return options;
    },
    updateSelectedItem(selectedRowKeys, selectedItem, selectedIds){
        if(selectedIds){
            this.setState({
                selectedRowKeys,
                selectedItem,
                selectedIds
            })
        }else{
            this.setState({
                selectedRowKeys,
                selectedItem
            })
        }
    }
}

import JsonP from 'jsonp'
import axios from 'axios'
import { Modal } from 'antd';
import utils from './../utils/utils'
export default class Axios{

    static requestList(_this, url,params, isMock){
        var data ={
            params:params,
            isMock
        }
        this.ajax({
            url,
            data
        }).then((res)=>{
            if(res.data && res.data.result){
                let list = res.data.result.item_list.map((item,index)=>{
                    item.key = index;
                    return item;
                });
                _this.setState({
                    list,
                    pagination:utils.pagination(res,(current)=>{
                        _this.params.page = current;
                        _this.requestList();
                    })
                })
            }
        })
    }

    static jsonp(options){
        return new Promise((resolve,reject)=>{
                JsonP(options.url,{
                    param:'callback'
                },function(err,response){
                    if(false){
                        resolve(response);
                    }else{
                        reject(response);
                    }
                })
             })
    }

    static ajax(options){

        let loading;
        if(options.data && options.data.showLoading !== false){
            loading = document.getElementById("ajaxLoading");
            loading.style.display = 'block';
        }

        // let baseApi = 'https://www.easy-mock.com/mock/5d284656fb9fe7557a62f453/mstark';
        let baseApi = '';
        if(options.data.isMock){
            baseApi = 'https://www.easy-mock.com/mock/5a7278e28d0c633b9c4adbd7/api';
        }else{
            baseApi = 'https://www.easy-mock.com/mock/5d284656fb9fe7557a62f453/mstark';
        }
        return new Promise((resolve,reject)=>{
            axios({
                url:options.url,
                method:'get',
                baseURL:baseApi,
                timeout:5000,
                params:(options.data && options.data.params) || ''
            }).then((res)=>{
                if(options.data && options.data.showLoading !== false){
                    loading = document.getElementById("ajaxLoading");
                    loading.style.display = 'none';
                }
                if(res.status == '200' && res.data.code == '0'){
                    resolve(res);
                }else{
                    Modal.info({
                        title:"提示",
                        content:res.data.msg
                    })
                }
            })
        });
    }
}
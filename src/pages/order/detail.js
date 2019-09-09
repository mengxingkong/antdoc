import React from 'react';
import { Card} from 'antd';
import './detail.less'
import axios from './../../axios/'
export default class Detail extends React.Component{

    state ={

    }

    componentDidMount(){
        // 提取路由参数
        let orderId = this.props.match.params.orderId;
        this.getDetailInfo(orderId);
    }

    getDetailInfo = (orderId)=>{
        axios.ajax({
            url:'/order/detail',
            data:{
                params:{
                    orderId: orderId
                },
                isMock:true
            }
        }).then((res)=>{
            if(res.data.code === '0'){
                this.setState({
                    orderInfo:res.data.result
                });
                // this.renderMap();
            }
        })
    }

    renderMap = ()=>{
        this.map = new window.BMap.Map('orderDetailMap', {enableMapClick:false});
        this.map.centerAndZoom('北京')
        this.addMapControl();

    }

    addMapControl = ()=>{
        let map = this.map;
        map.addControl(new window.BMap.NavigationControl({anchor:'BMAP_ANCHOR_TOP_RIGHT'}));
        map.addControl(new window.BMap.ScaleControl({anchor:'BMAP_ANCHOR_TOP_RIGHT'}));
    }

    drawBikeMap =(positionList)=>{

    }

    render(){
        const info = this.state.orderInfo || {};
        return(
            <div>
                <Card>
                    <div id="orderDetailMap" className="order-map"></div>
                    <div className="detail-items">
                        <div className="item-title">基础信息</div>
                        <ul className="detail-form">
                            <li>
                                <div className="detail-form-left">用车模式</div>
                                <div className="detail-form-content">{info.mode==1?'服务区':'停车点'}</div>

                            </li>
                            <li>
                                <div className="detail-form-left">订单模式</div>
                                <div className="detail-form-content">{info.order_sn}</div>

                            </li>
                            <li>
                                <div className="detail-form-left">车辆编号</div>
                                <div className="detail-form-content">{info.bike_sn}</div>

                            </li>
                            <li>
                                <div className="detail-form-left">用户姓名</div>
                                <div className="detail-form-content">{info.user_name}</div>

                            </li>
                            <li>
                                <div className="detail-form-left">手机号码</div>
                                <div className="detail-form-content">{info.mobile}</div>
                            </li>
                        </ul>
                    </div>
                    <div className="detail-items">
                        <div className="item-title">行使轨迹</div>
                        <ul className="detail-form">
                            <li>
                                <div className="detail-form-left">起点</div>
                                <div className="detail-form-content">{info.start_location}</div>

                            </li>
                            <li>
                                <div className="detail-form-left">终点</div>
                                <div className="detail-form-content">{info.end_location}</div>

                            </li>
                            <li>
                                <div className="detail-form-left">里程</div>
                                <div className="detail-form-content">{info.distance/1000+'公里'}</div>

                            </li>
                        </ul>
                    </div>
                </Card>
            </div>
        );
    }
}
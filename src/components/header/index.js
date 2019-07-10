import React from 'react'
import {Row, Col} from 'antd'
import './index.less'
import Util from '../../utils/utils.js'
import axios from '../../axios/index'
export default class Header extends React.Component{

    componentWillMount(){
        this.setState({
            userName: 'mxkstar'
        })

        setInterval(()=>{
            let sysTime = Util.formatDate(new Date().getTime());
            this.setState({
                sysTime
            })
        }, 1000);

        this.getWeatherAPIData();
    }

    getWeatherAPIData(){
        let city = 'beijing';
        axios.jsonp({
            url:'http://api.map.baidu.com/telematics/v3/weather?location='+city+'&output=json&ak=3p49MVra6urFRGOT9s8UBWr2'
        }).then((res)=>{
            if(res.status == 'success'){
                let data = res.results[0].weather_data[0];
                this.setState({
                    dayPicture: data.dayPictureUrl,
                    weather:data.weather
                })
            }
        })
        debugger;
    }

    render(){
        return(
            <div className="header">
                <Row className="header-top">
                    <Col span="24">
                        <span>{this.state.userName}</span>
                        <a href="#"> 退出 </a>
                    </Col>
                </Row>
                <Row className="breadcrump">
                    <Col span="4" className="breadcrump-title">
                        首页
                    </Col>
                    <Col span="20" className="weather">
                        <span className="date">{this.state.sysTime}</span>
                        <span className="weather-img">
                            <img src={this.state.dayPicture} alt="" />
                        </span>
                        <span className="weather-detail">
                            {this.state.weather}
                        </span>
                    </Col>
                </Row>
            </div>
        );
    }
}
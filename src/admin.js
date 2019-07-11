import React from 'react'
import {Row,Col} from 'antd'
import Header from './components/header/index.js'
import Footer from './components/footer/index.js'
import Navleft from './components/nvaleft/index.js';
import Home from './pages/home/index'
import './style/common.less'
export default class Admin extends React.Component{

    render(){
        return(
            <Row className="container">
                <Col span='3' className="nav-left">
                    <Navleft />
                </Col>
                <Col span='21' className="main">
                    <Header></Header>
                    <Row className="content">
                        {/* <Home /> */}
                        {this.props.children}
                    </Row>
                    <Footer></Footer>
                 </Col>
            </Row>
        );
    }
}
import React from 'react'
// import MenuConfig from '../../config/menuConfig'
import MenuConfig from '../../config/project_menuConfig'
import {Menu,Icon} from 'antd'
import {connect} from 'react-redux'
import {switchMenu} from './../../redux/action/index'
import './index.less'
import {NavLink} from 'react-router-dom'
const SubMenu = Menu.SubMenu;
class Navleft extends React.Component{

    state = {
        currentKey:''
    }

    componentWillMount(){
        const menuTreeNode = this.renderMenu(MenuConfig);
        let currentKey = window.location.hash.replace(/#|\?.*$/g,'')
        this.setState({
            menuTreeNode,
            currentKey
        });
    }

    //菜单渲染
    renderMenu = (data) =>{
        return data.map((item)=>{
            if(item.children){
                return (
                    <SubMenu title={item.title} key={item.key}>
                        {this.renderMenu(item.children)}
                    </SubMenu>
                )
            }
            return <Menu.Item title={item.title} key={item.key} > 
                    <NavLink to={item.key}>{item.title}</NavLink> 
                   </Menu.Item>
        })
    }
 
    handleClick =(item)=>{
        const {dispatch} =this.props;
        dispatch(switchMenu(item.item.props.title))
        this.setState({
            currentKey:item.key
        })
    }

    render(){

        return(
            <div>
                <div className="logo">
                    <h1>network project</h1>
                </div>
                <Menu
                    onClick={this.handleClick}
                    selectedKeys={[this.state.currentKey]}
                    theme="dark"
                >
                  {this.state.menuTreeNode}
                </Menu>
            </div>
        );
    }
}

export default connect()(Navleft);
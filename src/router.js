import React from 'react'
import {HashRouter, Route, Switch, Redirect} from 'react-router-dom'
import App from './App'
import Login from './pages/login'
import Main from './pages/router-demo/router1/main'
import Admin from './admin'
import Home from './pages/home'
import Buttons from './pages/ui/button'
import NoMatch from './pages/noMatch'
import Modals from './pages/ui/modals'
import Loadings from './pages/ui/loading'
import Notice from './pages/ui/notice'
import Message from './pages/ui/meaasge'
import Tab from './pages/ui/tabs'
import Gallery from './pages/ui/gallery'
import Carousels from './pages/ui/carousel'
import FormLogin from './pages/form/login'
import FormRegister from './pages/form/register'
import BasicTable from './pages/table/basicTable'
import HighTable from './pages/table/highTable'
import City from './pages/city'
import Order from './pages/order'
import Common from './common'
import Detail from './pages/order/detail'
import User from './pages/user'
import Bar from './pages/echarts/bar'
import Pie from './pages/echarts/pie'
import Line from './pages/echarts/line'
import RichText from './pages/rich'
import PermissionUser from './pages/permission'
export default class IRouter extends React.Component{

    render(){
        return(
            <HashRouter>
                <App>
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route path="/common" render={()=>
                            <Common>
                                <Route path="/common/order/detail/:orderId" exact component={Detail} />
                            </Common>
                        }/>
                        <Route path="/" render={()=>
                            <Admin>
                                < Switch>
                                    <Route  path="/ui/buttons" component={Home}  />
                                    <Route  path="/ui/buttons" component={Buttons} />
                                    <Route  path="/ui/modals" component={Modals} />
                                    <Route  path="/ui/loadings" component={Loadings} />
                                    <Route  path="/ui/notification" component={Notice} />
                                    <Route  path="/ui/messages" component={Message} />
                                    <Route  path="/ui/tabs" component={Tab} />
                                    <Route  path="/ui/gallery" component={Gallery} />
                                    <Route  path="/ui/carousel" component={Carousels} />
                                    <Route  path="/form/login" component={FormLogin} />
                                    <Route  path="/form/reg" component={FormRegister} />
                                    <Route  path="/table/basic" component={BasicTable} />
                                    <Route  path="/table/high" component={HighTable} />   
                                    <Route  path="/city" component={City} />   
                                    <Route  path="/order" component={Order} />                                
                                    <Route  path="/user" component={User} />  
                                    <Route  path="/charts/bar" component={Bar} />     
                                    <Route  path="/charts/pie" component={Pie} />                                
                                    <Route  path="/charts/line" component={Line} />     
                                    <Route  path="/rich" component={RichText} />      
                                    <Route  path="/permission" component={PermissionUser} />    
                                    <Redirect to="/home" />                            
                                    <Route  component={NoMatch} /> 
                                </Switch>
                            </Admin>
                        } />
                    </Switch>
                </App>
            </HashRouter>
        );
    }
}
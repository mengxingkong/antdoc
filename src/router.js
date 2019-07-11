import React from 'react'
import {HashRouter, Route, Switch} from 'react-router-dom'
import App from './App'
import Login from './pages/login'
import Main from './pages/router-demo/router1/main'
import Admin from './admin'
import Button from './pages/ui/button'
import NoMatch from './pages/noMatch'
export default class IRouter extends React.Component{

    render(){
        return(
            <HashRouter>
                <App>
                    <Route path="/login" component={Login} />
                    <Route path="/admin" render={()=>
                        <Admin>
                            <Switch>
                                <Route  path="/admin/ui/buttons" component={Button} />
                                <Route component={NoMatch} /> 
                            </Switch>
                        </Admin>
                    } />
                </App>
            </HashRouter>
        );
    }
}
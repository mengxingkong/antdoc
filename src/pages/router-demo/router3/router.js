import React from 'react'
import {HashRouter as Router,Route, Link, Switch} from 'react-router-dom'
import Home from './home'
import Main from './main'
import Info from './info'
import About from './../router1/about'
import Topic from './../router1/topic'
import NoMatch from './nomatch'

export default class IRoute extends React.Component{

    render(){
        return(
            <Router>
                <Home>
                    <Switch>
                        <Route path="/main" render={()=>
                            <Main>
                                <Route path="/main/:mainId" component={Info} />
                            </Main>
                        } />
                        <Route path="/about" component={About} />
                        <Route path="/topic" component={Topic} />
                        <Route component={NoMatch} />
                    </Switch>
                </Home>
            </Router>
        );
    }
}
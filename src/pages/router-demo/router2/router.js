import React from 'react'
import {HashRouter as Router,Route, Link, Switch} from 'react-router-dom'
import Home from './home'
import Main from './main'
import About from './../router1/about'
import Topic from './../router1/topic'

export default class IRoute extends React.Component{

    render(){
        return(
            <Router>
                <Home>
                    <Route path="/main" render={()=>
                        <Main>
                            <Route path="/main/a" component={About} />
                        </Main>
                    } />
                    <Route path="/about" component={About} />
                    <Route path="/topic" component={Topic} />
                </Home>
            </Router>
        );
    }
}
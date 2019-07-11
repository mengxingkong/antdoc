import React from 'react'
import {HashRouter, Route, Link, Switch} from 'react-router-dom'
import Main from './main'
import About from './about'
import Topic from './topic'
export default class Home extends React.Component{

    render(){
        return(
            <HashRouter>
                <div>
                    <ul>
                        <li>
                            <Link to="/">Main</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <Link to="/topic">Topics</Link>
                        </li>
                    </ul>
                    <hr />
                    <Switch>
                        <Route exact path="/" component={Main} />
                        <Route path="/about" component={About} />
                        <Route path="/topic" component={Topic} />
                    </Switch>
                </div>
            </HashRouter>
        );
    }
}
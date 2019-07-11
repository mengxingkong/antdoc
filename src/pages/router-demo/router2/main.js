import React from 'react'
import {Link} from 'react-router-dom'
export default class Main extends React.Component{

    render(){
        return(
            <div>
                this is main page
                <ul>
                    <li>
                        <Link to="/main/a">About</Link>
                    </li>
                </ul>
                <hr />
                {this.props.children}
            </div>
        );
    }
}
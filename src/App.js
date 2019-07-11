import React, { Component } from 'react';
import {Button} from 'antd'
import './App.css';
import {Link} from 'react-router-dom'
import Life from './pages/demo/life.js'
class App extends Component {
  render() {
    return (
      <div>
        {this.props.children}
       </div>
    );
  }
}

export default App;
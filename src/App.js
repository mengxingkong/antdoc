import React, { Component } from 'react';
import {Button} from 'antd'
import './App.css';
import Life from './pages/demo/life.js'
class App extends Component {
  render() {
    return (
      <div className="App">
        <Button type="primary">Button</Button>
        <Life></Life>
      </div>
    );
  }
}

export default App;
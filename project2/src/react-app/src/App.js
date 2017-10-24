import React, { Component } from 'react';
import List from './Lists.js';
import Sub from './Submit.js';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }


  render() {
    return (
      <div align="center">
      <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M" crossorigin="anonymous"/>

        <Sub></Sub>
        <List></List>
      </div>
    );
  }
} 




export default App;


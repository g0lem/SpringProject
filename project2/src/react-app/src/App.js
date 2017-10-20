import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 'Add something to do',
      list: []
    };

    var context = this;
    axios.get('http://localhost:8080/get')
      .then(function (response) {
        if(response.data.list){
          context.setState({list: response.data.list});
        }
        console.log(response.data.value);
    })


    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //this.handleList = this.handleList.bind(this);
    this.toggleComplete = this.toggleComplete.bind(this);
    this.checkValue = this.checkValue.bind(this);
    this.handlePost = this.handlePost.bind(this);
    //this.getMoviesFromApiAsync = this.getMoviesFromApiAsync.bind(this);

  }

  handleChange(event) {
    this.setState({value: event.target.value});

    console.log(event.target.value);
  }

  handleSubmit(event) {
    //alert('An essay was submitted: ' + this.state.value);

    //this.list.push(this.state);
    var new_list = this.state.list;
    new_list.push({value: this.state.value, checked: false});//✘

   //this.setState({value: "add"});

    this.setState({list: new_list});


    this.handlePost();

    event.preventDefault();
  }

  checkValue(character){
    return !character;
  }


  toggleComplete(todoIndex) {
    console.log(this.state);

    this.setState(prevState => prevState = { value: prevState.value, list: prevState.list.map((todo, idx) => idx != todoIndex? todo : {value: todo.value, checked: this.checkValue(todo.checked)}) },
      function(){
        this.handlePost();
      });
  }

  getMoviesFromApiAsync() {
    return fetch('localhost:8080/get')
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson.movies;
      })
      .catch((error) => {
        console.error(error);
      });
  }


  handlePost(){

        axios.post('http://localhost:8080/post',  this.state, {});

  }

  // handleList(){

  //     var a = [];

  //     for(var i in this.state.list){

  //       a.push(<div onClick={this.handleClick}>{this.state.list.value} <span>✔</span></div>);
  //     }

  //     return a;

  // }




  render() {
    return (
      <div>
        <div className="App">
          <label>
            Name:
            <input value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" onClick={this.handleSubmit}/>
        </div>
        <div align="center">
          {this.state.list.map((todo,i) => <div key={"id"+i}  onClick={()=>this.toggleComplete(i)}> {todo.value} <span>{todo.checked?"✔":"✘"}</span></div>)}
        </div>
        <div value={this.state.something}>
        </div>
      </div>
    );
  }
} 




export default App;


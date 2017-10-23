import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import TextField from 'material-ui/TextField';
import AutoComplete from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import SockJS from 'sockjs-client';
import Stomp from '@stomp/stompjs'
 
// var socket = io('http://localhost', {
//  port: 80
// });


// socket.on('connect', () => {
//   console.log(socket.id); // 'G5p5...'
// })

// socket.emit('hello', 'world');


    // var socket = new SockJS('http://localhost:8080/chat');
    // var stompClient = Stomp.over(socket);
    // stompClient.connect({}, function (frame) {
       
    //     console.log('Connected: ' + frame);
    //     stompClient.subscribe('/topic/greetings', function (greeting) {
    //         //showGreeting(JSON.parse(greeting.body).content);
    //         alert(greeting.body);

    //     });
    // });


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 'Add something to do',
      list: [],
      checked: [{}],
      unchecked: [{}]
    };



    this.page = 0;



    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //this.handleList = this.handleList.bind(this);
    this.toggleComplete = this.toggleComplete.bind(this);
    this.checkValue = this.checkValue.bind(this);
    this.handlePost = this.handlePost.bind(this);
    this.handleModify = this.handleModify.bind(this);
    this.updateData = this.updateData.bind(this);
    this.goForward = this.goForward.bind(this);
    this.goBackward = this.goBackward.bind(this);

    this.getButtonColor = this.getButtonColor.bind(this);
    this.sendMessage = this.sendMessage.bind(this);

    //this.getMoviesFromApiAsync = this.getMoviesFromApiAsync.bind(this);

    this.updateData(this);

    this.socket = new SockJS('http://localhost:8080/chat');
    this.stompClient = Stomp.over(this.socket);

    var stomp = this.stompClient;
    var context = this;

    this.stompClient.connect({}, function (frame) {
       
        console.log('Connected: ' + frame);
        stomp.subscribe('/topic/greetings', function (greeting) {
            //showGreeting(JSON.parse(greeting.body).content);

            context.updateData(context);

        });


    });

  }

  updateData(context){
    axios.get('http://localhost:8080/get/'+context.page)
      .then(function (response) {
        if(response.data.list){
          context.setState({list: response.data.list});
          console.log(response.data.list);
        }
    });

    axios.get('http://localhost:8080/something/getChecked')
      .then(function (response) {
        if(response){
          context.setState({checked: response.data});
          console.log(response.data.list);
        }
    });

    axios.get('http://localhost:8080/something/getUnchecked')
      .then(function (response) {
        if(response){
          context.setState({unchecked: response.data});
          console.log(response.data.list);
        }
    });
  }

  handleChange(event) {
    this.setState({value: event.target.value});

    console.log(event.target.value);
  }

  handleSubmit(event) {
    //alert('An essay was submitted: ' + this.state.value);

    //this.list.push(this.state);

    var obj_to_push = {value: this.state.value, checked: false};


    this.handlePost(obj_to_push);

    event.preventDefault();
  }

  checkValue(character){
    return !character;
  }

  sendMessage() {

      this.stompClient.send("/app/hello", {}, "da");

  }



  toggleComplete(todoIndex) {
    console.log(this.state);
    this.handleModify(todoIndex);

    // this.setState(prevState => prevState = { value: prevState.value, list: prevState.list.map((todo, idx) => idx != todoIndex? todo : {value: todo.value, checked: this.checkValue(todo.checked)}) },
    //   function(){
    //     this.handleModify(todoIndex);
    //   });
  }

  handleSearch(event){
    var context = this;
    if(event.target.value!=""){
      axios.get('http://localhost:8080/search/0/'+event.target.value)
        .then(function (response) {
          if(response.data.list){
            context.setState({list: response.data.list});
            console.log(context.state);
            event.preventDefault();
          }
      })
    }
    else{
      this.updateData(context);
      event.preventDefault();
    }
  }

  handlePost(obj_to_push){

        var context = this;
        axios.post('http://localhost:8080/post',  obj_to_push, {}).then(function(response){
              // var new_list = this.state.list;
              // new_list.push(response);//✘

             //this.setState({value: "add"});

              context.setState({list: response.data});
        });

  }

  handleModify(obj_to_push){

        var context = this;
        axios.put('http://localhost:8080/update/'+obj_to_push).then(function(response){
              // var new_list = this.state.list;
              // new_list.push(response);//✘

             //this.setState({value: "add"});

              context.setState({list: response.data});
        });

  }

  // handleList(){

  //     var a = [];

  //     for(var i in this.state.list){

  //       a.push(<div onClick={this.handleClick}>{this.state.list.value} <span>✔</span></div>);
  //     }

  //     return a;

  // }

  goForward(){

    this.page++;
    this.updateData(this);
  
  }

  goBackward(){

    if(this.page>0)
    this.page--;
    this.updateData(this);
  
  }

  getButtonColor(check){

    var basic_classes = "btn-block btn text-center cursor-pointer ";

    if(!check){
      return basic_classes+"btn-danger";
    }
    else{
      return basic_classes+"btn-success";
    }


  }

  render() {
    return (
      <div align="center">
        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M" crossorigin="anonymous"/>


          <input type="submit" value="SEND" onClick={this.sendMessage} class="btn btn-warning"/>
        <div className="App" class="form-group">
          <label>
            Add to the list:
            <input placeholder={this.state.value} onChange={this.handleChange}  class="form-control"/>
          </label>
          <input type="submit" value="Submit" onClick={this.handleSubmit} class="btn btn-warning"/>
        </div>

        <MuiThemeProvider>
           <TextField placeholder="Search..." onChange={this.handleSearch}  class="form-control"/>

            <div class="container container-table form-group">
              <div>
                {this.state.list.map((todo,i) => <div class={this.getButtonColor(todo.checked)} key={"id"+i}  onClick={()=>this.toggleComplete(todo.id)}> {todo.value} </div>)}
              </div>
              <div> <a class="btn btn-light"  onClick={this.goBackward}> {"<<"} </a> {this.page+1} <a class="btn btn-light" onClick={this.goForward}> >> </a>
              </div>
            </div>
            <div>{this.state.checked.map((todo,i) => <div class={this.getButtonColor(todo.checked)}> {todo.value} </div>)}</div>
            <div>{this.state.unchecked.map((todo,i) => <div class={this.getButtonColor(todo.checked)}> {todo.value} </div>)}</div>
        </MuiThemeProvider>


      </div>
    );
  }
} 




export default App;


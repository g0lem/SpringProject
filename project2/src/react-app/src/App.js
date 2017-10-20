import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import TextField from 'material-ui/TextField';
import AutoComplete from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 'Add something to do',
      list: []
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

    this.updateData(this);
    //this.getMoviesFromApiAsync = this.getMoviesFromApiAsync.bind(this);

  }

  updateData(context){
    axios.get('http://localhost:8080/get/'+context.page)
      .then(function (response) {
        if(response.data.list){
          context.setState({list: response.data.list});
          console.log(response.data.list);
        }
    })

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
        </MuiThemeProvider>


      </div>
    );
  }
} 




export default App;


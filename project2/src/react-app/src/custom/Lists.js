//***************************************************
//*                                                 *
//*        This class does everything related       *
//*    to handling the already created notes on     * 
//*                  the front end                  * 
//*                                                 *                   
//***************************************************

import React, { Component } from 'react';
import axios from 'axios';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import SockJS from 'sockjs-client';
import Stomp from '@stomp/stompjs';

class List extends Component {

    constructor(props) {

        super(props);
        
        this.state = {
          list: [{}]
        }

        this.page = 1;
        this.search_query = "*";

        this.handleModify      =     this.handleModify.bind(this);
        this.getButtonColor    =     this.getButtonColor.bind(this);


        this.socket = new SockJS('http://localhost:8080/chat');
        this.stompClient = Stomp.over(this.socket);

        var stomp = this.stompClient;
        var context = this;

        this.stompClient.connect({}, function (frame) {
           
            console.log('Connected: ' + frame);
            stomp.subscribe('/topic/greetings', function (greeting) {

                context.updateData(context);
            });
        });
    }
    


  updateData(context){

    axios.post('http://localhost:8080/get/'+context.page, "value:"+context.search_query+"*")
      .then(function (response) {
        if(response.data){
          context.setState({list: response.data});
          console.log(response.data);
        }
    });

  }
  searchChecked(context){

    axios.post('http://localhost:8080/get/'+context.page, "checked:true AND value:"+context.search_query+"*")
      .then(function (response) {
        if(response){
          context.setState({list: response.data});
          console.log(response.data.list);
        }
    });

  }

  searchUnchecked(context){

    axios.post('http://localhost:8080/get/'+context.page, "checked:false AND value:"+context.search_query+"*")
      .then(function (response) {
        if(response){
          context.setState({list: response.data});
          console.log(response.data.list);
        }
    });
  }

    toggleComplete(obj_id){

        var context = this;
        axios.put('http://localhost:8080/update/'+obj_id).then(function(response){
            context.setState({list: response.data});
        });

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

        <MuiThemeProvider>
           <TextField placeholder="Search..." onChange={this.handleSearch}  class="form-control"/><DropDownMenu onChange={(event, index, value)=> this.handleDropDown(value)}><MenuItem value={1}>All</MenuItem><MenuItem value={2}>Checked</MenuItem><MenuItem value={3}>Unchecked</MenuItem></DropDownMenu>
            <div class="container container-table form-group">
                <div>
                    {this.state.list.map((todo,i) => <div class={this.getButtonColor(todo.checked)} key={"id"+i}  onClick={()=>this.toggleComplete(todo.id)}> {todo.value} </div>)}
                </div>
                <div>
                    <a class="btn btn-light"  onClick={this.goBackward}> {"<<"} </a> {this.page+1} <a class="btn btn-light" onClick={this.goForward}> >> </a>
                </div>
            </div>
        </MuiThemeProvider>
        );
    }
}




export default List;


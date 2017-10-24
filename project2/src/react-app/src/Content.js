//***************************************************
//*                                                 *
//*        This class does everything related       *
//*    to handling the already created notes on     * 
//*                  the front end                  * 
//*                                                 *                   
//***************************************************

import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

import SockJS from 'sockjs-client';
import Stomp from '@stomp/stompjs';



class Content extends Component {

    constructor(props) {

        super(props);
        
        this.state = {
          list: []
        }

        this.page = 0;
        this.search_query = "*";
        this.search_type = 1;


        this.updateData        =     this.updateData.bind(this);
        this.searchUnchecked   =     this.searchUnchecked.bind(this);
        this.searchChecked     =     this.searchChecked.bind(this);
        this.handleDropDown    =     this.handleDropDown.bind(this); 

        this.handleSearch      =     this.handleSearch.bind(this);

        this.updateData(this);

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

    handleSearch(event){

        // this.search_query = event.target.value;
        // this.handleDropDown(this.search_type);

        if(event.target.value)
          this.search_query = event.target.value;
        else
          this.search_query = "*";

        this.handleDropDown(this.search_type);

    }

    handleDropDown(num){

        this.search_type = num;
        if(num==1){
          this.updateData(this);
        }
        if(num==2){
          this.searchChecked(this);
        }
        if(num==3){
          this.searchUnchecked(this);
        }
    }

}



export default Content;


//***************************************************
//*                                                 *
//*        This class does everything related       *
//*    to posting new todo notes in the DataBase    * 
//*                                                 *  
//***************************************************

import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import List from './Lists.js';


class Submit extends List {

    constructor(props) {

        super(props);

        this.state = {
          value: "Search..."
        };

        this.handleChange  =   this.handleChange.bind(this);
        this.handlePost    =   this.handlePost.bind(this);
    }


  //this updates the string in React's memory, since you don't have two way data binding
    handleChange(event) {

        console.log(event.target.value);
        this.setState({value: event.target.value});
    }


    //this pushed a note to Solr, the database
    handlePost(){

      var context = this;
      axios.post('http://localhost:8080/post',  {value: this.state.value, checked: false}).then(function(response){

            context.setState({list: response.data});

      });

    }



    render() {
        return (
            <div>
                <label>Add to the list: <input placeholder={this.state.value} onChange={this.handleChange}  class="form-control"/></label>
                <input type="submit" value="Submit" onClick={this.handlePost} class="btn btn-warning"/>
            </div>
        );
    }
} 




export default Submit;


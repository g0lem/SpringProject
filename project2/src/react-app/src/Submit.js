//***************************************************
//*                                                 *
//*        This class does everything related       *
//*    to posting new todo notes in the DataBase    * 
//*                                                 *  
//***************************************************

import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {GridList, GridTile} from 'material-ui/GridList';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';

import './App.css';
import axios from 'axios';
import List from './Lists.js';

const style = {
  marginRight: 20,
  marginTop: 20
};


class Submit extends List {

    constructor(props) {

        super(props);

        this.state = {
          value: "Write a reminder"
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
          <MuiThemeProvider>
          <AppBar title="Notes" iconClassNameRight="muidocs-icon-navigation-expand-more"/>
            <GridTile>

                <label><TextField placeholder={this.state.value} onChange={this.handleChange}/></label>
                <FloatingActionButton mini={true} secondary={true} style={style} onClick={this.handlePost}> <ContentAdd/> </FloatingActionButton>
              
            </GridTile>
          </MuiThemeProvider>
        );
    }
} 




export default Submit;


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


import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

import {GridList, GridTile} from 'material-ui/GridList';
import Content from './Content'

import SockJS from 'sockjs-client';
import Stomp from '@stomp/stompjs';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 500,
    height: 'auto',
    overflowY: 'disable'
  },
};




class List extends Content {

    constructor(props) {

        super(props);
        
        this.state = {
          list: []
        }

        //this.content = new Content();


        // this.updateData        =     this.content.updateData.bind(this);
        // this.searchUnchecked   =     this.content.searchUnchecked.bind(this);
        // this.searchChecked     =     this.content.searchChecked.bind(this);
        // this.handleDropDown    =     this.content.handleDropDown.bind(this)

        this.getButtonColor    =     this.getButtonColor.bind(this);

        this.updateData(this);

        this.goForward         =     this.goForward.bind(this);
        this.goBackward        =     this.goBackward.bind(this);

        this.socket = new SockJS('http://localhost:8080/chat');
        this.stompClient = Stomp.over(this.socket);


    }
    

    getButtonColorPrimary(check){

        // var basic_classes = "btn-block btn text-center cursor-pointer ";

        // if(!check && check !== undefined){
        //     return basic_classes+"btn-danger";
        // }
        // else if(check === undefined){
        //   return "";
        // }
        // else{
        //   return basic_classes+"btn-success";
        // }

        return check;
    }


    goForward(){

      this.page++;
      this.handleDropDown(this.search_type);
    
    }

    goBackward(){

      if(this.page>0)
      this.page--;
      this.handleDropDown(this.search_type);
    
    }

    getButtonColor(checked){
      return checked;
    }


    render() {
        return (

        <MuiThemeProvider>
           <TextField placeholder="Search..." onChange={this.handleSearch}  class="form-control"/><DropDownMenu onChange={(event, index, value)=> this.handleDropDown(value)}><MenuItem value={1}>All</MenuItem><MenuItem value={2}>Checked</MenuItem><MenuItem value={3}>Unchecked</MenuItem></DropDownMenu>
            <GridList style={styles.root}>
                <GridTile style={styles.gridList}>
                    {this.state.list.map((todo,i) => <div> <RaisedButton fullWidth={true} primary={this.getButtonColor(todo.checked)} secondary={!this.getButtonColor(todo.checked)} label={todo.value} onClick={()=>this.toggleComplete(todo.id)} /> </div>)}
                </GridTile>

            </GridList>
            <div>
                    <RaisedButton onClick={this.goBackward} label={"<"}/> {this.page+1} <RaisedButton onClick={this.goForward} label={">"}/> 
            </div>
        </MuiThemeProvider>
        );
    }
}




export default List;


//***************************************************
//*                                                 *
//*        This class does everything related       *
//*    to posting new todo notes in the DataBase    * 
//*                                                 *  
//***************************************************

import React, { Component } from 'react';


class Sub extends Component {

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

        this.setState({value: event.target.value});
    }


  //this pushed a note to Solr, the database
  handlePost(obj_to_push){

    var context = this;
    axios.post('http://localhost:8080/post',  obj_to_push, {}).then(function(response){

          context.setState({list: response.data});

    });

  }



    render() {
        return (
            <div>
                <label>Add to the list: <input placeholder={this.state.value} onChange={this.handleChange}  class="form-control"/></label>
                <input type="submit" value="Submit" onClick={this.handleSubmit} class="btn btn-warning"/>
            </div>
        );
    }
} 




export default Sub;


import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import {Header} from '../../components';
import {CustomerList} from '../customer';

export default class Home extends Component {
  

  render() {
    return (
      <div className="container">
        <div className="row bg-secondary">
          <Header />
        </div>
        <div className="row">
          <div className="col-4 bg-warning">
            Menu
          </div>
          <div className="col-8">
            <CustomerList />
          </div>
        </div>
        
        
      </div>
    );
  }
}

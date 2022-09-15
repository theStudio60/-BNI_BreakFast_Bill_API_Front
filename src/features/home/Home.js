import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import {Header} from '../../components';

export default class Home extends Component {
  

  render() {
    return (
        <Header />
    );
  }
}

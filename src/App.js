// import logo from './logo.svg';
import './App.css';


import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import { render } from "react-dom";
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
export default class App extends Component {
  state={
    progress:0
  }
  setprogress=(progress)=>
  {
    this.setState({progress:progress});
  }
  render() {
    return (
      <BrowserRouter>
      <Navbar/>
      <LoadingBar
        color='#f11946'
        progress={this.state.progress}
      />
    <Routes>
      <Route path="/"  element={<News setprogress={this.setprogress}   key="general" pageSize={5} cat="general"/>}/>
      <Route path="/business"  element={<News setprogress={this.setprogress}   key="business" pageSize={5} cat="business"/>}/>
      <Route path="/entertainment"  element={<News setprogress={this.setprogress}   key="entertainment" pageSize={5} cat="entertainment"/>}/>
      <Route path="/health"  element={<News setprogress={this.setprogress}   key="heath" pageSize={5} cat="health"/>}/>
      <Route path="/science"  element={<News setprogress={this.setprogress}   key="science" pageSize={5} cat="science"/>}/>
      <Route path="/sport"  element={<News setprogress={this.setprogress}   key="sports" pageSize={5} cat="sports"/>}/>
      <Route path="/technology"  element={<News setprogress={this.setprogress}   key="technology" pageSize={5} cat="technology"/>}/>
      <Route path="/general"  element={<News setprogress={this.setprogress}   key="general" pageSize={5} cat="general"/>}/>
      
      
    </Routes>
  </BrowserRouter>
      // <div>

      //  <News setprogress={this.setprogress}   pageSize={5} cat="sport"/>
      // </div>
    )
  }
}

import './App.css';
import React, { Component } from 'react';
import Navbar from './components/Navbar.js';
import News from './components/News';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {
  apiKey = process.env.REACT_APP_API_KEY;
  pageSize = 10
  state = {
    progress: 0
  }
  setProgress = (progress)=>{
    this.setState({progress:progress})
  }
  render() {

    return (
      <>
        <BrowserRouter>
          <Navbar />
          <LoadingBar
            color='#f11946' 
            progress={this.state.progress}
          // onLoaderFinished={() => setProgress(0)}
          />
          <Routes>

            <Route exact path='/' element={<News key="home" pageSize={this.pageSize} country="in" progress={this.setProgress} apiKey={this.apiKey} />} />
            <Route exact path='/business' element={<News key="business" pageSize={this.pageSize} country="in" category="business" apiKey={this.apiKey} progress={this.setProgress} />} />
            <Route exact path='/entertainment' element={<News key="entertainment" pageSize={this.pageSize} country="in" category="entertainment" apiKey={this.apiKey} progress={this.setProgress} />} />
            <Route exact path='/general' element={<News key="general" pageSize={this.pageSize} country="in" category="general" apiKey={this.apiKey} progress={this.setProgress} />} />
            <Route exact path='/health' element={<News key="health" pageSize={this.pageSize} country="in" category="health" apiKey={this.apiKey} progress={this.setProgress} />} />
            <Route exact path='/science' element={<News key="science" pageSize={this.pageSize} country="in" category="science" apiKey={this.apiKey} progress={this.setProgress} />} />
            <Route exact path='/sports' element={<News key="sports" pageSize={this.pageSize} country="in" category="sports" apiKey={this.apiKey} progress={this.setProgress}/>} />
            <Route exact path='/technology' element={<News key="technology" pageSize={this.pageSize} country="in" category="technology" apiKey={this.apiKey} progress={this.setProgress}/>} />
          </Routes>
          {/* <News pageSize={this.pageSize} country="in" category="general"/> */}
        </BrowserRouter>
      </>
    )
  }
}

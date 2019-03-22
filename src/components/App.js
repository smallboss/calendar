import React, { Component } from 'react';
import SidePanel from './SidePanel/SidePanel';
import CalendarViewer from './CalendarViewer/CalendarViewer';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="wrap-viewer">
            <SidePanel />
            <CalendarViewer />
        </div>

      </div>
    );
  }
}

export default App;

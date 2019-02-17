import React, { Component } from 'react';
import Map from './SimpleMap'
import './App.css';
class App extends Component {
  render() {
    return (

        <div style={{ margin: '100px' }}>
            <Map
                google={this.props.google}
                center={{lat: 40.904146, lng: -73.132052}}
                height='400px'
                zoom={15}
            />
        </div>
    )
  }
}

export default App;

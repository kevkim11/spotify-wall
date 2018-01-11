import React, { Component } from 'react';
import ReactDom from 'react-dom'
import './App.css';
import Square from './components/Square.js'
import Nav from './components/Nav.js'
import RecentlyPlayed from './spotify-filter/RecentlyPlayed.js'
import TopTracks from './spotify-filter/TopTracks.js'
import TopArtists from './spotify-filter/TopArtists.js'


// Filter functions
/**
 * Filter Ideas
 * /v1/users/{user_id}/playlists/{playlist_id}
 * /v1/users/{user_id}/playlists/{playlist_id}/tracks
 * @param accessToken
 */

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentFilter: 1,
      accessToken: "",
      interval: null
    };
  }

  getTokens() {
    fetch('/api/spotify')
      .then(response => {
        if(!response.ok){
          console.log(response);
          throw Error("Request to /api/spotify failed")
        }
        return response
      })
      .then(response => {
        return response.json();
      })
      .then(token => {
        this.setState({ accessToken: token[0].accessToken})
      }).catch(function(error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
    });
  }

  componentDidMount() {
    this.getTokens();
    this.interval = setInterval(()=>this.getTokens(), 3500000);
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  updateScreen(newCurrentScreen) {
    this.setState({currentFilter: newCurrentScreen})
  }

  render() {
    var currentSpotifyFilter;
    if(this.state.currentFilter === 1){
      currentSpotifyFilter = <RecentlyPlayed accessToken={this.state.accessToken}/>
    }
    if(this.state.currentFilter === 2){
      currentSpotifyFilter = <TopTracks accessToken={this.state.accessToken}/>
    }
    if(this.state.currentFilter === 3){
      currentSpotifyFilter = <TopArtists accessToken={this.state.accessToken}/>
    }
    return (
      <div className="app">
        <div className="app-header">
          <div className='nav-header'>
          <h1>
            MY SPOTIFY WALL
          </h1>
          </div>
          <div className="app-nav">
            <div
              className={this.state.currentFilter === 1 ? "nav-item screen1 activeItem" : "nav-item screen1"}
              onClick={(e)=>{this.updateScreen(1)}}>
              <span>Recently Played</span>
            </div>
            <div
              className={this.state.currentFilter === 2 ? "nav-item screen2 activeItem" : "nav-item screen2"}
              onClick={(e)=>{this.updateScreen(2)}}>
              <span>Top Tracks</span>
            </div>
            <div
              className={this.state.currentFilter === 3 ? "nav-item screen3 activeItem" : "nav-item screen3"}
              onClick={(e)=>{this.updateScreen(3)}}>
              <span>Top Artists</span>
            </div>
          </div>
        </div>
        <div className="app-wrapper">
          <div className="main-content">
            {currentSpotifyFilter}
          </div>
        </div>
      </div>
    )
  }
}
export default App;

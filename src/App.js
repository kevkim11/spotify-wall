import React, { Component } from 'react';
import './App.css';
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
    this.handleFilterChange = this.handleFilterChange.bind(this)
  }

  handleFilterChange(newCurrentScreen) {
    this.setState({currentFilter: newCurrentScreen});
  }

  getTokens() {
    // TODO fetchURL = process.env.BACKEND_URL
    let fetchURL = 'https://my-spotify-api.herokuapp.com/api/spotify';
    fetch(fetchURL)
      .then(response => {
        if(!response.ok){
          // console.log(response);
          console.log("Hello there");
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

  render() {
    let currentSpotifyFilter;
    if(this.state.currentFilter === 1){
      currentSpotifyFilter = <RecentlyPlayed accessToken={this.state.accessToken}/>
    }
    if(this.state.currentFilter === 2){
      currentSpotifyFilter = <TopTracks accessToken={this.state.accessToken}/>
    }
    if(this.state.currentFilter === 3){
      currentSpotifyFilter = <TopArtists accessToken={this.state.accessToken}/>
    }
    if(this.state.requestFailed){return <p> {'Failed!'} </p>}
    if(!this.state.accessToken){return <p> {'LOADING'} </p>}
    return (
      <div className="app">
        <Nav
          currentFilter={this.state.currentFilter}
          handleFilterChange = {this.handleFilterChange}
        />
        <div className="app-wrapper">
          {currentSpotifyFilter}
          </div>
      </div>
    )
  }
}
export default App;

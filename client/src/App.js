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
      accessToken: ""
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
    this.getTokens()
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

// class Wall extends Component {
//   constructor(props) {
//     super(props);
//     // this.state = {
//     //   currentItemList: props.itemList,
//     // };
//     // let itemList = props.itemList
//     // this.numOfSquare = 30; //numOfAlbums to retrieve. Max=50
//     // this.time_range = 'short_term'
//   }
//
//   // componentDidMount(props) {
//   //   // Why fetch in componentDidMount --> https://daveceddia.com/where-fetch-data-componentwillmount-vs-componentdidmount/
//   //   // console.log('this.state', this.state);
//   //   var accessToken = 'BQAJktMR5guiXK0Da2GYZ5cEQvQhX3fVLiwQaymx90peOuT5dpqABNfIBs4ZpZw0ousMk26_ulkoQyr2Kr8j3BguL1Pvvofd3RbrWMP68C46eBRkfC-I_zOh5qPatVfog8Zd6b4Wqfba1hHWNxkF47HYa-4r4D9rsy8sbowpfdGA-cGrzLc&refresh_token=AQC3Cv2BAO1TqIyhSWQ6ojjqwH3hRxT-8URgsRzPXUf8E5pYqmFSBuH5EUFuPtb2M-KGenc-9pkcViKpGxKJDfiJ2S8mOUypVgCCS2tcCQtxvgEbQh7gYpJBER-ic4OJaxE';
//   //   // this.getUserSongs(accessToken)
//   //   // this.getUserAlbums(accessToken)
//   //   this.getUserTopTracks(accessToken)
//   // }
//
//   render() {
//     let itemNodes = this.props.itemList.map((item, i) => {
//       return (
//         <Square item={item} key={i}/>
//       )
//     });
//     if(this.props.itemList.length === 0){return <p> {'loading...'} </p>}
//     return (
//       <div className="flex-container wrap">
//         {itemNodes}
//       </div>
//     )
//   }
// }

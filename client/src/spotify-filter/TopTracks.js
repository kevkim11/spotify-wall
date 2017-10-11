import React, { Component } from 'react'
import Square from '../components/Square.js'
import accessToken from '../spotify-api/spotify-api.js'

import SpotifyWebApi from 'spotify-web-api-node'

class TopTracks extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentItemList: [],
      requestFailed: false
    };
    this.numOfSquare = 36
  }

  // componentWillMount() {
  //   var credentials = {
  //     clientId : 'someClientId',
  //     clientSecret : 'someClientSecret',
  //     redirectUri : 'http://www.michaelthelin.se/test-callback'
  //   };
  //
  //   var spotifyApi = new SpotifyWebApi(credentials);
  //
  //   // The code that's returned as a query parameter to the redirect URI
  //   var code = 'MQCbtKe23z7YzzS44KzZzZgjQa621hgSzHN';
  //
  // }

  componentDidMount() {
    // Global Variables
    const BASE_URL = 'https://api.spotify.com/v1/me/'; //https://api.spotify.com/v1/albums/
    const FETCH_URL = BASE_URL + 'top/tracks?limit=' + this.numOfSquare //+ '&time_range=' + this.time_range;
    var myOptions = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken
      },
      mode: 'cors',
      cache: 'default'
    };

    fetch(FETCH_URL, myOptions)
      .then(response => {
        if(!response.ok){
          throw Error("Request to Spotify failed")
        }
        return response
      })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        const songList = json.items;
        this.setState({currentItemList: songList});
      }, () => {
        this.setState({
          requestFailed: true
        })
      })
  }

  render() {
    let itemNodes = this.state.currentItemList.map((item, i) => {
      return (
        <Square item={item} key={i} id={i}/>
      )
    });
    if(this.state.requestFailed){return <p> {'Failed!'} </p>}
    if(this.state.currentItemList.length === 0){return <p> {'loading...'} </p>}
    return (
      <div className="flex-container wrap">
        {itemNodes}
      </div>
    )
  }
}

export default TopTracks;
import React, { Component } from 'react'
import Square from '../components/Square.js'

import accessToken from '../spotify-api/spotify-api.js'

var SpotifyWebApi = require('spotify-web-api-node');

// import SpotifyWebApi from 'spotify-web-api-node'


class RecentlyPlayed extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentItemList: [],
      requestFailed: false,
    };
    this.numOfSquare = 36;
  }

  // refreshToken() {
  //   console.log("inside refreshToken");
  //   const FETCH_URL = 'https://accounts.spotify.com/api/token'; //https://api.spotify.com/v1/albums/
  //   var myOptions = {
  //     method: 'POST',
  //     headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
  //     forms: {
  //       grant_type: 'refresh_token',
  //       refresh_token: this.state.refresh_token,
  //     }
  //     // json: true
  //   };
  //
  //   fetch(FETCH_URL, myOptions)
  //     .then(response => {
  //       if(!response.ok){
  //         console.log(response);
  //         throw Error("Request to Spotify failed")
  //       }
  //       // console.log(response);
  //       return response
  //     })
  //     .then(response => response.json())
  //     .then(json => {
  //       console.log(json);
  //       this.setState({accessToken: ""})
  //       // const songList = json.items;
  //       // this.setState({currentItemList: songList});
  //     })
  // }

  componentDidMount() {

    // Global Variables
    const BASE_URL = 'https://api.spotify.com/v1/me/'; //https://api.spotify.com/v1/albums/
    const FETCH_URL = BASE_URL + 'player/recently-played?limit=' + this.numOfSquare;
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
        // if(response.status===401) {
        //   // reset
        //   console.log("response is 401!!!!");
        // }
        if(!response.ok){
          console.log(response);
          throw Error("Request to Spotify failed")
          // this.refreshToken();
        }
        // console.log(response);
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
        <Square item={item.track} id={i} key={i}/>
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

export default RecentlyPlayed;
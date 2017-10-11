import React, { Component } from 'react'
import Square from '../components/Square.js'

// import accessToken from '../spotify-api/spotify-api.js'

// import SpotifyWebApi from 'spotify-web-api-node'


class RecentlyPlayed extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentItemList: [],
      requestFailed: false,
      accessToken: ""
    };
    this.numOfSquare = 36;
  }

  // getTokens() {
  //   fetch('/api/spotify')
  //   // .then(res => res.json())
  //     .then(response => {
  //       // if(response.status===401) {
  //       //   // reset
  //       //   console.log("response is 401!!!!");
  //       // }
  //       console.log(response);
  //       if(!response.ok){
  //         console.log(response);
  //         throw Error("Request to Spotify failed")
  //         // this.refreshToken();
  //       }
  //       // console.log(response);
  //       return response
  //     })
  //     .then(response => {
  //       // console.log(response.json());
  //       return response.json();
  //     })
  //     // .then(tokens => this.setState({ accessToken: tokens.access_token }));
  //     .then(token => {
  //       console.log(token[0].accessToken);
  //       this.setState({ accessToken: token[0].accessToken})
  //     });
  // }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    this.setState({accessToken: nextProps.accessToken});
    console.log("!@#@$!@#!@!#@!@#!@");
    console.log(nextProps.accessToken);
    // Global Variables
    const BASE_URL = 'https://api.spotify.com/v1/me/'; //https://api.spotify.com/v1/albums/
    const FETCH_URL = BASE_URL + 'player/recently-played?limit=' + this.numOfSquare;
    var myOptions = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + nextProps.accessToken
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

  // componentDidMount() {
  //   console.log("@@@@@@@@@@@@@@@@@");
  //   console.log(this.state.accessToken);
  //   // Global Variables
  //   const BASE_URL = 'https://api.spotify.com/v1/me/'; //https://api.spotify.com/v1/albums/
  //   const FETCH_URL = BASE_URL + 'player/recently-played?limit=' + this.numOfSquare;
  //   var myOptions = {
  //     method: 'GET',
  //     headers: {
  //       'Authorization': 'Bearer ' + this.state.accessToken
  //     },
  //     mode: 'cors',
  //     cache: 'default'
  //   };
  //
  //   fetch(FETCH_URL, myOptions)
  //     .then(response => {
  //       // if(response.status===401) {
  //       //   // reset
  //       //   console.log("response is 401!!!!");
  //       // }
  //       if(!response.ok){
  //         console.log(response);
  //         throw Error("Request to Spotify failed")
  //         // this.refreshToken();
  //       }
  //       // console.log(response);
  //       return response
  //     })
  //     .then(response => response.json())
  //     .then(json => {
  //       console.log(json);
  //       const songList = json.items;
  //       this.setState({currentItemList: songList});
  //     }, () => {
  //       this.setState({
  //         requestFailed: true
  //       })
  //     })
  // }

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
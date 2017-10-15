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

  componentWillReceiveProps(nextProps) {
    // 1) Set state to nextProps.accessToken. State passed down from App
    this.setState({accessToken: nextProps.accessToken});

    // 2) GET recently-played using fetch
    const BASE_URL = 'https://api.spotify.com/v1/me/'; //https://api.spotify.com/v1/albums/
    const FETCH_URL = BASE_URL + `player/recently-played?limit=${this.numOfSquare}`;
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
        if(!response.ok){
          console.log(response);
          throw Error("Request to Spotify failed")
        }
        return response
      })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        const songList = json.items;
        this.setState({currentItemList: songList});
        this.setState({requestFailed: false})
      }, () => {
        this.setState({
          requestFailed: true
        })
      })
  }

  componentDidMount() {
    // Global Variables
    const BASE_URL = 'https://api.spotify.com/v1/me/'; //https://api.spotify.com/v1/albums/
    const FETCH_URL = BASE_URL + `player/recently-played?limit=${this.numOfSquare}`;
    var myOptions = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + this.props.accessToken
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
        this.setState({requestFailed: false})
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
    if(this.state.currentItemList.length === 0){return <p> {'loading...1'} </p>}
    return (
      <div className="flex-container wrap">
        {itemNodes}
      </div>
    )
  }
}

export default RecentlyPlayed;
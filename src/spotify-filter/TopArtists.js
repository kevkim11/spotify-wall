import React, { Component } from 'react'
import Table from "../components/Table";

class TopArtists extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentItemList: [],
      requestFailed: false
    };
    this.numOfSquare = 50;
    this.time_range = 'long_term'; // can be short_term, medium_term, long_term (default is medium_term)
  }

  componentDidMount() {
    // Global Variables
    const BASE_URL = 'https://api.spotify.com/v1/me/'; //https://api.spotify.com/v1/albums/
    const FETCH_URL = BASE_URL + `top/artists?limit=${this.numOfSquare}&time_range=${this.time_range}`;
    let myOptions = {
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
        const songList = json.items;
        this.setState({currentItemList: songList});
        this.setState({requestFailed: false});
      }, () => {
        this.setState({
          requestFailed: true
        })
      })
  }

  render() {
    return(<Table
      currentItemList={this.state.currentItemList}
      currentFilter={3}
    />)
  }
}

export default TopArtists;
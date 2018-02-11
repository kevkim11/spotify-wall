import React, { Component } from 'react'
import Table from "../components/Table";
import Tablelist from "../components/List";

class RecentlyPlayed extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentItemList: [],
      requestFailed: false,
    };
    this.numOfSquare = 50;
  }

  fetchData() {
    // Global Variables
    const BASE_URL = 'https://api.spotify.com/v1/me/'; //https://api.spotify.com/v1/albums/
    const FETCH_URL = BASE_URL + `player/recently-played?limit=${this.numOfSquare}`;;
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
        this.setState({requestFailed: false})
      })
      .catch((e)=>{
        console.log(e)
      })
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    // return(<Table
            {/*currentItemList={this.state.currentItemList}*/}
            {/*currentFilter={1}*/}
          {/*/>)*/}
    return(<Tablelist
      currentItemList={this.state.currentItemList}
      currentFilter={1}
    />)
  }
}

export default RecentlyPlayed;
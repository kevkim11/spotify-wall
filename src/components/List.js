import React, { Component } from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

function createArtistsName(props){
  /*
    Helper Function for
    getUsersTopTracks
   */
  let artistsName = "";
  if(props['artists'].length > 1) {
    props['artists'].forEach((artist)=>{
      artistsName += (artist.name + ', ')
    });
    artistsName = artistsName.replace(/,\s*$/, "");
  } else {
    artistsName = props.artists[0].name
  }
  return artistsName
}

function createSongName(props){
  return props.name
}

class Tablelist extends Component {
  render(){
    const columns = [{
      Header: 'Name',
      accessor: 'name' // String-based value accessors!
    }, {
      Header: 'Artists',
      accessor: 'artist',
      // Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
    }];
    // let data = this.props.currentItemList.map((item, i) =>{
    //   let artistsName = createArtistsName(item);
    //   let songName = createSongName(item);
    //   return {'name': songName, 'artist': artistsName}
    // });
    // let table;
    let data;
    if(this.props.currentFilter === 1){
      data = this.props.currentItemList.map((item, i) =>{
        let artistsName = createArtistsName(item.track);
        let songName = createSongName(item.track);
        return {'name': songName, 'artist': artistsName}
      });
    } else if(this.props.currentFilter === 2) {
      data = this.props.currentItemList.map((item, i) =>{
        let artistsName = createArtistsName(item);
        let songName = createSongName(item);
        return {'name': songName, 'artist': artistsName}
      });
    }
    // else if(this.props.currentFilter === 3) {
    //     return
    // }
    if(this.props.currentItemList.length === 0 || this.props.currentItemList.length === null){return <p> {'loading...'} </p>}
    return(
      <div className="flex-container wrap">
        <ReactTable
          data={data}
          columns={columns}
          style={{
            // width: '100%',
            // height: '100%',
            backgroundColor: 'red',
            Color: 'white',
            // borderRadius: '2px'
          }}
          defaultPageSize={50}
        />
      </div>
    )
  }

}

export default Tablelist;
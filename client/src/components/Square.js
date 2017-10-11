import React, { Component } from 'react'

function createArtistsName(props){
  /*
    Helper Function for
    getUsersTopTracks
   */
  let artistsName = "";
  if(props.item.artists.length > 1) {
    props.item.artists.map((artist)=>{
      artistsName += (artist.name + ', ')
    });
    artistsName = artistsName.replace(/,\s*$/, "");
  } else {
    artistsName = props.item.artists[0].name
  }
  return artistsName
}

function createSongName(props){
  /*
    Helper Function for
    getUsersTopTracks
   */
  return props.item.name
}

function createImgUrl(props) {
  return props.item.album.images[1].url
}


function Square(props) {
  /* Square will only show tracks/albums*/
  let artistsName = createArtistsName(props);
  let songName = createSongName(props);
  let imgUrl = createImgUrl(props);

  return (
    <div className="flex-square">
      <img className="track-img" src={imgUrl} alt=""/>
      <div className="overlay">
        <div className="text">{props.id +1}) {songName} - {artistsName}</div>
        {/*<div className="text">songName: </div>*/}
      </div>
    </div>
  );
}


export default Square;
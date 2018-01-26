import React from 'react'

function createArtistsName(props){
  /*
    Helper Function for
    getUsersTopTracks
   */
  let artistsName = "";
  if(props.item['artists'].length > 1) {
    props.item['artists'].forEach((artist)=>{
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

function createSongURL(props) {
  return props.item.external_urls.spotify
}


function Square(props) {
  /* Square will only show tracks/albums*/
  let artistsName = createArtistsName(props);
  let songName = createSongName(props);
  let imgUrl = createImgUrl(props);
  let songURL = createSongURL(props);

  return (
    <div className="flex-square">
      <a target="_blank" href={songURL}>
      <img className="track-img" src={imgUrl} alt=""/>
      <div className="overlay">
        <div className="text">
          {/*<span className="track-index">{props.id +1})</span>*/}
          <span className="track-name">{songName} </span>
          <span className="artist-name">{artistsName} </span>
          </div>
        {/*<div className="text">songName: </div>*/}
      </div>
      </a>
    </div>
  );
}


export default Square;
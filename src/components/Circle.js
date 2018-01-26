import React from 'react'

function createArtistsName(props){
  return props.item.name
}

function createImgUrl(props) {
  return props.item.images[0].url
}

function Circle(props) {
  /* Circle will only show artists*/
  let artistsName = createArtistsName(props);
  let imgUrl = createImgUrl(props);

  return (
    <div className="flex-square">
      <img
        // className={this.width/this.height > 1 ? "artist-img-wide" : "artist-img-tall"}
        className={"artist-img-wide"}
        src={imgUrl} alt=""/>
      <div className="overlay">
        <div className="text">{artistsName}</div>
        {/*<div className="text">songName: </div>*/}
      </div>
    </div>
  );
}


export default Circle;
import React, { Component } from 'react'

let navArray = ['Recently Played', 'Top Tracks', 'Top Artists'];

class Nav extends Component {

  render(){

    let nav = navArray.map((item, i) =>{
      let id = i + 1;
      return (
        <div
          id={id}
          key={item}
          className={this.props.currentFilter === id ? `nav-item screen${id} activeItem` : `nav-item screen${id}`}
          onClick={()=>this.props.handleFilterChange(id)}>
          <span>{item}</span>
        </div>
      )
    });

    return(
      <div className="app-header">
        <div className='nav-header'>
          <h1>
            MY SPOTIFY WALL
          </h1>
        </div>
        <div className="app-nav">
          {nav}
        </div>
      </div>
    )
  }
}

export default Nav;
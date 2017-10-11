import React, { Component } from 'react'

class Nav extends Component {
  constructor(props){
    super(props)

  }

  render(){
    return(
      <div className="app-nav">
        <div
          className={this.state.currentFilter === 1 ? "nav-item screen1 activeItem" : "nav-item screen1"}
          onClick={(e)=>{this.updateScreen(1)}}>
          <p>Recently Played</p>
        </div>
        <div
          className={this.state.currentFilter === 2 ? "nav-item screen2 activeItem" : "nav-item screen2"}
          onClick={(e)=>{this.updateScreen(2)}}>
          <p>Top Tracks</p>
        </div>
        <div
          className={this.state.currentFilter === 3 ? "nav-item screen3 activeItem" : "nav-item screen3"}
          onClick={(e)=>{this.updateScreen(3)}}>
          <p>Top Artists</p>
        </div>
      </div>
    )
  }
}

export default Nav;
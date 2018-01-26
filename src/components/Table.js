import React, { Component } from 'react'
import Square from './Square.js'
import Circle from './Circle.js'


class Table extends Component {

  render() {
    let table;
    if(this.props.currentFilter === 1){
      table = this.props.currentItemList.map((item, i) =>{
        return (<Square item={item.track} id={i} key={i}/>)
      });
    } else if(this.props.currentFilter === 2) {
      table = this.props.currentItemList.map((item, i) =>{
        return (<Square item={item} id={i} key={i}/>)
      });
    } else if(this.props.currentFilter === 3) {
      table = this.props.currentItemList.map((item, i) => {
        return (<Circle item={item} key={i} id={i}/>)
      });
    }
    if(this.props.currentItemList.length === 0 || this.props.currentItemList.length === null){return <p> {'loading...'} </p>}
    return (
      <div className="flex-container wrap">
        {table}
      </div>
    )
  }
}

export default Table;

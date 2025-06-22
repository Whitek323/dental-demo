import React, { Component } from 'react'
import Menubar from '../../layout/Menubar'
import "./MenuPage.css"
import Navbar from '../../layout/Navbar'
export default class MenuPage extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <div className="d-flex flex-wrap py-3 justify-content-center overflow-auto" style={{backgroundColor:"#34323641",maxHeight:"80vh"}}>
          <img className="game-card" src="game_menu/1.jpg"/>  
          <img className="game-card" src="game_menu/2.png"/>  
          <img className="game-card" src="game_menu/3.png"/>  
          <img className="game-card" src="game_menu/4.png"/>  
          <img className="game-card" src="game_menu/5.png"/>  
        </div>
        <Menubar/>
      </div>
    )
  }
}

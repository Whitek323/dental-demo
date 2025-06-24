import React, { Component } from 'react'
import Menubar from '../../layout/Menubar'
import "./MenuPage.css"
import Navbar from '../../layout/Navbar'

class MenuPage extends Component {
  
  render() {
    return (
      <div>
        <Navbar/>
        <div className="" style={{backgroundColor:"#34323641",height:"100vh",paddingTop:"100px"}}>
          <div className="d-flex flex-wrap py-3 justify-content-center overflow-auto" style={{maxHeight:"80vh"}}>
            <img onClick={()=> window.location.href = "/bacteriadefender"} className="game-card" src="game_menu/1.jpg"/>  
            <img className="game-card" src="game_menu/2.png"/>  
            <img className="game-card" src="game_menu/3.png"/>  
            <img className="game-card" src="game_menu/4.png"/>  
            <img className="game-card" src="game_menu/5.png"/>  
          </div>
        </div>
        <Menubar/>
      </div>
    )
  }
}
export default MenuPage
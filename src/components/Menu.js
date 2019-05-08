import React, {  
  Component,
} from 'react';
import '.././css/Menu.css';
import {
  saveMenu,
} from '.././actions/menuAction';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

export class Menu extends Component {
  constructor(props){
    super(props);
    this.state = {
      
    };
    this.openMenu = this.openMenu.bind(this);
    this.sendDataToParent = this.sendDataToParent.bind(this);
  }

  openMenu(){
    if(document.getElementById("menuContent")){
      if(!document.getElementById("menuContent").style.left || document.getElementById("menuContent").style.left === "-300px"){
        document.getElementById("menuContent").style.left = "0px";
        document.getElementById("main").style.marginLeft = "300px";
        document.getElementById("menuEvent").style.display = "none";
        document.getElementById("menuClose").style.display = "block";
        setTimeout(function(){
          document.getElementById("overlay").style.display = "block";
        },400);
      } else{
        document.getElementById("menuContent").style.left = "-300px";
        document.getElementById("main").style.marginLeft = "0px";
        document.getElementById("menuEvent").style.display = "block";
        document.getElementById("menuEvent").style.display = "block";
        document.getElementById("menuClose").style.display = "none";
        document.getElementById("overlay").style.display = "none";
      }
    }
  }

  sendDataToParent(){
    const abc = "qwerty";
    this.props.callBackToParent(abc);
    this.props.saveMenu({"abcd":"efghijklm"});
  }

  render() {
    return (
      <div>
        <div id="menuEvent" onClick={this.openMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div id="menuContent">
          <div id="menuClose" onClick={this.openMenu}>
            X
          </div>
          <nav>
            <ul>
              {this.props.Categories ? this.props.Categories.map(user => <li key={user.id}>{user.name}</li>) : null}
            </ul>
          </nav>
        </div>
        <div id="overlay" onClick={this.openMenu}></div>
        {/*<button onClick={this.sendDataToParent}>Pass data to parent from child</button>*/}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({  
  menu: state.list,
});

const mapDispatchToProps = { 
  saveMenu,
};

const Container = withRouter(connect(  
  mapStateToProps,
  mapDispatchToProps
)(Menu));

export default Container;
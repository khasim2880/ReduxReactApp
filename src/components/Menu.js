import React, {  
  Component,
} from 'react';
import '.././css/Menu.css';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import { getCategoriesEvent } from '../actions/categoryAction';
import { connect } from 'react-redux';

export class Menu extends Component {
  constructor(props){
    super(props);
    this.state = {
      categories: []
    };
    this.openMenu = this.openMenu.bind(this);
    this.sendDataToParent = this.sendDataToParent.bind(this);
  }

  componentDidMount() {
    return new Promise(resolve => {
      axios.get(global.config.apiUrl+'/categories')
        .then(res => {
          const categories = res.data;
          this.setState({ categories });
          this.props.getCategoriesEvent({categories});
          resolve(true);
        }).catch(err => {
          resolve(false);
          window.location.assign("/login");
        });
    });
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

  goToProducts = () => {
    this.openMenu();
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
              {this.state.categories ? this.state.categories.map(category => (<li key={category.id} onClick={()=>{this.goToProducts()}}><Link to={'/plp/'+category.id}>{category.name}</Link></li>)) : null}
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
  ...state.categories,
});

const mapDispatchToProps = { 
  getCategoriesEvent,
};

const childContainer = withRouter(connect(  
  mapStateToProps,
  mapDispatchToProps
)(Menu));

export default childContainer;
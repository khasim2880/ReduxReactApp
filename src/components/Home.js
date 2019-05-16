import React, {  
  Component,
} from 'react';
import axios from 'axios';

export class Home extends Component {
  constructor(props){
    super(props);
    this.state = {users: []};
  }

  componentDidMount(){
    this.getAllUsers();
  }

  getAllUsers = () => {
    axios.get("http://localhost:1330/users").then((res) => {
      console.log('home data-->'+res.data);
      this.setState({users: res.data});
    }).catch((err) => {
      this.props.history.push('login');
    });
  }

  render() {
    return this.state.users.length > 0 && (
      <div>
        {
          this.state.users.map((obj, key)=>{
            return <p key={key}>{obj.username}</p>;
          })
        }  
      </div>
    );
  }
}

export default Home;  
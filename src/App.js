import React, {  
  Component,
} from 'react';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
    this.handleClick = this.handleClick.bind(this);    
  }

  handleClick() {
    this.setState(prevState => ({
      count: prevState.count + 1
    }));
  };

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button className="increment" onClick={this.handleClick}>
          Increment
        </button>
      </div>
    );
  }
}

export default App;  
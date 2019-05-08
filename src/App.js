import React, {  
  Component,
} from 'react';

// App.js
export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    alert();
  };

  render() {
    return (
      <div>
        <h1>{this.props.geod.title || 'Hello World!'}</h1>
        
        {this.props.geod.title ?
          <button onClick={this.props.closeGeod}>
            Exit Geod
          </button> :
          <button onClick={() => this.props.activateGeod({ title: 'I am a geo dude!' })}>
            Click Me!
          </button>
       }
       <button onClick={this.handleClick}>
        Get State!
      </button>
      </div>
    );
  }
}
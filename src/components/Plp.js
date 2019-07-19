import React, {  
  Component,
} from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col } from 'reactstrap';
import logo from '../images/logo.png';
import '.././css/Plp.css';
import {
  getProductsEvent,
} from '.././actions/plpAction';

class Plp extends Component {
  constructor(props){
    super(props);
    this.state = {products: []};
  }

  componentDidMount(){
    this.getProducts();
  }

  getProducts = () => {
    const { match: { params } } = this.props;
    axios.post(global.config.apiUrl + "/products", {category: params.catId}).then((res) => {
      const products = res.data;
      this.setState({products});
      this.props.getProductsEvent({products});
    }).catch((err) => {
      window.location.assign("/login");      
      //this.props.history.push('login');
    });
  }

  render() {
    return (
      <Container>
        <Row>
          {this.state.products.length > 0 && this.state.products.map((obj, key)=>(
            <Col key={obj._id} xs="6" sm="4" lg="3">
              <Link to={'/pdp/'+obj.id}><img alt="gem" id="productImage" src={logo} /></Link>
            </Col>
          ))
        }
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({  
  ...state.products,
});

const mapDispatchToProps = { 
  getProductsEvent,
};

const childContainer = withRouter(connect(  
  mapStateToProps,
  mapDispatchToProps
)(Plp));

export default childContainer;  
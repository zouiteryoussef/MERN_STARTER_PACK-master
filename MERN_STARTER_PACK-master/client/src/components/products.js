import React, { Component } from 'react';
import './products.css';
import axios from 'axios';
import { Link } from "react-router-dom";

import {
  Grid,
  Row,
  Col,
  Well,
  Panel,
  Form,
  FormControl,
  FormGroup,
  ControlLabel,
  Button,Thumbnail
} from "react-bootstrap";
class Products extends Component {
  constructor() {
    super();
    this.state = {
      products: null,
      titleVal: '',
      descriptionVal: '',
      imageURLVal:'',
      priceVal:''
    };
    this.addproduct = this.addproduct.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentWillMount() {
    fetch('/api/products')
      .then(res => {
        console.log(res);
        return res.json();
      })
      .then(products => this.setState({ products }));
  }
  addproduct() {
    axios.post('/api/products', {
      "title": this.state.titleVal,
      "description": this.state.descriptionVal,
      "imageURL":this.state.imageURLVal,
      "price":this.state.priceVal
    })
      .then(result => {
        const updatedproducts = this.state.products.concat(result.data.createdArticle);
        this.setState({
          products: updatedproducts,
          titleVal: '',
          descriptionVal: '',
          imageURLVal:'',
          priceVal:''
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  handleChange(e) {
    let value = e.target.value;
    if (e.target.id === 'title') {
      this.setState({
        titleVal: value
      });
    } else if(e.target.id === 'imageURL'){
      this.setState({
        imageURLVal:value
      });
    }
    else if(e.target.id === 'price'){
      this.setState({
        priceVal: value
      });
    }
    else {
      this.setState({
        descriptionVal: value
      });
    }
  }
  handleDelete(e) {
    let id = e.target.parentNode.id;
    axios({
      method: 'delete',
      url: `/api/products/${id}`
    })
      .then(result => {
        let index;
        let updatedproducts = this.state.products;
        for (let i = 0; i < this.state.products.length; i++) {
          if (this.state.products[i]._id === id) {
            index = i;
          }
        }
        updatedproducts.splice(index, 1);
        this.setState({
          products: updatedproducts
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <Grid>

        <Row className="show-grid">
          <Col>
            <Well>
              <Panel id="productsAddFormPanel">
                <Form>
                  <FormGroup
                    controlId="title"
                  // validation={this.props.validation}
                  >
                    <ControlLabel>Title</ControlLabel>
                    <FormControl
                      type="text"
                      id='title'
                      value={this.state.titleVal}
                      onChange={this.handleChange}
                      name="title"
                      placeholder="Title"
                    />
                  </FormGroup>
                  <FormGroup
                    controlId="title"
                  // validation={this.props.validation}
                  >
                    <ControlLabel>ImageUrl</ControlLabel>
                    <FormControl
                      type="text"
                      id='imageURL'
                      value={this.state.imageURLVal}
                      onChange={this.handleChange}
                      name="imageURL"
                      placeholder="imageURL"
                    />
                  </FormGroup>
                  <FormGroup
                    controlId="description"
                  // validation={this.props.validation}
                  >
                    <ControlLabel>Description</ControlLabel>
                    <FormControl
                      type="text"
                      id='description'
                      value={this.state.descriptionVal}
                      onChange={this.handleChange}
                      name="description"
                      placeholder="Description"
                    />
                  </FormGroup>
                  <FormGroup
                    controlId="description"
                  // validation={this.props.validation}
                  >
                    <ControlLabel>Price</ControlLabel>
                    <FormControl
                      type="text"
                      id='price'
                      value={this.state.priceVal}
                      onChange={this.handleChange}
                      name="price"
                      placeholder="Price"
                    />
                  </FormGroup>
                  <Button bsStyle="success" onClick={this.addproduct}>
                    Save Product
                  </Button>
                  </Form>
              </Panel>
            </Well>
          </Col>
        </Row>
        <div id='content'>
          {
            this.state.products ? 
              <ul><h1>hello</h1>
              {
                this.state.products.map(product => 
                  
                  <Col xs={12} sm={6} md={4} lg={3}  id="productItemCol">
                  <Thumbnail src={product.imageURL} alt="242x200">
                    <div>
                      <h6>
                        <b>{product.title}</b>
                      </h6>
                    </div>
                    <br />
                   
                    </Thumbnail>
                    </Col>
      )
              }
              </ul>
            : <p id='loading'>LOADING...</p>
          }
        </div>
     
      </Grid>

    );
  }
}

export default Products;

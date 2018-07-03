import React, { Component } from 'react';
import CartPage from './CartPage';
import Nav from './Nav';
import './App.css';
import ItemPage from './ItemPage';
import { items } from './static-data';

class App extends Component {
  state = {
    activeTab: 0,
    cart: [],
    total: 0
  };

  handleTabChange = (index) => {
    this.setState({
      activeTab: index
    })
  }

  handleAddToCart = (item) => {
    this.setState({
      cart:[...this.state.cart, item.id],
      total: this.state.total + item.price
    });
  }

  handleRemoveOne = (item) => {
    let index = this.state.cart.indexOf(item.id);
    this.setState({
      cart: [
        ...this.state.cart.slice(0, index),
        ...this.state.cart.slice(index + 1)
      ],
      total: this.state.total - item.price
    })
  }

  renderContent() {
      switch (this.state.activeTab) {
        default:
        case 0:return (
          <ItemPage 
            items={items}
            onAddToCart={this.handleAddToCart}
          />
        ) 
        case 1: return this.renderCart();  
      }
  }

  renderCart(){
    //Count how many of each item is in the cart
    let itemCounts = this.state.cart.reduce((itemCounts, itemId) => {
      itemCounts[itemId] = itemCounts[itemId] || 0;
      itemCounts[itemId]++;
      return itemCounts;
    },{});

    //create an array of items
    let cartItems = Object.keys(itemCounts).map(itemId => {
      //find item by id
      var item = items.find(item => 
      item.id === parseInt(itemId, 10)
    );
    //create a new "item" that also has a'count' propperty
    return{
      ...item,
      count: itemCounts[itemId]
    }
    });

    return(
      <CartPage
        items = {cartItems}
        onAddOne = {this.handleAddToCart}
        onRemoveOne = {this.handleRemoveOne} 
      />
    );
  }


  render() {
    let {activeTab} = this.state;

    return (
      <div className="App">
      
        <Nav 
          activeTab = {activeTab} 
          onTabChange={this.handleTabChange} 
          total={this.state.total}
          cartLength = {this.state.cart.length}
        />

        
        <main className="App-content">
          {this.renderContent()}
        </main>
      </div>
    );
  }
}
export default App;

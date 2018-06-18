import React, { Component } from 'react';
import './App.css';
import Card from "./components/Card";
import cards from "./cards.json";

class App extends Component {
  state = {
    score: 0,
    cards: cards,
  }

  componentDidMount() {
    this.start();
  }

  //to begin set score to 0 and all cards.clicked to false
  start = () => {
    this.setState({score:0});
  
    this.state.cards.forEach((card) => {
      card.clicked = false;
    });

    this.setState({cards: cards});

    this.shuffle();
  }

  //display cards in a random order
  shuffle = () => {
    let unshuffled = this.state.cards;
    let shuffled = [];
  

   while (unshuffled.length > 0) {
   let selected = Math.floor(Math.random() * unshuffled.length);
   shuffled.push(unshuffled[selected]);
   unshuffled.splice(selected, 1);
   }

   this.setState({cards: shuffled});
  }

  handleClick = (event) => {
    let alreadyClicked = JSON.parse(event.target.getAttribute("data-clicked"));
    console.log(typeof alreadyClicked);
    console.log("id = " + event.target.getAttribute("id"));

    if (alreadyClicked) {
      //display some sort of message...
      console.log("already clickd");
      // this.start();
    }
    else {

      console.log("not clicked");
     let id = event.target.getAttribute("id");
     let update = this.state.cards.filter(card => card.id === id);
    console.log(update); //NOT WORKING
    
    this.setState({score: this.state.score + 1, cards: update});
    console.log(this.state);

    }
   
    //if clicked then restart game score = 0
    //if not clicked, up score and set to clicked
    //after processing, then either do display or start
  }




  render() {
    return (
  
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Score: {this.state.score}</h1>
        </header>
        {this.state.cards.map((card) => (
            <Card
              id={card.id}
              key={card.id}
              image={card.image}
              clicked={card.clicked}
              onClick={this.handleClick}
            />
        ))}
      </div>
    );
  }
}

export default App;

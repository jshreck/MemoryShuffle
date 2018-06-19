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
    this.setState({ score: 0 });

    this.state.cards.forEach((card) => {
      card.clicked = false;
    });

    this.setState({ cards: cards });

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

    this.setState({ cards: shuffled });
  }

  handleClick = (event) => {
    //capture data-clicked of the clicked item
    let alreadyClicked = JSON.parse(event.target.getAttribute("data-clicked"));

    //if already clicked, start game over (ideally would display a message too)
    if (alreadyClicked) {
      this.start();
    }
    //else add a point to score and then shuffle images
    else {
      //capturing id of what's clicked to filter for the object, update the object
      let id = parseInt(event.target.getAttribute("id"), 10);
      let update = this.state.cards.filter(card => card.id === id);
      update[0].clicked = true;

      this.setState({ score: this.state.score + 1, cards: update });
      this.shuffle();

    }
  }

  render() {
    return (

      <div className="App">
        <header className="App-header">
          <h1>The Many Faces of Winston</h1>
          <h3>Score: {this.state.score}</h3>
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

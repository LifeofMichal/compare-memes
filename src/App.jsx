import React, { Component } from "react";
import "./App.css";
import Header from "./Header";
import MemeGenerator from "./MemeGen/MemeGenerator";

class App extends Component {
  constructor() {
    super();
    this.state = {
      url: "https://api.imgflip.com/get_memes",
      loading: true,
      allMemeImgs: [],
    };
  }

  render() {
    return (
      <div className="App">
        <Header />
        <MemeGenerator index={0} url={this.state.url} />
        <MemeGenerator index={1} url={this.state.url} />
        <MemeGenerator index={2} url={this.state.url} />
      </div>
    );
  }
}

export default App;

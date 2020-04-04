import React, { Component } from 'react'
import './App.css'
import Header from "./Header"
import Loading from "./Loading"
import MemeGenerator from "./MemeGen/MemeGenerator"
import { TwitterFollowButton } from 'react-twitter-embed';

class App extends Component {
    constructor() {
        super()
        this.state = {
            url: "https://api.imgflip.com/get_memes",
            loading: true,
            allMemeImgs: null
        }
    }

    componentDidMount() {

        fetch(this.state.url)
            .then(response => response.json())
            .then(response => {

                this.setState({
                    loading: false,
                    allMemeImgs: response.data.memes,
                })
            })
            .catch(function (error) {
                console.log("Failure")
                console.log(error)
            })
    }

    render() {
        return (
            <div className="App" >
                <Header />
                {this.state.loading
                    ? <Loading />
                    : <>
                        <MemeGenerator index={0} memes={this.state.allMemeImgs} />
                        <MemeGenerator index={1} memes={this.state.allMemeImgs} />
                        <MemeGenerator index={2} memes={this.state.allMemeImgs} />
                    </>
                }
                <TwitterFollowButton
                    screenName={'LifeofMichal'}
                />
            </div>
        );
    }
}

export default App;
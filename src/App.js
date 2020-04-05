import React, { Component } from 'react'
import { connect } from "react-redux"
import { fetchMemes, isNotLoading } from "./redux/memeList"
import { TwitterFollowButton } from 'react-twitter-embed';

import './App.css'
import Header from "./Header"
import Loading from "./Loading"
import MemeGenerator from "./MemeGen/MemeGenerator"

class App extends Component {

    componentDidMount() {
        this.props.fetchMemes()
    }

    render() {
        const { loading, memeList } = this.props.memeList
        const { memeGenerators } = this.props
        return (
            <div className="App" >
                <Header />
                {loading
                    ? <Loading />
                    : <>
                        {
                            memeGenerators.map((generator) => (
                                <div key={generator.id} className="memeGen">
                                    <MemeGenerator index={generator.id} memes={memeList} />
                                </div>
                            ))
                        }
                    </>
                }
                <TwitterFollowButton
                    screenName={'LifeofMichal'}
                />
            </div>
        )
    }
}

// function mapStateToProps({ memeList, memeGenerators }) {
//     return {
//         memeList: memeList,
//         memeGenerators: memeGenerators
//     }
// }

// const mapDispatchToProps = {
//     isLoading: isLoading,
//     isNotLoading: isNotLoading,
//     fetchMemes: fetchMemes
// }

export default connect(state =>
    ({ memeList: state.memeList, memeGenerators: state.memeGenerators }),
    { isNotLoading, fetchMemes })(App)
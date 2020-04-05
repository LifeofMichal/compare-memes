import React, { Component } from "react"
import { connect } from "react-redux"
import {
    updateSelectedMeme,
    updateTopText,
    updateBottomText,
    updateSearchQuote,
    updateFilteredMemesList
} from "../redux/memeGenerators"
import Form from "./Form"
import Search from "./Search"
import Select from "./Select"
import Display from "./Display"

class MemeGenerator extends Component {

    componentDidMount() {
        const {
            index,
            memes,
            updateTopText,
            updateSelectedMeme,
            updateFilteredMemesList
        } = this.props
        updateTopText(index, memes[index].name)
        updateSelectedMeme(index, memes[index])
        updateFilteredMemesList(index, memes)
    }

    handleChange = (event) => {
        const { name, value } = event.target
        const {
            index,
            memes,
            updateTopText,
            updateBottomText,
            updateSearchQuote,
            updateSelectedMeme,
            updateFilteredMemesList
        } = this.props

        const { filteredMemeList } = this.props.memeGenerators[index]

        if (name === "searchQuote") {
            updateSearchQuote(index, value)
            const filteredAMIs =
                memes.filter((element) => (
                    element.name.toLowerCase().includes(value.toLowerCase())
                ))
            if (filteredAMIs.length) {
                updateFilteredMemesList(index, filteredAMIs)
                updateSelectedMeme(index, filteredAMIs[0])
                updateTopText(index, filteredAMIs[0].name)
            } else {
                updateFilteredMemesList(index, [])
                updateTopText(index, "")
            }
        } else if (name === "randomImg") {
            const randomMeme = filteredMemeList[
                Math.floor(Math.random() * filteredMemeList.length
                )]
            updateSelectedMeme(index, randomMeme)
            updateTopText(index, randomMeme.name)
        } else if (name === "selectedMeme") {
            const pickedMeme = filteredMemeList.find(element => element.url === value)
            updateSelectedMeme(index, pickedMeme)
            updateTopText(index, pickedMeme.name)
        } else if (name === "topText") {
            updateTopText(index, value)
        } else if (name === "bottomText") {
            updateBottomText(index, value)
        }
    }

    render() {
        const {
            topText,
            bottomText,
            selectedMeme,
            filteredMemeList,
            searchQuote
        } = this.props.memeGenerators[this.props.index]
        const { index } = this.props

        return (

            <>
                <Form
                    index={index}
                    topText={topText}
                    bottomText={bottomText}
                    numberOfMemes={filteredMemeList.length}
                    handleChange={this.handleChange} />

                <Search
                    searchQuote={searchQuote}
                    handleChange={this.handleChange} />

                <Select
                    randomImg={selectedMeme.url}
                    filteredMemes={filteredMemeList}
                    searchQuote={searchQuote}
                    handleChange={this.handleChange} />

                <Display topText={topText} bottomText={bottomText} randomImg={selectedMeme.url} />
                {
                    Object.entries(selectedMeme).map((entry) =>
                        <p className="meme borderRed" key={entry[0]}>
                            <span className="firstToUpper"><b>{entry[0]}: </b>
                                {
                                    entry[1].toString().substring(0, 4) === "http"
                                        ? <a href={entry[1]}>{entry[1]}</a>
                                        : entry[1]
                                }
                            </span>
                        </p>
                    )
                }
            </>
        )
    }
}

function mapStateToProps({ memeGenerators }) {
    return {
        memeGenerators: memeGenerators
    }
}

const mapDispatchToProps = {
    updateTopText: updateTopText,
    updateBottomText: updateBottomText,
    updateSearchQuote: updateSearchQuote,
    updateSelectedMeme: updateSelectedMeme,
    updateFilteredMemesList: updateFilteredMemesList
}

export default connect(mapStateToProps, mapDispatchToProps)(MemeGenerator)
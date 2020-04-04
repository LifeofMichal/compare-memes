import React, { Component } from "react"
import Form from "./Form"
import Search from "./Search"
import Select from "./Select"
import Display from "./Display"

class MemeGenerator extends Component {
    constructor(props) {
        super()
        this.state = {
            loading: true,
            topText: props.memes[props.index].name,
            bottomText: "",
            randomImg: props.memes[props.index].url,
            searchQuote: "",
            allMemeImgs: props.memes,
            filteredMemes: props.memes
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target

        if (name === "searchQuote") {

            const filteredAMIs = this.state.allMemeImgs.filter(function (element) {
                return element.name.toLowerCase().includes(value.toLowerCase())
            })
            if (filteredAMIs.length) {
                this.setState({
                    randomImg: filteredAMIs[0].url,
                    topText: filteredAMIs[0].name,
                    [name]: value,
                    filteredMemes: filteredAMIs
                })
            } else {
                this.setState({
                    [name]: value,
                    filteredMemes: filteredAMIs
                })
            }

        } else if (name === "randomImg") {

            const randomMeme = this.state.filteredMemes[
                Math.floor(Math.random() * this.state.filteredMemes.length
                )]

            this.setState({
                topText: randomMeme.name,
                [name]: randomMeme.url
            })
        } else if (name === "selectedImg") {
            const pickedImg = this.state.filteredMemes.find(element => element.url === value)

            this.setState({
                topText: pickedImg.name,
                randomImg: pickedImg.url
            })
        } else if (name === "topText") {
            this.setState({
                topText: value
            })
        } else if (name === "bottomText") {
            this.setState({
                bottomText: value
            })
        }
    }
    render() {
        const { topText, bottomText, randomImg, allMemeImgs, filteredMemes, searchQuote } = this.state
        const pickImage = allMemeImgs.find(element => element.url === randomImg)
        return (

            <div className="memeGen">
                <Form topText={topText} bottomText={bottomText} handleChange={this.handleChange} numberOfMemes={filteredMemes.length} />
                <Search searchQuote={searchQuote} handleChange={this.handleChange} />
                <Select randomImg={randomImg} filteredMemes={filteredMemes} searchQuote={searchQuote} handleChange={this.handleChange} />
                <Display topText={topText} bottomText={bottomText} randomImg={randomImg} />
                {
                    Object.entries(pickImage).map((entry) =>
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
            </div>
        )
    }
}

export default MemeGenerator
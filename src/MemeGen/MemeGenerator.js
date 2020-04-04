import React, { Component } from "react"
import Loading from "./Loading"
import Form from "./Form"
import Search from "./Search"
import Select from "./Select"
import Display from "./Display"
import InfoRow from "./InfoRow"

class MemeGenerator extends Component {
    constructor(props) {
        super()
        this.state = {
            index: props.index,
            url: props.url,
            loading: true,
            topText: "",
            bottomText: "",
            randomImg: "",
            searchQuote: "",
            allMemeImgs: [],
            filteredMemes: []
        }
    }

    componentDidMount() {

        fetch(this.state.url)
            .then(response => response.json())
            .then(response => {

                this.setState({
                    loading: false,
                    allMemeImgs: response.data.memes,
                    filteredMemes: response.data.memes,
                    randomImg: response.data.memes[this.state.index].url,
                    topText: response.data.memes[this.state.index].name
                })
            })
            .catch(function (error) {
                console.log("Failure")
                console.log(error)
            })
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

    memeData(data) {
        let objectKeysArray = []

        let swag = Object.keys(data)

        for (let i = 0; i < swag.length; i++) {
            objectKeysArray = [...objectKeysArray, Object.keys(data)[i]]
            console.log("Object.keys", Object.keys(data)[i])

        }
        console.log("objectKeysArray", objectKeysArray)
        return objectKeysArray
    }

    render() {
        const { loading, topText, bottomText, randomImg, allMemeImgs, filteredMemes, searchQuote } = this.state
        const pickImage = allMemeImgs.find(element => element.url === randomImg)

        return (

            <div className="memeGen">
                <Form topText={topText} bottomText={bottomText} handleChange={this.handleChange} numberOfMemes={filteredMemes.length} />
                <Search searchQuote={searchQuote} handleChange={this.handleChange} />
                <Select randomImg={randomImg} filteredMemes={filteredMemes} searchQuote={searchQuote} handleChange={this.handleChange} />
                {
                    loading
                        ? <Loading />
                        :
                        <>
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
                        </>
                }
            </div>
        )
    }
}

export default MemeGenerator
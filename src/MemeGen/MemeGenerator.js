import React, { Component } from "react"
import Loading from "./Loading"
import Form from "./Form"
import Search from "./Search"
import Select from "./Select"
import Display from "./Display"
// import DisplayInfoOne from "./DisplayInfo/DisplayInfoOne"
// import DisplayInfoTwo from "./DisplayInfo/DisplayInfoTwo"
// import DisplayInfoTre from "./DisplayInfo/DisplayInfoTre"
// import InfoRow from "./InfoRow"

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


                            {/* {(this.memeData(pickImage)).map((val, index) =>
                                <p className="meme borderRed">
                                    <span className="firstToUpper"><b>{val}</b>: </span>
                                    {
                                        (Object.values(pickImage)[index]).toString().substring(0, 4) == "http"
                                            ? <a href={Object.values(pickImage)[index]}>{Object.values(pickImage)[index]}</a>
                                            : Object.values(pickImage)[index]
                                    }
                                </p>
                            )} */}


                            {/* {
                                Object.keys(pickImage).map((key, index) =>
                                    <p className="meme borderRed" key={Object.values(pickImage)[index].id}>
                                        <span className="firstToUpper"><b>{key}: </b></span>
                                        {
                                            Object.values(pickImage)[index].toString().substring(0, 4) === "http"
                                                ? <a href={Object.values(pickImage)[index]}>{Object.values(pickImage)[index]}</a>
                                                : <span>{Object.values(pickImage)[index]}</span>
                                        }

                                    </p>
                                )
                            } */}

                            {
                                Object.entries(pickImage).map((entry) =>
                                    <p className="meme borderRed" key={entry[0]}>
                                        <span className="firstToUpper"><b>{entry[0]}: </b></span>
                                        {
                                            entry[1].toString().substring(0, 4) === "http"
                                                ? <a href={entry[1]}>{entry[1]}</a>
                                                : <span>{entry[1]}</span>
                                        }
                                    </p>
                                )
                            }

                            {/* 
                            <InfoRow>
                                <b><a href={pickImage.url}>{pickImage.name}</a></b>
                            </InfoRow>

                            <InfoRow>
                                Id: <i>{pickImage.id}</i>
                            </InfoRow>

                            <InfoRow>
                                Width: {pickImage.width}
                            </InfoRow>

                            <InfoRow>
                                Height: {pickImage.height}
                            </InfoRow>

                            <InfoRow>
                                Box_count: {pickImage.box_count}
                            </InfoRow> */}
                        </>
                }
            </div>
        )
    }
}

export default MemeGenerator
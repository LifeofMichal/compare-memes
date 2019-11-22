import React, { Component } from "react"
import Loading from "./Loading"
import Form from "./Form"
import Search from "./Search"
import Select from "./Select"
import Display from "./Display"
import DisplayInfoOne from "./DisplayInfo/DisplayInfoOne"
import DisplayInfoTwo from "./DisplayInfo/DisplayInfoTwo"
import DisplayInfoTre from "./DisplayInfo/DisplayInfoTre"

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
            allMemeImgs: [],
            searchQuote: "",
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

        } else if ( name === "randomImg") {
            const randomMeme = this.state.filteredMemes[Math.floor(Math.random() * Math.floor(this.state.filteredMemes.length))]

            this.setState({
                topText: randomMeme.name,
                [name]: randomMeme.url
            })
        } else if( name === "selectedImg") {
            const pickedImg = this.state.filteredMemes.find(element => element.url === value)

            this.setState({ 
                topText: pickedImg.name, 
                randomImg: pickedImg.url 
            })
        } else if ( name === "topText") {
            this.setState({ 
                topText: value
            })
        } else if ( name === "bottomText") {
            this.setState({ 
                bottomText: value 
            })
        }
    }

    render() {
        const { loading, topText, bottomText, randomImg, allMemeImgs, filteredMemes, searchQuote } = this.state
        const pickImage = allMemeImgs.find(element => element.url === randomImg)

        return (
            <div className="memeGen">
                <Form topText={topText} bottomText={bottomText} handleChange={this.handleChange} />
                <Search searchQuote={searchQuote} handleChange={this.handleChange} />
                <Select randomImg={randomImg} filteredMemes={filteredMemes} searchQuote={searchQuote} handleChange={this.handleChange} />
                {
                    loading
                        ? <Loading />
                        : <>
                            <Display topText={topText} bottomText={bottomText} randomImg={randomImg} />
                            <DisplayInfoOne name={pickImage.name} id={pickImage.id} url={pickImage.url} />
                            <DisplayInfoTwo width={pickImage.width} height={pickImage.height} />
                            <DisplayInfoTre boxCount={pickImage.box_count} />
                        </>
                }
            </div>
        )
    }
}

export default MemeGenerator
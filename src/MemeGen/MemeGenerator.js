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

                
                const randomMeme = this.handleImagePick(response.data.memes)

                this.setState({
                    loading: false,
                    allMemeImgs: response.data.memes,
                    filteredMemes: response.data.memes,
                    randomImg: randomMeme.url,
                    topText: randomMeme.name
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
            if (filteredAMIs.length > 0) {
                this.setState({
                    randomImg: filteredAMIs[0].url,
                    [name]: value,
                    topText: filteredAMIs[0].name,
                    filteredMemes: filteredAMIs
                })
            } else {
                this.setState({
                    [name]: value,
                    filteredMemes: filteredAMIs
                })
            }
        } else {
            this.setState({ [name]: value })
        }
    }

    handleImagePick = (listOfMemes) => {
        return listOfMemes[Math.floor(Math.random() * Math.floor(listOfMemes.length))]
    }

    rngImg = () => {

        const randomMeme = this.handleImagePick(this.state.allMemeImgs)

        this.setState({
            randomImg: randomMeme.url,
            topText: randomMeme.name
        })
    }

    render() {
        const { loading, topText: tT, bottomText: bT, randomImg: rI, allMemeImgs: aMIs, filteredMemes: fMs, searchQuote: sQ } = this.state
        const pickImage = aMIs.find(element => element.url === rI)

        return (
            <div className="memeGen">
                <Form topText={tT} bottomText={bT} handleChange={this.handleChange} rngImg={this.rngImg} />
                <Search searchQuote={sQ} handleChange={this.handleChange} />
                <Select randomImg={rI} filteredMemes={fMs} searchQuote={sQ} handleChange={this.handleChange} />
                {
                    loading
                        ? <Loading />
                        : <>
                            <Display topText={tT} bottomText={bT} randomImg={rI} />
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
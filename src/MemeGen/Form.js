import React from "react"
import { connect } from "react-redux"
import {
    updateSelectedMeme
} from "../redux/memeGenerators"

function Form(props) {
    const { topText, bottomText, handleChange, numberOfMemes } = props

    return (
        <form className="meme-form">
            <input
                type="text"
                name="topText"
                placeholder="Top Text"
                value={topText}
                onChange={handleChange}
            />
            <input
                type="text"
                name="bottomText"
                placeholder="Bottom Text"
                value={bottomText}
                onChange={handleChange}
            />

            <button
                type="button"
                name="randomImg"
                onClick={handleChange}
                disabled={!numberOfMemes ? true : false}>Gen
            </button>
        </form>
    )
}

function mapStateToProps({ memeGenerators }) {
    return {
        memeGenerators: memeGenerators
    }
}

const mapDispatchToProps = {
    updateSelectedMeme: updateSelectedMeme
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)
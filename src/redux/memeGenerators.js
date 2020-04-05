const initState = [
    {
        id: 0,
        topText: "",
        bottomText: "",
        searchQuote: "",
        selectedMeme: {},
        filteredMemeList: []
    },
    {
        id: 1,
        topText: "",
        bottomText: "",
        searchQuote: "",
        selectedMeme: {},
        filteredMemeList: []
    },
    {
        id: 2,
        topText: "",
        bottomText: "",
        searchQuote: "",
        selectedMeme: {},
        filteredMemeList: []
    }
]

export function updateTopText(index, text) {
    return {
        type: "UPDATE_TOP_TEXT",
        payload: { index, text }
    }
}

export function updateBottomText(index, text) {
    return {
        type: "UPDATE_BOTTOM_TEXT",
        payload: { index, text }
    }
}

export function updateSearchQuote(index, quote) {
    return {
        type: "UPDATE_SEARCH_QUOTE",
        payload: { index, quote }
    }
}

export function updateSelectedMeme(index, meme) {
    return {
        type: "UPDATE_SELECTED_MEME",
        payload: { index, meme }
    }
}

export function updateFilteredMemesList(index, list) {
    return {
        type: "UPDATE_FILTERED_MEMES_LIST",
        payload: { index, list }
    }
}

export default function memeGeneratorsReducer(state = initState, action) {

    switch (action.type) {
        case "UPDATE_TOP_TEXT": {
            const { index, text } = action.payload
            const updatedState = state.map((element) => (
                element.id !== index
                    ? element
                    : {
                        ...element,
                        topText: text
                    }
            ))
            return updatedState
        }
        case "UPDATE_BOTTOM_TEXT": {
            const { index, text } = action.payload
            const updatedState = state.map((element) => (
                element.id !== index
                    ? element
                    : {
                        ...element,
                        bottomText: text
                    }
            ))
            return updatedState
        }
        case "UPDATE_SEARCH_QUOTE": {
            const { index, quote } = action.payload
            const updatedState = state.map((element) => (
                element.id !== index
                    ? element
                    : {
                        ...element,
                        searchQuote: quote
                    }
            ))
            return updatedState
        }
        case "UPDATE_SELECTED_MEME": {
            const { index, meme } = action.payload
            const updatedState = state.map((element) => (
                element.id !== index
                    ? element
                    : {
                        ...element,
                        selectedMeme: meme
                    }
            ))
            return updatedState
        }
        case "UPDATE_FILTERED_MEMES_LIST": {
            const { index, list } = action.payload
            const updatedState = state.map((element) => (
                element.id !== index
                    ? element
                    : {
                        ...element,
                        filteredMemeList: list
                    }
            ))
            return updatedState
        }
        default:
            return state
    }
}
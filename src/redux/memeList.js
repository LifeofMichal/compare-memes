export function isLoading() {
    return {
        type: "IS_LOADING"
    }
}

export function isNotLoading() {
    return {
        type: "IS_NOT_LOADING"
    }
}

export function fetchMemes() {
    return (dispatch) => {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                dispatch({
                    type: "FETCH_MEMES",
                    payload: response.data.memes
                })
            })
            .then(() => {
                dispatch({
                    type: "IS_NOT_LOADING"
                })
            })
    }
}

const initState = {
    memeList: null,
    loading: true
}

export default function memeListReducer(state = initState, action) {

    switch (action.type) {
        case "FETCH_MEMES":
            return {
                ...state,
                memeList: action.payload
            }
        case "IS_LOADING":
            return {
                ...state,
                loading: true
            }
        case "IS_NOT_LOADING":
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}
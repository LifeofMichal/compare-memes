import { combineReducers, createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import memeListReducer from "./memeList"
import memeGeneratorsReducer from "./memeGenerators"

const rootReducer = combineReducers({
    memeList: memeListReducer,
    memeGenerators: memeGeneratorsReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))
// store.subscribe(() => {
//     console.log("Global State: ", store.getState())
// })
export default store
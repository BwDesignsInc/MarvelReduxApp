import { combineReducers } from 'redux'
import characterReducer from './features/Characters/reducer'

export const rootReducer =  combineReducers({
  characters: characterReducer,
})

export default rootReducer;
import { combineReducers } from 'redux'
import charactersReducer from './features/Characters/reducer'
import characterDetailsReducer from './features/Characters/CharacterDetails/reducer'

export const rootReducer =  combineReducers({
  characters: charactersReducer,
  details: characterDetailsReducer,
})

export default rootReducer;
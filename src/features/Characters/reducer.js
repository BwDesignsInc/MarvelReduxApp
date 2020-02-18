import {
    CHARACTERS_REQUEST,
    CHARACTERS_SUCCESS,
    CHARACTERS_FAILURE
} from './types';

const initialState = {
    list:[],
    loading: true,
};

export const characterReducer = (state = initialState, action) => {
    const {type, payload} = action
    switch (type) {
      case CHARACTERS_REQUEST:
        return initialState
      case CHARACTERS_SUCCESS:
        return { 
            list: payload.characters, 
            marvelCopyRight: payload.copyright,
            loading:false
        }
      case CHARACTERS_FAILURE:
        return payload;
      default:
       return initialState
    }
  }

  export default characterReducer;
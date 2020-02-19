import {
  CHARACTER_DETAILS_REQUEST,
  CHARACTER_DETAILS_SUCCESS,
  CHARACTER_DETAILS_FAILURE
} from "./types";

const initialState = {
    character:{
        thumbnail: {
            path: null,
            extension: null
          },
    },
    loading: true
};

export const characterDetailsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CHARACTER_DETAILS_REQUEST:
      return initialState;
    case CHARACTER_DETAILS_SUCCESS:
      return {
        character: payload.character,
        loading: false
      };
    case CHARACTER_DETAILS_FAILURE:
      return payload;
    default:
      return initialState;
  }
};

export default characterDetailsReducer;

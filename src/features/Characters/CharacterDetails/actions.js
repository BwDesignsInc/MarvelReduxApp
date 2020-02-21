import { marvelCharacterAPI } from "../actions";
import {
  CHARACTER_DETAILS_SUCCESS,
  CHARACTER_DETAILS_FAILURE,
  CHARACTER_DETAILS_REQUEST
} from "./types";

const characterDetailsRequest = () => ({ type: CHARACTER_DETAILS_REQUEST });
const characterDetailsSuccess = response => ({
  type: CHARACTER_DETAILS_SUCCESS,
  payload: response
});

export const characterDetailsFailure = error => ({
  type: CHARACTER_DETAILS_FAILURE,
  payload: error
});

export const fetchCharacterDetails = name => async (dispatch, getState) => {
  dispatch(characterDetailsRequest());

  try {
    const {
      data: {
        data: { results },
        attributionHTML
      }
    } = await marvelCharacterAPI.getCharacters(name);
    dispatch(
      characterDetailsSuccess({
        character: results[0],
        copyright: attributionHTML
      })
    );
  } catch (error) {
    dispatch(characterDetailsFailure(error));
  }
};

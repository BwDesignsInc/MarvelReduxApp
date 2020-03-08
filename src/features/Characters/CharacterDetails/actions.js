import { mapKeys } from "lodash";
import { marvelCharacterAPI } from "../actions";
import {
  CHARACTER_DETAILS_SUCCESS,
  CHARACTER_DETAILS_FAILURE,
  CHARACTER_DETAILS_REQUEST,
  CHARACTER_COMIC_SUCCESS,
  CHARACTER_COMIC_FAILURE,
  CHARACTER_COMIC_REQUEST
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
const characterComicRequest = () => ({ type: CHARACTER_COMIC_REQUEST });
const characterComicSuccess = response => ({
  type: CHARACTER_COMIC_SUCCESS,
  payload: response
});

export const characterComicFailure = error => ({
  type: CHARACTER_COMIC_FAILURE,
  payload: error
});
export const fetchCharacterDetails = name => async dispatch => {
  dispatch(characterDetailsRequest());
  try {
    const {
      data: {
        data: { results },
        attributionHTML
      }
    } = await marvelCharacterAPI.getCharacters({ name });
    dispatch(
      characterDetailsSuccess({
        character: results[0],
        copyright: attributionHTML
      })
    );
  } catch (error) {
    dispatch(characterComicFailure(error));
  }
};

export const fetchComicsByCharacter = id => async dispatch => {
  dispatch(characterComicRequest());
  try {
    const {
      data: {
        data: { results },
        attributionHTML
      }
    } = await marvelCharacterAPI.getComicsByCharacter(id);
    let normalizedComics = mapKeys(results, "id");
    dispatch(
      characterComicSuccess({
        comics: normalizedComics,
        copyright: attributionHTML
      })
    );
  } catch (error) {
    console.log(error);
  }
};

import { mapKeys } from 'lodash';
import http from "../../api/http";
import { CHARACTERS_REQUEST, CHARACTERS_SUCCESS, CHARACTERS_FAILURE } from "./types";

const apiKey = "680e11e6ae10cd6d8b0dbedc8514a138";

const makeCharacterUrl = ({name}) => `/characters?name=${name}&apikey=${apiKey}`;

export const charactersApi = () => http.get("/characters?apikey=680e11e6ae10cd6d8b0dbedc8514a138&limit=100");
export const charactersByNameApi = (name) => http.get(makeCharacterUrl(name))

const charactersRequest = () => ({ type: CHARACTERS_REQUEST });
const charactersSuccess = response => ({
  type: CHARACTERS_SUCCESS,
  payload: response
});

export const charactersFailure = error => ({
  type: CHARACTERS_FAILURE,
  payload: error
});

export const initCharacters = () => async dispatch => {
  dispatch(charactersRequest())
  try {
    const { data:{ data:{ results }, attributionHTML }} = await charactersApi();
    console.log(attributionHTML);
    const  removeNoImageCharcters = results.filter((character)=> !character.thumbnail.path.includes('image_not_available'))
    let normalizedCharacters = mapKeys(removeNoImageCharcters, "id" );
    dispatch(charactersSuccess({characters: normalizedCharacters, copyright: attributionHTML}));
  } catch (error) {
    dispatch(charactersFailure(error));
  }
};

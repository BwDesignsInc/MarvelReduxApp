import { mapKeys } from "lodash";
import http from "../../../api/http";
import { CHARACTER_DETAILS_SUCCESS, CHARACTER_DETAILS_FAILURE, CHARACTER_DETAILS_REQUEST} from './types';

export const characterDetailsApi = (name) => http.get(`/characters?apikey=680e11e6ae10cd6d8b0dbedc8514a138&name=${name}`);

const characterDetailsRequest = () => ({ type: CHARACTER_DETAILS_REQUEST });
const characterDetailsSuccess = response => ({
  type: CHARACTER_DETAILS_SUCCESS,
  payload: response
});

export const characterDetailsFailure = error => ({
  type: CHARACTER_DETAILS_FAILURE,
  payload: error
});


export const fetchCharacterDetails = (name) => async (dispatch, getState) => {
  dispatch(characterDetailsRequest());
  const state = getState();
  try {
    const {
      data: {
        data: { results },
        attributionHTML
      }
    } = await characterDetailsApi(name);
       //let normalizedCharacter = mapKeys(results, "id");
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
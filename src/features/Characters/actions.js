import { mapKeys } from "lodash";
import http, { config } from "../../api";
import { CHARACTERS_REQUEST, CHARACTERS_SUCCESS, CHARACTERS_FAILURE } from "./types";
const apiKey = "680e11e6ae10cd6d8b0dbedc8514a138";
const makeCharacterUrl = ({ name }) => `/characters?name=${name}&apikey=${apiKey}`;
const URI = "/v1/public/characters";

export class marvelCharacterAPI {
  static getCharacters(httpOptions = {}) {
    const defaultOptions = { page: 1, count: 20, name: "", nameStartsWith: "" };
    const options = { ...defaultOptions, ...httpOptions };
    const currentOffset = options.page === 1 ? 0 : options.count * (options.page - 1);
    let params = `?apikey=${config.publicKey}&limit=${options.count}&offset=${currentOffset}`;
    if (options.name) {
      params = params.concat(`&name=${options.name}`);
    }
    if (options.nameStartsWith) {
      params = params.concat(`&nameStartsWith=${options.nameStartsWith}`);
    }
    const url = `${config.baseUrl}${URI}${params}`;
    return http.get(url);
  }

  static getComicsByCharacter(characterId, offset = 0) {
    const URI = `/v1/public/characters/${characterId}/comics`;
    const params = `?apikey=${config.publicKey}&limit=20&offset=${offset}`;
    const url = `${config.baseUrl}${URI}${params}`;
    return http.get(url);
  }
}
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
  dispatch(charactersRequest());
  try {
    const {
      data: {
        data: { results },
        attributionHTML
      }
    } = await marvelCharacterAPI.getCharacters();
    let normalizedCharacters = mapKeys(results, "id");
    dispatch(
      charactersSuccess({
        characters: normalizedCharacters,
        copyright: attributionHTML
      })
    );
  } catch (error) {
    dispatch(charactersFailure(error));
  }
};

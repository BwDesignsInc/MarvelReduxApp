import { createSelector } from 'reselect';

export const getCharacters = (state) => state.characters.list;
export const getCharactersLoading = (state) => state.characters.loading;
export const getMarvelCopyRight = (state) => state.characters.marvelCopyRight;

export const getCharacterProfile = createSelector(
    getCharacters,
    (_, id) => id,
    (characters,id) => { 
        console.log(characters,id); return characters[id]
    }
  )
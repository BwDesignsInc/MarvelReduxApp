import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCharacterDetails, fetchComicsByCharacter } from "./actions";
import { getCharacter, getCharacterLoading, getComics } from "./selectors";
import { Button } from "semantic-ui-react";
import DetailsCount from "./components/DetailsCount";
import "./styles.scss";

export const CharacterDetails = () => {
  const loading = useSelector(getCharacterLoading);
  const character = useSelector(getCharacter);
  const comics = useSelector(getComics);
  const dispatch = useDispatch();
  const { name } = useParams();
  const history = useHistory();
  if (comics) {
    console.log(Object.entries(comics).map(c => console.log(c[1])));
  }

  useEffect(() => {
    dispatch(fetchCharacterDetails(name));
  }, [dispatch, name]);

  const handleGetComics = () => {
    dispatch(fetchComicsByCharacter(character.id));
  };
  return (
    <>
      {!loading && (
        <div className="character-profile" data-testid="character-profile">
          <Button
            className="profile-button"
            content="Back"
            icon="left arrow"
            labelPosition="left"
            onClick={() => history.goBack()}
          />
          <h3>{name}</h3>
          <img
            alt={name}
            src={`${character.thumbnail.path}/landscape_incredible.${character.thumbnail.extension}`}
          />
          <div className="character-info">
            <DetailsCount
              label="Comics"
              detail={character.comics}
              onClick={handleGetComics}
            />
            <DetailsCount label="Series" detail={character.series} />
            <DetailsCount label="Stories" detail={character.stories} />
            <DetailsCount label="Events" detail={character.events} />
          </div>
          <div className="chracter-urls"></div>
          <div className="characters-list" data-testid="characters-list">
            {comics &&
              Object.entries(comics).map(c => {
                const {
                  id,
                  name,
                  thumbnail: { path, extension }
                } = c[1];
                return (
                  <div key={id} data-testid="character-card">
                    <img
                      alt={name}
                      src={`${path}/portrait_xlarge.${extension}`}
                    />
                    <div className="character-name">
                      <span>{name}</span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </>
  );
};

export default CharacterDetails;

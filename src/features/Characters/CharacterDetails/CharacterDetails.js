import React, { useEffect } from "react";
import { isEmpty } from "lodash";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'
import { fetchCharacterDetails } from "./actions";
import { getCharacter, getCharacterLoading } from "./selectors";
import { Button } from "semantic-ui-react";
import "./styles.scss";

export const CharacterDetails = () => {
  const loading = useSelector(getCharacterLoading);
  const character = useSelector(getCharacter);
  const dispatch = useDispatch();
  const { name } = useParams();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchCharacterDetails(name));
  }, [dispatch, name]);

 
  return (
    <>
      { loading ? <Dimmer active={loading} inverted>
        <Loader inverted>Loading</Loader>
      </Dimmer>: 
    <div className="character-profile">
      <Button
        className="profile-button"
        content="Back"
        icon="left arrow"
        labelPosition="left"
        onClick={() => history.goBack()}
      />
      <h3>{name}</h3>
      <img alt={name} src={`${character.thumbnail.path}/landscape_incredible.${character.thumbnail.extension}`} />
      <div className="character-info">
        <div>
          <label>Comics:</label>
          {character.comics.available}
        </div>
        <div>
          <label>Series:</label>
          {character.series.available}
        </div>
        <div>
          <label>Stories:</label>
          {character.stories.available}
        </div>
        <div>
          <label>Events:</label>
          {character.events.available}
        </div>
      </div>
      <div className="chracter-urls">
       </div>
    </div>
    }
    </>
  );
};

export default CharacterDetails;

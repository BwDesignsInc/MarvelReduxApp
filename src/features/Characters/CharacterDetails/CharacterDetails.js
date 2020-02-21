import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCharacterDetails } from "./actions";
import { getCharacter, getCharacterLoading } from "./selectors";
import { Button } from "semantic-ui-react";
import DetailsCount from './components/DetailsCount'
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
      { !loading && 
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
        <DetailsCount label="Comics" detail={character.comics}/>
        <DetailsCount label="Series" detail={character.series}/>
        <DetailsCount label="Stories" detail={character.stories}/>  
        <DetailsCount label="Events" detail={character.events}/>
      </div>
      <div className="chracter-urls">
       </div>
    </div>
    }
    </>
  );
};

export default CharacterDetails;

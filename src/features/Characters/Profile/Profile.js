import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Button } from 'semantic-ui-react';

export const Profile = () => {
  let {
    state: {
      name,
      thumbnail: { path, extension },
      comics,
      series,
      stories,
      events
    }
  } = useLocation();

  const history = useHistory();

  return (
    <div>
      <Button content='Back' icon='left arrow' labelPosition='left' onClick={()=>history.goBack()} />
      <h3>{name}</h3>
      <img alt={name} src={`${path}/landscape_incredible.${extension}`} />
      <div>
        <label>Comics:</label>
        {comics.available}
      </div>
      <div>
        <label>Series:</label>
        {series.available}
      </div>
      <div>
        <label>Stories:</label>
        {stories.available}
      </div>
      <div>
        <label>Events:</label>
        {events.available}
      </div>
    </div>
  );
};

export default Profile;

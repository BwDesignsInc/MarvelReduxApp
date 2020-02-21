import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
import { isEmpty } from "lodash";
import { initCharacters } from "./actions";
import { getCharacters, getMarvelCopyRight } from "./selectors";
import "./styles.scss";

const Characters = () => {
  const charactersList = useSelector(getCharacters);
  const copyRight = useSelector(getMarvelCopyRight);
  const dispatch = useDispatch();
  let { url } = useRouteMatch();

  useEffect(() => {
    if (isEmpty(charactersList)) {
      dispatch(initCharacters());
    }
  }, [dispatch, charactersList]);

  return (
    <div className="characters">
      <div className="characters-list">
        {charactersList &&
          Object.keys(charactersList).map(key => {
            const {
              id,
              name,
              thumbnail: { path, extension },
              ...rest
            } = charactersList[key];

            return (
              <div className="characters-card" key={id}>
                <Link
                  to={{
                    pathname: `${url}/${name}`,
                    state: {
                      id,
                      name,
                      thumbnail: { path, extension },
                      ...rest
                    }
                  }}
                >
                  <img
                    alt={name}
                    src={`${path}/portrait_xlarge.${extension}`}
                  />
                </Link>
                <div className="character-name"><span>{name}</span></div>
              </div>
            );
          })}
      </div>
      <footer dangerouslySetInnerHTML={{ __html: copyRight }} />
    </div>
  );
};

export default Characters;

import React from "react";
import { Route, matchPath, Link } from "react-router-dom";
import Characters from "./features/Characters";
import CharacterDetails from "./features/Characters/CharacterDetails";
import SignupForm from "./features/Form/Form";
import { Tab } from "semantic-ui-react";
import { getCharactersLoading } from "./features/Characters/selectors";
import { getCharacterLoading } from "./features/Characters/CharacterDetails/selectors";
import { useSelector } from "react-redux";
import MarvelIcon from './components/Icons';

const tabPanelsRoutes = (charactersLoading, detailsLoading) => [
  {
    menuItem: {
      as: Link,
      content: "Home",
      to: "/",
      exact: "true",
      key: "home"
    },
    render: () => (
      <Route path="/" exact>
        <Tab.Pane>
          <div>A Little Redux Marvel App</div>
        </Tab.Pane>
      </Route>
    )
  },
  {
    menuItem: {
      as: Link,
      content: "Characters",
      to: "/characters",
      key: "character"
    },
    render: () => (
      <>
        <Route path="/characters/:name">
          <Tab.Pane loading={detailsLoading}>
            <CharacterDetails />
          </Tab.Pane>
        </Route>
        <Route exact path="/characters">
          <Tab.Pane loading={charactersLoading}>
            <Characters />
          </Tab.Pane>
        </Route>
      </>
    )
  },
  {
    menuItem: {
      as: Link,
      content: "Form",
      to: "/form",
      key: "form"
    },
    render: () => (
      <Route path="/form">
        <Tab.Pane>
          <SignupForm />
        </Tab.Pane>
      </Route>
    )
  }
];

const defaultActiveIndex = tabPanelsRoutes().findIndex(pane => {
  const path = window.location.pathname.includes("characters")
    ? "/characters"
    : window.location.pathname;
  return !!matchPath(path, {
    path: pane.menuItem.to,
    exact: true
  });
});

const App = () => {
  const charactersLoading = useSelector(getCharactersLoading);
  const detailsLoading = useSelector(getCharacterLoading);
  return (
    <div data-testid="marvelApp">
      <MarvelIcon />
      <Tab
        defaultActiveIndex={defaultActiveIndex}
        panes={tabPanelsRoutes(charactersLoading, detailsLoading)}
      />
    </div>
  );
};

export default App;

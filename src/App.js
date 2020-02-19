import React from "react";
import { Route, matchPath, Link } from "react-router-dom";
import Characters from "./features/Characters";
import CharacterDetails from "./features/Characters/CharacterDetails";
import SignupForm from "./features/Form/Form";
import { Title } from "./theme";
import { Tab } from "semantic-ui-react";
import { getCharactersLoading } from "./features/Characters/selectors";
import { useSelector } from "react-redux";
const tabPanelsRoutes = loading => [
  {
    menuItem: {
      as: Link,
      content: "Home",
      to: "/",
      exact:'true',
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
          <CharacterDetails />
        </Route>
        <Route exact path="/characters">
          <Tab.Pane loading={loading}>
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
   const path = window.location.pathname.includes('characters')? '/characters' : window.location.pathname;
  return !!matchPath(path, {
    path: pane.menuItem.to,
    exact: true
  });
});

const App = () => {
  const loading = useSelector(getCharactersLoading); 
  return (
    <div data-testid="marvelApp">
      <Title>Marvel Characters</Title>
      <Tab defaultActiveIndex={defaultActiveIndex} panes={tabPanelsRoutes(loading)} />
    </div>
  );
};

export default App;

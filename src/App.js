import { Redirect, Route, Switch } from 'react-router-dom';
import AllNews from './pages/AllNews';
import NotFound from './pages/NotFound';
import Story from './pages/Story';
const App = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <Redirect to="/news" />
      </Route>
      <Route path="/news" exact>
        <AllNews />
      </Route>
      <Route path="/news/:storyId">
        <Story />
      </Route>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  );
};

export default App;

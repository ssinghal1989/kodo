import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import styles from './App.module.css';
import { Feed } from './page/Feed';
function App() {
  return (
    <div className={styles.container}>
      <Router>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/feed" />} />
          <Route path="/feed">
            <Feed />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

import {Link, Route, Switch} from 'react-router-dom'
import Home from './Home';
import Month from './Month';
import Navbar from './Navbar';
import Weekly from './Weekly';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Route exact path="/">
        <Home/>
      </Route>
      <Route path="/year">
        <Home/>
      </Route>
      <Route path="/month">
        <Month/>
      </Route>
      <Route path="/week">
        <Weekly/>
      </Route>
    </div>
  );
}

export default App;

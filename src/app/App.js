import '#app/App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Components
import {Header} from "#components"
// Pages
import {Launch, Agreement, Create} from "#pages";


function App() {
  return (
  	<Router>
	    <div className="App bg-light">
	      <Header />
	      <Switch>
	        <Route path="/" exact component={() => <Launch />} />
	        <Route path="/create" exact component={() => <Create />} />
	        <Route path="/agreement/:addr" exact component={() => <Agreement />} />
	      </Switch>
	    </div>
	</Router>
  );
}

export default App;

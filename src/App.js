import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import Home from "./components/pages/Home"
import About from "./components/pages/About"
import Contact from "./components/pages/Contact"
import Navbar from './components/layout/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NotFound from './components/pages/NotFound';
import AddVideo from './components/videos/AddVideo';
import EditVideo from './components/videos/EditVideo';
import Video from './components/videos/Video';


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/videos/add" component={AddVideo} />
          <Route exact path="/videos/edit/:id" component={EditVideo} />
          <Route exact path="/videos/:id" component={Video} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

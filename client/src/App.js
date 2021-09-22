import './App.css';
import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/HomePage/HomePage';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import PostDetail from './pages/PostDetail/PostDetail';
import Profile from './pages/Profile/Profile';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import { useContext } from 'react';
import { Context } from 'context/Context';
import AllUser from 'pages/AllUser/AllUser';
import Chat from 'pages/Chat/Chat';

function App() {
    const {user} = useContext(Context);
  
  return (
    <div className="App">
      
      <Router>
          <Navbar />
          <Switch>
              <Route path="/" exact>
                  {user ? <HomePage /> : <Login />}    
              </Route>
              <Route path="/post/:id" exact>
                  {user ? <PostDetail /> : <Login />} 
              </Route>
              <Route path="/profile/:id" exact>
                  {user ? <Profile /> : <Login />} 
              </Route>
              <Route path="/login" exact>
                  <Login />
              </Route>
              <Route path="/register" exact>
                  <Register />
              </Route>
              <Route path="/alluser" exact>
                  <AllUser />
              </Route>
              <Route path="/chat" exact>
                  <Chat />
              </Route>
          </Switch>
      </Router>
    </div>
  );
}

export default App;

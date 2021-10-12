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
import PostSaved from 'pages/PostSaved/PostSaved';
import PostCondition from 'pages/PostCondition/PostCondition';
import PostThemen from 'pages/PostThemen/PostThemen';
import Notification from 'pages/Notification/Notification';

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
                  {user ? <AllUser /> : <Login />} 
              </Route>
              <Route path="/chat" exact>
                {user ? <Chat /> : <Login />} 
              </Route>
              <Route path="/chat/:id" exact>
                {user ? <Chat /> : <Login />} 
              </Route>
              <Route path="/postsaved" exact>
                {user ? <PostSaved /> : <Login />} 
              </Route>
              <Route path="/postcondition" exact>
                {user ? <PostCondition /> : <Login />} 
              </Route>
              <Route path="/postthemen" exact>
                {user ? <PostThemen /> : <Login />} 
              </Route>
              <Route path="/notification" exact>
                {user ? <Notification /> : <Login />} 
              </Route>
          </Switch>
      </Router>
    </div>
  );
}

export default App;

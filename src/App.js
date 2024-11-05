// src/App.js
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import store from './redux/store'; // Redux 스토어 임포트
import ModalProvider from './components/common/ModalProvider';
import Header from './components/common/Header';
import Login from './pages/auth/Login';
import SortSignup from './pages/auth/SortSignup';
import UserSignup from './pages/auth/UserSignup';
import TrainerSignup from './pages/auth/TrainerSignup';
import Buttons from './components/common/Buttons';
// trainer
import TrainerProfile from './pages/trainer/TrainerProfile';
import PriceList from './pages/trainer/PriceList';
import TrainerMypage from './pages/trainer/TrainerMypage';
// user
import UserMypage from './pages/user/UserMypage';
import TrainerSearch from './pages/user/TrainerSearch';
import UserProfile from './pages/user/UserProfile';
// chat
import ChatList from './pages/chat/ChatList';
import ChatRoom from './pages/chat/ChatRoom';

function App() {
  return (
    <Provider store={store}>
      <ModalProvider>
        <Router>
          <div className="App">
            <Header />
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/buttons" element={<Buttons />} />
              <Route path="/sortsignup" element={<SortSignup />} />
              <Route path="/usersignup" element={<UserSignup />} />
              <Route path="/trainersignup" element={<TrainerSignup />} />
              <Route path="/chatlist" element={<ChatList />} />
              <Route path="/chatroom" element={<ChatRoom />} />
              <Route path="/trainerprofile" element={<TrainerProfile />} />
              <Route path="/trainermypage" element={<TrainerMypage />} />
              <Route path="/pricelist" element={<PriceList />} />
              <Route path="/usermypage" element={<UserMypage />} />
              <Route path="/trainersearch" element={<TrainerSearch />} />
              <Route path="/userprofile" element={<UserProfile />} />
            </Routes>
          </div>
        </Router>
      </ModalProvider>
    </Provider>
  );
}

export default App;

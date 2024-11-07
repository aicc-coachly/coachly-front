import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import UserChat from './pages/chat/UserChat';
import ChatList from './pages/chat/ChatList';
import TrainerChat from './pages/chat/TrainerChat';
import AIChat from './pages/chat/AIChat';
import Success from './components/common/Success';

function App() {
  return (
    <ModalProvider>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            {/* 로그인 페이지 */}
            <Route path="/" element={<Login />} />
            <Route path="/buttons" element={<Buttons />} />
            {/* 회원가입 선택 페이지 */}
            <Route path="/sortsignup" element={<SortSignup />} />
            <Route path="/usersignup" element={<UserSignup />} />
            <Route path="/trainersignup" element={<TrainerSignup />} />
            {/* chat */}
            <Route path="/chatlist" element={<ChatList />} />
            <Route path="/userchat" element={<UserChat />} />
            <Route path="/trainerchat" element={<TrainerChat />} />
            <Route path="/aichat" element={<AIChat />} />
            <Route path="/Success" element={<Success />} />
            {/* 트레이너 메인 페이지 */}
            <Route path="/trainerprofile" element={<TrainerProfile />} />
            <Route path="/trainermypage" element={<TrainerMypage />} /> ?
            {/* 트레이너의 PT 가격관리 페이지 */}
            <Route path="/pricelist" element={<PriceList />} />
            {/* 회원 메인 페이지 */}
            <Route path="/usermypage" element={<UserMypage />} />
            <Route path="/trainersearch" element={<TrainerSearch />} />
            <Route path="/userprofile" element={<UserProfile />} />
          </Routes>
        </div>
      </Router>
    </ModalProvider>
  );
}

export default App;

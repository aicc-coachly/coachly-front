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
import TrainerProfile from './pages/trainer/TrainerProfile'
import PriceList from './pages/trainer/PriceList';
import TrainerMypage from './pages/trainer/TrainerMypage';
// user
import UserMypage from './pages/user/UserMypage';
import TrainerSearch from './pages/user/TrainerSearch';
// chat
import UserChat from './pages/chat/UserChat';
import ChatList from './pages/chat/ChatList';
import TrainerChat from './pages/chat/TrainerChat';
import AIChat from './pages/chat/AIChat';


function App() {
  return (
    <ModalProvider>
    <BrowserRouter>
        <div className="App">
        <Router>
          <Header />
          <Routes>
            {/* 로그인 페이지 */}
            <Route path="/" element={<Login />} />
            <Route path="/buttons" element={<Buttons/>} />
            {/* 회원가입 선택 페이지 */}
            <Route path="/sortSignup" element={<SortSignup />} />
            <Route path="/userSignup" element={<UserSignup />} />
            <Route path="/trainerSignup" element={<TrainerSignup />} />
            {/* chat */}
            <Route path="/chatList" element={<ChatList />} />
            <Route path="/userChat" element={<UserChat />} />
            <Route path="/trainerChat" element={<TrainerChat />} />
            <Route path="/AIChat" element={<AIChat />} />

            {/* 트레이너 메인 페이지 */}
            <Route path="/trainerProfile" element={<TrainerProfile />} />
            <Route path="/trainerMypage" element={<TrainerMypage />} /> ?
            {/* 트레이너의 회원 채팅리스트페이지로 넘어감 */}
            <Route path="/priceList" element={<PriceList />} />
            {/* 회원 메인 페이지 */}
            <Route path="/userMypage" element={<UserMypage/>} />
            <Route path="/trainerSearch" element={<TrainerSearch/>} />

          </Routes>
        </Router>
        </div>
    </BrowserRouter>
    </ModalProvider>

    
  );
}

export default App;


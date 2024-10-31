import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SortSignup from './pages/auth/SortSignup'
import ModalProvider from './components/common/ModalProvider';
import TrainerProfile from './pages/trainer/TrainerProfile';
import TrainerMypage from './pages/trainer/TrainerMypage';

function App() {
  return (
    <ModalProvider>
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/sortsignup" element={<SortSignup/>}></Route>
          <Route path="/trainerProfile" element={<TrainerProfile/>}></Route>
          <Route path="/trainerMypage" element={<TrainerMypage/>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
    </ModalProvider>
  );
}

export default App;


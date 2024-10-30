import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SortSignup from './pages/auth/SortSignup'
import Schedule from './pages/trainer/Schedule';
import ModalProvider from './components/common/ModalProvider';

function App() {
  return (
    <ModalProvider>
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/sortsignup" element={<SortSignup/>}></Route>
          <Route path="/schedule" element={<Schedule/>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
    </ModalProvider>
  );
}

export default App;

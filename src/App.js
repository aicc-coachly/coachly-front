import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SortSignup from './pages/auth/SortSignup'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/sortsignup" element={<SortSignup/>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;


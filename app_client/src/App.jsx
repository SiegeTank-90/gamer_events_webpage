import logo from './images/logo.png';
import axios from 'axios';
import banner from './images/banner.png';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div className="App">
       <BrowserRouter>
          <Routes>
              <Route index element={<Login />} />
              <Route path="/dashboard" element={<Home />} />
          </Routes>
       </BrowserRouter>
    </div>
  )
}


export default App;

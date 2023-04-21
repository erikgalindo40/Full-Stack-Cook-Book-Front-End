import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Login from './pages/Login'
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <>
    <p>update</p>
    {/* <Router >
    <div className="App">
      <Header />
      <Routes>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/login' element={<Login />}></Route>
      </Routes>
      <Footer />
    </div>
    </Router> */}
    </>
  );
}

export default App;

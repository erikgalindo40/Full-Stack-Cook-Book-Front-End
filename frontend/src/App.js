import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Login from './pages/Login'
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <>
    <div className="App">
    <Router  >
      <Header />
      <Link to={'/register'} ></Link>
      <Routes>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/login' element={<Login />}></Route>
      </Routes>
      <Footer />
    </Router>
    </div>
    </>
  );
}

export default App;

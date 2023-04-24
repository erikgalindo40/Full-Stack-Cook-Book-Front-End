import './App.css';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom'
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
      <Link to={'/Full-Stack-Cook-Book-Front-End/register'} ></Link>
      <Routes>
        <Route path='/Full-Stack-Cook-Book-Front-End/register' element={<Register />}></Route>
        <Route path='/Full-Stack-Cook-Book-Front-End/dashboard' element={<Dashboard />}></Route>
        <Route path='/Full-Stack-Cook-Book-Front-End/login' element={<Login />}></Route>
      </Routes>
      <Footer />
    </Router>
    </div>
    </>
  );
}

export default App;

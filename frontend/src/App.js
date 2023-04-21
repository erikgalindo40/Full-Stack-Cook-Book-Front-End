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
    <Router >
    <div className="App">
      <Header />
      <Routes>
        <Route exact path='/register' element={<Register />}></Route>
        <Route exact path='/dashboard' element={<Dashboard />}></Route>
        <Route exact path='/login' element={<Login />}></Route>
      </Routes>
      <Footer />
    </div>
    </Router>
    </>
  );
}

export default App;

import { useLocation, useNavigate } from 'react-router-dom'
import { FiLogOut } from 'react-icons/fi'

function Header() {
  const location = useLocation()
  const navigate = useNavigate()

  const onLogout = () => {
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <header className='header'>
    My Cook Book
    {location.pathname==='/dashboard/'&&
      <div>
      <button onClick={onLogout} className='logout-button'><FiLogOut/> Logout</button>
      </div>
    }
    </header>
  )
}

export default Header
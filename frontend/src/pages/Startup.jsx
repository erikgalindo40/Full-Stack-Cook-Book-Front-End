import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function Startup() {
    const location = useLocation()
    const navigate = useNavigate()
    
    useEffect(() => {
      if(location.pathname==='/') {
        navigate('/login')
      }
    
    }, [navigate])
    
  return (
    <div>Loading</div>
  )
}

export default Startup
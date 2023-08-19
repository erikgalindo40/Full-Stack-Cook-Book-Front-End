import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { IoLogInOutline } from 'react-icons/io5'
import Spinner from '../components/Spinner'
import StartupInfo from '../components/StartupInfo'

function Login() {
  const navigate = useNavigate()

  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  })
  const [isPending, setIsPending] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const onChange = (e) => {
    setLoginInfo((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  const onSubmit = (e) => {
    e.preventDefault()
    setIsPending(true)
    fetch('https://cookbookapi.onrender.com/api/users/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(loginInfo)
    })
    .then(response=>{
      if(!response.ok) {
        throw response
      }
      return response.json()
    })
    .then(data=>{
      setIsPending(false)
      setIsSuccess(true)
      localStorage.setItem('user', JSON.stringify(data))
    })
    .catch(error=>{
      setIsPending(false)
      setIsError(true)
      error.json().then(err=>setErrorMessage(err.message))
    })
  }
  const onSignInDemo = () => {
    setLoginInfo({email:'test@gmail.com', password:'test123'})
  }
  const { email, password } = loginInfo

  useEffect(() => {
    if(isSuccess||localStorage.getItem('user')) {
      navigate('/dashboard/')
    }

  }, [isSuccess, navigate])

  return (
    <main className='login-main'>
      <form onSubmit={onSubmit} className='login-form form'>
        <h1>Let's get cooking!</h1>
        {isError&&<div className='error-message'>{errorMessage||'Invalid Credentials'}</div>}
        <label htmlFor="email"></label>
        <input type="text" onChange={onChange} value={email} name='email' id='email' placeholder='Email'/>
        <label htmlFor="password"></label>
        <input type="password" onChange={onChange} value={password} name='password' id='name' placeholder='Password'/>
        {isPending&&<><div className='loading-message'>Please Wait...</div><Spinner/></>}
        <p>Need an account? <Link to={'/register'} className='form-link'>Sign up</Link></p>
        <button className='form-button'><IoLogInOutline /> Sign In</button>
      </form>
      {isPending&&<StartupInfo />}
      <button onClick={onSignInDemo} className='login-demo-button form-button'>Login as guest</button>
    </main>
  )
}

export default Login
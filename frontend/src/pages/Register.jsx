import { Link, useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react'
import { HiOutlineUserAdd } from 'react-icons/hi'
import Spinner from '../components/Spinner'

function Register() {
  const navigate = useNavigate()

  const [registerInfo, setRegisterInfo] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })
  const [isPending, setIsPending] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const onChange = (e) => {
    setRegisterInfo((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onRegister = (e) => {
    e.preventDefault()
    if(password!==password2) {
      setIsError(true)
      setErrorMessage(`Passwords don't match`)
      return
    }
    setIsPending(true)
    fetch('https://cookbookapi.onrender.com/api/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(registerInfo)
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
  const { name, email, password, password2 } = registerInfo

  useEffect(() => {
    if(isSuccess||localStorage.getItem('user')) {
      navigate('/dashboard/')
    }

  }, [isSuccess, navigate])
  
  return (
    <main className='register-main'>
      <form onSubmit={onRegister} className='register-form form'>
        <h1>Welcome In!</h1>
        {isError&&<div className='error-message'>{errorMessage||'Invalid Credentials'}</div>}
        <label htmlFor="name"></label>
        <input onChange={onChange} type="text" value={name} name='name' id='name' placeholder='Full Name'/>
        <label htmlFor="email"></label>
        <input onChange={onChange} type="text" value={email} name='email' id='email' placeholder='Email'/>
        <label htmlFor="password"></label>
        <input onChange={onChange} type="password" value={password} name='password' id='password' placeholder='Password'/>
        <label htmlFor="password2"></label>
        <input onChange={onChange} type="password" value={password2} name='password2' id='password2' placeholder='Confirm Password'/>
        {isPending&&<><div className='loading-message'>Please Wait...</div><Spinner/></>}
        <p>Have an account? <Link to={'/login/'} className='form-link'>Login</Link></p>
        <button className='form-button'><HiOutlineUserAdd /> Register</button>
      </form>
    </main>
  )
}

export default Register
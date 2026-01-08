import React, { useState } from 'react'

function Login() {

  const[state, setState] = useState('Sign up')
  const [values, setValues] = useState({
    email: '',
    password:'',
    name:''
  })

  async function onSubmitHandler(e){
    e.preventDefault();

  }

  return (
    <div>
      <form className='min-h-[80vh] flex items-center'>
        <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
          <p className='text-2xl font-semibold'>{state === 'Sign up' ? "Create Account" : "Login" }</p>
          <p>Please {state === 'Sign up' ? "sign up" : "login" } to book an appointment</p>
          {
            state === "Sign up" && <div className='w-full'>
            <p>Full Name</p>
            <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" onChange={() => setValues({...values, name:e.target.value})} value={values.name}/>
          </div>
          }
          
          <div className='w-full'>
            <p>Email</p>
            <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="email" onChange={() => setValues({...values, email:e.target.value})} value={values.email}/>
          </div>
          <div className='w-full'>
            <p>Password</p>
            <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="password" onChange={() => setValues({...values, password:e.target.value})} value={values.password}/>
          </div>
          <button className='bg-[#5f6FFF] text-white w-full py-2 rounded-md text-base'>{state === 'Sign up' ? "Create Account" : "Login" }</button>
          {
            state === "Sign up" ? <p>Already have an account?<span onClick={() => setState('Login')} className='text-[#5f6FFF] underline cursor-pointer'>Login here</span></p> : <p>Create a new account? <span onClick={() => setState('Sign up')} className='text-[#5f6FFF] underline cursor-pointer'>Click here</span></p>
          }
        </div>

      </form>
    </div>
  )
}

export default Login
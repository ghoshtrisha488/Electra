import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
const [form,setForm] = useState({email:'',password:''});
  const navigate = useNavigate();

  const hc =(e)=> {
    setForm({...form,[e.target.name]:e.target.value});
  }
  const hs  = async(e) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:5000/api/auth/login',form);
    localStorage.setItem('token',res.data.token);
    navigate('/home');
  }


  return (
    <div style={{ maxWidth: '400px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h2>Login</h2>
     
      <form onSubmit={hs}>
          <div style={{ marginBottom: '15px' }}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={hc}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
          <div style={{ marginBottom: '15px' }}>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={hc}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;


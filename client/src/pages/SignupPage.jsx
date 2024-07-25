import React, { useState } from 'react'
import "../components/pass-components/Pass.css";
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {

  const navigate = useNavigate();
  const [state, setState] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(state);
    const strOptions = new URLSearchParams(state).toString();
    const response = await fetch(`/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(state),
    });

    if (response.ok){
      
    }
    else{
    }


    navigate("/home");
  };

  const checkIfEnter = (e) => {
    if (e.key === "Enter") {
      console.log(e.key);
      handleSubmit();
    }
  };

  return (
    <div className="formBox">
      <form className='flex flex-col space-y-5'>
        <div className='optionContainer'>
          <label htmlFor='email'>Email Address</label>
          <input className='' type="text" id="email" name="email" onChange={handleChange} onKeyUp={checkIfEnter}></input>
        </div>
        <div className='optionContainer'>
          <label htmlFor='password'>Password</label>
          <input className='' type="text" id="password" name="password" onChange={handleChange} onKeyUp={checkIfEnter}></input>
        </div>
        <button type="submit" onClick={handleSubmit}>Sign Up</button>
      </form>
    </div>
  )
}

export default SignupPage
// import React, { useState } from 'react';
// import axios from 'axios';

// const SignupPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('/api/auth/register', { email, password });
//       setMessage('Registration successful');
//     } catch (error) {
//       setMessage('Registration failed');
//     }
//   };

//   return (
//     <div>
//       <h2>Register</h2>
//       <form onSubmit={handleRegister}>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Register</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default SignupPage;

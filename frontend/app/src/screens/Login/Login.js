import React from 'react';
import { useState } from 'react';
import Header from '../../components/Header/Header';
import axios from 'axios';
import {Routes, Route, useNavigate} from 'react-router-dom';
import './style.css';
import { useUser } from '../../App';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(false);
    const { setUserData } = useUser();
    
    const navigate = useNavigate();

    const navigateToUserDetails = () => {
        navigate('/userDetails');
      };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3005/login', {
                username,
                password
            });

            if (response.status === 200) {
                console.log('Login bem-sucedido!');
                setUserData({ username, pokemonList: response.data.pokemonList });
                setLoginError(false)
                navigateToUserDetails()
            } else {
                console.log('Falha ao fazer login.');
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            setLoginError(true)
        }
    };

    return (
        <div>
            <Header title="Login"/>

            <div className='body'>
                <div className="form-body">
                    <form className="form">
                        <div className="form-group">
                            <label className="form-title">Username</label>
                            <input type="text" name="username" className="input" placeholder="Username" onChange={(e) => setUsername(e.target.value)} required/>
                        </div>
                        <div className="form-group">
                            <label className="form-title">Password</label>
                            <input type="password" name="password" className="input" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required/>
                        </div>

                        <button type="submit" className='button' onClick={(e) => handleLogin(e)}>Login</button>
                    </form>
                </div>

                { loginError ?
                    <div className='error-message-display'>
                        <h1 className='error-title'>Oops...</h1>
                        <p className='error-desc'>Incorrect username or password, please try again.</p>
                    </div>
                    : <div></div>
                }
                
            </div>
        </div>
    )
}


export default Login
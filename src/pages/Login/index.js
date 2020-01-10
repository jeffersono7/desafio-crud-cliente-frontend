import React, { useState } from 'react';
import api from '../../services/api';
import Header from '../../components/header';

import './styles.css';

export default function Login({ history }) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        if (!username || !password) {
            return;
        }

        const response = await api.post('/login', { username, password });

        const { token } = response.data;

        localStorage.setItem('token', token);

        history.push('/clientes');
    }

    return (

        <div className="container">
            <Header />

            <div className="login-container">

                <form onSubmit={handleSubmit}>
                    <input
                        placeholder="Digite seu usuário"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <input
                        placeholder="Digite sua senha"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}
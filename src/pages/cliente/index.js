import React from 'react';

import './styles.css';
import Header from '../../components/header';
import clienteApi from '../../services/cliente';
import { Link, useHistory } from 'react-router-dom';

export default class Cliente extends React.Component {

    state = {
        data: [],
        isAdmin: false
    }

    async componentDidMount() {

        const response = await clienteApi.obterTodos();

        this.setState({ data: response.data });

        const token = localStorage.getItem('token');

        if (token) {
            let payload = token.split('.')[1];
            payload = atob(payload);
            payload = JSON.parse(payload);

            this.setState({ isAdmin: payload.sub === 'admin' });
        }
    }

    async excluirCliente(cliente) {
        const { id } = cliente;

        try {
            await clienteApi.deletar(id);
        } catch (e) {
            alert('Houve um erro ao tentar excluir cliente!');
        }

        const { data } = await clienteApi.obterTodos();

        this.setState({ data });
    }

    logout() {
        localStorage.removeItem('token');
        window.location.href = window.location.origin;
    }

    render() {

        return (
            <div>
                <Header />

                <div className="logout">
                    <button type="button" onClick={this.logout}>Logout</button>
                </div>

                <div className="main-container">
                    {this.state.data.length > 0 ? (
                        <div className="clientes">
                            {this.state.data.map(cliente => (
                                <article key={cliente.id}>
                                    <h3>{cliente.nome}</h3>
                                    <label>CPF:</label>
                                    {cliente.cpf}

                                    <button className="excluir" type="button" onClick={() => this.excluirCliente(cliente)}>Excluir</button>
                                </article>
                            ))}
                        </div>
                    ) : (
                            <div className="empty">Nenhum cliente cadastrado!</div>
                        )}
                </div>

                {this.state.isAdmin ? (
                    <Link to="/clientes/new">Cadastrar</Link>
                ) : <div></div>
                }
            </div>
        )
    }
}
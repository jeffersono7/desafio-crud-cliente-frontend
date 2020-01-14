import React from 'react';

import './styles.css';
import Header from '../../components/header';
import clienteApi from '../../services/cliente';
import { Link } from 'react-router-dom';

export default class Cliente extends React.Component {

    state = {
        data: []
    }

    async componentDidMount() {

        const response = await clienteApi.obterTodos();

        this.setState({ data: response.data });

        console.log(response);
    }

    async excluirCliente(cliente) {
        const { id } = cliente;

        await clienteApi.deletar(id);

        const { data } = await clienteApi.obterTodos();

        this.setState({ data });
    }

    render() {

        return (
            <div>
                <Header />

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

                <Link to="/clientes/new">Cadastrar</Link>
            </div>
        )
    }
}
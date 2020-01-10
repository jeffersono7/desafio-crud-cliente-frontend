import React from 'react';

import clienteApi from '../../services/cliente';
import tipoTelefoneApi from '../../services/tipoTelefone';

import './styles.css';

export default class ClienteForm extends React.Component {

    state = {
        nome: '',
        cpf: '',
        tiposTelefone: []
    }

    async componentDidMount() {
        const response = await tipoTelefoneApi.obterTodos();

        this.setState({ tipoTelefone: response.data });
    }

    handleSubmit = (values, { props }) => {
        const { id } = props.match.params;

        const cliente = {};

        console.log(values);
    }

    render() {
        return (
            <div className="cliente-container">

                <form onSubmit={this.handleSubmit}>

                    <input
                        placeholder="Nome"
                        type="text"
                        name="nome"
                        onChange={e => this.setState({ nome: e.target.value })}
                        value={this.state.nome}
                    />

                    <input
                        placeholder="CPF"
                        type="text"
                        name="cpf"
                        onChange={e => this.setState({ cpf: e.target.value })}
                        value={this.state.cpf}
                    />

                </form>

            </div>
        );
    }
}

import React from 'react';

export default class ClienteForm extends React.Component {

    state = {
        nome: '',
        cpf: '',
    }

    handleSubmit = (values, { props }) => {
        const { id } = props.match.params;

        const cliente = {};
        
        console.log(values);
    }

    handleChange = (args) => {
        console.log('change', args);
    }

    render() {
        return (
            <div className="cliente-form">

                <form onSubmit={this.handleSubmit}>

                    <input
                        placeholder="Nome"
                        type="text"
                        name="nome"
                        onChange={this.handleChange}
                        value={this.state.nome}
                    />

                    <input
                        placeholder="CPF"
                        type="text"
                        name="cpf"
                        onChange={this.handleChange}
                        value={this.state.cpf}
                    />

                </form>

            </div>
        );
    }
}
